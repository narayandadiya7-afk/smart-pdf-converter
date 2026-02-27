'use client'

import React from 'react';
import { Upload, Settings, Download, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProcessingStepsProps {
  toolSlug: string;
}

const ProcessingSteps: React.FC<ProcessingStepsProps> = ({ toolSlug }) => {
  const getStepsForTool = (slug: string) => {
    const commonSteps = [
      {
        icon: Upload,
        title: "Upload Files",
        description: "Select and upload your PDF files securely",
        color: "from-blue-500 to-blue-600"
      },
      {
        icon: Settings,
        title: "Configure Options",
        description: "Adjust settings to meet your specific needs",
        color: "from-purple-500 to-purple-600"
      },
      {
        icon: CheckCircle,
        title: "Process",
        description: "Our tool processes your files instantly",
        color: "from-emerald-500 to-emerald-600"
      },
      {
        icon: Download,
        title: "Download",
        description: "Download your processed files immediately",
        color: "from-teal-500 to-teal-600"
      }
    ];

    // Customize steps based on tool type
    switch (slug) {
      case 'merge-pdf':
        return [
          { ...commonSteps[0], description: "Upload multiple PDF files to combine" },
          { ...commonSteps[1], description: "Arrange files in your preferred order" },
          { ...commonSteps[2], description: "Merge all PDFs into a single document" },
          { ...commonSteps[3], description: "Download your merged PDF file" }
        ];
      case 'split-pdf':
        return [
          { ...commonSteps[0], description: "Upload the PDF file you want to split" },
          { ...commonSteps[1], description: "Choose split method (pages, size, etc.)" },
          { ...commonSteps[2], description: "Split PDF into separate documents" },
          { ...commonSteps[3], description: "Download all split PDF files" }
        ];
      case 'compress-pdf':
        return [
          { ...commonSteps[0], description: "Upload PDF files to compress" },
          { ...commonSteps[1], description: "Select compression level and quality" },
          { ...commonSteps[2], description: "Reduce file size while maintaining quality" },
          { ...commonSteps[3], description: "Download your compressed PDF files" }
        ];
      case 'jpg-to-pdf':
        return [
          { ...commonSteps[0], description: "Upload JPG images to convert" },
          { ...commonSteps[1], description: "Arrange images and set page layout" },
          { ...commonSteps[2], description: "Convert images to PDF format" },
          { ...commonSteps[3], description: "Download your new PDF document" }
        ];
      case 'pdf-to-word':
        return [
          { ...commonSteps[0], description: "Upload PDF files to convert" },
          { ...commonSteps[1], description: "Choose output format and options" },
          { ...commonSteps[2], description: "Convert PDF to editable Word document" },
          { ...commonSteps[3], description: "Download your Word (.docx) files" }
        ];
      default:
        return commonSteps;
    }
  };

  const steps = getStepsForTool(toolSlug);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-12">
        How It Works
      </h2>
      
      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center relative"
          >
            {/* Connection Line */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 -translate-y-1/2 z-0">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
              </div>
            )}
            
            {/* Step Content */}
            <div className="relative z-10">
              <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
            
            {/* Step Number */}
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-slate-600 dark:text-slate-400 z-20">
              {index + 1}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full">
          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            All processing happens locally in your browser - 100% secure
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProcessingSteps;