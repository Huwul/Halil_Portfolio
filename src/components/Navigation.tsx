import { BookOpen, Code2, Home, Mail, Menu, X } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { NavigationItem } from "../types";

const navigation: NavigationItem[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "Contact", href: "/contact", icon: Mail },
];

const NavigationLink = memo(
    ({
        item,
        isActive,
        onClick,
        className = "",
        iconSize = 16,
    }: {
        item: NavigationItem;
        isActive: boolean;
        onClick?: () => void;
        className?: string;
        iconSize?: number;
    }) => {
        const Icon = item.icon;

        return (
            <Link
                to={item.href}
                onClick={onClick}
                className={`${className} ${
                    isActive
                        ? "text-primary-600 bg-primary-50 dark:bg-primary-900/30"
                        : "text-gray-700 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                aria-current={isActive ? "page" : undefined}
            >
                <Icon size={iconSize} aria-hidden="true" />
                <span>{item.name}</span>
            </Link>
        );
    }
);

NavigationLink.displayName = "NavigationLink";

export const Navigation = memo(() => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isCurrentPage = useCallback(
        (href: string) => {
            return location.pathname === href;
        },
        [location.pathname]
    );

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            to="/"
                            className="flex items-center space-x-2 text-2xl font-bold gradient-text"
                            aria-label="Go to homepage"
                        >
                            <Code2 size={28} className="text-primary-600" />
                            <span>Halil Yüksel</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <NavigationLink
                                key={item.name}
                                item={item}
                                isActive={isCurrentPage(item.href)}
                                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                            />
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMenuOpen ? (
                                <X size={24} aria-hidden="true" />
                            ) : (
                                <Menu size={24} aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t dark:border-gray-800">
                        {navigation.map((item) => (
                            <NavigationLink
                                key={item.name}
                                item={item}
                                isActive={isCurrentPage(item.href)}
                                onClick={closeMenu}
                                className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                                iconSize={20}
                            />
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
});

Navigation.displayName = "Navigation";
