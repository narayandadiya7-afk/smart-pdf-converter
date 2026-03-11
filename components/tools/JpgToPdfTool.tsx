'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, X, Download, Image as ImageIcon, FileText, CheckCircle2, RotateCw, ArrowRight, ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageFile {
  file: File;
  id: string;
  preview: string;
  rotation: number;
}

export default function JpgToPdfTool() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [showImageManager, setShowImageManager] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [showDownloadSection, setShowDownloadSection] = useState(false);
  const downloadSectionRef = useRef<HTMLDivElement>(null);
  
  // PDF Options
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [pageSize, setPageSize] = useState<'fit' | 'a4' | 'letter'>('fit');
  const [margin, setMargin] = useState<'none' | 'small' | 'big'>('none');
  const [mergeIntoOne, setMergeIntoOne] = useState(true);

  // Auto-scroll to download section after conversion
  useEffect(() => {
    if (pdfUrl && downloadSectionRef.current) {
      setShowDownloadSection(true);
      setTimeout(() => {
        downloadSectionRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 300);
    }
  }, [pdfUrl]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const imageFiles = selectedFiles.filter(f => f.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => [...prev, {
          file,
          id: Math.random().toString(36).substr(2, 9),
          preview: e.target?.result as string,
          rotation: 0
        }]);
      };
      reader.readAsDataURL(file);
    });

    if (imageFiles.length > 0) {
      setShowImageManager(true);
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
    const imageFiles = droppedFiles.filter(f => f.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => [...prev, {
          file,
          id: Math.random().toString(36).substr(2, 9),
          preview: e.target?.result as string,
          rotation: 0
        }]);
      };
      reader.readAsDataURL(file);
    });

    if (imageFiles.length > 0) {
      setShowImageManager(true);
    }
  };

  const removeImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  const rotateImage = (id: string) => {
    setImages(images.map(img => 
      img.id === id 
        ? { ...img, rotation: (img.rotation + 90) % 360 }
        : img
    ));
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...images];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < images.length) {
      [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
      setImages(newImages);
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOverImage = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeaveImage = () => {
    setDragOverIndex(null);
  };

  const handleDropImage = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    
    // Remove from old position
    newImages.splice(draggedIndex, 1);
    // Insert at new position
    newImages.splice(dropIndex, 0, draggedImage);
    
    setImages(newImages);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Helper function to process and embed image with proper quality
  const processAndEmbedImage = async (img: ImageFile, pdfDoc: any) => {
    const arrayBuffer = await img.file.arrayBuffer();
    let image;
    let actualWidth = 0;
    let actualHeight = 0;
    
    // Get actual image dimensions
    const tempImg = new Image();
    await new Promise((resolve, reject) => {
      tempImg.onload = () => {
        actualWidth = tempImg.width;
        actualHeight = tempImg.height;
        resolve(null);
      };
      tempImg.onerror = reject;
      tempImg.src = img.preview;
    });
    
    // Apply rotation if needed
    if (img.rotation !== 0) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size based on rotation
      if (img.rotation === 90 || img.rotation === 270) {
        canvas.width = actualHeight;
        canvas.height = actualWidth;
      } else {
        canvas.width = actualWidth;
        canvas.height = actualHeight;
      }
      
      ctx?.translate(canvas.width / 2, canvas.height / 2);
      ctx?.rotate((img.rotation * Math.PI) / 180);
      ctx?.drawImage(tempImg, -actualWidth / 2, -actualHeight / 2);
      
      const rotatedBlob = await new Promise<Blob>((resolve) => {
        const format = img.file.type.startsWith('image/jp') ? 'image/jpeg' : 'image/png';
        canvas.toBlob((blob) => resolve(blob!), format, 1.0);
      });
      
      const rotatedBuffer = await rotatedBlob.arrayBuffer();
      if (img.file.type.startsWith('image/jp')) {
        image = await pdfDoc.embedJpg(rotatedBuffer);
      } else {
        image = await pdfDoc.embedPng(rotatedBuffer);
      }
      
      // Update dimensions after rotation
      if (img.rotation === 90 || img.rotation === 270) {
        [actualWidth, actualHeight] = [actualHeight, actualWidth];
      }
    } else {
      // Handle SVG files
      if (img.file.type === 'image/svg+xml') {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = actualWidth || 800;
        canvas.height = actualHeight || 600;
        ctx?.drawImage(tempImg, 0, 0);
        
        const pngBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => resolve(blob!), 'image/png', 1.0);
        });
        
        const pngBuffer = await pngBlob.arrayBuffer();
        image = await pdfDoc.embedPng(pngBuffer);
      } else if (img.file.type === 'image/png' || img.file.type === 'image/webp') {
        image = await pdfDoc.embedPng(arrayBuffer);
      } else {
        image = await pdfDoc.embedJpg(arrayBuffer);
      }
    }
    
    return { image, actualWidth, actualHeight };
  };

  const convertToPdf = async () => {
    if (images.length === 0) return;
    
    setConverting(true);
    
    try {
      const { PDFDocument } = await import('pdf-lib');
      
      if (mergeIntoOne) {
        // Create single PDF with all images
        const pdfDoc = await PDFDocument.create();
        
        // Define page sizes in points (1 point = 1/72 inch)
        const pageSizes = {
          a4: { width: 595, height: 842 },
          letter: { width: 612, height: 792 }
        };
        
        // Define margins in points
        const margins = {
          none: 0,
          small: 20,
          big: 40
        };
        
        const marginSize = margins[margin];
        
        for (const img of images) {
          const { image, actualWidth, actualHeight } = await processAndEmbedImage(img, pdfDoc);
          
          // Convert pixels to points (72 DPI for PDF, 96 DPI for screen)
          const imgWidthPt = (actualWidth * 72) / 96;
          const imgHeightPt = (actualHeight * 72) / 96;
          
          let pageWidth, pageHeight;
          
          if (pageSize === 'fit') {
            // Use actual image dimensions in points
            pageWidth = imgWidthPt + (marginSize * 2);
            pageHeight = imgHeightPt + (marginSize * 2);
          } else {
            // Use standard page size
            const size = pageSizes[pageSize];
            if (orientation === 'portrait') {
              pageWidth = size.width;
              pageHeight = size.height;
            } else {
              pageWidth = size.height;
              pageHeight = size.width;
            }
          }
          
          const page = pdfDoc.addPage([pageWidth, pageHeight]);
          
          // Calculate available space with margins
          const availableWidth = pageWidth - (marginSize * 2);
          const availableHeight = pageHeight - (marginSize * 2);
          
          let finalWidth = imgWidthPt;
          let finalHeight = imgHeightPt;
          
          if (pageSize !== 'fit') {
            // Scale image to fit within available space while maintaining aspect ratio
            const widthRatio = availableWidth / imgWidthPt;
            const heightRatio = availableHeight / imgHeightPt;
            const scale = Math.min(widthRatio, heightRatio);
            
            finalWidth = imgWidthPt * scale;
            finalHeight = imgHeightPt * scale;
          }
          
          // Center image on page with margins
          const x = marginSize + (availableWidth - finalWidth) / 2;
          const y = marginSize + (availableHeight - finalHeight) / 2;
          
          page.drawImage(image, {
            x,
            y,
            width: finalWidth,
            height: finalHeight,
          });
        }
        
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        setPdfBlob(blob);
        setPdfUrl(url);
      } else {
        // Create individual PDFs and zip them
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();
        
        // Define page sizes in points
        const pageSizes = {
          a4: { width: 595, height: 842 },
          letter: { width: 612, height: 792 }
        };
        
        // Define margins in points
        const margins = {
          none: 0,
          small: 20,
          big: 40
        };
        
        const marginSize = margins[margin];
        
        for (let i = 0; i < images.length; i++) {
          const img = images[i];
          const pdfDoc = await PDFDocument.create();
          
          const { image, actualWidth, actualHeight } = await processAndEmbedImage(img, pdfDoc);
          
          // Convert pixels to points (72 DPI for PDF, 96 DPI for screen)
          const imgWidthPt = (actualWidth * 72) / 96;
          const imgHeightPt = (actualHeight * 72) / 96;
          
          let pageWidth, pageHeight;
          
          if (pageSize === 'fit') {
            pageWidth = imgWidthPt + (marginSize * 2);
            pageHeight = imgHeightPt + (marginSize * 2);
          } else {
            const size = pageSizes[pageSize];
            if (orientation === 'portrait') {
              pageWidth = size.width;
              pageHeight = size.height;
            } else {
              pageWidth = size.height;
              pageHeight = size.width;
            }
          }
          
          const page = pdfDoc.addPage([pageWidth, pageHeight]);
          
          const availableWidth = pageWidth - (marginSize * 2);
          const availableHeight = pageHeight - (marginSize * 2);
          
          let finalWidth = imgWidthPt;
          let finalHeight = imgHeightPt;
          
          if (pageSize !== 'fit') {
            const widthRatio = availableWidth / imgWidthPt;
            const heightRatio = availableHeight / imgHeightPt;
            const scale = Math.min(widthRatio, heightRatio);
            
            finalWidth = imgWidthPt * scale;
            finalHeight = imgHeightPt * scale;
          }
          
          const x = marginSize + (availableWidth - finalWidth) / 2;
          const y = marginSize + (availableHeight - finalHeight) / 2;
          
          page.drawImage(image, {
            x,
            y,
            width: finalWidth,
            height: finalHeight,
          });
          
          const pdfBytes = await pdfDoc.save();
          
          // Get filename without extension
          const fileName = img.file.name.replace(/\.[^/.]+$/, '');
          zip.file(`${fileName}.pdf`, pdfBytes);
        }
        
        // Generate ZIP file
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);
        
        setPdfBlob(zipBlob);
        setPdfUrl(url);
      }
    } catch (error) {
      console.error('Error converting to PDF:', error);
      alert('Failed to convert images to PDF. Please try again.');
    } finally {
      setConverting(false);
    }
  };

  const downloadPdf = () => {
    if (!pdfUrl) return;
    
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = mergeIntoOne ? 'converted-images.pdf' : 'converted-images.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAll = () => {
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
    setPdfUrl(null);
    setPdfBlob(null);
    setShowImageManager(false);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
  };

  const addMoreImages = () => {
    document.getElementById('image-upload-more')?.click();
  };

  const handleAddMoreImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const imageFiles = selectedFiles.filter(f => f.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => [...prev, {
          file,
          id: Math.random().toString(36).substr(2, 9),
          preview: e.target?.result as string,
          rotation: 0
        }]);
      };
      reader.readAsDataURL(file);
    });

    // Reset PDF state when adding more images
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
      setPdfBlob(null);
    }
  };

  const totalSize = images.reduce((acc, img) => acc + img.file.size, 0);

  // Show upload zone if no images or not in image manager view
  if (!showImageManager || images.length === 0) {
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
            id="image-upload"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl shadow-lg">
                <ImageIcon className="w-12 h-12 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Drop images here
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              or click to browse from your device
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              JPG, PNG, GIF, SVG and more supported
            </p>
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Image Manager View */}
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Selected Images
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {images.length} image{images.length > 1 ? 's' : ''} • {(totalSize / 1024 / 1024).toFixed(2)} MB total
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={addMoreImages}
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

        {/* Convert Button or Success Message - Top Position */}
        {!pdfUrl ? (
          <div className="space-y-6">
            {/* PDF Options */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">PDF Options</h4>
              
              {/* Page Orientation */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Page Orientation
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setOrientation('portrait')}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      orientation === 'portrait'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-8 h-12 rounded border-2 ${
                        orientation === 'portrait' ? 'border-emerald-500' : 'border-slate-400'
                      }`}></div>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">Portrait</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setOrientation('landscape')}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      orientation === 'landscape'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-12 h-8 rounded border-2 ${
                        orientation === 'landscape' ? 'border-emerald-500' : 'border-slate-400'
                      }`}></div>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">Landscape</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Page Size */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Page Size
                </label>
                <div className="relative">
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value as 'fit' | 'a4' | 'letter')}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors appearance-none pr-10 cursor-pointer"
                  >
                    <option value="fit">Fit (Same page size as image)</option>
                    <option value="a4">A4 (297x210 mm)</option>
                    <option value="letter">US Letter (215x279.4 mm)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Margin */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Margin
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setMargin('none')}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      margin === 'none'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon className={`w-6 h-6 ${margin === 'none' ? 'text-emerald-500' : 'text-slate-400'}`} />
                      <span className="text-sm font-medium text-slate-900 dark:text-white">No margin</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setMargin('small')}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      margin === 'small'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon className={`w-5 h-5 ${margin === 'small' ? 'text-emerald-500' : 'text-slate-400'}`} />
                      <span className="text-sm font-medium text-slate-900 dark:text-white">Small</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setMargin('big')}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      margin === 'big'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon className={`w-4 h-4 ${margin === 'big' ? 'text-emerald-500' : 'text-slate-400'}`} />
                      <span className="text-sm font-medium text-slate-900 dark:text-white">Big</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Merge Option Checkbox */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={mergeIntoOne}
                    onChange={(e) => setMergeIntoOne(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-6 h-6 border-2 border-slate-300 dark:border-slate-600 rounded-md peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all flex items-center justify-center">
                    {mergeIntoOne && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-base font-medium text-slate-900 dark:text-white">
                    Merge all images in one PDF file
                  </span>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {mergeIntoOne 
                      ? 'All images will be combined into a single PDF' 
                      : 'Each image will be converted to a separate PDF and zipped'}
                  </p>
                </div>
              </label>
            </div>

            {/* Convert Button */}
            <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-md">
              <Button
                onClick={convertToPdf}
                disabled={images.length === 0 || converting}
                className="group w-full h-14 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                size="lg"
              >
                {converting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Converting to PDF...
                  </>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    Convert to PDF
                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                    </span>
                  </span>
                )}
              </Button>
            </div>
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
                    {mergeIntoOne ? 'PDF Created Successfully!' : 'PDFs Created Successfully!'}
                  </h4>
                  <p className="text-emerald-700 dark:text-emerald-300 mb-6">
                    {mergeIntoOne 
                      ? `Your ${images.length} image${images.length > 1 ? 's have' : ' has'} been converted to PDF`
                      : `Your ${images.length} image${images.length > 1 ? 's have' : ' has'} been converted to individual PDFs and zipped`
                    }
                  </p>
                  <Button 
                    onClick={downloadPdf} 
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg hover:shadow-xl transition-all duration-200 h-12 px-8"
                    size="lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download {mergeIntoOne ? 'PDF' : 'ZIP'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <input
          type="file"
          id="image-upload-more"
          multiple
          accept="image/*"
          onChange={handleAddMoreImages}
          className="hidden"
        />

        {/* Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[680px] overflow-y-auto pr-2 pt-20 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-slate-100 dark:scrollbar-track-slate-800 scrollbar-thumb-rounded-full">
          {images.map((img, index) => (
            <div
              key={img.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOverImage(e, index)}
              onDragLeave={handleDragLeaveImage}
              onDrop={(e) => handleDropImage(e, index)}
              onDragEnd={handleDragEnd}
              className={`group relative bg-white dark:bg-slate-800 rounded-2xl border-2 transition-all duration-300 cursor-move ${
                draggedIndex === index 
                  ? 'opacity-50 scale-95' 
                  : dragOverIndex === index
                  ? 'border-emerald-500 scale-105 shadow-xl'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              {/* Tooltip - File Info */}
              <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:top-[-60px] transition-all duration-300 z-30 pointer-events-none">
                <div className="bg-slate-800 dark:bg-slate-700 text-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap text-sm font-medium">
                  {(img.file.size / 1024).toFixed(2)} KB - {img.file.name}
                  <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-800 dark:bg-slate-700 rotate-45"></div>
                </div>
              </div>

              {/* Image Container */}
              <div className="p-6 pt-16 relative">
                {/* Action Buttons - Above Image */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => rotateImage(img.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2.5 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 cursor-pointer"
                    title="Rotate 90°"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeImage(img.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 cursor-pointer"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="aspect-square relative overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                  <img
                    src={img.preview}
                    alt={img.file.name}
                    className="max-w-full max-h-full object-contain pointer-events-none"
                    style={{ transform: `rotate(${img.rotation}deg)` }}
                  />
                </div>
              </div>

              {/* Filename */}
              <div className="px-6 pb-6 pt-0">
                <p className="text-center text-slate-600 dark:text-slate-400 text-sm font-medium truncate">
                  {img.file.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
