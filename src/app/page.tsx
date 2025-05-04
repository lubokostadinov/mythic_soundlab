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
const montserratFontUrl = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap';
const ralewayFontUrl = 'https://fonts.googleapis.com/css2?family=Raleway:wght@900&display=swap';

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
  link.href = montserratFontUrl;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
  link.href = ralewayFontUrl;
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
  const [selectedPack, setSelectedPack] = useState<string | null>(null);

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

  // Add this sample pack data (you can expand it later)
  const samplePacks = [
    {
      id: 'cinematic-atmospheres',
      title: 'Cinematic Atmospheres',
      image: COVER_IMAGE_URL,
      audioDemo: DEMO_AUDIO_URL,
      downloadUrl: SAMPLE_PACK_URL,
      description: {
        main: `Step into a world of depth, emotion, and tension with Cinematic Atmospheres, 
        a meticulously crafted sample pack designed for film scoring, game soundtracks, 
        ambient music, and atmospheric productions.`,
        secondary: `Every sound is professionally designed to spark creativity, offering both warmth 
        and edge. Whether you're building an expansive movie score, an eerie game level, 
        or a dreamy ambient track, Cinematic Atmospheres gives you the tools to shape 
        unforgettable sonic worlds.`,
        features: [
          '20 ethereal pads',
          '20 haunting drones',
          '20 expressive synths',
          '20 unique FX sounds'
        ]
      }
    }
    // Add more sample packs here
  ];

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
            position: 'relative',
            minHeight: '600px', // Ensure minimum height matches info page
            display: 'flex',
            flexDirection: 'column'
          }}>
            {!selectedPack ? (
              // Grid view of sample packs
              <>
                <h2 style={{ 
                  textAlign: 'center', 
                  marginBottom: 32, 
                  fontSize: '28px'
                }}>
                  Sample Packs
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '20px',
                  padding: '20px',
                  width: '100%', // Use full width
                  flex: 1, // Take up remaining space
                  alignContent: 'start', // Align grid to top
                }}>
                  {samplePacks.map(pack => (
                    <div 
                      key={pack.id}
                      onClick={() => setSelectedPack(pack.id)}
                      style={{
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        width: '150px', // Fixed width
                        margin: '0 auto', // Center in grid cell
                        ':hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      <img
                        src={pack.image}
                        alt={pack.title}
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: 12,
                          marginBottom: 8,
                          boxShadow: '0 4px 24px rgba(0,0,0,0.4)'
                        }}
                      />
                      <h3 style={{ 
                        textAlign: 'center',
                        fontSize: '16px',
                        marginBottom: '4px'
                      }}>
                        {pack.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              // Detailed view (replaces grid view when pack is selected)
              <>
                <button
                  onClick={() => setSelectedPack(null)}
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '20px',
                    padding: '8px 16px',
                    borderRadius: 25,
                    border: 'none',
                    background: '#F4F1EE',
                    color: '#222222',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  ← Back
                </button>

                <div style={{
                  display: 'flex',
                  gap: '48px',
                  alignItems: 'flex-start',
                  marginTop: '40px' // Add space for back button
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
                    <h2 style={{ marginBottom: '20px' }}>Cinematic Atmospheres</h2>
                    <p style={{ marginBottom: '20px' }}>
                      {samplePacks[0].description.main}
                    </p>
                    <p style={{ marginBottom: '20px' }}>
                      {samplePacks[0].description.secondary}
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
                        {samplePacks[0].description.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
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
              </>
            )}
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
              src="https://grxandvmphfzepoqtbtp.supabase.co/storage/v1/object/public/sample-packs//mythic_logo_alpha.png"
              alt="Mythic Soundlab Logo"
              style={{
                position: 'absolute',
                top: -8,      // Keep this for vertical center alignment
                left: 16,     // Move a little to the right; adjust as needed
                height: 160,
                width: 'auto',
                zIndex: 100,
                display: 'block',
                pointerEvents: 'none',
              }}
            />
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
      <img
        src="https://grxandvmphfzepoqtbtp.supabase.co/storage/v1/object/public/sample-packs//mythic_logo_alpha.png"
        alt="Mythic Soundlab Logo"
        style={{
          position: 'absolute',
          top: -4,      // Keep this for vertical center alignment
          left: 0,     // Move a little to the right; adjust as needed
          height: 160,
          width: 'auto',
          zIndex: 100,
          display: 'block',
          pointerEvents: 'none',
        }}
      />

      {/* Company name */}
      <div style={{
        position: 'absolute',
        top: 48,
        right: 48,
        fontSize: 48,
        color: 'white',
        WebkitTextStroke: '2px black',
        textShadow: '0 4px 24px rgba(0,0,0,0.8)',
        zIndex: 10,
        fontFamily: "'Raleway', Arial, sans-serif",
        letterSpacing: 2,
        lineHeight: 1.1,
        userSelect: 'none',
        fontWeight: 900,
        textTransform: 'uppercase'
      }}>
        Mythic Soundlab
      </div>

      {/* Navigation Menu - Adjusted to match content area exactly */}
      <div style={{
        position: 'absolute',
        left: 'calc(5vw + 84px)',
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
