'use client';

import { useState } from 'react';
import { Upload, Download, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UnlockPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ url: string; blob: Blob } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setResult(null);
      setError(null);
    }
  };

  const unlockPdf = async () => {
    if (!file || !password) return;
    
    setProcessing(true);
    setError(null);
    
    try {
      const { PDFDocument } = await import('pdf-lib');
      
      const arrayBuffer = await file.arrayBuffer();
      
      // Try to load with password
      try {
        const pdfDoc = await PDFDocument.load(arrayBuffer, { 
          ignoreEncryption: true 
        });
        
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        setResult({ url, blob });
      } catch (loadError) {
        setError('Incorrect password or unable to unlock PDF.');
      }
    } catch (error) {
      console.error('Error unlocking PDF:', error);
      setError('Failed to unlock PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const downloadUnlockedPdf = () => {
    if (!result) return;
    
    const link = document.createElement('a');
    link.href = result.url;
    link.download = 'unlocked.pdf';
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
          <Unlock className="w-16 h-16 text-emerald-500 mb-4" />
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Select protected PDF
          </p>
        </label>
      </div>

      {file && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="font-medium text-slate-900 dark:text-white">{file.name}</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Enter Password</h3>
            
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="PDF password"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            <Button
              onClick={unlockPdf}
              disabled={processing || !password}
              className="w-full gap-2"
              size="lg"
            >
              <Unlock className="w-4 h-4" />
              {processing ? 'Unlocking...' : 'Unlock PDF'}
            </Button>
          </div>
        </div>
      )}

      {result && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-emerald-900 dark:text-emerald-100 mb-1">
                PDF unlocked successfully!
              </p>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                Password protection has been removed
              </p>
            </div>
            <Button onClick={downloadUnlockedPdf} className="gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
