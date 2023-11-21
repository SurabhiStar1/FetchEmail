// EmailExtractor.js
import React, { useState } from 'react';
const BackendUrl = process.env.BackendUrl

const EmailExtractor = () => {
  const [startIndex, setStartIndex] = useState('');
  const [endIndex, setEndIndex] = useState('');
  const [url, seturl] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileNameDown, setFileNameDown] = useState('');
  const [fileNameDel, setFileNameDel] = useState('');

  const handleFetchEmails = async (e) => {
    e.preventDefault();
  
    try {
      let body = {
        startIndex: startIndex,
        endIndex: endIndex,
        url: url
      }
      fetch(`${BackendUrl}/api/fetch-emails`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          'startIndex': startIndex,
          'endIndex': endIndex,
          'url': url,
          "fileName": fileName
        })
      })
        .then(response => {
          console.log("response", response);
          return response.json()
        }).then(data => {
          console.log(data);
        })
      console.log('All emails are extracted from the URL successfully');
    } catch (error) {
      console.error('Error fetching emails:', error.message);
      // Handle error, display error message, or take appropriate action
    }
  };

  const handleDownloadFile = () => {
    window.open(`${BackendUrl}/api/download/${fileNameDown}`, '_blank');
  };

  const handleDeleteFile = () => {
    window.open(`${BackendUrl}/api/delete/${fileNameDel}`, '_blank');
  };
console.log(fileNameDel);

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
        <div className="mb-3">
          <label htmlFor="fileName" className="form-label">
            fileName
          </label>
          <input
            type="text"
            className="form-control"
            id="fileName"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <br />

      <form onSubmit={(e) => {e.preventDefault();handleDownloadFile();}}>
        <div className="mb-3">
          <label htmlFor="fileNameDown" className="form-label">
          fileNameDown
          </label>
          <input
            type="text"
            className="form-control"
            id="fileNameDown"
            value={fileNameDown}
            onChange={(e) => setFileNameDown(e.target.value)}
          />
        </div>
        <button className="btn btn-success" >
          Download
        </button>
      </form>
      <br />

      <form onSubmit={(e) => {e.preventDefault();handleDeleteFile();}}>
        <div className="mb-3">
          <label htmlFor="fileNameDel" className="form-label">
          fileNameDelete
          </label>
          <input
            type="text"
            className="form-control"
            id="fileNameDel"
            value={fileNameDel}
            onChange={(e) => {setFileNameDel(e.target.value)}}
          />
        </div>
        <button className="btn btn-danger ml-2">
          Delete
        </button>
      </form>
    </div>
  );
};

export default EmailExtractor;
