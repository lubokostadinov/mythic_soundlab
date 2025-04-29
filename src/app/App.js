import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const SAMPLE_PACK_URL = 'https://grxandvmphfzepoqtbtp.supabase.co/storage/v1/object/sign/sample-packs/fx.rar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2I5OTVlYTUyLTVhZTEtNDBjMy04ZmNlLTY1ZTY5MTE2NDY2MyJ9.eyJ1cmwiOiJzYW1wbGUtcGFja3MvZngucmFyIiwiaWF0IjoxNzQ1ODY0Nzk5LCJleHAiOjE3Nzc0MDA3OTl9.tGW-yfnbjZUM2-_vFpbyQ81W7NO36-Umq5x9FsWufpo'; // Replace with your actual file URL

function App() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    // Save to Supabase
    const { error } = await supabase
      .from('emails')
      .insert([{ email, country }]);
    if (error) {
      setError('There was an error. Please try again.');
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 32, textAlign: 'center' }}>
      <h1>Mythic Soundlab</h1>
      <h2>Free Sample Pack: Mythic Essentials Vol. 1</h2>
      <audio controls style={{ width: '100%' }}>
        <source src="https://grxandvmphfzepoqtbtp.supabase.co/storage/v1/object/sign/sample-packs/sample%20pack%20demo.wav?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2I5OTVlYTUyLTVhZTEtNDBjMy04ZmNlLTY1ZTY5MTE2NDY2MyJ9.eyJ1cmwiOiJzYW1wbGUtcGFja3Mvc2FtcGxlIHBhY2sgZGVtby53YXYiLCJpYXQiOjE3NDU4NjQ4NDgsImV4cCI6MTc3NzQwMDg0OH0.EoXxN9WaTv76rGowVDJ-I5E6RkNMe7u5zCmGcistEQg" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <p>Enter your email to get the free download:</p>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '80%', padding: 8, marginBottom: 8 }}
          /><br />
          <input
            type="text"
            placeholder="Country (optional)"
            value={country}
            onChange={e => setCountry(e.target.value)}
            style={{ width: '80%', padding: 8, marginBottom: 8 }}
          /><br />
          <button type="submit" style={{ padding: '8px 24px' }}>Get Download</button>
          {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        </form>
      ) : (
        <div>
          <h3>Thank you!</h3>
          <a href={SAMPLE_PACK_URL} download>
            <button style={{ padding: '8px 24px' }}>Download Sample Pack</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
