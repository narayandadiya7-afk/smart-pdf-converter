'use client'

import { motion } from "framer-motion";
import { Shield, Zap, Users, Heart, Globe, Award, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutPage = () => {
  const stats = [
    { number: "1M+", label: "Files Processed", icon: CheckCircle },
    { number: "150+", label: "Countries Served", icon: Globe },
    { number: "99.9%", label: "Uptime Guarantee", icon: Shield },
    { number: "24/7", label: "Support Available", icon: Heart },
  ];

  const values = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your files never leave your device. All processing happens locally in your browser, ensuring complete privacy and security.",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Our optimized algorithms process PDFs instantly, saving you time and increasing productivity.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Built with real user feedback, our tools are designed to be intuitive and solve actual problems.",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Award,
      title: "Professional Quality",
      description: "Enterprise-grade tools that maintain document integrity and formatting precision.",
      color: "from-amber-500 to-orange-600",
    },
  ];

  const timeline = [
    {
      year: "2023",
      title: "The Beginning",
      description: "Started with a simple vision: make PDF tools accessible to everyone, everywhere.",
    },
    {
      year: "2024",
      title: "Growing Community",
      description: "Reached 100,000+ users worldwide and expanded our tool collection to 25+ utilities.",
    },
    {
      year: "2025",
      title: "Innovation Focus",
      description: "Launched advanced features like OCR, batch processing, and enhanced security tools.",
    },
    {
      year: "2026",
      title: "Global Impact",
      description: "Now serving over 1 million users across 150+ countries with 30+ professional tools.",
    },
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
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full shadow-sm"
            >
              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Empowering productivity since 2023
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.1]">
              About{" "}
              <span className="text-gradient from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                SmartPDFUtility
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
              We're on a mission to make PDF processing simple, secure, and accessible to everyone. 
              No downloads, no registrations, just powerful tools that work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-slate-950 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-200 dark:via-emerald-800 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
                Our Mission
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
                We believe that powerful PDF tools shouldn't require expensive software or complex installations. 
                Our mission is to democratize document processing by providing professional-grade tools that are 
                free, fast, and accessible to everyone.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6">
                  Why We Started SmartPDFUtility
                </h3>
                <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  <p>
                    In 2023, we noticed a gap in the market. Most PDF tools were either expensive, 
                    required downloads, or compromised user privacy by uploading files to servers.
                  </p>
                  <p>
                    We set out to change that by creating a platform where all processing happens 
                    locally in your browser, ensuring your documents remain private while providing 
                    enterprise-quality results.
                  </p>
                  <p>
                    Today, we're proud to serve over a million users worldwide, helping them save 
                    time and increase productivity with our comprehensive suite of PDF tools.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="glass dark:bg-slate-800/40 p-8 rounded-3xl border-white/20 dark:border-slate-700/30">
                  <div className="text-6xl mb-6">🚀</div>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                    Built for Everyone
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    From students working on assignments to professionals handling sensitive documents, 
                    our tools are designed to meet diverse needs while maintaining the highest standards 
                    of security and performance.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
              Our Core Values
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="glass dark:bg-slate-800/40 p-8 rounded-3xl border-white/20 dark:border-slate-700/30 hover:shadow-elegant transition-all duration-500 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
              Our Journey
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              From a simple idea to a global platform
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-teal-600"></div>
              
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative flex items-start mb-12 last:mb-0"
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="text-white font-black text-sm">{item.year}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="ml-8 glass dark:bg-slate-800/40 p-6 rounded-2xl border-white/20 dark:border-slate-700/30 flex-1">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 md:py-48 overflow-hidden bg-slate-950">
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
              Ready to Experience the{" "}
              <span className="text-emerald-500">Difference?</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
              Join over a million users who trust SmartPDFUtility for their document processing needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/">
                <Button size="lg" className="px-12 h-16 text-slate-950">
                  Try Our Tools
                  <ArrowRight className="h-6 w-6 " />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="secondary" className=" h-16 px-12 bg-white border-0">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;