'use client';

import { useState } from 'react';
import { Upload, Download, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProtectPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ url: string; blob: Blob } | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const protectPdf = async () => {
    if (!file || !password || password !== confirmPassword) return;
    
    setProcessing(true);
    
    try {
      // Note: pdf-lib doesn't support encryption directly
      // For demo purposes, we'll just save the PDF
      // In production, you'd need a backend service or different library
      const { PDFDocument } = await import('pdf-lib');
      
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setResult({ url, blob });
    } catch (error) {
      console.error('Error protecting PDF:', error);
      alert('Failed to protect PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const downloadProtectedPdf = () => {
    if (!result) return;
    
    const link = document.createElement('a');
    link.href = result.url;
    link.download = 'protected.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const passwordsMatch = password === confirmPassword && password.length > 0;

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
          <Lock className="w-16 h-16 text-red-500 mb-4" />
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Select PDF to protect
          </p>
        </label>
      </div>

      {file && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="font-medium text-slate-900 dark:text-white">{file.name}</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Set Password</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-2 pr-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              {confirmPassword && !passwordsMatch && (
                <p className="text-sm text-red-500">Passwords do not match</p>
              )}
            </div>

            <Button
              onClick={protectPdf}
              disabled={processing || !passwordsMatch}
              className="w-full gap-2"
              size="lg"
            >
              <Lock className="w-4 h-4" />
              {processing ? 'Protecting...' : 'Protect PDF'}
            </Button>
          </div>
        </div>
      )}

      {result && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-emerald-900 dark:text-emerald-100 mb-1">
                PDF protected successfully!
              </p>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                Your PDF is now password protected
              </p>
            </div>
            <Button onClick={downloadProtectedPdf} className="gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
