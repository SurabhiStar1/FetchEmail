// EmailExtractor.js
import React, { useState } from 'react';

const EmailExtractor = () => {
  const [startIndex, setStartIndex] = useState('');
  const [endIndex, setEndIndex] = useState('');
  const [userWithVariables, setUserWithVariables] = useState('');
  const [fileContent, setFileContent] = useState('');

  const handleFetchEmails = async (e) => {
    console.log('xyz,,,,,,,,');
    e.preventDefault();
    console.log('xyz,,,,,,,,');
    // Perform API call to fetch emails from the backend
    const response = await fetch('http://localhost:3001/fetch-emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ startIndex, endIndex, userWithVariables }),
    });
    
    const data = await response.json();
    setFileContent(data.emails);
  };

  const handleDownloadFile = () => {
    // Logic to trigger file download
    // You can use a library like FileSaver.js for this
  };

  const handleClearFile = () => {
    setFileContent('');
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleFetchEmails}>
        <div className="mb-3">
          <label htmlFor="startIndex" className="form-label">
            Start Index
          </label>
          <input
            type="text"
            className="form-control"
            id="startIndex"
            value={startIndex}
            onChange={(e) => setStartIndex(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="endIndex" className="form-label">
            End Index
          </label>
          <input
            type="text"
            className="form-control"
            id="endIndex"
            value={endIndex}
            onChange={(e) => setEndIndex(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="userWithVariables" className="form-label">
            User with Variables
          </label>
          <input
            type="text"
            className="form-control"
            id="userWithVariables"
            value={userWithVariables}
            onChange={(e) => setUserWithVariables(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <div className="mt-3">
        <button className="btn btn-success" onClick={handleDownloadFile}>
          Download
        </button>
        <button className="btn btn-danger ml-2" onClick={handleClearFile}>
          Clear
        </button>
      </div>

      <div className="mt-3">
        <pre>{fileContent}</pre>
      </div>
    </div>
  );
};

export default EmailExtractor;
