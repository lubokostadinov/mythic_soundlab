'use client';
import React from 'react';
import Link from 'next/link';

export default function Terms() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'black',
      color: '#e0e0e0',
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Terms and Conditions</h1>
      
      <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>1. Introduction</h2>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          Welcome to Mythic Soundlab. By accessing our website and using our sample packs, you agree to these terms and conditions.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>2. License and Usage</h2>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          Our sample packs are provided under a royalty-free license. This means you can:
        </p>
        <ul style={{ listStyle: 'disc', marginLeft: '24px', marginBottom: '16px', lineHeight: '1.6' }}>
          <li>Use the samples in your music productions</li>
          <li>Create derivative works</li>
          <li>Use the samples in commercial projects</li>
        </ul>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          However, you cannot:
        </p>
        <ul style={{ listStyle: 'disc', marginLeft: '24px', marginBottom: '16px', lineHeight: '1.6' }}>
          <li>Resell or redistribute the samples</li>
          <li>Claim ownership of the samples</li>
          <li>Use the samples in sample packs or sound libraries</li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>3. User Accounts</h2>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          When you provide your email address, you agree to:
        </p>
        <ul style={{ listStyle: 'disc', marginLeft: '24px', marginBottom: '16px', lineHeight: '1.6' }}>
          <li>Provide accurate information</li>
          <li>Keep your information up to date</li>
          <li>Accept responsibility for all activities under your account</li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>4. Intellectual Property</h2>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          All content on this website, including but not limited to sample packs, graphics, and text, is the property of 
          Mythic Soundlab and is protected by intellectual property laws.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>5. Limitation of Liability</h2>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          Mythic Soundlab shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
          resulting from your use of our services or sample packs.
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