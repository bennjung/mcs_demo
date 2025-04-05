'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function CodeNFTPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewCode, setPreviewCode] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewCode(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="code-nft-container">
      <div className="code-nft-header">
        <div className="header-logo">
          <div className="logo-icon">
            <Image src="/images/marketplace-icon.svg" alt="Logo" width={40} height={40} />
          </div>
          <div className="header-text">
            <h1>Code NFT Generator</h1>
            <h2 className="title-with-underline">
              Turn Your Code Into Digital Art
            </h2>
          </div>
        </div>
        <div className="header-description">
          <p>
            Transform your code into unique NFT artwork. Upload your code file and
            create a beautiful, one-of-a-kind digital asset that represents your
            work.
          </p>
        </div>
      </div>

      <div className="code-nft-main">
        <div className="upload-section">
          <div className="upload-container">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.cs,.go,.rb,.php"
              className="file-input"
              id="file-input"
            />
            <label htmlFor="file-input" className="upload-label">
              <Image 
                src="/images/upload.svg" 
                alt="Upload" 
                width={24} 
                height={24} 
              />
              <span>Choose a file or drag it here</span>
            </label>
          </div>
          {selectedFile && (
            <div className="file-info">
              <span className="file-name">{selectedFile.name}</span>
              <span className="file-size">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </span>
            </div>
          )}
        </div>

        {previewCode && (
          <div className="preview-section">
            <h3>Code Preview</h3>
            <pre className="code-preview">
              <code>{previewCode}</code>
            </pre>
          </div>
        )}

        <div className="generate-section">
          <button 
            className="generate-button"
            disabled={!selectedFile}
          >
            Generate NFT
            <Image 
              src="/images/arrow-right.svg" 
              alt="Generate" 
              width={20} 
              height={20} 
            />
          </button>
        </div>
      </div>
    </div>
  );
} 