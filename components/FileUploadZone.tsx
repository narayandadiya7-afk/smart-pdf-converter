'use client'

import React, { useState, useCallback } from 'react';
import { Upload, File, X, Download, Settings, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface FileUploadZoneProps {
  toolType: string;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({ toolType }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  }, []);

  const handleFiles = (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    
    setFiles(prev => [...prev, ...uploadedFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const processFiles = async () => {
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setIsProcessed(true);
  };

  const downloadProcessedFiles = () => {
    // Simulate download
    console.log('Downloading processed files...');
  };

  const resetUpload = () => {
    setFiles([]);
    setIsProcessed(false);
    setIsProcessing(false);
  };

  if (isProcessed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-800 rounded-3xl border-2 border-emerald-200 dark:border-emerald-800 p-12 text-center"
      >
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Download className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Files Processed Successfully!
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Your files have been processed and are ready for download.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={downloadProcessedFiles} className="gap-2">
            <Download className="w-4 h-4" />
            Download Files
          </Button>
          <Button variant="outline" onClick={resetUpload}>
            Process More Files
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative bg-white dark:bg-slate-800 rounded-3xl border-2 border-dashed transition-all duration-300 ${
          isDragOver 
            ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' 
            : 'border-slate-300 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-emerald-700'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-12 text-center">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Upload className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Select PDF files
          </h3>
          
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
            Drop your files here or click to browse. All processing happens locally in your browser.
          </p>
          
          <input
            type="file"
            multiple
            accept=".pdf,image/*,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          
          <label htmlFor="file-upload">
            <Button className="cursor-pointer gap-2" asChild>
              <span>
                <Upload className="w-4 h-4" />
                Select Files
              </span>
            </Button>
          </label>
          
          <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            Supported formats: PDF, JPG, PNG, Word, PowerPoint, Excel
          </div>
        </div>
      </motion.div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Selected Files ({files.length})
              </h4>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {files.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                      <File className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white text-sm">
                        {file.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {formatFileSize(file.size)}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFile(file.id)}
                    className="w-8 h-8 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </motion.div>
              ))}
            </div>
            
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30">
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={processFiles}
                  disabled={isProcessing}
                  className="gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Process Files
                    </>
                  )}
                </Button>
                
                <Button variant="outline" className="gap-2">
                  <Settings className="w-4 h-4" />
                  Options
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUploadZone;