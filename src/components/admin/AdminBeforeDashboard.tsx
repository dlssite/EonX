'use client'

import React from 'react'

export function AdminBeforeDashboard() {
  return (
    <div
      style={{
        marginBottom: '2rem',
        padding: '1.75rem 2rem',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(15, 15, 25, 0.9) 100%)',
        border: '1px solid rgba(108, 99, 255, 0.25)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '9999px',
              background: '#6C63FF',
              boxShadow: '0 0 12px #6C63FF',
            }}
          />
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#A9A4FF',
            }}
          >
            Content Studio Studio
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#F4F4F8',
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          Eonrisia Administration
        </h2>
        <p style={{ color: 'rgba(244, 244, 248, 0.6)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
          Manage project universes, team profiles, opportunities, and published updates.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#F4F4F8',
            fontSize: '0.8125rem',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.15s ease',
          }}
        >
          View Live Website ↗
        </a>
      </div>
    </div>
  )
}

