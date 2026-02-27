'use client';

import { useState } from 'react';
import { Upload, X, Download, GripVertical, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileWithPreview {
  file: File;
  id: string;
  preview?: string;
}

export default function MergePdfTool() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [merging, setMerging] = useState(false);
  const [mergedUrl, setMergedUrl] = useState<string | null>(null);
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [showFileManager, setShowFileManager] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const pdfFiles = selectedFiles.filter(f => f.type === 'application/pdf');
    
    const newFiles: FileWithPreview[] = pdfFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    if (pdfFiles.length > 0) {
      setShowFileManager(true);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const pdfFiles = droppedFiles.filter(f => f.type === 'application/pdf');
    
    const newFiles: FileWithPreview[] = pdfFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    if (pdfFiles.length > 0) {
      setShowFileManager(true);
    }
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < files.length) {
      [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
      setFiles(newFiles);
    }
  };

  const mergePdfs = async () => {
    if (files.length < 2) return;
    
    setMerging(true);
    
    try {
      const { PDFDocument } = await import('pdf-lib');
      
      const mergedPdf = await PDFDocument.create();
      
      for (const fileItem of files) {
        const arrayBuffer = await fileItem.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      
      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setMergedBlob(blob);
      setMergedUrl(url);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert('Failed to merge PDFs. Please try again.');
    } finally {
      setMerging(false);
    }
  };

  const downloadMergedPdf = () => {
    if (!mergedUrl) return;
    
    const link = document.createElement('a');
    link.href = mergedUrl;
    link.download = 'merged-document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAll = () => {
    setFiles([]);
    setMergedUrl(null);
    setMergedBlob(null);
    setShowFileManager(false);
    if (mergedUrl) {
      URL.revokeObjectURL(mergedUrl);
    }
  };

  const addMoreFiles = () => {
    document.getElementById('pdf-upload-more')?.click();
  };

  const handleAddMoreFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const pdfFiles = selectedFiles.filter(f => f.type === 'application/pdf');
    
    const newFiles: FileWithPreview[] = pdfFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Reset merged state when adding more files
    if (mergedUrl) {
      URL.revokeObjectURL(mergedUrl);
      setMergedUrl(null);
      setMergedBlob(null);
    }
  };

  const totalSize = files.reduce((acc, f) => acc + f.file.size, 0);

  // Show upload zone if no files or not in file manager view
  if (!showFileManager || files.length === 0) {
    return (
      <div className="space-y-8">
        {/* Upload Zone */}
        <div 
          className={`relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-12 border-2 border-dashed transition-all duration-300 ${
            dragOver 
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 scale-[1.02]' 
              : 'border-slate-300 dark:border-slate-600 hover:border-emerald-400 dark:hover:border-emerald-500'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="pdf-upload"
            multiple
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          <label
            htmlFor="pdf-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl shadow-lg">
                <Upload className="w-12 h-12 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Drop PDF files here
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              or click to browse from your device
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Support for multiple PDF files
            </p>
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* File Manager View */}
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Selected Files
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {files.length} file{files.length > 1 ? 's' : ''} • {(totalSize / 1024 / 1024).toFixed(2)} MB total
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={addMoreFiles}
              className="flex-1 sm:flex-none text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
            >
              <Upload className="w-4 h-4 mr-2" />
              Add More
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              className="flex-1 sm:flex-none text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800"
            >
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Merge Button - Top Position */}
        {!mergedUrl ? (
          <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-md">
            <Button
              onClick={mergePdfs}
              disabled={files.length < 2 || merging}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200"
              size="lg"
            >
              {merging ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Merging PDFs...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 mr-3" />
                  Merge {files.length} PDF{files.length > 1 ? 's' : ''} into One
                </>
              )}
            </Button>
            {files.length < 2 && (
              <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3">
                Add at least 2 PDF files to merge
              </p>
            )}
          </div>
        ) : (
          /* Success Message - Top Position */
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-3xl border-2 border-emerald-200 dark:border-emerald-800 shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 rounded-full blur-3xl opacity-10"></div>
            <div className="relative p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-2">
                    PDF Merged Successfully!
                  </h4>
                  <p className="text-emerald-700 dark:text-emerald-300 mb-6">
                    Your {files.length} PDF files have been combined into a single document
                  </p>
                  <Button 
                    onClick={downloadMergedPdf} 
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg hover:shadow-xl transition-all duration-200 h-12 px-8"
                    size="lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Merged PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <input
          type="file"
          id="pdf-upload-more"
          multiple
          accept=".pdf"
          onChange={handleAddMoreFiles}
          className="hidden"
        />

        <div className="space-y-3">
          {files.map((fileItem, index) => (
            <div
              key={fileItem.id}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-center gap-4 p-5">
                {/* Drag Handle */}
                <div className="flex flex-col gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-move">
                  <GripVertical className="w-5 h-5" />
                </div>

                {/* File Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                      {index + 1}
                    </span>
                    <p className="font-semibold text-slate-900 dark:text-white truncate">
                      {fileItem.file.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <span>{(fileItem.file.size / 1024 / 1024).toFixed(2)} MB</span>
                    <span>•</span>
                    <span>PDF Document</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveFile(index, 'up')}
                    disabled={index === 0}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Move up"
                  >
                    ↑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveFile(index, 'down')}
                    disabled={index === files.length - 1}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Move down"
                  >
                    ↓
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(fileItem.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
