import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'LET ProfEd Mastery System 2026 — LisensyaPrep';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #080d1b 0%, #0f1629 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        {/* Badge */}
        <div style={{ background: '#facc1520', border: '1px solid #facc1540', borderRadius: '999px', padding: '8px 20px', marginBottom: '24px', display: 'flex' }}>
          <span style={{ color: '#facc15', fontSize: '16px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            LisensyaPrep — Premium Reviewer
          </span>
        </div>

        {/* Title */}
        <div style={{ color: '#ffffff', fontSize: '60px', fontWeight: 900, textAlign: 'center', lineHeight: 1.1, marginBottom: '20px' }}>
          LET ProfEd Mastery System 2026
        </div>

        {/* Features */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
          {['430+ Questions', 'Full Rationales', '8-Week Schedule', 'Mock Exam'].map((f) => (
            <div key={f} style={{ background: '#ffffff10', borderRadius: '8px', padding: '8px 16px', display: 'flex' }}>
              <span style={{ color: '#d1d5db', fontSize: '18px' }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: '#facc15', fontSize: '48px', fontWeight: 900 }}>₱149</span>
          <span style={{ color: '#6b7280', fontSize: '28px', textDecoration: 'line-through' }}>₱249</span>
          <span style={{ background: '#facc15', color: '#111827', fontSize: '18px', fontWeight: 700, padding: '6px 14px', borderRadius: '8px' }}>Launch Special</span>
        </div>

        {/* URL */}
        <div style={{ marginTop: '32px', color: '#4b5563', fontSize: '20px' }}>
          lisensyaprep.com/premium/let-profed-mastery
        </div>
      </div>
    ),
    { ...size },
  );
}
