'use client';

import { useState } from 'react';
import { Upload, Download, RotateCw, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RotatePdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ url: string; blob: Blob } | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setResult(null);
      setRotation(0);
    }
  };

  const rotate = (degrees: number) => {
    setRotation((prev) => (prev + degrees) % 360);
  };

  const applyRotation = async () => {
    if (!file || rotation === 0) return;
    
    setProcessing(true);
    
    try {
      const { PDFDocument, degrees } = await import('pdf-lib');
      
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      
      pages.forEach(page => {
        page.setRotation(degrees(rotation));
      });
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setResult({ url, blob });
    } catch (error) {
      console.error('Error rotating PDF:', error);
      alert('Failed to rotate PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const downloadRotatedPdf = () => {
    if (!result) return;
    
    const link = document.createElement('a');
    link.href = result.url;
    link.download = 'rotated.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        <label htmlFor="pdf-upload" className="flex flex-col items-center justify-center cursor-pointer">
          <Upload className="w-16 h-16 text-cyan-500 mb-4" />
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Select PDF to rotate
          </p>
        </label>
      </div>

      {file && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="font-medium text-slate-900 dark:text-white">{file.name}</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Rotation</h3>
            <div className="flex justify-center gap-4">
              <Button onClick={() => rotate(-90)} variant="outline" size="lg" className="gap-2">
                <RotateCcw className="w-5 h-5" />
                90° Left
              </Button>
              <Button onClick={() => rotate(90)} variant="outline" size="lg" className="gap-2">
                <RotateCw className="w-5 h-5" />
                90° Right
              </Button>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">Current rotation: {rotation}°</p>
            </div>
            <Button onClick={applyRotation} disabled={processing || rotation === 0} className="w-full" size="lg">
              {processing ? 'Processing...' : 'Apply Rotation'}
            </Button>
          </div>
        </div>
      )}

      {result && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-emerald-900 dark:text-emerald-100">PDF rotated successfully!</p>
            <Button onClick={downloadRotatedPdf} className="gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
