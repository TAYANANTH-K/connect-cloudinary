import React, { useState } from 'react';

function App() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      setMessage('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setUploadedUrl(data.url);
        setMessage('Image uploaded successfully!');
      } else {
        setMessage(`Upload failed: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Upload Profile Picture</h2>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
      {uploadedUrl && <img src={uploadedUrl} alt="Uploaded" width="200" />}
    </div>
  );
}

export default App;
