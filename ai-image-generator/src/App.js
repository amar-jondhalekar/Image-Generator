import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const generateImage = async () => {
    setLoading(true);
    setError('');
    setImage(null);

    try {
      const formData = new FormData();
      formData.append('text', prompt); // Send the text directly like in the cURL example

      const response = await axios.post(
        'https://api.deepai.org/api/text2img',
        formData,
        {
          headers: {
            'api-key': 'a0ec4ea4-6cb0-44af-82b4-fb45dc8d4322', // Your API key
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setImage(response.data.output_url);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to generate image. Please check your API key or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>AI Image Generator</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt"
      />
      <button onClick={generateImage}>Generate Image</button>
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {image && <img src={image} alt="Generated AI Image" />}
    </div>
  );
}

export default App;
