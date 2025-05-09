'use client';
import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

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
      setSubmitted(false);
      setEmail('');
    }
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isValidEmail(email)) {
      setError('Invalid email');
      setLoading(false);
      return;
    }

    try {
      // First check if email exists
      const { data: existingEmail } = await supabase
        .from('emails')
        .select('email')
        .eq('email', email)
        .single();

      if (existingEmail) {
        // Email exists, just proceed with download
        setSubmitted(true);
        setLoading(false);
        return;
      }

      // Email doesn't exist, insert it
      const { error } = await supabase
        .from('emails')
        .insert([{ email, country }]);

      if (error) {
        setError('There was an error saving your email. Please try again.');
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
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
            background: 'rgba(0,0,0,0.85)',
            color: 'white',
            padding: 32,
            borderRadius: 16,
            boxShadow: '0 4px 32px rgba(0,0,0,0.3)',
          }}>
            <p style={{ 
              fontSize: '16px',
              lineHeight: '1.7',
              marginBottom: '20px',
              color: '#e0e0e0'
            }}>
              At Mythic Soundlab, we are a collective of passionate producers dedicated to pushing the boundaries of sound. Born from the studio sessions of electronic artists and sound designers, our platform offers premium sample packs crafted by producers, for producers. Whether you're creating atmospheric soundtracks for both movies and video games or building the next club anthem, our libraries are designed to inspire and give your production a unique edge.
            </p>
            <p style={{ 
              fontSize: '16px',
              lineHeight: '1.7',
              marginBottom: '20px',
              color: '#e0e0e0'
            }}>
              What sets Mythic Soundlab apart is our attention to detail and originality. Every sound is carefully designed by our passionate team of sound designers — no recycled loops, no generic presets. We specialize in electronic music and cinematic sound design, delivering textures and tones you won't find anywhere else.
            </p>
            <p style={{ 
              fontSize: '16px',
              lineHeight: '1.7',
              marginBottom: '20px',
              color: '#e0e0e0'
            }}>
              Unlike the mass-market sample giants, we stay close to our community. Our small, agile team listens, and we welcome your requests, adapt to your creative needs, and are always ready to support you directly. At Mythic Soundlab, you're not just a customer — you're a collaborator in shaping the next wave of sound.
            </p>
            <p style={{ 
              fontSize: '16px',
              lineHeight: '1.7',
              marginBottom: '20px',
              color: '#e0e0e0'
            }}>
              Join us and discover the difference that true mythical craftsmanship makes.
            </p>
            <div style={{ 
              marginTop: '32px',
              textAlign: 'center'
            }}>
              <p style={{ 
                margin: '0', 
                color: '#e0e0e0',
                fontSize: '16px',
                lineHeight: '1.7'
              }}>
                Contact Us:<br />
                mythic.soundlab@gmail.com
              </p>
            </div>
          </div>
        );
      case 'samples':
        return (
          <div style={{
            width: '90%',
            maxWidth: 1400,
            background: 'rgba(0,0,0,0.85)',
            color: 'white',
            padding: 32,
            borderRadius: 16,
            boxShadow: '0 4px 32px rgba(0,0,0,0.3)',
            position: 'relative',
            minHeight: '600px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Only show this title in the list view */}
            {!selectedPack && (
              <h2
                style={{
                  textAlign: 'center',
                  fontSize: '36px',
                  fontWeight: 900,
                  letterSpacing: 2,
                  lineHeight: 1.1,
                  width: '100%',
                  margin: 0,
                  marginBottom: '40px'
                }}
              >
                Sample Packs
              </h2>
            )}

            {!selectedPack ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '20px',
                  padding: '20px 0',
                  width: '100%',
                  margin: 0,
                  flex: 1,
                  alignContent: 'start',
                }}
              >
                {samplePacks.map(pack => (
                  <div
                    key={pack.id}
                    style={{
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      width: '150px',
                      margin: '0 auto',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {/* Sample pack name above the image */}
                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        marginBottom: '8px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                      }}
                    >
                      {pack.title}
                    </div>
                    <img
                      src={pack.image}
                      alt={pack.title}
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: 12,
                        marginBottom: 8,
                        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                        cursor: 'pointer',
                      }}
                      onClick={() => setSelectedPack(pack.id)}
                    />
                    {/* Free Download button under the image */}
                    <button
                      onClick={() => setSelectedPack(pack.id)}
                      style={{
                        marginTop: 8,
                        padding: '8px 20px',
                        borderRadius: 20,
                        border: 'none',
                        background: '#4C858A',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '15px',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                        transition: 'background 0.2s',
                      }}
                    >
                      FREE
                    </button>
                  </div>
                ))}

                {/* Empty slot for "More coming soon" */}
                <div
                  style={{
                    width: '150px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: 'none',
                    borderRadius: 12,
                    padding: '0',
                    boxSizing: 'border-box',
                    minHeight: 210,
                    justifyContent: 'center',
                    background: 'transparent',
                    marginTop: '-14px',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1/1',
                      border: '2px dashed #fff',
                      borderRadius: 12,
                      marginBottom: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'transparent',
                      minHeight: 0,
                      minWidth: 0,
                      boxSizing: 'border-box',
                    }}
                  >
                    <span
                      style={{
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '15px',
                        textAlign: 'center',
                        letterSpacing: 1,
                        opacity: 1, // Fully white
                        margin: 0,
                        padding: 0,
                        width: '100%',
                      }}
                    >
                      More coming soon
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              // Detailed view (replaces grid view when pack is selected)
              <>
                {/* Header at the top center */}
                <h2
                  style={{
                    textAlign: 'center',
                    fontSize: '34px',
                    fontWeight: 700,
                    letterSpacing: 2,
                    lineHeight: 1.1,
                    width: '100%',
                    margin: 0,
                    marginBottom: '0px',
                    color: '#fff',
                  }}
                >
                  Cinematic Atmospheres
                </h2>
                <button
                  onClick={() => setSelectedPack(null)}
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '20px',
                    padding: '8px 16px 8px 8px',
                    borderRadius: 25,
                    border: 'none',
                    background: '#F4F1EE',
                    color: '#222222',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: 0,
                      height: 0,
                      borderTop: '7px solid transparent',
                      borderBottom: '7px solid transparent',
                      borderRight: '10px solid #222',
                      marginRight: 2,
                    }}
                  />
                  Back
                </button>

                <div style={{
                  display: 'flex',
                  gap: '48px',
                  alignItems: 'center',
                  marginTop: '40px',
                  width: '100%',
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button
                          onClick={() => {
                            if (!audioRef.current) return;
                            if (isPlaying) {
                              audioRef.current.pause();
                            } else {
                              audioRef.current.play();
                            }
                            setIsPlaying(!isPlaying);
                          }}
                          style={{
                            background: '#4C858A',
                            color: 'white',
                            border: 'none',
                            borderRadius: 20,
                            width: 56,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 22,
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                            padding: 0,
                            outline: 'none',
                          }}
                          aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                          {isPlaying ? (
                            <span style={{ fontSize: 22, display: 'inline-block' }}>⏸</span>
                          ) : (
                            <span
                              style={{
                                display: 'inline-block',
                                width: 0,
                                height: 0,
                                borderTop: '7px solid transparent',
                                borderBottom: '7px solid transparent',
                                borderLeft: '10px solid white',
                                marginLeft: 2,
                              }}
                            />
                          )}
                        </button>
                        <span style={{ color: '#fff', fontSize: 14 }}>
                          {formatTime(audioProgress)} / {formatTime(audioDuration)}
                        </span>
                      </div>
                      {/* Progress bar */}
                      <input
                        type="range"
                        min={0}
                        max={audioDuration}
                        value={audioProgress}
                        onChange={e => {
                          const value = Number(e.target.value);
                          setAudioProgress(value);
                          if (audioRef.current) {
                            audioRef.current.currentTime = value;
                          }
                        }}
                        style={{
                          width: '100%',
                          accentColor: '#4C858A',
                          cursor: 'pointer',
                        }}
                      />
                      <audio
                        ref={audioRef}
                        src={DEMO_AUDIO_URL}
                        style={{ width: 0, height: 0, visibility: 'hidden' }}
                        onEnded={() => {
                          setIsPlaying(false);
                          setAudioProgress(0);
                        }}
                        onTimeUpdate={() => {
                          if (audioRef.current) setAudioProgress(audioRef.current.currentTime);
                        }}
                        onLoadedMetadata={() => {
                          if (audioRef.current) setAudioDuration(audioRef.current.duration);
                        }}
                      />
                    </div>
                  </div>

                  {/* Right side - Description */}
                  <div style={{
                    flex: 1,
                    textAlign: 'left',
                    color: '#e0e0e0',
                    fontSize: '16px',
                    lineHeight: '1.7',
                    maxWidth: '800px',
                    fontWeight: 400,
                  }}>
                    <p style={{
                      fontWeight: 400,
                      marginBottom: '10px',
                      color: '#e0e0e0',
                    }}>
                      Step into a world of depth, emotion, and tension with Cinematic Atmospheres, a meticulously crafted sample pack designed for film scoring, game soundtracks, ambient music, and atmospheric productions.
                    </p>
                    <p style={{
                      fontWeight: 400,
                      marginBottom: '20px',
                      color: '#e0e0e0',
                    }}>
                      Every sound is professionally designed to spark creativity, offering both warmth and edge. Whether you're building an expansive movie score, an eerie game level, or a dreamy ambient track, Cinematic Atmospheres gives you the tools to shape unforgettable sonic worlds.
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
                          <li
                            key={index}
                            style={
                              (feature === '20 haunting drones' || feature === '20 unique FX sounds')
                                ? { marginLeft: '-64px' }
                                : undefined
                            }
                          >
                            • {feature}
                          </li>
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
                      <p style={{ margin: '0', color: '#fff' }}>Format: High-quality WAV files</p>
                      <p style={{ margin: '0', color: '#fff' }}>Royalty-Free: Yes</p>
                    </div>

                    {/* Email Form */}
                    <div style={{ marginTop: '32px' }}>
                      <form onSubmit={handleSubmit}>
                        <input
                          type="text"
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
                          Download
                        </button>
                        {/* Hidden download link for auto-download */}
                        <a
                          href={SAMPLE_PACK_URL}
                          download
                          ref={downloadRef}
                          style={{ display: 'none' }}
                        >
                          Download Sample Pack
                        </a>
                        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
                      </form>
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
            <form onSubmit={handleSubmit}>
              <input
                type="text"
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
          </div>
        );
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        width: '1920px',
        height: '1080px',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: 'scale(1)',
        transformOrigin: 'center center',
        willChange: 'transform',
        margin: 0,
        padding: 0,
      }}>
        {/* Logo */}
        <img
          src="https://grxandvmphfzepoqtbtp.supabase.co/storage/v1/object/public/sample-packs//mythic_logo_alpha.png"
          alt="Mythic Soundlab Logo"
          style={{
            position: 'absolute',
            top: 103,
            left: 20,
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
          top: 155,
          right: 48,
          fontSize: 48,
          color: 'white',
          WebkitTextStroke: '2px black',
          textShadow: '0 4px 24px rgba(0,0,0,0.8)',
          zIndex: 10,
          fontFamily: "'Orbitron', Arial, sans-serif",
          letterSpacing: 2,
          lineHeight: 1.1,
          userSelect: 'none',
          fontWeight: 900,
          textTransform: 'uppercase'
        }}>
          Mythic Soundlab
        </div>

        {/* Navigation Menu */}
        <div style={{
          position: 'absolute',
          left: 200,
          top: 160, // Moved down from 140 to 150
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
              background: currentView === 'samples' ? '#fff' : '#eaeaea',
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
              background: currentView === 'about' ? '#fff' : '#eaeaea',
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
              background: '#eaeaea',
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
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 1400,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
