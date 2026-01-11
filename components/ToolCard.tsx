'use client';
import React from "react";
import { Card } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
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
    color
}) => {
    const IconComponent = (Icons as any)[icon] || Icons.AppstoreOutlined;

    return (
        <Link href={`/tool/${slug}`} className="h-full group">
            <Card
                hoverable
                variant="outlined"
                className="h-full bg-white dark:bg-slate-800/50 shadow-md hover:shadow-2xl !transition-all duration-300 ease-in-out hover:-translate-y-2 rounded-xl border-blue-100/50 dark:border-slate-700/50 overflow-hidden relative"
            >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon Container */}
                    <div className="relative mb-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 scale-75 group-hover:scale-100"></div>
                        <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-700 dark:to-slate-600 rounded-full group-hover:shadow-lg transition-all duration-500 group-hover:scale-110 transform">
                            <IconComponent className="text-3xl !text-blue-600 dark:text-blue-400 " />
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-lg">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300 mb-3">
                        {description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        <span>Learn More</span>
                        <ArrowRightOutlined className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                </div>
            </Card>
        </Link>
        // <Link href={`/tool/${slug}`}>
        //                 <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 h-full">
        //                   <div className="p-6 h-full flex flex-col">
        //                     <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        //                       <IconComponent className="w-6 h-6 text-3xl text-white" />
        //                     </div>
        //                     <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-lg">
        //                       {title}
        //                     </h3>
        //                     <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
        //                       {description}
        //                     </p>
        //                     <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
        //                       <span>Use Tool</span>
        //                       <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        //                     </div>
        //                   </div>
        //                 </Card>
        //               </Link>
    );
};

export default ToolCard;
