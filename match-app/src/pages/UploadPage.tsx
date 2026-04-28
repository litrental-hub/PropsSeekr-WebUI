import React, { useState, useRef } from 'react';
import { FileUp, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';
import { matchService } from '../services/api';

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith('.txt')) {
        setFile(selectedFile);
        setStatus('idle');
        setMessage('');
      } else {
        setStatus('error');
        setMessage('Only .txt files are allowed');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus('loading');
    try {
      await matchService.uploadFile(file);
      setStatus('success');
      setMessage(`Successfully uploaded ${file.name}`);
      setFile(null);
    } catch (err: any) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Failed to upload file. Please try again.');
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Upload Data</h1>
            <p className="text-slate-500 mt-1">Select a .txt file containing match records to process.</p>
          </div>

          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all ${
              file ? 'border-primary-500 bg-primary-50/30' : 'border-slate-300 hover:border-primary-400 hover:bg-slate-50'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".txt"
              className="hidden"
            />
            
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              file ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-400'
            }`}>
              <FileUp className="w-8 h-8" />
            </div>
            
            <p className="text-lg font-medium text-slate-900">
              {file ? file.name : 'Click to select or drag and drop'}
            </p>
            <p className="text-sm text-slate-500 mt-1">Support only .txt files</p>

            {file && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="mt-4 p-1 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="mt-8 flex items-center justify-end">
            <button
              disabled={!file || status === 'loading'}
              onClick={handleUpload}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold text-white shadow-lg transition-all ${
                !file || status === 'loading'
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700 active:transform active:scale-95'
              }`}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload File'
              )}
            </button>
          </div>

          {status === 'success' && (
            <div className="mt-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start space-x-3 text-emerald-800 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-600" />
              <span className="font-medium">{message}</span>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-6 p-4 rounded-lg bg-rose-50 border border-rose-200 flex items-start space-x-3 text-rose-800 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 mt-0.5 text-rose-600" />
              <span className="font-medium">{message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
