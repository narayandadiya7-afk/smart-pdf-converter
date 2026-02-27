'use client';

import Link from "next/link";
import { FileImage, ChevronDown } from "lucide-react";
import { 
    FileImageOutlined, 
    FileWordOutlined, 
    FilePptOutlined, 
    FileExcelOutlined, 
    Html5Outlined, 
    FilePdfOutlined,
    MergeCellsOutlined,
    ScissorOutlined,
    DeleteOutlined,
    ExportOutlined,
    AppstoreOutlined,
    ScanOutlined,
    CompressOutlined,
    ToolOutlined,
    FileTextOutlined,
    RotateRightOutlined,
    OrderedListOutlined,
    CopyrightOutlined,
    EditOutlined,
    UnlockOutlined,
    LockOutlined,
    FormOutlined,
    EyeInvisibleOutlined,
    DiffOutlined
} from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const convertToTools = [
        { name: "JPG to PDF", icon: <FileImageOutlined className="text-blue-500" />, href: "/tool/jpg-to-pdf", description: "Convert images to PDF documents" },
        { name: "WORD to PDF", icon: <FileWordOutlined className="text-blue-600" />, href: "/tool/word-to-pdf", description: "Docx to high-quality PDF" },
        { name: "POWERPOINT to PDF", icon: <FilePptOutlined className="text-orange-600" />, href: "/tool/ppt-to-pdf", description: "PPT slides to PDF format" },
        { name: "EXCEL to PDF", icon: <FileExcelOutlined className="text-emerald-600" />, href: "/tool/excel-to-pdf", description: "Spreadsheets to PDF tables" },
        { name: "HTML to PDF", icon: <Html5Outlined className="text-orange-500" />, href: "/tool/html-to-pdf", description: "Web pages to PDF files" },
    ];

    const convertFromTools = [
        { name: "PDF to JPG", icon: <FileImageOutlined className="text-blue-500" />, href: "/tool/pdf-to-jpg", description: "Extract images from your PDF" },
        { name: "PDF to WORD", icon: <FileWordOutlined className="text-blue-600" />, href: "/tool/pdf-to-word", description: "PDF to editable Word doc" },
        { name: "PDF to POWERPOINT", icon: <FilePptOutlined className="text-orange-600" />, href: "/tool/pdf-to-ppt", description: "PDF to PPT presentations" },
        { name: "PDF to EXCEL", icon: <FileExcelOutlined className="text-emerald-600" />, href: "/tool/pdf-to-excel", description: "PDF to Excel spreadsheets" },
        { name: "PDF to PDF/A", icon: <FilePdfOutlined className="text-red-600" />, href: "/tool/pdf-to-pdfa", description: "Long-term archiving format" },
    ];

    const allToolsCategories = [
        {
            title: "ORGANIZE PDF",
            tools: [
                { name: "Merge PDF", icon: <MergeCellsOutlined className="text-indigo-500" />, href: "/tool/merge-pdf", description: "Combine multiple PDFs into one" },
                { name: "Split PDF", icon: <ScissorOutlined className="text-pink-500" />, href: "/tool/split-pdf", description: "Separate pages into new files" },
                { name: "Remove pages", icon: <DeleteOutlined className="text-red-500" />, href: "/tool/remove-pages", description: "Delete unwanted pages easily" },
                { name: "Extract pages", icon: <ExportOutlined className="text-blue-500" />, href: "/tool/extract-pages", description: "Save specific pages as PDF" },
                { name: "Organize PDF", icon: <AppstoreOutlined className="text-purple-500" />, href: "/tool/organize-pdf", description: "Reorder or delete PDF pages" },
                { name: "Scan to PDF", icon: <ScanOutlined className="text-slate-500" />, href: "/tool/scan-to-pdf", description: "Digitalize paper documents" },
            ],
        },
        {
            title: "OPTIMIZE PDF",
            tools: [
                { name: "Compress PDF", icon: <CompressOutlined className="text-emerald-500" />, href: "/tool/compress-pdf", description: "Reduce file size while keeping quality" },
                { name: "Repair PDF", icon: <ToolOutlined className="text-amber-500" />, href: "/tool/repair-pdf", description: "Fix corrupted or broken files" },
                { name: "OCR PDF", icon: <FileTextOutlined className="text-blue-500" />, href: "/tool/ocr-pdf", description: "Make scanned PDFs searchable" },
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
                { name: "Rotate PDF", icon: <RotateRightOutlined className="text-blue-500" />, href: "/tool/rotate-pdf", description: "Turn pages to correct orientation" },
                { name: "Add page numbers", icon: <OrderedListOutlined className="text-slate-500" />, href: "/tool/add-page-numbers", description: "Insert numbers into pages" },
                { name: "Add watermark", icon: <CopyrightOutlined className="text-blue-400" />, href: "/tool/add-watermark", description: "Stamps images or text over PDF" },
                { name: "Crop PDF", icon: <ScissorOutlined className="text-pink-500" />, href: "/tool/crop-pdf", description: "Trim white margins or areas" },
                { name: "Edit PDF", icon: <EditOutlined className="text-blue-600" />, href: "/tool/edit-pdf", description: "Modify text and images directly" },
            ],
        },
        {
            title: "PDF SECURITY",
            tools: [
                { name: "Unlock PDF", icon: <UnlockOutlined className="text-emerald-500" />, href: "/tool/unlock-pdf", description: "Remove password protections" },
                { name: "Protect PDF", icon: <LockOutlined className="text-red-500" />, href: "/tool/protect-pdf", description: "Encrypt with a secure password" },
                { name: "Sign PDF", icon: <FormOutlined className="text-blue-500" />, href: "/tool/sign-pdf", description: "Add your signature to document" },
                { name: "Redact PDF", icon: <EyeInvisibleOutlined className="text-slate-600" />, href: "/tool/redact-pdf", description: "Black out sensitive information" },
                { name: "Compare PDF", icon: <DiffOutlined className="text-indigo-500" />, href: "/tool/compare-pdf", description: "See differences between versions" },
            ],
        },
    ];

    return (
        <header className="glass sticky top-0 z-50 border-b border-white/20 dark:border-slate-800/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-stretch justify-between">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-all group">
                        <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                            <FileImage className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">SmartPDF<span className="text-emerald-600">Pro</span></span>
                    </Link>

                    <nav className="hidden lg:flex items-stretch gap-8">
                        <Link href="/" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors uppercase tracking-wider flex items-center">
                            Home
                        </Link>

                        {/* Convert PDF Dropdown */}
                        <div
                            className="relative flex items-center"
                            onMouseEnter={() => setOpenDropdown("convert")}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <button className={`text-sm font-bold transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0 uppercase tracking-wider ${openDropdown === "convert" ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'}`}>
                                Convert
                                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${openDropdown === "convert" ? 'rotate-180' : ''}`} />
                            </button>

                            {openDropdown === "convert" && (
                                <div className="absolute top-[90%] left-1/2 -translate-x-1/2 mt-0 pt-0 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="bg-white/95 dark:bg-slate-900/98 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-8 min-w-[700px] backdrop-blur-xl mt-2">
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <h3 className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em] px-3">Convert to PDF</h3>
                                                <div className="grid gap-1">
                                                    {convertToTools.map((tool) => (
                                                        <Link
                                                                    key={tool.name}
                                                                    href={tool.href}
                                                                    className="flex items-start gap-3 px-3 py-2 rounded-2xl hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all group"
                                                                >
                                                                    <div className="text-xl mt-1 group-hover:scale-110 transition-transform duration-300">{tool.icon}</div>
                                                                    <div>
                                                                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-0.5">{tool.name}</div>
                                                                        <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{tool.description}</div>
                                                                    </div>
                                                                </Link>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <h3 className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em] px-3">Convert from PDF</h3>
                                                <div className="grid gap-1">
                                                    {convertFromTools.map((tool) => (
                                                        <Link
                                                                    key={tool.name}
                                                                    href={tool.href}
                                                                    className="flex items-start gap-3 px-3 py-2 rounded-2xl hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all group"
                                                                >
                                                                    <div className="text-xl mt-1 group-hover:scale-110 transition-transform duration-300">{tool.icon}</div>
                                                                    <div>
                                                                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-0.5">{tool.name}</div>
                                                                        <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{tool.description}</div>
                                                                    </div>
                                                                </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* All PDF Tools Dropdown */}
                        <div
                            className="flex items-center"
                            onMouseEnter={() => setOpenDropdown("all-tools")}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <button className={`text-sm font-bold transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0 uppercase tracking-wider ${openDropdown === "all-tools" ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'}`}>
                                All Tools
                                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${openDropdown === "all-tools" ? 'rotate-180' : ''}`} />
                            </button>

                            {openDropdown === "all-tools" && (
                                <div className="absolute top-full left-0 right-0 w-full mt-0 pt-0 animate-in fade-in slide-in-from-top-2 duration-300 z-50">
                                    <div className="bg-white/95 dark:bg-slate-900/98 border-t border-b border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl">
                                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                                                {allToolsCategories.map((category) => (
                                                    <div key={category.title} className="space-y-4">
                                                        <h3 className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em] px-3">{category.title}</h3>
                                                        <div className="grid gap-1">
                                                            {category.tools.map((tool) => (
                                                                <Link
                                                                    key={tool.name}
                                                                    href={tool.href}
                                                                    className="flex items-start gap-3 px-3 py-2 rounded-2xl hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all group"
                                                                >
                                                                    <div className="text-xl mt-1 group-hover:scale-110 transition-transform duration-300">{tool.icon}</div>
                                                                    <div>
                                                                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-0.5">{tool.name}</div>
                                                                        <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{tool.description}</div>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link href="/about" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors uppercase tracking-wider flex items-center">
                            About
                        </Link>
                        <Link href="/blog" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors uppercase tracking-wider flex items-center">
                            Blog
                        </Link>
                        <Link href="/pricing" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors uppercase tracking-wider flex items-center">
                            Pricing
                        </Link>
                        <Link href="/contact" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors uppercase tracking-wider flex items-center">
                            Contact
                        </Link>
                    </nav>

                    <div className="flex items-center">
                        <Link href="/converter">
                            <Button className="border-0">
                                Start Converting
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
