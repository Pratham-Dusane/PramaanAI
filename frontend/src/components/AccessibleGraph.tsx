import React, { useState } from 'react';
import { 
  GitFork, 
  Table, 
  Info, 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  Building2, 
  Layers 
} from 'lucide-react';
import { EvidenceNode, EvidenceEdge } from '../types';

interface AccessibleGraphProps {
  nodes: EvidenceNode[];
  edges: EvidenceEdge[];
}

export const AccessibleGraph: React.FC<AccessibleGraphProps> = ({ nodes, edges }) => {
  const [viewMode, setViewMode] = useState<'VISUAL' | 'ACCESSIBLE_TABLE'>('VISUAL');
  const [selectedNode, setSelectedNode] = useState<EvidenceNode | null>(nodes[0] || null);

  const getNodeColor = (type: EvidenceNode['nodeType']) => {
    switch (type) {
      case 'INSTITUTION': return '#3b82f6';
      case 'APPLICATION': return '#6366f1';
      case 'DOCUMENT': return '#06b6d4';
      case 'FIELD': return '#10b981';
      case 'RULE': return '#8b5cf6';
      case 'FINDING': return '#f59e0b';
      default: return '#94a3b8';
    }
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="panel-header">
        <div className="panel-title">
          <GitFork size={18} color="var(--primary-500)" />
          <span>Evidence Graph & Traceability (FR-08)</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className={`btn btn-sm ${viewMode === 'VISUAL' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('VISUAL')}
          >
            <GitFork size={14} /> Interactive Graph
          </button>
          <button 
            className={`btn btn-sm ${viewMode === 'ACCESSIBLE_TABLE' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('ACCESSIBLE_TABLE')}
            title="WCAG 2.2 AA compliant tabular view (ADR-009)"
          >
            <Table size={14} /> Accessible Table View
          </button>
        </div>
      </div>

      {viewMode === 'VISUAL' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '16px' }}>
          {/* Interactive SVG Canvas */}
          <div style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            minHeight: '460px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              fontSize: '11px',
              color: 'var(--text-muted)',
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)'
            }}>
              Click any node to inspect provenance and linked evidence
            </div>

            <svg width="100%" height="420" viewBox="0 0 750 420" style={{ overflow: 'visible' }}>
              <defs>
                <marker 
                  id="arrowhead" 
                  markerWidth="8" 
                  markerHeight="6" 
                  refX="8" 
                  refY="3" 
                  orient="auto"
                >
                  <polygon points="0 0, 8 3, 0 6" fill="rgba(38, 61, 57, 0.5)" />
                </marker>
              </defs>

              {/* Hardcoded coordinates for demo readability */}
              {/* Edges */}
              <line x1="100" y1="210" x2="220" y2="210" stroke="rgba(38, 61, 57, 0.25)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              <line x1="220" y1="210" x2="350" y2="120" stroke="rgba(38, 61, 57, 0.25)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              <line x1="220" y1="210" x2="350" y2="210" stroke="rgba(38, 61, 57, 0.25)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              <line x1="220" y1="210" x2="350" y2="300" stroke="rgba(38, 61, 57, 0.25)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              
              <line x1="350" y1="120" x2="480" y2="120" stroke="rgba(38, 61, 57, 0.25)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              <line x1="350" y1="210" x2="480" y2="210" stroke="rgba(38, 61, 57, 0.25)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              <line x1="350" y1="300" x2="480" y2="300" stroke="rgba(38, 61, 57, 0.25)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

              <line x1="480" y1="120" x2="590" y2="160" stroke="rgba(38, 61, 57, 0.25)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              <line x1="480" y1="210" x2="590" y2="160" stroke="rgba(38, 61, 57, 0.25)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              <line x1="590" y1="160" x2="680" y2="160" stroke="rgba(212, 160, 52, 0.7)" strokeWidth="2" markerEnd="url(#arrowhead)" />

              <line x1="480" y1="300" x2="680" y2="300" stroke="rgba(217, 72, 60, 0.7)" strokeWidth="2" markerEnd="url(#arrowhead)" />

              {/* Node Renderers */}
              {[
                { node: nodes[0], x: 100, y: 210 },
                { node: nodes[1], x: 220, y: 210 },
                { node: nodes[2], x: 350, y: 120 },
                { node: nodes[3], x: 350, y: 210 },
                { node: nodes[8], x: 350, y: 300 },
                { node: nodes[4], x: 480, y: 120 },
                { node: nodes[5], x: 480, y: 210 },
                { node: nodes[9], x: 480, y: 300 },
                { node: nodes[6], x: 590, y: 160 },
                { node: nodes[7], x: 680, y: 160 },
                { node: nodes[10], x: 680, y: 300 }
              ].filter(n => n.node).map(({ node, x, y }) => {
                const isSelected = selectedNode?.id === node.id;
                const color = getNodeColor(node.nodeType);
                return (
                  <g 
                    key={node.id} 
                    transform={`translate(${x}, ${y})`}
                    onClick={() => setSelectedNode(node)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle 
                      r={isSelected ? 22 : 18} 
                      fill="var(--bg-surface)" 
                      stroke={color} 
                      strokeWidth={isSelected ? 3.5 : 2}
                      filter={isSelected ? 'drop-shadow(0 0 8px ' + color + ')' : undefined}
                    />
                    <text 
                      y={34} 
                      textAnchor="middle" 
                      fill="var(--text-main)" 
                      fontSize="10" 
                      fontWeight="700"
                    >
                      {node.label.length > 18 ? node.label.slice(0, 16) + '...' : node.label}
                    </text>
                    <text 
                      y={45} 
                      textAnchor="middle" 
                      fill="var(--text-muted)" 
                      fontSize="9"
                    >
                      {node.nodeType}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Node Inspector Panel */}
          <div style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={16} color="var(--primary-500)" />
              <h4 style={{ fontSize: '13px', fontWeight: 700 }}>Evidence Node Inspector</h4>
            </div>

            {selectedNode ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <span 
                    className="badge" 
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.05)', 
                      borderColor: getNodeColor(selectedNode.nodeType),
                      color: getNodeColor(selectedNode.nodeType)
                    }}
                  >
                    {selectedNode.nodeType}
                  </span>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '6px' }}>
                    {selectedNode.label}
                  </h3>
                </div>

                <div style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>
                    Entity Provenance Details:
                  </div>
                  {selectedNode.detail}
                </div>

                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Traceability path links from primary institutional filings through OCR bounding anchors to versioned rule definitions.
                </div>
              </div>
            ) : (
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Select any node on the graph to inspect its details.
              </p>
            )}
          </div>
        </div>
      ) : (
        /* Accessible Table Fallback (ADR-009) */
        <div className="table-wrapper">
          <table className="data-table" aria-label="Evidence Nodes and Provenance Table">
            <thead>
              <tr>
                <th scope="col">Entity Node</th>
                <th scope="col">Node Type</th>
                <th scope="col">Evidence Detail & Anchor</th>
                <th scope="col">Connected Relationships</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((node) => {
                const outgoingEdges = edges.filter((e) => e.sourceId === node.id);
                return (
                  <tr key={node.id}>
                    <td>
                      <strong>{node.label}</strong>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>ID: {node.id}</div>
                    </td>
                    <td>
                      <span 
                        className="badge"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderColor: getNodeColor(node.nodeType),
                          color: getNodeColor(node.nodeType)
                        }}
                      >
                        {node.nodeType}
                      </span>
                    </td>
                    <td style={{ fontSize: '12px' }}>{node.detail}</td>
                    <td style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {outgoingEdges.length > 0 ? (
                        outgoingEdges.map((e) => (
                          <div key={e.id}>
                            → <strong>{e.relation}</strong> ({nodes.find(n => n.id === e.targetId)?.label || e.targetId})
                          </div>
                        ))
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>Terminal Node (Outcome)</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
