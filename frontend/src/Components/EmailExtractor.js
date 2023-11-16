// EmailExtractor.js
import React, { useState } from 'react';
import axios from 'axios';

const EmailExtractor = () => {
  const [startIndex, setStartIndex] = useState('');
  const [endIndex, setEndIndex] = useState('');
  const [url, seturl] = useState('');
  const [fileContent, setFileContent] = useState('');

  const handleFetchEmails = async (e) => {
    e.preventDefault();
  
    try {
      // const response = await fetch('http://localhost:5000/api/extract/fetch-emails', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ startIndex, endIndex, url }),
      // });
      let body = {
        startIndex:startIndex,
        endIndex:endIndex,
        url:url
      }
      const response = await axios.post('http://localhost:5000/api/extract/fetch-emails', body);
            const result = response.data;
            console.log(result);

      if (!response.ok) {
        throw new Error('Failed to fetch emails');
      }
  
      const data = await response.json();
      setFileContent(data.emails);
  
      // Display success message
      console.log('All emails are extracted from the URL successfully');
    } catch (error) {
      console.error('Error fetching emails:', error.message);
      // Handle error, display error message, or take appropriate action
    }
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
            URL
          </label>
          <input
            type="text"
            className="form-control"
            id="userWithVariables"
            value={url}
            onChange={(e) => seturl(e.target.value)}
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
