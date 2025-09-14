import { Code2, ExternalLink, Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
    {
        name: "GitHub",
        href: "https://github.com/halilyuksel",
        icon: Github,
        color: "hover:text-gray-900",
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/halilyuksel",
        icon: Linkedin,
        color: "hover:text-blue-600",
    },
    {
        name: "Email",
        href: "mailto:contact@halilyuksel.dev",
        icon: Mail,
        color: "hover:text-primary-600",
    },
];

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand & Description */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <Code2 size={24} className="text-primary-600" />
                            <h3 className="text-2xl font-bold gradient-text">
                                Halil Yüksel
                            </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
                            Software Engineer & Full Stack Developer passionate
                            about building performant, user-friendly, and
                            scalable web applications.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1 md:col-span-1">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="/"
                                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 text-sm transition-colors"
                                >
                                    About Me
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/blog"
                                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 text-sm transition-colors"
                                >
                                    Blog Posts
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 text-sm transition-colors"
                                >
                                    Get in Touch
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="col-span-1 md:col-span-1">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                            Connect
                        </h4>
                        <div className="flex space-x-4">
                            {socialLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`text-gray-400 dark:text-gray-500 ${link.color} transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800`}
                                        aria-label={link.name}
                                    >
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>
                        <div className="mt-4">
                            <a
                                href="https://https://halil-portfolio-tau.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                            >
                                <ExternalLink size={14} className="mr-1" />
                                https://halil-portfolio-tau.vercel.app/
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            © {currentYear} Halil Yüksel. All rights reserved.
                        </p>
                        <p className="text-gray-400 dark:text-gray-500 text-xs mt-2 md:mt-0">
                            Built with React, TypeScript, Tailwind CSS & MongoDB
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
