'use client'

import { motion } from "framer-motion";
import { ArrowLeft, Shield, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getToolBySlug, TOOLS } from "@/lib/toolsData";
import { notFound } from "next/navigation";
import { ToolComponentMap } from "@/components/tools/ToolComponentMap";
import { use } from "react";

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ToolPage = ({ params }: ToolPageProps) => {
  const { slug } = use(params);
  const tool = getToolBySlug(slug);
  
  if (!tool) {
    notFound();
  }

  const features = [
    {
      icon: Shield,
      title: "100% Secure",
      description: "Files processed locally in your browser",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant processing with optimized algorithms",
    },
    {
      icon: CheckCircle,
      title: "High Quality",
      description: "Professional results every time",
    },
  ];

  const relatedTools = TOOLS.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 3);
  
  const ToolComponent = ToolComponentMap[slug];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-8">
          
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                {tool.title}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
                {tool.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Tool Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            {ToolComponent ? <ToolComponent /> : (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-dashed border-slate-300 dark:border-slate-600 text-center">
                <p className="text-slate-600 dark:text-slate-400">Tool component coming soon...</p>
              </div>
            )}
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-black text-slate-900 dark:text-white text-center mb-12">
              Why Choose Our {tool.title}?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={feature.title} className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-3xl font-black text-slate-900 dark:text-white text-center mb-12">
                Related Tools
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedTools.map((relatedTool) => (
                  <Link key={relatedTool.id} href={`/tool/${relatedTool.slug}`}>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {relatedTool.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {relatedTool.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolPage;