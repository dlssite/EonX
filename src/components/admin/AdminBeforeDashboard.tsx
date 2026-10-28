'use client'

import React from 'react'

export function AdminBeforeDashboard() {
  return (
    <div
      style={{
        marginBottom: '2rem',
        padding: '1.75rem 2rem',
        borderRadius: '10px',
        background: '#192A21',
        border: '1px solid #435244',
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
              background: '#E6654A',
            }}
          />
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#D7EF7C',
            }}
          >
            Content Studio
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-display), Georgia, serif',
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#F2EFE2',
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          Eonrisia Administration
        </h2>
        <p style={{ color: 'rgba(242, 239, 226, 0.68)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
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
            borderRadius: '6px',
            background: '#F2EFE2',
            border: '1px solid #F2EFE2',
            color: '#0F1D17',
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
