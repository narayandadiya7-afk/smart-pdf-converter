'use client';

import { useState } from 'react';
import { Upload, Download, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SplitPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [splitMode, setSplitMode] = useState<'pages' | 'range'>('pages');
  const [pageInput, setPageInput] = useState('');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Array<{ name: string; blob: Blob; url: string }> | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const splitPdf = async () => {
    if (!file || !pageInput) return;
    
    setProcessing(true);
    
    try {
      const { PDFDocument } = await import('pdf-lib');
      
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const totalPages = pdfDoc.getPageCount();
      
      // Parse page input (e.g., "1,3,5-7")
      const pageNumbers: number[] = [];
      const parts = pageInput.split(',');
      
      for (const part of parts) {
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(n => parseInt(n.trim()));
          for (let i = start; i <= end && i <= totalPages; i++) {
            pageNumbers.push(i - 1); // 0-indexed
          }
        } else {
          const pageNum = parseInt(part.trim());
          if (pageNum > 0 && pageNum <= totalPages) {
            pageNumbers.push(pageNum - 1);
          }
        }
      }
      
      const results: Array<{ name: string; blob: Blob; url: string }> = [];
      
      for (const pageIndex of pageNumbers) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
        newPdf.addPage(copiedPage);
        
        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        results.push({
          name: `page-${pageIndex + 1}.pdf`,
          blob,
          url
        });
      }
      
      setResult(results);
    } catch (error) {
      console.error('Error splitting PDF:', error);
      alert('Failed to split PDF. Please check your page numbers and try again.');
    } finally {
      setProcessing(false);
    }
  };

  const downloadPage = (item: { name: string; blob: Blob; url: string }) => {
    const link = document.createElement('a');
    link.href = item.url;
    link.download = item.name;
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
        <label
          htmlFor="pdf-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <Upload className="w-16 h-16 text-rose-500 mb-4" />
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Select PDF file to split
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
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Split Options</h3>
            
            <div className="flex gap-4">
              <Button
                variant={splitMode === 'pages' ? 'default' : 'outline'}
                onClick={() => setSplitMode('pages')}
              >
                Split by Pages
              </Button>
              <Button
                variant={splitMode === 'range' ? 'default' : 'outline'}
                onClick={() => setSplitMode('range')}
              >
                Extract Range
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {splitMode === 'pages' ? 'Pages (e.g., 1,3,5-7)' : 'Page Range (e.g., 1-5)'}
              </label>
              <input
                type="text"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                placeholder={splitMode === 'pages' ? '1,3,5-7' : '1-5'}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <Button
              onClick={splitPdf}
              disabled={processing || !pageInput}
              className="w-full gap-2"
              size="lg"
            >
              <Scissors className="w-4 h-4" />
              {processing ? 'Splitting...' : 'Split PDF'}
            </Button>
          </div>
        </div>
      )}

      {result && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-4">
          <p className="font-semibold text-emerald-900 dark:text-emerald-100">
            PDF split successfully! ({result.length} files)
          </p>
          {result.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-white dark:bg-slate-800 p-3 rounded-lg">
              <span className="text-sm text-slate-700 dark:text-slate-300">{item.name}</span>
              <Button onClick={() => downloadPage(item)} size="sm" variant="outline" className="gap-2">
                <Download className="w-3 h-3" />
                Download
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
