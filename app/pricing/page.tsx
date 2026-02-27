'use client'

import { motion } from "framer-motion";
import { Check, X, Crown, Zap, Shield, Users, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PricingPage = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for personal use and small tasks",
      features: [
        "All PDF tools available",
        "Process up to 2 files at once",
        "Files up to 15MB each",
        "Basic processing speed",
        "No registration required",
        "100% secure local processing"
      ],
      limitations: [
        "Limited to 2 files per task",
        "15MB file size limit",
        "Standard processing speed",
        "No batch processing",
        "No priority support"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const,
      popular: false,
      color: "from-slate-500 to-slate-600"
    },
    {
      name: "Premium",
      price: "$6",
      period: "per month",
      description: "Ideal for professionals and frequent users",
      features: [
        "All PDF tools available",
        "Process unlimited files",
        "Files up to 100MB each",
        "3x faster processing speed",
        "Batch processing",
        "No ads or watermarks",
        "Priority email support",
        "Advanced OCR features",
        "Custom output settings",
        "API access (coming soon)"
      ],
      limitations: [],
      buttonText: "Start Premium Trial",
      buttonVariant: "default" as const,
      popular: true,
      color: "from-emerald-500 to-teal-600"
    },
    {
      name: "Business",
      price: "$15",
      period: "per month",
      description: "For teams and businesses with high-volume needs",
      features: [
        "Everything in Premium",
        "Process unlimited files",
        "Files up to 500MB each",
        "10x faster processing speed",
        "Advanced batch processing",
        "Team collaboration tools",
        "Priority phone support",
        "Custom branding options",
        "Advanced security features",
        "Dedicated account manager",
        "SLA guarantee",
        "Custom integrations"
      ],
      limitations: [],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false,
      color: "from-purple-500 to-indigo-600"
    }
  ];

  const faqs = [
    {
      question: "Is the free plan really free forever?",
      answer: "Yes! Our free plan is completely free with no time limits. You can use all our PDF tools with some limitations on file size and processing speed."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely! You can cancel your subscription at any time. There are no long-term contracts or cancellation fees."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with our service, we'll refund your payment."
    },
    {
      question: "Is my data secure with premium plans?",
      answer: "Yes! All plans, including free, process files locally in your browser. Premium plans add extra security features but maintain the same privacy standards."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can change your plan at any time. Changes take effect immediately, and we'll prorate any billing differences."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      company: "TechCorp",
      content: "SmartPDFPro has saved me hours every week. The premium features are worth every penny!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Freelance Designer",
      company: "Independent",
      content: "I love that I can process large files quickly. The batch processing feature is a game-changer.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Legal Assistant",
      company: "Law Firm LLC",
      content: "The security and reliability of this platform gives me confidence when handling sensitive documents.",
      rating: 5
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
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full shadow-sm"
            >
              <Crown className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Choose your perfect plan
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.1]">
              Simple{" "}
              <span className="text-gradient from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                Pricing
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
              Start free and upgrade when you need more power. All plans include our complete suite of PDF tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white dark:bg-slate-950 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white dark:bg-slate-800 rounded-3xl border-2 p-8 ${
                  plan.popular 
                    ? 'border-emerald-200 dark:border-emerald-800 shadow-2xl scale-105' 
                    : 'border-slate-200 dark:border-slate-700 hover:shadow-lg'
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    {plan.name === 'Free' && <Users className="w-8 h-8 text-white" />}
                    {plan.name === 'Premium' && <Crown className="w-8 h-8 text-white" />}
                    {plan.name === 'Business' && <Shield className="w-8 h-8 text-white" />}
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-black text-slate-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 ml-2">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-start gap-3 opacity-60">
                      <X className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-500 dark:text-slate-400 text-sm">
                        {limitation}
                      </span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={plan.buttonVariant}
                  className="w-full h-12 font-bold"
                  asChild
                >
                  <Link href={plan.name === 'Free' ? '/' : '/signup'}>
                    {plan.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
              Loved by Professionals
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              See what our users say about SmartPDFPro
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-slate-700 dark:text-slate-300 mb-4 italic">
                  "{testimonial.content}"
                </p>
                
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
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
              Everything you need to know about our pricing
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6"
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
              Join thousands of professionals who trust SmartPDFPro for their document processing needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="bg-white text-slate-950 hover:bg-emerald-50 font-bold px-8 h-14">
                  Start Free Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="bg-white border-0 px-8 h-14">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;