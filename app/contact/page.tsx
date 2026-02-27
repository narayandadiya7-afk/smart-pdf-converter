'use client'

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Users, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "support@smartpdfpro.com",
      description: "Get help within 24 hours",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Business hours support",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Tech Street, San Francisco, CA 94105",
      description: "Our headquarters",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 9AM-6PM EST",
      description: "Weekend support via email",
      color: "from-amber-500 to-orange-600"
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: MessageCircle },
    { value: 'support', label: 'Technical Support', icon: Users },
    { value: 'business', label: 'Business/Enterprise', icon: Building },
    { value: 'billing', label: 'Billing & Accounts', icon: Mail }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                We're here to help
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.1]">
              Contact{" "}
              <span className="text-gradient from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                Us
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
              Have questions about our PDF tools? Need technical support? Want to discuss enterprise solutions? 
              We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {info.title}
                </h3>
                
                <div className="text-emerald-600 dark:text-emerald-400 font-bold mb-2">
                  {info.details}
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
                Send Us a Message
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 md:p-12"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Inquiry Type */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 dark:text-white mb-4">
                    What can we help you with?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {inquiryTypes.map((type) => (
                      <label
                        key={type.value}
                        className={`relative flex flex-col items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          formData.type === type.value
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                            : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="type"
                          value={type.value}
                          checked={formData.type === type.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <type.icon className={`w-6 h-6 mb-2 ${
                          formData.type === type.value ? 'text-emerald-600' : 'text-slate-400'
                        }`} />
                        <span className={`text-sm font-medium text-center ${
                          formData.type === type.value ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-600 dark:text-slate-400'
                        }`}>
                          {type.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none transition-colors"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none transition-colors resize-none"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button type="submit" size="lg" className="px-12 h-14 gap-3">
                    <Send className="w-5 h-5" />
                    Send Message
                  </Button>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                    We typically respond within 24 hours during business days
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
              Visit Our Office
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Located in the heart of San Francisco's tech district
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-100 dark:bg-slate-800 rounded-3xl h-96 flex items-center justify-center"
          >
            <div className="text-center">
              <MapPin className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Interactive Map
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                123 Tech Street, San Francisco, CA 94105
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;