import * as React from 'react';

interface LeadMagnetEmailProps {
  name: string;
  downloadUrl: string;
  calendlyUrl: string;
}

export const LeadMagnetEmail: React.FC<LeadMagnetEmailProps> = ({
  name,
  downloadUrl,
  calendlyUrl,
}) => (
  <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '600px' }}>
    <div style={{ backgroundColor: '#faf7f2', padding: '40px 24px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1c1a17', margin: '0 0 16px' }}>
        Your framework is ready
      </h1>
      <p style={{ fontSize: '16px', color: '#7a766e', margin: '0' }}>
        The 90-Day Growth Audit Framework
      </p>
    </div>

    <div style={{ padding: '40px 24px', color: '#1c1a17', lineHeight: '1.6' }}>
      <p style={{ fontSize: '16px', marginBottom: '24px' }}>
        Hi {name},
      </p>

      <p style={{ fontSize: '16px', marginBottom: '24px' }}>
        Thanks for downloading. This framework is exactly what I use to audit every client — every channel, every metric, every optimization.
      </p>

      <p style={{ fontSize: '16px', marginBottom: '32px' }}>
        Work through it. Find where your funnel is leaking revenue. Then decide: fix it yourself, or book a call.
      </p>

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <a
          href={downloadUrl}
          style={{
            display: 'inline-block',
            backgroundColor: '#b8922a',
            color: 'white',
            padding: '12px 32px',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: '600',
          }}
        >
          Download Framework (PDF)
        </a>
      </div>

      <div style={{ backgroundColor: '#f5ede7', padding: '24px', borderRadius: '8px', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#b8922a', margin: '0 0 12px', textTransform: 'uppercase' }}>
          Next Step
        </h3>
        <p style={{ fontSize: '14px', margin: '0 0 12px' }}>
          If the framework resonates, book a free 30-minute strategy call. Tell me about your business. I will tell you exactly where revenue is being left on the table.
        </p>
        <a
          href={calendlyUrl}
          style={{
            display: 'inline-block',
            backgroundColor: '#1c1a17',
            color: 'white',
            padding: '10px 24px',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: '600',
            fontSize: '14px',
          }}
        >
          Book a call
        </a>
      </div>

      <p style={{ fontSize: '14px', color: '#7a766e', marginBottom: '24px' }}>
        Not a sales call. Zero pressure. Just strategy.
      </p>

      <div style={{ borderTop: '1px solid #e8ddd5', paddingTop: '24px', fontSize: '12px', color: '#7a766e' }}>
        <p style={{ margin: '0 0 8px' }}>
          © 2026 Axiom Strategy. All rights reserved.
        </p>
        <p style={{ margin: '0' }}>
          No cookies. No tracking. Just results.
        </p>
      </div>
    </div>
  </div>
);
