export interface Tool {
  id: string;
  title: string;
  description: string;
  category:
    | "organize"
    | "optimize"
    | "convert"
    | "edit"
    | "security";
  slug: string;
  icon: string;
  color: string;
}

export const TOOLS: Tool[] = [
  // ORGANIZE PDF
  {
    id: "merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDF files into one single document",
    category: "organize",
    slug: "merge-pdf",
    color: "from-blue-500 to-blue-600",
    icon: "MergeCellsOutlined",
  },
  {
    id: "split-pdf",
    title: "Split PDF",
    description: "Separate pages from a PDF into individual documents",
    category: "organize",
    slug: "split-pdf",
    icon: "ScissorOutlined",
    color: "from-rose-500 to-rose-600",
  },
  {
    id: "remove-pages",
    title: "Remove Pages",
    description: "Delete unwanted pages from your PDF file",
    category: "organize",
    slug: "remove-pages",
    icon: "DeleteOutlined",
    color: "from-red-500 to-red-600",
  },
  {
    id: "extract-pages",
    title: "Extract Pages",
    description: "Extract specific pages from a PDF document",
    category: "organize",
    slug: "extract-pages",
    icon: "ExportOutlined",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    id: "organize-pdf",
    title: "Organize PDF",
    description: "Reorder and reorganize pages in your PDF",
    category: "organize",
    slug: "organize-pdf",
    icon: "AppstoreOutlined",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    id: "scan-to-pdf",
    title: "Scan to PDF",
    description: "Convert scanned images into a searchable PDF",
    category: "organize",
    slug: "scan-to-pdf",
    icon: "ScanOutlined",
    color: "from-teal-500 to-teal-600",
  },

  // OPTIMIZE PDF
  {
    id: "compress-pdf",
    title: "Compress PDF",
    description: "Reduce file size while maintaining quality",
    category: "optimize",
    slug: "compress-pdf",
    icon: "CompressOutlined",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "repair-pdf",
    title: "Repair PDF",
    description: "Fix corrupted or damaged PDF files",
    category: "optimize",
    slug: "repair-pdf",
    icon: "ToolOutlined",
    color: "from-amber-500 to-amber-600",
  },
  {
    id: "ocr-pdf",
    title: "OCR PDF",
    description: "Extract text from scanned PDFs using OCR",
    category: "optimize",
    slug: "ocr-pdf",
    icon: "FileTextOutlined",
    color: "from-emerald-500 to-emerald-600",
  },

  // CONVERT TO PDF
  {
    id: "jpg-to-pdf",
    title: "JPG to PDF",
    description: "Convert JPG images to PDF format",
    category: "convert",
    slug: "jpg-to-pdf",
    icon: "FileImageOutlined",
    color: "from-pink-500 to-pink-600",
  },
  {
    id: "word-to-pdf",
    title: "Word to PDF",
    description: "Convert Word documents to PDF",
    category: "convert",
    slug: "word-to-pdf",
    icon: "FileWordOutlined",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "ppt-to-pdf",
    title: "PowerPoint to PDF",
    description: "Convert PowerPoint presentations to PDF",
    category: "convert",
    slug: "ppt-to-pdf",
    icon: "FilePptOutlined",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "excel-to-pdf",
    title: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF",
    category: "convert",
    slug: "excel-to-pdf",
    icon: "FileExcelOutlined",
    color: "from-green-500 to-green-600",
  },
  {
    id: "html-to-pdf",
    title: "HTML to PDF",
    description: "Convert HTML webpages to PDF documents",
    category: "convert",
    slug: "html-to-pdf",
    icon: "Html5Outlined",
    color: "from-violet-500 to-violet-600",
  },

  // CONVERT FROM PDF
  {
    id: "pdf-to-jpg",
    title: "PDF to JPG",
    description: "Convert PDF pages to JPG images",
    category: "convert",
    slug: "pdf-to-jpg",
    icon: "FileImageOutlined",
    color: "from-pink-500 to-pink-600",
  },
  {
    id: "pdf-to-word",
    title: "PDF to Word",
    description: "Convert PDF to editable Word format",
    category: "convert",
    slug: "pdf-to-word",
    icon: "FileWordOutlined",
    color: "from-blue-500 to-blue-600",
    // color: "from-orange-500 to-orange-600",
  },
  {
    id: "pdf-to-ppt",
    title: "PDF to PowerPoint",
    description: "Convert PDF to PowerPoint presentation",
    category: "convert",
    slug: "pdf-to-ppt",
    icon: "FilePptOutlined",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "pdf-to-excel",
    title: "PDF to Excel",
    description: "Convert PDF to Excel spreadsheet",
    category: "convert",
    slug: "pdf-to-excel",
    icon: "FileExcelOutlined",
    color: "from-green-500 to-green-600",
  },
  {
    id: "pdf-to-pdfa",
    title: "PDF to PDF/A",
    description: "Convert to PDF/A archival format",
    category: "convert",
    slug: "pdf-to-pdfa",
    icon: "FilePdfOutlined",
    color: "from-slate-500 to-slate-600",
  },

  // EDIT PDF
  {
    id: "rotate-pdf",
    title: "Rotate PDF",
    description: "Rotate PDF pages to correct orientation",
    category: "edit",
    slug: "rotate-pdf",
    icon: "RotateRightOutlined",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    id: "add-page-numbers",
    title: "Add Page Numbers",
    description: "Add page numbering to your PDF",
    category: "edit",
    slug: "add-page-numbers",
    icon: "OrderedListOutlined",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    id: "add-watermark",
    title: "Add Watermark",
    description: "Add text or image watermarks to PDFs",
    category: "edit",
    slug: "add-watermark",
    icon: "CopyrightOutlined",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "crop-pdf",
    title: "Crop PDF",
    description: "Crop and trim PDF pages",
    category: "edit",
    slug: "crop-pdf",
    icon: "ScissorOutlined",
    color: "from-teal-500 to-teal-600",
  },
  {
    id: "edit-pdf",
    title: "Edit PDF",
    description: "Edit text and images in your PDF",
    category: "edit",
    slug: "edit-pdf",
    icon: "EditOutlined",
    color: "from-purple-500 to-purple-600",
  },

  // PDF SECURITY
  {
    id: "unlock-pdf",
    title: "Unlock PDF",
    description: "Remove password protection from PDFs",
    category: "security",
    slug: "unlock-pdf",
    icon: "UnlockOutlined",
    color: "from-amber-500 to-amber-600",
  },
  {
    id: "protect-pdf",
    title: "Protect PDF",
    description: "Add password protection to your PDF",
    category: "security",
    slug: "protect-pdf",
    icon: "LockOutlined",
    color: "from-slate-600 to-slate-700",
  },
 {
  id: "sign-pdf",
  title: "Sign PDF",
  description: "Digitally sign PDF documents",
  category: "security",
  slug: "sign-pdf",
  icon: "FormOutlined",
  color: "from-[#B45253] to-[#B45253]",
},
  {
    id: "redact-pdf",
    title: "Redact PDF",
    description: "Permanently remove sensitive content",
    category: "security",
    slug: "redact-pdf",
    icon: "EyeInvisibleOutlined",
    color: "from-red-500 to-red-600",
  },
  {
    id: "compare-pdf",
    title: "Compare PDF",
    description: "Compare two PDF documents side by side",
    category: "security",
    slug: "compare-pdf",
    icon: "DiffOutlined",
    color: "from-violet-500 to-violet-600",
  },
];

export const CATEGORIES = [
  {
    id: "organize",
    title: "Organize PDF",
    description: "Merge, split, and organize your PDFs",
    icon: "OrderedListOutlined",
  },
  {
    id: "optimize",
    title: "Optimize PDF",
    description: "Compress and improve your PDFs",
    icon: "CompressOutlined",
  },
  {
    id: "convert",
    title: "Convert to PDF",
    description: "Convert other formats to PDF",
    icon: "FileImageOutlined",
  },
  {
    id: "convert",
    title: "Convert from PDF",
    description: "Convert PDF to other formats",
    icon: "FilePdfOutlined",
  },
  {
    id: "edit",
    title: "Edit PDF",
    description: "Edit and modify your PDFs",
    icon: "EditOutlined",
  },
  {
    id: "security",
    title: "PDF Security",
    description: "Protect and secure your PDFs",
    icon: "LockOutlined",
  },
];

export const getToolsByCategory = (category: string) => {
  return TOOLS.filter((tool) => tool.category === category);
};

export const getToolBySlug = (slug: string) => {
  return TOOLS.find((tool) => tool.slug === slug);
};