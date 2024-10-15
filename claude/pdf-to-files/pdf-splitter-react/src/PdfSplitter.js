import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const PdfSplitter = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    }
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    }
  };

  const splitPDF = async () => {
    if (!file) {
      alert('Please select a PDF file first.');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const numberOfPages = pdfDoc.getPageCount();

      const zip = new JSZip();

      for (let i = 0; i < numberOfPages; i++) {
        const newPdfDoc = await PDFDocument.create();
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
        newPdfDoc.addPage(copiedPage);

        const pdfBytes = await newPdfDoc.save();
        zip.file(`page_${i + 1}.pdf`, pdfBytes);

        setProgress(Math.round(((i + 1) / numberOfPages) * 100));
      }

      const zipContent = await zip.generateAsync({ type: 'blob' });
      const originalFileName = file.name.replace('.pdf', '');
      saveAs(zipContent, `${originalFileName}_split.zip`);

      setIsProcessing(false);
      setProgress(100);
    } catch (error) {
      console.error('Error splitting PDF:', error);
      setIsProcessing(false);
      setProgress(0);
      alert('An error occurred while splitting the PDF. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-900">
      <div className="w-96 p-6 bg-green-800 rounded-lg shadow-lg">
        <div
          className="border-4 border-dashed border-green-600 rounded-lg p-8 mb-4 text-center cursor-pointer"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <input
            type="file"
            id="fileInput"
            accept=".pdf"
            className="hidden"
            onChange={handleFileInput}
          />
          <Upload className="mx-auto mb-2 text-green-400" size={48} />
          <p className="text-green-200">
            {file ? file.name : "Click or drag PDF file here for splitting into multiple files"}
          </p>
        </div>
        {isProcessing && (
          <div className="mb-4">
            <div className="w-full bg-green-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-green-200 text-center mt-2">{progress}% Completed</p>
          </div>
        )}
        <button
          className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 disabled:bg-green-400 disabled:cursor-not-allowed"
          onClick={splitPDF}
          disabled={!file || isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Convert'}
        </button>
      </div>
    </div>
  );
};

export default PdfSplitter;
