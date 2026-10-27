import React, { useState } from 'react';
import { Sparkles, X, MessageSquareText } from 'lucide-react';

interface CopilotButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const CopilotButton: React.FC<CopilotButtonProps> = ({ isOpen, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 85,
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}
    >
      {/* Kokonut / Bklit Hover Label Badge */}
      <div 
        style={{
          background: 'var(--bg-pine)',
          color: '#ffffff',
          padding: '8px 16px',
          borderRadius: 'var(--radius-full)',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.04em',
          boxShadow: '0 8px 24px rgba(38, 61, 57, 0.25)',
          border: '1px solid rgba(212, 160, 52, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          opacity: isHovered || isOpen ? 1 : 0,
          transform: isHovered || isOpen ? 'translateX(0) scale(1)' : 'translateX(12px) scale(0.95)',
          transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-gold)' }} />
        <span>{isOpen ? 'Close AICTE Copilot' : 'Grounded Regulatory Copilot'}</span>
      </div>

      {/* Floating Circular Action Button */}
      <button
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Toggle Regulatory Copilot"
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: isOpen 
            ? 'var(--bg-pine)' 
            : 'linear-gradient(135deg, var(--accent-gold) 0%, #c49028 100%)',
          border: isOpen ? '2px solid var(--accent-gold)' : 'none',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: isOpen 
            ? '0 8px 24px rgba(38, 61, 57, 0.3)' 
            : '0 8px 28px rgba(212, 160, 52, 0.45), 0 2px 8px rgba(38, 61, 57, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
          position: 'relative'
        }}
      >
        {/* Subtle breathing ripple ring when closed */}
        {!isOpen && (
          <span 
            style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: '50%',
              border: '2px solid var(--accent-gold)',
              opacity: isHovered ? 0.8 : 0.4,
              animation: 'pulseGold 2.2s infinite',
              pointerEvents: 'none'
            }} 
          />
        )}

        {isOpen ? (
          <X size={22} color="var(--accent-gold)" />
        ) : (
          <Sparkles 
            size={24} 
            color="#ffffff" 
            style={{
              transform: isHovered ? 'rotate(15deg) scale(1.1)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}
          />
        )}
      </button>
    </div>
  );
};
