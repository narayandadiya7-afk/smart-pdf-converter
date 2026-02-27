'use client';

import { useState } from 'react';
import { Upload, Download, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CompressPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ originalSize: number; compressedSize: number; url: string; blob: Blob } | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const compressPdf = async () => {
    if (!file) return;
    
    setProcessing(true);
    
    try {
      const { PDFDocument } = await import('pdf-lib');
      
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Save with compression options
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: compressionLevel !== 'low',
        addDefaultPage: false,
      });
      
      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setResult({
        originalSize: file.size,
        compressedSize: blob.size,
        url,
        blob
      });
    } catch (error) {
      console.error('Error compressing PDF:', error);
      alert('Failed to compress PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const downloadCompressedPdf = () => {
    if (!result) return;
    
    const link = document.createElement('a');
    link.href = result.url;
    link.download = 'compressed.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-dashed border-slate-300 dark:border-slate-600">
        <input
          type="file"
          id="pdf-upload"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
        <label
          htmlFor="pdf-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <Upload className="w-16 h-16 text-purple-500 mb-4" />
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Select PDF file to compress
          </p>
          <p className="text-sm text-slate-500">Click to browse or drag and drop</p>
        </label>
      </div>

      {file && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="font-medium text-slate-900 dark:text-white mb-1">
              {file.name}
            </p>
            <p className="text-sm text-slate-500">
              Original size: {formatSize(file.size)}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Compression Level</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setCompressionLevel('low')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  compressionLevel === 'low'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <p className="font-semibold text-slate-900 dark:text-white">Low</p>
                <p className="text-xs text-slate-500">Best quality</p>
              </button>
              <button
                onClick={() => setCompressionLevel('medium')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  compressionLevel === 'medium'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <p className="font-semibold text-slate-900 dark:text-white">Medium</p>
                <p className="text-xs text-slate-500">Balanced</p>
              </button>
              <button
                onClick={() => setCompressionLevel('high')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  compressionLevel === 'high'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <p className="font-semibold text-slate-900 dark:text-white">High</p>
                <p className="text-xs text-slate-500">Smallest size</p>
              </button>
            </div>

            <Button
              onClick={compressPdf}
              disabled={processing}
              className="w-full gap-2"
              size="lg"
            >
              <Gauge className="w-4 h-4" />
              {processing ? 'Compressing...' : 'Compress PDF'}
            </Button>
          </div>
        </div>
      )}

      {result && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <div className="space-y-4">
            <p className="font-semibold text-emerald-900 dark:text-emerald-100">
              PDF compressed successfully!
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600 dark:text-slate-400">Original Size</p>
                <p className="font-bold text-slate-900 dark:text-white">{formatSize(result.originalSize)}</p>
              </div>
              <div>
                <p className="text-slate-600 dark:text-slate-400">Compressed Size</p>
                <p className="font-bold text-emerald-600">{formatSize(result.compressedSize)}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-3 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Size Reduction</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${((result.originalSize - result.compressedSize) / result.originalSize) * 100}%` }}
                  />
                </div>
                <span className="font-bold text-emerald-600">
                  {(((result.originalSize - result.compressedSize) / result.originalSize) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            <Button onClick={downloadCompressedPdf} className="w-full gap-2">
              <Download className="w-4 h-4" />
              Download Compressed PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
