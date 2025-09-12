import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import nodemailer from "nodemailer";
import Contact from "../models/Contact";

const router = Router();

// Configure nodemailer transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

// POST /api/contact - Send contact message
router.post(
    "/",
    [
        body("name")
            .isLength({ min: 2, max: 50 })
            .withMessage("Name must be between 2-50 characters")
            .trim()
            .escape(),
        body("email")
            .isEmail()
            .withMessage("Please provide a valid email address")
            .normalizeEmail(),
        body("subject")
            .isLength({ min: 5, max: 100 })
            .withMessage("Subject must be between 5-100 characters")
            .trim()
            .escape(),
        body("message")
            .isLength({ min: 10, max: 1000 })
            .withMessage("Message must be between 10-1000 characters")
            .trim()
            .escape(),
    ],
    async (req: Request, res: Response) => {
        try {
            // Validate input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: errors.array(),
                });
            }

            const { name, email, subject, message } = req.body;
            const ipAddress = req.ip || req.connection.remoteAddress;

            // Save to database
            const contact = new Contact({
                name,
                email,
                subject,
                message,
                ipAddress,
            });

            await contact.save();

            // Send email notification (if configured)
            try {
                if (process.env.SMTP_USER && process.env.SMTP_PASS) {
                    const transporter = createTransporter();

                    // Email to site owner
                    const ownerEmailOptions = {
                        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
                        to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
                        subject: `Portfolio Contact: ${subject.substring(
                            0,
                            100
                        )}`, // Limit subject length
                        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                New Contact Message
              </h2>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name.replace(/[<>&"]/g, "")}</p>
                <p><strong>Email:</strong> ${email.replace(/[<>&"]/g, "")}</p>
                <p><strong>Subject:</strong> ${subject
                    .replace(/[<>&"]/g, "")
                    .substring(0, 100)}</p>
                <p><strong>IP Address:</strong> ${ipAddress || "Unknown"}</p>
                <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
              </div>
              <div style="background: white; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <h3 style="color: #555; margin-top: 0;">Message:</h3>
                <p style="line-height: 1.6; color: #666;">${message
                    .replace(/[<>&"]/g, "")
                    .substring(0, 1000)}</p>
              </div>
            </div>
          `,
                    };

                    // Auto-reply to sender
                    const autoReplyOptions = {
                        from: `"Halil Yüksel" <${process.env.SMTP_USER}>`,
                        to: email,
                        subject: "Thank you for your message!",
                        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                Thank You, ${name.replace(/[<>&"]/g, "")}!
              </h2>
              <div style="padding: 20px 0;">
                <p style="line-height: 1.6; color: #666;">
                  Thank you for reaching out! I've received your message about "<strong>${subject
                      .replace(/[<>&"]/g, "")
                      .substring(0, 50)}${
                            subject.length > 50 ? "..." : ""
                        }</strong>" 
                  and I'll get back to you as soon as possible.
                </p>
                <p style="line-height: 1.6; color: #666;">
                  I typically respond within 24-48 hours. If your message is urgent, 
                  feel free to reach out to me directly on social media.
                </p>
                <div style="margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 5px;">
                  <p style="margin: 0; color: #666; font-style: italic;">
                    "Technology should always move forward—and so should developers."
                  </p>
                  <p style="margin: 10px 0 0 0; color: #999; font-size: 14px;">
                    - Halil Yüksel
                  </p>
                </div>
                <p style="line-height: 1.6; color: #666;">
                  Best regards,<br>
                  <strong>Halil Yüksel</strong><br>
                  Software Engineer | Full Stack Developer
                </p>
              </div>
            </div>
          `,
                    };

                    // Send both emails
                    await Promise.all([
                        transporter.sendMail(ownerEmailOptions),
                        transporter.sendMail(autoReplyOptions),
                    ]);

                    console.log(
                        `✅ Contact email sent successfully from ${email}`
                    );
                }
            } catch (emailError) {
                console.error("❌ Failed to send email:", emailError);
                // Don't fail the request if email fails, just log it
            }

            res.status(201).json({
                message:
                    "Message sent successfully! I'll get back to you soon.",
                success: true,
            });
        } catch (error) {
            console.error("Error processing contact form:", error);
            res.status(500).json({
                message: "Failed to send message. Please try again later.",
                success: false,
            });
        }
    }
);

// GET /api/contact - Get all contact messages (ADMIN ONLY - PROTECTED ENDPOINT)
router.get("/", async (req: Request, res: Response) => {
    try {
        // SECURITY: Basic admin protection (should use proper auth in production)
        const adminKey = req.headers["x-admin-key"] as string;
        if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
            return res.status(401).json({
                message:
                    "Unauthorized access denied. Admin authentication required.",
            });
        }

        const page = parseInt(req.query.page as string) || 1;
        const limit = Math.min(parseInt(req.query.limit as string) || 10, 50); // Max 50 items
        const skip = (page - 1) * limit;

        const contacts = await Contact.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Contact.countDocuments();
        const totalPages = Math.ceil(total / limit);

        res.json({
            contacts,
            pagination: {
                current: page,
                total: totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: "Failed to fetch contacts" });
    }
});

export default router;
