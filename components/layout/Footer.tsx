import Link from "next/link";
import { FileImage, Mail, Github, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t border-border bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                                <FileImage className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-lg font-bold">SmartPDFUtility</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Convert your images to PDF instantly. Fast, free, and secure.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/converter" className="text-muted-foreground hover:text-primary transition-colors">
                                    Converter Tool
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Connect</h3>
                        <div className="flex gap-3">
                            <a
                                href="mailto:contact@smartpdfutility.com"
                                className="h-9 w-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                                aria-label="Email"
                            >
                                <Mail className="h-4 w-4" />
                            </a>
                            <a
                                href="#"
                                className="h-9 w-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                                aria-label="GitHub"
                            >
                                <Github className="h-4 w-4" />
                            </a>
                            <a
                                href="#"
                                className="h-9 w-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} SmartPDFUtility. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
