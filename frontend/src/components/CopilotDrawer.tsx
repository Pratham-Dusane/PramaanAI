import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  BookOpen, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';
import { mockCopilotCorpus } from '../data/mockData';

interface CopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'copilot';
  text: string;
  citations?: Array<{
    sourceTitle: string;
    section: string;
    page: number;
    clause: string;
    excerpt: string;
  }>;
  limitations?: string;
  status?: 'ANSWERED_WITH_CITATIONS' | 'INSUFFICIENT_SOURCE_SUPPORT' | 'INJECTION_DEFENSE_TRIGGERED';
}

export const CopilotDrawer: React.FC<CopilotDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-init',
      sender: 'copilot',
      text: 'Hello. I am the AICTE Regulatory Copilot. I answer compliance questions strictly using the approved AICTE Approval Process Handbook (2024–2027 edition). Every answer includes verifiable section and clause citations.',
      status: 'ANSWERED_WITH_CITATIONS'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsThinking(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let matched = mockCopilotCorpus.find((item) => lower.includes(item.queryMatch));

      if (lower.includes('ignore') || lower.includes('prompt') || lower.includes('approve')) {
        matched = mockCopilotCorpus.find((item) => item.queryMatch === 'injection');
      }

      let responseMsg: Message;

      if (matched) {
        responseMsg = {
          id: `cop-${Date.now()}`,
          sender: 'copilot',
          text: matched.answer,
          citations: matched.citations,
          limitations: matched.limitations,
          status: matched.queryMatch === 'injection' 
            ? 'INJECTION_DEFENSE_TRIGGERED' 
            : 'ANSWERED_WITH_CITATIONS'
        };
      } else {
        responseMsg = {
          id: `cop-${Date.now()}`,
          sender: 'copilot',
          text: 'Insufficient source support: The configured regulatory corpus (Approval Process Handbook 2024–2027) does not establish an answer to this query. Per safety policy, I will abstain from guessing or extrapolating beyond cited clauses.',
          status: 'INSUFFICIENT_SOURCE_SUPPORT',
          limitations: 'Corpus coverage limit: Query terms not found in approved handbook index.'
        };
      }

      setMessages((prev) => [...prev, responseMsg]);
      setIsThinking(false);
    }, 600);
  };

  return (
    <aside 
      className="copilot-drawer fade-in"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '450px',
        maxWidth: '100vw',
        background: 'var(--bg-surface)',
        borderLeft: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column'
      }}
      aria-label="Grounded Regulatory Copilot"
    >
      {/* Header */}
      <div style={{
        padding: '18px 22px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg-pine)',
        color: '#ffffff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'var(--accent-gold)',
            padding: '8px',
            borderRadius: '12px',
            color: '#1a2c29',
            display: 'flex',
            boxShadow: '0 4px 12px rgba(212, 160, 52, 0.3)'
          }}>
            <Sparkles size={16} />
          </div>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>Grounded Regulatory Copilot</h2>
            <p style={{ fontSize: '11px', color: 'var(--text-on-pine-muted)' }}>
              AICTE Handbook (2024–27 Edition) Grounded RAG
            </p>
          </div>
        </div>

        <button 
          className="btn btn-outline btn-sm"
          onClick={onClose}
          aria-label="Close Copilot"
          style={{ padding: '6px', color: 'var(--text-on-pine-secondary)', borderColor: 'rgba(255,255,255,0.15)' }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        {messages.map((m) => (
          <div 
            key={m.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '92%'
            }}
          >
            <div style={{
              background: m.sender === 'user' 
                ? 'var(--bg-pine)' 
                : '#ffffff',
              color: m.sender === 'user' ? '#ffffff' : 'var(--text-main)',
              padding: '14px 18px',
              borderRadius: 'var(--radius-xl)',
              border: m.sender === 'user' 
                ? 'none' 
                : '1px solid var(--border-subtle)',
              boxShadow: m.sender === 'copilot' ? 'var(--shadow-sm)' : '0 4px 14px rgba(38, 61, 57, 0.15)',
              fontSize: '13px',
              lineHeight: 1.6,
              borderTopRightRadius: m.sender === 'user' ? '4px' : 'var(--radius-xl)',
              borderTopLeftRadius: m.sender === 'copilot' ? '4px' : 'var(--radius-xl)'
            }}>
              {m.text}

              {/* Citations Block */}
              {m.citations && m.citations.length > 0 && (
                <div style={{
                  marginTop: '14px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    fontSize: '11px', 
                    fontWeight: 800, 
                    color: 'var(--accent-gold-dark)',
                    letterSpacing: '0.04em'
                  }}>
                    <BookOpen size={13} />
                    <span>VERIFIED APH CITATIONS ({m.citations.length})</span>
                  </div>
                  {m.citations.map((c, i) => (
                    <div key={i} style={{
                      background: 'var(--bg-surface-elevated)',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '11px',
                      color: 'var(--text-secondary)'
                    }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                        {c.sourceTitle} — {c.clause} (Page {c.page})
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', margin: '2px 0' }}>
                        {c.section}
                      </div>
                      <blockquote style={{ 
                        borderLeft: '2px solid var(--accent-gold)', 
                        paddingLeft: '8px', 
                        fontStyle: 'italic',
                        color: 'var(--text-main)',
                        marginTop: '4px'
                      }}>
                        "{c.excerpt}"
                      </blockquote>
                    </div>
                  ))}
                </div>
              )}

              {/* Limitations Note */}
              {m.limitations && (
                <div style={{ 
                  marginTop: '8px', 
                  fontSize: '11px', 
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <AlertTriangle size={12} color="var(--accent-amber)" />
                  <span>{m.limitations}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isThinking && (
          <div style={{
            background: 'var(--bg-surface-elevated)',
            padding: '10px 14px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            alignSelf: 'flex-start',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Sparkles size={14} className="pulse" />
            <span>Retrieving indexed clauses & checking provenance...</span>
          </div>
        )}
      </div>

      {/* Input Area (Kokonut UI / Bklit Signature Textfield Component) */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid var(--border-subtle)',
        background: '#f4f8f7'
      }}>
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            background: '#ffffff',
            borderRadius: '16px',
            border: '1.5px solid #b6ccc5',
            boxShadow: '0 4px 14px rgba(38, 61, 57, 0.08)',
            padding: '4px 6px 4px 14px',
            transition: 'all 0.25s ease'
          }}
          className="kokonut-input-wrapper"
        >
          <input 
            type="text"
            placeholder="Ask AICTE approval rules, cadre norms, land policies..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text-main)',
              padding: '8px 4px',
              minWidth: 0
            }}
            aria-label="Ask AICTE Copilot"
          />

          {/* Kokonut Keyboard Shortcut Hint Badge */}
          <span style={{
            fontSize: '10px',
            fontWeight: 700,
            color: 'var(--text-muted)',
            background: '#ebf2f0',
            padding: '3px 7px',
            borderRadius: '6px',
            marginRight: '8px',
            userSelect: 'none'
          }}>
            ↵ Enter
          </span>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!inputValue.trim()}
            style={{
              width: '36px',
              height: '36px',
              padding: 0,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              opacity: inputValue.trim() ? 1 : 0.45,
              cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            aria-label="Send Message"
          >
            <Send size={15} />
          </button>
        </form>

        <div style={{ 
          fontSize: '10px', 
          fontWeight: 600,
          color: 'var(--text-muted)', 
          marginTop: '8px', 
          textAlign: 'center',
          letterSpacing: '0.02em'
        }}>
          Grounded to AICTE Approval Process Handbook (2024–27). Advisory citations only.
        </div>
      </div>
    </aside>
  );
};
