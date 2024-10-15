import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Upload } from 'lucide-react';
import * as Progress from '@radix-ui/react-progress';

const ExcelSplitter = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setProgress(0);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile(event.dataTransfer.files[0]);
    setProgress(0);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const splitExcelFile = async () => {
    if (!file) return;

    setLoading(true);
    setProgress(0);
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const zip = new JSZip();
      const totalSheets = workbook.SheetNames.length;

      for (let i = 0; i < totalSheets; i++) {
        const sheetName = workbook.SheetNames[i];
        const sheet = workbook.Sheets[sheetName];
        const newWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(newWorkbook, sheet, sheetName);

        const excelBuffer = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });
        zip.file(`${sheetName}.xlsx`, excelBuffer);

        setProgress(((i + 1) / totalSheets) * 90); // Up to 90% for processing sheets
      }

      const zipContent = await zip.generateAsync({
        type: 'blob',
        onUpdate: (metadata) => {
          setProgress(90 + (metadata.percent * 0.1)); // Last 10% for zip creation
        }
      });

      saveAs(zipContent, 'split_excel_files.zip');
      setLoading(false);
      setProgress(100);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white p-4">
      <div
        className="border-2 border-dashed border-blue-300 rounded-lg p-8 mb-4 cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <input
          id="fileInput"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex flex-col items-center">
          <Upload size={48} className="mb-2" />
          <p>Click or drag Excel file here for splitting into multiple files</p>
        </div>
      </div>
      {file && (
        <p className="mb-4">Selected file: {file.name}</p>
      )}
      <button
        onClick={splitExcelFile}
        disabled={!file || loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mb-4"
      >
        {loading ? 'Converting...' : 'Convert'}
      </button>
      {loading && (
        <Progress.Root
          className="relative overflow-hidden bg-blue-300 rounded-full w-56 h-6"
          style={{
            transform: 'translateZ(0)',
          }}
          value={progress}
        >
          <Progress.Indicator
            className="bg-blue-500 w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
            style={{ transform: `translateX(-${100 - progress}%)` }}
          />
        </Progress.Root>
      )}
    </div>
  );
};

export default ExcelSplitter;
