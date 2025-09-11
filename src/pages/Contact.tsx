import {
    AlertCircle,
    CheckCircle,
    Github,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Send,
} from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { contactService } from "../services/api";
import type { Contact as ContactFormData } from "../types";

const contactInfo = [
    {
        icon: Mail,
        label: "Email",
        value: "halo_yuk@hotmail.com",
        href: "mailto:halo_yuk@hotmail.com",
        color: "text-primary-600",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+90 506 132 7998",
        href: "tel:+9050651327998",
        color: "text-green-600",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Turkey",
        href: null,
        color: "text-red-600",
    },
];

const socialLinks = [
    {
        name: "GitHub",
        href: "https://github.com/Huwul",
        icon: Github,
        color: "hover:text-gray-900",
        username: "@Huwul",
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/halil-yuksel-",
        icon: Linkedin,
        color: "hover:text-blue-600",
        username: "Halil Yüksel",
    },
];

export const Contact = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<
        "idle" | "success" | "error"
    >("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev: ContactFormData) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.subject.trim() ||
            !formData.message.trim()
        ) {
            setSubmitStatus("error");
            setErrorMessage("Please fill in all fields");
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            await contactService.sendMessage(formData);
            setSubmitStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            setSubmitStatus("error");
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Failed to send message. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white dark:text-white mb-6">
                        Get In <span className="gradient-text">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-300 dark:text-gray-300 max-w-3xl mx-auto">
                        I'd love to hear from you! Whether you have a project
                        idea, want to collaborate, or just want to say hello,
                        feel free to reach out.
                    </p>
                </div>
            </section>

            <section className="section-padding bg-gray-900 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl font-bold text-white dark:text-white mb-8">
                                Let's Start a Conversation
                            </h2>
                            <p className="text-gray-300 dark:text-gray-300 mb-8 leading-relaxed">
                                I'm always open to discussing new opportunities,
                                interesting projects, or just having a chat
                                about technology and software development. Don't
                                hesitate to reach out!
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-6 mb-12">
                                {contactInfo.map((item) => {
                                    const Icon = item.icon;
                                    const content = (
                                        <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                                            <div
                                                className={`p-3 rounded-full bg-gray-50 dark:bg-gray-700 ${item.color} mr-4`}
                                            >
                                                <Icon size={24} />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                                    {item.label}
                                                </p>
                                                <p className="text-gray-900 dark:text-white font-semibold">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </div>
                                    );

                                    return item.href ? (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            className="block hover:scale-105 transition-transform"
                                        >
                                            {content}
                                        </a>
                                    ) : (
                                        <div key={item.label}>{content}</div>
                                    );
                                })}
                            </div>

                            {/* Social Links */}
                            <div>
                                <h3 className="text-xl font-bold text-white dark:text-white mb-6">
                                    Follow Me
                                </h3>
                                <div className="flex space-x-4">
                                    {socialLinks.map((link) => {
                                        const Icon = link.icon;
                                        return (
                                            <a
                                                key={link.name}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`group flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all ${link.color}`}
                                            >
                                                <Icon
                                                    size={32}
                                                    className="mb-2"
                                                />
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {link.name}
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {link.username}
                                                </span>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <div className="card">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Send me a message
                                </h2>

                                {/* Success Message */}
                                {submitStatus === "success" && (
                                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                                        <CheckCircle
                                            className="text-green-600 mr-3"
                                            size={20}
                                        />
                                        <div>
                                            <p className="text-green-800 font-medium">
                                                Message sent successfully!
                                            </p>
                                            <p className="text-green-600 text-sm">
                                                I'll get back to you as soon as
                                                possible.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Error Message */}
                                {submitStatus === "error" && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                                        <AlertCircle
                                            className="text-red-600 mr-3"
                                            size={20}
                                        />
                                        <div>
                                            <p className="text-red-800 font-medium">
                                                Error sending message
                                            </p>
                                            <p className="text-red-600 text-sm">
                                                {errorMessage}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                            >
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                            >
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="subject"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                        >
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                            placeholder="Project collaboration, job opportunity, etc."
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                        >
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-vertical"
                                            placeholder="Tell me about your project, idea, or just say hello!"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send
                                                    size={20}
                                                    className="ml-2"
                                                />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                                        I typically respond within 24-48 hours.
                                        For urgent matters, feel free to reach
                                        out on social media.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
