'use client';
import React from 'react';
import Link from 'next/link';

export default function Privacy() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'black',
      color: '#e0e0e0',
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Privacy Policy</h1>
      
      <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>1. Information We Collect</h2>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          We collect the following types of information:
        </p>
        <ul style={{ listStyle: 'disc', marginLeft: '24px', marginBottom: '16px', lineHeight: '1.6' }}>
          <li>Email address (when you download sample packs)</li>
          <li>Country information (for analytics purposes)</li>
          <li>Usage data (how you interact with our website)</li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>2. How We Use Your Information</h2>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          We use your information to:
        </p>
        <ul style={{ listStyle: 'disc', marginLeft: '24px', marginBottom: '16px', lineHeight: '1.6' }}>
          <li>Provide you with sample packs</li>
          <li>Send you updates about new releases</li>
          <li>Improve our website and services</li>
          <li>Analyze usage patterns</li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>3. Data Storage and Security</h2>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          We use Supabase for secure data storage and management. Your data is protected using industry-standard 
          security measures. We never share your personal information with third parties without your consent.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>4. Your Rights</h2>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          You have the right to:
        </p>
        <ul style={{ listStyle: 'disc', marginLeft: '24px', marginBottom: '16px', lineHeight: '1.6' }}>
          <li>Access your personal data</li>
          <li>Request correction of your data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing communications</li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>5. Contact Us</h2>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          If you have any questions about this Privacy Policy, please contact us at:
          <br />
          mythic.soundlab@gmail.com
        </p>
      </section>

      <Link 
        href="/"
        style={{
          display: 'inline-block',
          marginTop: '32px',
          color: '#4C858A',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
      >
        ← Back to Home
      </Link>
    </div>
  );
} 