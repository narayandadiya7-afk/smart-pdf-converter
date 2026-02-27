'use client'

import { motion } from "framer-motion";
import { Search, Book, MessageCircle, Mail, Phone, FileText, Video, Users, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const helpCategories = [
    {
      icon: FileText,
      title: "Getting Started",
      description: "Learn the basics of using our PDF tools",
      articles: [
        "How to upload files securely",
        "Understanding file size limits",
        "Choosing the right tool for your needs",
        "Basic troubleshooting tips"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Book,
      title: "Tool Guides",
      description: "Detailed guides for each PDF tool",
      articles: [
        "How to merge PDF files",
        "Splitting PDFs effectively",
        "Compressing without quality loss",
        "Converting formats properly"
      ],
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Users,
      title: "Account & Billing",
      description: "Manage your account and subscriptions",
      articles: [
        "Creating a premium account",
        "Managing your subscription",
        "Understanding billing cycles",
        "Cancellation and refunds"
      ],
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: MessageCircle,
      title: "Technical Support",
      description: "Solve technical issues and errors",
      articles: [
        "Common error messages",
        "Browser compatibility issues",
        "File processing problems",
        "Performance optimization"
      ],
      color: "from-amber-500 to-orange-600"
    }
  ];

  const faqs = [
    {
      question: "How secure is file processing?",
      answer: "All file processing happens locally in your browser. Your files never leave your device, ensuring complete privacy and security. We don't store or have access to your documents."
    },
    {
      question: "What file formats are supported?",
      answer: "We support PDF, Word (.doc, .docx), PowerPoint (.ppt, .pptx), Excel (.xls, .xlsx), HTML, and various image formats (JPG, PNG, GIF, BMP, TIFF)."
    },
    {
      question: "Is there a file size limit?",
      answer: "Free users can process files up to 15MB each. Premium users can handle files up to 100MB, and Business users can process files up to 500MB."
    },
    {
      question: "Can I process multiple files at once?",
      answer: "Free users can process up to 2 files simultaneously. Premium and Business users have unlimited batch processing capabilities."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account is required for basic usage. However, creating an account unlocks premium features, faster processing, and removes limitations."
    },
    {
      question: "What browsers are supported?",
      answer: "Our tools work on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for optimal performance."
    }
  ];

  const contactOptions = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      contact: "support@smartpdfpro.com",
      availability: "24/7",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team instantly",
      contact: "Available in app",
      availability: "Mon-Fri 9AM-6PM EST",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      contact: "+1 (555) 123-4567",
      availability: "Business plan only",
      color: "from-purple-500 to-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative mesh-gradient py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-900/[0.02] dark:bg-grid-slate-100/[0.02] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.1]">
              Help{" "}
              <span className="text-gradient from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                Center
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
              Find answers, get support, and learn how to make the most of our PDF tools.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search for help articles, guides, or FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 text-lg bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
              Browse Help Topics
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Find detailed guides and tutorials for all our features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {helpCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                  {category.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {category.description}
                </p>
                
                <ul className="space-y-3">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <Link 
                        href="#" 
                        className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm"
                      >
                        {article}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
              >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
              Still Need Help?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Our support team is here to help you succeed
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {contactOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <option.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {option.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {option.description}
                </p>
                
                <div className="text-emerald-600 dark:text-emerald-400 font-bold mb-2">
                  {option.contact}
                </div>
                
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {option.availability}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-slate-950 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Try our PDF tools now and see why millions trust SmartPDFPro.
            </p>
            
            <Link href="/">
              <Button size="lg" className="bg-white text-slate-950 hover:bg-emerald-50 font-bold px-8 h-14">
                Start Using Tools
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;