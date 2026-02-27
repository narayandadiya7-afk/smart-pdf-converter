'use client';
import React from "react";
import * as Icons from "@ant-design/icons";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ToolCardProps {
    title: string;
    description: string;
    icon: string;
    slug: string;
    color: string
}

const ToolCard: React.FC<ToolCardProps> = ({
    title,
    description,
    icon,
    slug,
}) => {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[icon] || Icons.AppstoreOutlined;

    return (
        <Link href={`/tool/${slug}`} className="h-full group block">
            <div className="h-full glass dark:bg-slate-800/40 p-8 rounded-2xl shadow-card hover:shadow-elegant transition-all duration-500 ease-out hover:-translate-y-2 relative overflow-hidden flex flex-col items-center text-center border-white/20 dark:border-slate-700/30">
                {/* Subtle gradient background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
                
                {/* Icon Container */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-emerald-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center w-16 h-16 bg-white dark:bg-slate-700 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <IconComponent className="text-3xl !text-emerald-600 dark:text-emerald-400" />
                    </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                    {title}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 line-clamp-2">
                    {description}
                </p>

                {/* Link Indicator */}
                <div className="mt-auto flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <span>Try Tool</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
};

export default ToolCard;
