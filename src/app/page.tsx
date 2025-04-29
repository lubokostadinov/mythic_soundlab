'use client';
import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://grxandvmphfzepoqtbtp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyeGFuZHZtcGhmemVwb3F0YnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjI2MTgsImV4cCI6MjA2MTQzODYxOH0.xwm3whmK63tNvqyIQSLPHrgAqHU9r9LGcIeqquKloww'
);

const SAMPLE_PACK_URL = 'https://grxandvmphfzepoqtbtp.supabase.co/storage/v1/object/public/sample-packs//fx.rar';
const DEMO_AUDIO_URL = 'https://grxandvmphfzepoqtbtp.supabase.co/storage/v1/object/public/sample-packs//sample%20pack%20demo.wav';
const BACKGROUND_IMAGE_URL = 'https://grxandvmphfzepoqtbtp.supabase.co/storage/v1/object/public/sample-packs//background.png';
const COVER_IMAGE_URL = 'https://grxandvmphfzepoqtbtp.supabase.co/storage/v1/object/public/sample-packs//test_pack.png'; // Replace with your actual cover image URL

// Add this in your file, before your component
const orbitronFontUrl = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap';
const poppinsFontUrl = 'https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap';
const greatVibesFontUrl = 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap';

if (typeof window !== 'undefined') {
  const link = document.createElement('link');
  link.href = orbitronFontUrl;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
  link.href = poppinsFontUrl;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
  link.href = greatVibesFontUrl;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

export default function Home() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [currentView, setCurrentView] = useState('samples'); // 'samples', 'about'

  // Get user country automatically
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.country_name) {
          setCountry(data.country_name);
        }
      })
      .catch(() => setCountry(''));
  }, []);

  useEffect(() => {
    if (submitted && downloadRef.current) {
      downloadRef.current.click();
    }
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email) {
      setError('Please enter your email.');
      setLoading(false);
      return;
    }

    // Save email and country to Supabase
    const { error } = await supabase
      .from('emails')
      .insert([{ email, country }]);

    setLoading(false);

    if (error) {
      setError('There was an error saving your email. Please try again.');
    } else {
      setSubmitted(true);
    }
  };

  // Function to open Google Form in new tab
  const openFeedbackForm = () => {
    window.open('YOUR_GOOGLE_FORM_URL', '_blank');
  };

  const renderContent = () => {
    switch(currentView) {
      case 'about':
        return (
          <div style={{
            width: '90%',
            maxWidth: 1400,
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: 32,
            borderRadius: 16,
            boxShadow: '0 4px 32px rgba(0,0,0,0.3)',
          }}>
            <h2>About Mythic Soundlab</h2>
            <p>Your company description here...</p>
          </div>
        );
      case 'samples':
        return (
          <div style={{
            width: '90%',
            maxWidth: 1400,
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: 32,
            borderRadius: 16,
            boxShadow: '0 4px 32px rgba(0,0,0,0.3)',
            maxHeight: '80vh',
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              marginBottom: 32,
              fontSize: '28px'
            }}>
              Cinematic Atmospheres
            </h2>
            
            <div style={{
              display: 'flex',
              gap: '48px',
              alignItems: 'flex-start'
            }}>
              {/* Left side - Image and Audio Player */}
              <div style={{
                flexShrink: 0,
                width: '350px'
              }}>
                <img
                  src={COVER_IMAGE_URL}
                  alt="Sample Pack Cover"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 16,
                    marginBottom: 24,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.4)'
                  }}
                />
                <audio controls style={{ 
                  width: '100%', 
                  marginBottom: 16 
                }}>
                  <source src={DEMO_AUDIO_URL} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>

              {/* Right side - Description */}
              <div style={{
                flex: 1,
                textAlign: 'left',
                fontSize: '16px',
                lineHeight: '1.6',
                maxWidth: '800px'
              }}>
                <p style={{ marginBottom: '20px' }}>
                  Step into a world of depth, emotion, and tension with Cinematic Atmospheres, 
                  a meticulously crafted sample pack designed for film scoring, game soundtracks, 
                  ambient music, and atmospheric productions.
                </p>
                
                <p style={{ marginBottom: '20px' }}>
                  Every sound is professionally designed to spark creativity, offering both warmth 
                  and edge. Whether you're building an expansive movie score, an eerie game level, 
                  or a dreamy ambient track, Cinematic Atmospheres gives you the tools to shape 
                  unforgettable sonic worlds.
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    marginBottom: '12px',
                    color: '#F4F1EE' 
                  }}>
                    This collection features:
                  </h3>
                  <ul style={{ 
                    listStyle: 'none', 
                    padding: 0,
                    margin: 0,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px'
                  }}>
                    <li>• 20 ethereal pads</li>
                    <li>• 20 haunting drones</li>
                    <li>• 20 expressive synths</li>
                    <li>• 20 unique FX sounds</li>
                  </ul>
                </div>

                <div style={{
                  marginTop: '24px',
                  padding: '16px',
                  background: 'rgba(244, 241, 238, 0.1)',
                  borderRadius: '8px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  textAlign: 'center'
                }}>
                  <p style={{ margin: '0' }}>Format: High-quality WAV files</p>
                  <p style={{ margin: '0' }}>Royalty-Free: Yes</p>
                </div>

                {/* Email Form */}
                <div style={{ marginTop: '32px' }}>
                  {!submitted ? (
                    <form onSubmit={handleSubmit}>
                      <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={{
                          width: '60%',
                          padding: '8px 16px',
                          borderRadius: 25,
                          border: 'none',
                          marginRight: '12px'
                        }}
                      />
                      <button
                        type="submit"
                        style={{
                          padding: '8px 24px',
                          borderRadius: 25,
                          border: 'none',
                          background: '#4C858A',
                          color: 'white',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                        disabled={loading}
                      >
                        {loading ? 'Submitting...' : 'Download'}
                      </button>
                    </form>
                  ) : (
                    <div>
                      <h3 style={{ color: '#F4F1EE', marginBottom: '12px' }}>Thank you!</h3>
                      <a href={SAMPLE_PACK_URL} download>
                        <button style={{
                          padding: '8px 24px',
                          borderRadius: 25,
                          border: 'none',
                          background: '#4C858A',
                          color: 'white',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}>
                          Download
                        </button>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div style={{
            maxWidth: 500,
            width: '100%',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: 32,
            borderRadius: 16,
            textAlign: 'center',
            boxShadow: '0 4px 32px rgba(0,0,0,0.3)'
          }}>
            <h2>Free Sample Pack: Mythic Essentials Vol. 1</h2>
            <img
              src={COVER_IMAGE_URL}
              alt="Sample Pack Cover"
              style={{
                width: 220,
                height: 220,
                objectFit: 'cover',
                borderRadius: 16,
                marginBottom: 24,
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)'
              }}
            />
            <audio controls style={{ width: '100%', marginBottom: 16 }}>
              <source src={DEMO_AUDIO_URL} type="audio/mpeg" />
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
                  style={{ width: '80%', padding: 8, marginBottom: 8, borderRadius: 4, border: 'none' }}
                /><br />
                <button
                  type="submit"
                  className="mythic-btn"
                  disabled={loading || !email}
                >
                  {loading ? 'Submitting...' : 'Download'}
                </button>
                {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
              </form>
            ) : (
              <div>
                <h3>Thank you!</h3>
                <a
                  href={SAMPLE_PACK_URL}
                  download
                  ref={downloadRef}
                  style={{ display: 'none' }}
                >
                  Download Sample Pack
                </a>
                <p>Your download should start automatically. <br />
                  <a href={SAMPLE_PACK_URL} download>
                    <button
                      style={{
                        padding: '8px 24px',
                        borderRadius: 4,
                        border: 'none',
                        background: '#4C858A',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20,
                        cursor: 'pointer',
                        marginTop: 12
                      }}
                    >
                      Download
                    </button>
                  </a>
                </p>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div style={{
      height: '100vh',
      backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Company name */}
      <div style={{
        position: 'absolute',
        top: 32,
        right: 48,
        fontSize: 90,
        color: 'white',
        textShadow: '0 4px 24px rgba(0,0,0,0.8)',
        zIndex: 10,
        fontFamily: "'Great Vibes', cursive",
        letterSpacing: 2,
        lineHeight: 1.1,
        userSelect: 'none',
      }}>
        Mythic Soundlab
      </div>

      {/* Navigation Menu - Adjusted to match content area exactly */}
      <div style={{
        position: 'absolute',
        left: '10vw',  // Increased from 5vw to 8vw to match content area
        top: 48,
        display: 'flex',
        flexDirection: 'row',
        gap: '12px',
        zIndex: 20,
      }}>
        <button
          onClick={() => setCurrentView('samples')}
          style={{
            padding: '10px 24px',
            borderRadius: 25,
            border: 'none',
            background: currentView === 'samples' ? '#F4F1EE' : 'rgba(244, 241, 238, 0.9)',
            color: '#222222',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            fontSize: '14px',
            letterSpacing: '1px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          Sample Packs
        </button>
        <button
          onClick={() => setCurrentView('about')}
          style={{
            padding: '10px 24px',
            borderRadius: 25,
            border: 'none',
            background: currentView === 'about' ? '#F4F1EE' : 'rgba(244, 241, 238, 0.9)',
            color: '#222222',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            fontSize: '14px',
            letterSpacing: '1px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          About Us
        </button>
        <button
          onClick={openFeedbackForm}
          style={{
            padding: '10px 24px',
            borderRadius: 25,
            border: 'none',
            background: '#F4F1EE',
            color: '#222222',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            fontSize: '14px',
            letterSpacing: '1px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          Feedback
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px' // Reduced top margin since buttons are now at the top
      }}>
        {renderContent()}
      </div>
    </div>
  );
}
