'use client';

import Link from "next/link";
import { FileImage, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const convertToTools = [
        { name: "JPG to PDF", icon: "🖼️", href: "/converter" },
        { name: "WORD to PDF", icon: "📘", href: "/converter" },
        { name: "POWERPOINT to PDF", icon: "📙", href: "/converter" },
        { name: "EXCEL to PDF", icon: "📗", href: "/converter" },
        { name: "HTML to PDF", icon: "🌐", href: "/converter" },
    ];

    const convertFromTools = [
        { name: "PDF to JPG", icon: "🖼️", href: "/converter" },
        { name: "PDF to WORD", icon: "📘", href: "/converter" },
        { name: "PDF to POWERPOINT", icon: "📙", href: "/converter" },
        { name: "PDF to EXCEL", icon: "📗", href: "/converter" },
        { name: "PDF to PDF/A", icon: "📄", href: "/converter" },
    ];

    const allToolsCategories = [
        {
            title: "ORGANIZE PDF",
            tools: [
                { name: "Merge PDF", icon: "🔗", href: "/converter" },
                { name: "Split PDF", icon: "✂️", href: "/converter" },
                { name: "Remove pages", icon: "❌", href: "/converter" },
                { name: "Extract pages", icon: "📤", href: "/converter" },
                { name: "Organize PDF", icon: "📑", href: "/converter" },
                { name: "Scan to PDF", icon: "🖨️", href: "/converter" },
            ],
        },
        {
            title: "OPTIMIZE PDF",
            tools: [
                { name: "Compress PDF", icon: "🗜️", href: "/converter" },
                { name: "Repair PDF", icon: "🔧", href: "/converter" },
                { name: "OCR PDF", icon: "📝", href: "/converter" },
            ],
        },
        {
            title: "CONVERT TO PDF",
            tools: convertToTools,
        },
        {
            title: "CONVERT FROM PDF",
            tools: convertFromTools,
        },
        {
            title: "EDIT PDF",
            tools: [
                { name: "Rotate PDF", icon: "🔄", href: "/converter" },
                { name: "Add page numbers", icon: "🔢", href: "/converter" },
                { name: "Add watermark", icon: "💧", href: "/converter" },
                { name: "Crop PDF", icon: "✂️", href: "/converter" },
                { name: "Edit PDF", icon: "✏️", href: "/converter" },
            ],
        },
        {
            title: "PDF SECURITY",
            tools: [
                { name: "Unlock PDF", icon: "🔓", href: "/converter" },
                { name: "Protect PDF", icon: "🛡️", href: "/converter" },
                { name: "Sign PDF", icon: "✍️", href: "/converter" },
                { name: "Redact PDF", icon: "🖍️", href: "/converter" },
                { name: "Compare PDF", icon: "🔍", href: "/converter" },
            ],
        },
    ];

    return (
        <header className="border-b border-border bg-white sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                            <FileImage className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold">SmartPDFUtility</span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                            Home
                        </Link>

                        {/* Convert PDF Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setOpenDropdown("convert")}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <button className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0">
                                CONVERT PDF
                                <ChevronDown className="h-4 w-4" />
                            </button>

                            {openDropdown === "convert" && (
                                <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-elegant p-6 min-w-[500px]">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-xs font-semibold text-muted-foreground mb-3">CONVERT TO PDF</h3>
                                            <div className="space-y-2">
                                                {convertToTools.map((tool) => (
                                                    <Link
                                                        key={tool.name}
                                                        href={tool.href}
                                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                                                    >
                                                        <span className="text-xl">{tool.icon}</span>
                                                        <span className="text-sm font-medium">{tool.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-semibold text-muted-foreground mb-3">CONVERT FROM PDF</h3>
                                            <div className="space-y-2">
                                                {convertFromTools.map((tool) => (
                                                    <Link
                                                        key={tool.name}
                                                        href={tool.href}
                                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                                                    >
                                                        <span className="text-xl">{tool.icon}</span>
                                                        <span className="text-sm font-medium">{tool.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* All PDF Tools Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setOpenDropdown("all-tools")}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <button className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0">
                                ALL PDF TOOLS
                                <ChevronDown className="h-4 w-4" />
                            </button>

                            {openDropdown === "all-tools" && (
                                <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-elegant p-6 min-w-[900px]">
                                    <div className="grid grid-cols-6 gap-6">
                                        {allToolsCategories.map((category) => (
                                            <div key={category.title}>
                                                <h3 className="text-xs font-semibold text-muted-foreground mb-3">{category.title}</h3>
                                                <div className="space-y-2">
                                                    {category.tools.map((tool) => (
                                                        <Link
                                                            key={tool.name}
                                                            href={tool.href}
                                                            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted transition-colors group"
                                                        >
                                                            <span className="text-base">{tool.icon}</span>
                                                            <span className="text-xs font-medium">{tool.name}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                            About
                        </Link>
                        <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
                            Blog
                        </Link>
                        <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                            Contact
                        </Link>
                    </nav>

                    <Link href="/converter">
                        <Button className="gradient-primary hover:opacity-90 transition-opacity text-primary-foreground border-0">
                            Start Converting
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
