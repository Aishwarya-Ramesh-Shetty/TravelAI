import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Upload as UploadIcon, FileText, X, Loader2 } from 'lucide-react';

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => setFiles([...files, ...acceptedFiles]);

  const removeFile = (name) => setFiles(files.filter(f => f.name !== name));

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    const formData = new FormData();
    files.forEach(file => formData.append('docs', file));

    try {
      const { data } = await api.post('/trips/upload', formData);
      navigate('/review', { state: { extractedData: data } });
    } catch (err) {
      toast.error('Failed to process documents');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'application/pdf': [], 'image/*': [] }
  });

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">Upload Travel Documents</h1>
      <p className="text-gray-500 mb-8">Upload your flight or hotel confirmations (PDF, PNG, JPG)</p>

      <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}>
        <input {...getInputProps()} />
        <UploadIcon size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-lg font-medium">Drag & drop files here, or click to select</p>
      </div>

      {files.length > 0 && (
        <div className="mt-8 space-y-3">
          {files.map(file => (
            <div key={file.name} className="flex items-center justify-between p-4 bg-white border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="text-indigo-600" />
                <span className="font-medium truncate max-w-xs">{file.name}</span>
              </div>
              <button onClick={() => removeFile(file.name)}><X size={18} className="text-red-500" /></button>
            </div>
          ))}
          <button 
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploading ? <><Loader2 className="animate-spin" /> Processing...</> : 'Process Documents'}
          </button>
        </div>
      )}
    </div>
  );
}