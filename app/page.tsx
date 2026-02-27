'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";
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
        <section className="relative mesh-gradient py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-900/[0.02] dark:bg-grid-slate-100/[0.02] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Professional Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full shadow-sm"
              >
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Trusted by professionals worldwide
                </span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.1]">
                Professional PDF Tools{" "}<br/>
                <span className="text-gradient from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                  for Everyone
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
                Convert, compress, merge, split, edit, and secure your PDFs with our fast, reliable, and completely free online tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button size="lg" className="h-14 px-10 " onClick={() =>
                  document
                    .getElementById("target")
                    ?.scrollIntoView({ behavior: "smooth" })
                }>
                  Start Converting Free
                  <ArrowRight className="h-6 w-6" />
                </Button>
                <Link href="/about">
                  <Button size="lg" variant="secondary" className="h-14 px-10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <div id="target" className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
          {/* Tabs - Modern Segmented Control */}
          <div className="flex flex-wrap justify-center gap-2 mb-16 glass p-2 rounded-2xl shadow-2xl">
            {tabs.map((tab) => (
              <button
                key={tab?.value}
                onClick={() => setActiveTab(tab?.value)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative cursor-pointer ${
                  activeTab === tab?.value
                    ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-emerald-600 dark:hover:text-slate-100 hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`}
              >
                {tab?.label}
              </button>
            ))}
          </div>

          {/* Tools Grid with AnimatePresence */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-32"
          >
            {filteredTools.map((tool, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                key={tool.id}
              >
                <ToolCard
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  slug={tool.slug}
                  color={tool.color}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

      
        
{/* Features Section */}
        <section className="py-32 bg-slate-50 dark:bg-slate-900/20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-200 dark:via-emerald-800 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
                Why Choose Us
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                We provide the fastest and most reliable PDF processing tools online.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="glass dark:bg-slate-800/40 p-10 rounded-3xl border-white/20 dark:border-slate-700/30 hover:shadow-elegant transition-all duration-500 h-full flex flex-col items-start">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-medium">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-24"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
                Frequently Asked <span className="text-emerald-600">Questions?</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
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
              <Accordion type="single" collapsible className="space-y-6">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border-0 bg-slate-50 dark:bg-slate-900/40 rounded-2xl px-8 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors"
                  >
                    <AccordionTrigger className="text-left py-8 hover:no-underline text-slate-900 dark:text-white font-bold text-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 dark:text-slate-400 pb-8 text-lg leading-relaxed font-medium">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>
        
{/* CTA Section */}
      <section className="relative py-32 md:py-48 overflow-hidden bg-slate-950">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600/20 rounded-full blur-[120px]"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
              Ready to Transform Your <br/>
              <span className="text-emerald-500">PDFs?</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
              Start processing your PDFs today with our free, fast, and secure tools.
            </p>
            
            <Button size="lg" className="bg-white text-slate-950 hover:bg-emerald-50 font-black shadow-2xl hover:scale-105 transition-all px-12 h-20 rounded-2xl inline-flex items-center gap-4 text-xl" onClick={() =>
                document
                  .getElementById("target")
                  ?.scrollIntoView({ behavior: "smooth" })
              }>
              Get Started Now
              <ArrowRight className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Home;
