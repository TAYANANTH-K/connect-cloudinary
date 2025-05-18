import React, { useState } from 'react';

export default function UploadProfilePic() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      const text = await response.text();
      try {
        const data = JSON.parse(text);
        if (response.ok) {
          setMessage(`Upload successful! Image URL: ${data.url}`);
        } else {
          setMessage('Upload failed: ' + (data.message || 'Unknown error'));
        }
      } catch {
        setMessage('Upload failed: ' + text);
      }
    } catch (error) {
      setMessage('Upload error: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{textAlign: 'center'}}>
      <input type="file" onChange={handleChange} accept="image/*" />
      <br /><br />
      <button type="submit">Upload</button>
      <p>{message}</p>
    </form>
  );
}
