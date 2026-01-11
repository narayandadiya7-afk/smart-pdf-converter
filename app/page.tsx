'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Upload, RefreshCw, Download, Shield, Zap, Users, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TOOLS } from "@/lib/toolsData";
import ToolCard from "@/components/ToolCard";
import { useState } from "react";

const Home = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    // 'All', 'Organize PDF', 'Optimize PDF', 'Convert PDF', 'Edit PDF', 'PDF Security'
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Organize PDF',
      value: 'organize',
    },
    {
      label: 'Optimize PDF',
      value: 'optimize',
    },
    {
      label: 'Convert PDF',
      value: 'convert',
    },
    {
      label: 'Edit PDF',
      value: 'edit',
    },
    {
      label: 'PDF Security',
      value: 'security',
    }];

  const filteredTools = activeTab === 'all'
    ? TOOLS
    : TOOLS.filter(tool => tool.category === activeTab);


  const features = [
    {
      icon: Shield,
      title: "100% Secure",
      description: "All conversions happen in your browser. Your files never leave your device.",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process PDFs instantly with our optimized technology",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: Users,
      title: "No Registration",
      description: "Start converting immediately. No account creation or sign-up required.",
      color: "from-slate-600 to-gray-700",
      bgColor: "bg-slate-50 dark:bg-slate-900/20",
    },
  ];
  const faqs = [
    {
      question: "Is this SmartPDFUtility really free?",
      answer: "Yes, our SmartPDFUtility is completely free to use. There are no hidden charges, subscriptions, or limits on the number of conversions.",
    },
    {
      question: "What file formats are supported?",
      answer: "We support PDF, Word, Excel, PowerPoint, HTML and image formats. You can upload any file of these formats.",
    },
    {
      question: "Is my data safe?",
      answer: "Absolutely! All image processing happens entirely in your browser. Your files are never uploaded to our servers, ensuring complete privacy and security.",
    },
    {
      question: "How many images can I convert at once?",
      answer: "You can convert up to 20 images in a single PDF file. Each image can be up to 10MB in size.",
    },
    {
      question: "Can I reorder the images before converting?",
      answer: "Yes! You can easily rearrange the images in any order before converting them to PDF.",
    },
  ];

 

  return (
    <>
      <div className="min-h-screen flex flex-col">
        
        {/* Hero Section */}
        <section className="gradient-hero py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
            
            {/* Professional Badge */}
              <div className="mb-8 inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Trusted by professionals worldwide
                </span>
              </div>
               <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Professional PDF Tools{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                for Everyone
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              Convert, compress, merge, split, edit, and secure your PDFs with
              our fast, reliable, and completely free online tools. No
              registration needed.
            </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* <Link to="/converter"> */}
                  <Button size="lg" className="gradient-primary hover:opacity-90 transition-opacity h-12 px-8 text-lg gap-2" onClick={() =>
                document
                  .getElementById("target")
                  ?.scrollIntoView({ behavior: "smooth" })
              }>
                    Start Converting Free
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                {/* </Link> */}
                <Link href="/about">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

       <div id="target" className="max-w-7xl mx-auto px-4 -mt-[2.5rem] relative z-20">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 bg-white rounded-2xl p-4 shadow-xl">
          {tabs.map((tab) => (
            <button
              key={tab?.value}
              onClick={() => setActiveTab(tab?.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab?.value
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab?.label}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
          {filteredTools.map((tool, index) => (
           <ToolCard
                  key={tool.id}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  slug={tool.slug}
                  color={tool.color}
                />
          ))}
        </div>
      </div>

      
        
{/* Features Section */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Why Choose Us
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                We provide the fastest and most reliable PDF processing tools online
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className={`${feature.bgColor} p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 h-full`}>
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Comprehensive answers to common inquiries
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-slate-200 dark:border-slate-700 rounded-lg px-6 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                  >
                    <AccordionTrigger className="text-left py-6 hover:no-underline text-slate-900 dark:text-white font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 dark:text-slate-400 pb-6 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>
        
{/* CTA Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-600 to-purple-600 dark:from-blue-900 dark:via-blue-800 dark:to-purple-900"></div>

        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl -ml-48 -mb-48"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Transform Your PDFs?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-10">
              Start processing your PDFs today with our free, fast, and secure
              tools. No credit card required.
            </p>
            
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold shadow-xl hover:shadow-2xl transition-all px-8 py-8 rounded-lg inline-flex items-center gap-2 text-lg" onClick={() =>
                document
                  .getElementById("target")
                  ?.scrollIntoView({ behavior: "smooth" })
              }>
                  Get Started Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Home;
