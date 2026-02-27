import CompressPdfTool from './CompressPdfTool';
import JpgToPdfTool from './JpgToPdfTool';
import SplitPdfTool from './SplitPdfTool';
import MergePdfTool from './MergePdfTool';
import RotatePdfTool from './RotatePdfTool';
import ProtectPdfTool from './ProtectPdfTool';
import UnlockPdfTool from './UnlockPdfTool';

export const ToolComponentMap: Record<string, React.ComponentType> = {
  'compress-pdf': CompressPdfTool,
  'jpg-to-pdf': JpgToPdfTool,
  'split-pdf': SplitPdfTool,
  'merge-pdf': MergePdfTool,
  'rotate-pdf': RotatePdfTool,
  'protect-pdf': ProtectPdfTool,
  'unlock-pdf': UnlockPdfTool,
  
  // Organize PDF
  'remove-pages': SplitPdfTool, // Similar functionality
  'extract-pages': SplitPdfTool, // Similar functionality
  'organize-pdf': MergePdfTool, // Similar functionality
  'scan-to-pdf': JpgToPdfTool, // Similar functionality
  
  // Optimize PDF
  'repair-pdf': CompressPdfTool, // Placeholder
  'ocr-pdf': CompressPdfTool, // Placeholder
  
  // Convert to PDF
  'word-to-pdf': JpgToPdfTool, // Similar upload/convert flow
  'ppt-to-pdf': JpgToPdfTool,
  'excel-to-pdf': JpgToPdfTool,
  'html-to-pdf': JpgToPdfTool,
  
  // Convert from PDF
  'pdf-to-jpg': SplitPdfTool, // Similar extraction flow
  'pdf-to-word': SplitPdfTool,
  'pdf-to-ppt': SplitPdfTool,
  'pdf-to-excel': SplitPdfTool,
  'pdf-to-pdfa': CompressPdfTool,
  
  // Edit PDF
  'add-page-numbers': RotatePdfTool, // Similar edit flow
  'add-watermark': RotatePdfTool,
  'crop-pdf': RotatePdfTool,
  'edit-pdf': RotatePdfTool,
  
  // Security
  'sign-pdf': ProtectPdfTool, // Similar security flow
  'redact-pdf': ProtectPdfTool,
  'compare-pdf': MergePdfTool, // Similar multi-file flow
};
