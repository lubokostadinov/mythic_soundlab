'use client';
import React from 'react';
import Link from 'next/link';

export default function Cookies() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'black',
      color: '#e0e0e0',
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Cookie Policy</h1>
      
      <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>What Are Cookies</h2>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
          They are widely used to make websites work more efficiently and provide a better user experience.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>How We Use Cookies</h2>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          We use cookies for the following purposes:
        </p>
        <ul style={{ listStyle: 'disc', marginLeft: '24px', marginBottom: '16px', lineHeight: '1.6' }}>
          <li>To remember your preferences and settings</li>
          <li>To analyze how you use our website</li>
          <li>To improve our website's performance</li>
          <li>To provide you with a better user experience</li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Types of Cookies We Use</h2>
        <ul style={{ listStyle: 'disc', marginLeft: '24px', marginBottom: '16px', lineHeight: '1.6' }}>
          <li>Essential cookies: Required for the website to function properly</li>
          <li>Analytics cookies: Help us understand how visitors interact with our website</li>
          <li>Preference cookies: Remember your settings and preferences</li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Managing Cookies</h2>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer 
          and you can set most browsers to prevent them from being placed. If you do this, however, you may have to 
          manually adjust some preferences every time you visit our website.
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