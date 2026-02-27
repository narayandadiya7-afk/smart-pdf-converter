'use client'

import Link from "next/link";
import { FileImage, Twitter, Facebook, Linkedin, Github, Mail, Shield, Zap, Users } from "lucide-react";
import { TOOLS } from "@/lib/toolsData";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const toolCategories = [
    {
      title: "Convert to PDF",
      tools: TOOLS.filter(tool => tool.category === "convert" && ["jpg-to-pdf", "word-to-pdf", "ppt-to-pdf", "excel-to-pdf", "html-to-pdf"].includes(tool.slug))
    },
    {
      title: "Convert from PDF", 
      tools: TOOLS.filter(tool => tool.category === "convert" && ["pdf-to-jpg", "pdf-to-word", "pdf-to-ppt", "pdf-to-excel", "pdf-to-pdfa"].includes(tool.slug))
    },
    {
      title: "Organize PDF",
      tools: TOOLS.filter(tool => tool.category === "organize").slice(0, 5)
    },
    {
      title: "Edit & Secure",
      tools: [...TOOLS.filter(tool => tool.category === "edit").slice(0, 3), ...TOOLS.filter(tool => tool.category === "security").slice(0, 2)]
    }
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Help Center", href: "/help" },
    { name: "API", href: "/api" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "GDPR", href: "/gdpr" },
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Secure",
      description: "All files processed locally"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant processing"
    },
    {
      icon: Users,
      title: "No Registration",
      description: "Start immediately"
    }
  ];

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <FileImage className="h-7 w-7 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tighter">
                  SmartPDF<span className="text-emerald-400">Pro</span>
                </span>
              </Link>
              
              <p className="text-slate-400 mb-8 leading-relaxed max-w-md">
                Professional PDF tools for everyone. Convert, compress, merge, split, edit, and secure your PDFs with our fast, reliable, and completely free online tools.
              </p>

              {/* Features */}
              <div className="space-y-4">
                {features.map((feature) => (
                  <div key={feature.title} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{feature.title}</div>
                      <div className="text-xs text-slate-400">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tool Categories */}
            {toolCategories.map((category) => (
              <div key={category.title}>
                <h3 className="text-sm font-black text-emerald-400 uppercase tracking-wider mb-6">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.tools.map((tool) => (
                    <li key={tool.slug}>
                      <Link 
                        href={`/tool/${tool.slug}`}
                        className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
                      >
                        {tool.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Company & Legal Links */}
          <div className="grid md:grid-cols-2 gap-12 mt-16 pt-12 border-t border-slate-800">
            <div>
              <h3 className="text-sm font-black text-emerald-400 uppercase tracking-wider mb-6">
                Company
              </h3>
              <ul className="grid grid-cols-2 gap-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black text-emerald-400 uppercase tracking-wider mb-6">
                Legal
              </h3>
              <ul className="grid grid-cols-2 gap-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-slate-400 text-sm">
                © {currentYear} SmartPDFPro. All rights reserved. Made with ❤️ for productivity.
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-slate-500 text-sm font-medium">Follow us:</span>
                <div className="flex gap-3">
                  {[
                    { icon: Twitter, href: "#", label: "Twitter" },
                    { icon: Facebook, href: "#", label: "Facebook" },
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                    { icon: Github, href: "#", label: "GitHub" },
                    { icon: Mail, href: "mailto:hello@smartpdfpro.com", label: "Email" },
                  ].map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      className="w-9 h-9 bg-slate-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;