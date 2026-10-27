import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph-2d';
import {
  GitFork,
  Table,
  Search,
  Play,
  Pause,
  RotateCcw,
  AlertTriangle,
  X,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Building2,
  FileText,
  CheckCircle2,
  Share2
} from 'lucide-react';
import {
  GRAPH_NODES,
  GRAPH_LINKS,
  GraphNode,
  OVERLAP_COLORS
} from '../data/graphData';
import { EvidenceNode, EvidenceEdge } from '../types';

interface AccessibleGraphProps {
  nodes?: EvidenceNode[];
  edges?: EvidenceEdge[];
  initialFocusedCluster?: string | null;
  initialFocusedInstitutionId?: string | null;
  onOpenCaseReview?: (finding: NonNullable<GraphNode['finding']>) => void;
}

export const AccessibleGraph: React.FC<AccessibleGraphProps> = ({
  initialFocusedCluster = 'cluster-pune-land',
  initialFocusedInstitutionId,
  onOpenCaseReview
}) => {
  const fgRef = useRef<ForceGraphMethods<any, any> | undefined>(undefined);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  // View switch: Visual Graph vs Accessible Table (WCAG 2.2 AA)
  const [viewMode, setViewMode] = useState<'VISUAL' | 'ACCESSIBLE_TABLE'>('VISUAL');

  // Filter chips: 'ALL' | 'land_deed' | 'faculty' | 'fire_noc'
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'land_deed' | 'faculty' | 'fire_noc'>('ALL');

  // Search box
  const [searchQuery, setSearchQuery] = useState('');

  // Selected node (displayed in permanent right-side box, default to highest risk document)
  const defaultSelected = useMemo(() => {
    return GRAPH_NODES.find(n => n.id === 'DOC-LAND-44') || GRAPH_NODES[0];
  }, []);
  const [selectedNode, setSelectedNode] = useState<GraphNode>(defaultSelected);

  // Hovered node for cluster highlighting
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  // Time scrubber across AY 2023 to 2027
  const [selectedYear, setSelectedYear] = useState<number>(2027);
  const [isPlayingTimeline, setIsPlayingTimeline] = useState<boolean>(false);

  // Check prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Dimensions for canvas
  const [canvasDimensions, setCanvasDimensions] = useState<{ width: number; height: number }>({
    width: 720,
    height: 560
  });

  useEffect(() => {
    const updateSize = () => {
      if (canvasWrapperRef.current) {
        setCanvasDimensions({
          width: canvasWrapperRef.current.clientWidth || 720,
          height: Math.max(540, window.innerHeight - 290)
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Timeline Auto-play across AY 2023 - 2027
  useEffect(() => {
    if (!isPlayingTimeline) return;
    const interval = setInterval(() => {
      setSelectedYear(prev => {
        if (prev >= 2027) {
          setIsPlayingTimeline(false);
          return 2027;
        }
        return prev + 1;
      });
    }, 1400);
    return () => clearInterval(interval);
  }, [isPlayingTimeline]);

  // Filter links by category and academic year timeline
  const visibleLinks = useMemo(() => {
    return GRAPH_LINKS.filter(link => {
      if (link.year > selectedYear) return false;
      if (activeFilter !== 'ALL' && link.overlapType !== activeFilter) return false;
      return true;
    });
  }, [selectedYear, activeFilter]);

  // Filter nodes
  const visibleNodes = useMemo(() => {
    if (activeFilter === 'ALL') return GRAPH_NODES;
    return GRAPH_NODES.filter(node => {
      if (node.type === 'INSTITUTION') return true;
      return node.category === activeFilter;
    });
  }, [activeFilter]);

  // Connected cluster for hovered node (only dim others when actively hovering)
  const activeClusterNodeIds = useMemo(() => {
    if (!hoveredNode) return null;

    const set = new Set<string>();
    set.add(hoveredNode.id);

    visibleLinks.forEach(link => {
      const srcId = typeof link.source === 'object' ? (link.source as any).id : link.source;
      const tgtId = typeof link.target === 'object' ? (link.target as any).id : link.target;
      if (srcId === hoveredNode.id) set.add(tgtId);
      if (tgtId === hoveredNode.id) set.add(srcId);
    });

    return set;
  }, [hoveredNode, visibleLinks]);

  // Initial centering on load: Ensure whole graph is visible within the canvas
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!fgRef.current) return;
      fgRef.current.centerAt(0, 5, 500);
      fgRef.current.zoom(1.15, 500);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Fly camera to searched institution
  const handleSearchSelect = (institution: GraphNode) => {
    if (!fgRef.current) return;
    setSelectedNode(institution);
    if (typeof institution.x === 'number' && typeof institution.y === 'number') {
      fgRef.current.centerAt(institution.x, institution.y, 600);
      fgRef.current.zoom(2.2, 600);
    }
  };

  const matchingInstitutions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return GRAPH_NODES.filter(
      n => n.type === 'INSTITUTION' && (n.name.toLowerCase().includes(q) || n.initials?.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Custom Canvas Rendering for Nodes
  const renderNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const { x, y, type, initials, name, isHighRisk } = node;
    const isHovered = hoveredNode?.id === node.id;
    const isSelected = selectedNode?.id === node.id;

    // Dimming logic
    let opacity = 1;
    if (activeClusterNodeIds) {
      opacity = activeClusterNodeIds.has(node.id) ? 1 : 0.25;
    }

    ctx.save();
    ctx.globalAlpha = opacity;

    if (type === 'INSTITUTION') {
      // 1. Institution: Circle with initials
      const radius = isSelected ? 19 : isHovered ? 17 : 14;

      // Outer glow
      if (isSelected || isHovered) {
        ctx.beginPath();
        ctx.arc(x, y, radius + 6, 0, 2 * Math.PI, false);
        ctx.fillStyle = isHighRisk ? 'rgba(239, 68, 68, 0.35)' : 'rgba(212, 160, 52, 0.35)';
        ctx.fill();
      }

      // Circle Body
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = isHighRisk ? '#1c1917' : '#0f2922';
      ctx.fill();

      // Border
      ctx.lineWidth = isSelected ? 3.5 : isHovered ? 2.5 : 2;
      ctx.strokeStyle = isSelected
        ? '#fbbf24'
        : isHighRisk
          ? '#ef4444'
          : '#34d399';
      ctx.stroke();

      // Monogram Initials
      ctx.font = `bold ${Math.max(8, radius * 0.75)}px 'Inter', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(initials || 'IN', x, y);

      // Label below
      if (globalScale > 1.1 || isHovered || isSelected) {
        ctx.font = `600 ${Math.max(9, 11 / Math.sqrt(globalScale))}px 'Inter', sans-serif`;
        ctx.fillStyle = '#e2ece9';
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 4;
        ctx.fillText(name, x, y + radius + 11);
      }
    } else {
      // 2. Shared Document: Diamond
      const size = isSelected ? 18 : isHovered ? 16 : 13;
      const color = node.category === 'land_deed'
        ? OVERLAP_COLORS.land_deed
        : node.category === 'faculty'
          ? OVERLAP_COLORS.faculty
          : OVERLAP_COLORS.fire_noc;

      // Outer glow
      if (isSelected || isHovered) {
        ctx.beginPath();
        ctx.moveTo(x, y - (size + 5));
        ctx.lineTo(x + (size + 5), y);
        ctx.lineTo(x, y + (size + 5));
        ctx.lineTo(x - (size + 5), y);
        ctx.closePath();
        ctx.fillStyle = `${color}44`;
        ctx.fill();
      }

      // Diamond Path
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x - size, y);
      ctx.closePath();
      ctx.fillStyle = '#0a241e';
      ctx.fill();

      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.strokeStyle = color;
      ctx.stroke();

      // Inner Icon mark
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();

      // Document Label below
      if (globalScale > 1.05 || isHovered || isSelected) {
        ctx.font = `600 ${Math.max(8, 10 / Math.sqrt(globalScale))}px 'Inter', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = color;
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 4;
        ctx.fillText(name, x, y + size + 6);
      }
    }

    ctx.restore();
  }, [hoveredNode, selectedNode, activeClusterNodeIds]);

  // Custom Canvas Rendering for Links (Static, crisp, stable)
  const renderLink = useCallback((link: any, ctx: CanvasRenderingContext2D) => {
    const start = link.source;
    const end = link.target;
    if (!start || !end || typeof start.x !== 'number' || typeof end.x !== 'number') return;

    const color = OVERLAP_COLORS[link.overlapType as keyof typeof OVERLAP_COLORS] || '#14b8a6';

    let opacity = 0.85;
    if (activeClusterNodeIds) {
      const srcId = typeof link.source === 'object' ? link.source.id : link.source;
      const tgtId = typeof link.target === 'object' ? link.target.id : link.target;
      if (!activeClusterNodeIds.has(srcId) || !activeClusterNodeIds.has(tgtId)) {
        opacity = 0.2;
      }
    }

    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = color;
    ctx.lineWidth = link.isRisky ? 2.6 : 1.6;

    if (link.isRisky) {
      ctx.setLineDash([6, 4]);
    } else {
      ctx.setLineDash([]);
    }

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.restore();
  }, [activeClusterNodeIds]);

  // Custom background: Dark green canvas with subtle dot grid
  const renderBackground = useCallback((ctx: CanvasRenderingContext2D) => {
    const { width, height } = canvasDimensions;
    const gridSize = 28;

    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';

    for (let x = -width; x < width * 2; x += gridSize) {
      for (let y = -height; y < height * 2; y += gridSize) {
        ctx.beginPath();
        ctx.arc(x, y, 1.1, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
    ctx.restore();
  }, [canvasDimensions]);

  // Current finding object for the right-side box
  const activeFinding = selectedNode.finding || (
    GRAPH_NODES.find(n => n.clusterId === selectedNode.clusterId && n.finding)?.finding ||
    GRAPH_NODES.find(n => n.id === 'DOC-LAND-44')?.finding
  );

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* 1. Header with Controls & View Mode */}
      <div className="panel-header" style={{ flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #10b981 0%, #064e3b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
          }}>
            <GitFork size={18} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Evidence Graph & Traceability
              </h2>
              <span className="badge badge-info" style={{ fontSize: '10px', padding: '2px 8px' }}>
                Multi-Institution Topology
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
              Inspect candidate cross-institution overlaps, shared deeds, and faculty rosters
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
          <button
            className={`btn btn-sm ${viewMode === 'VISUAL' ? 'btn-pine' : 'btn-outline'}`}
            onClick={() => setViewMode('VISUAL')}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <GitFork size={13} color={viewMode === 'VISUAL' ? 'var(--accent-gold)' : undefined} />
            <span>Interactive Graph</span>
          </button>
          <button
            className={`btn btn-sm ${viewMode === 'ACCESSIBLE_TABLE' ? 'btn-pine' : 'btn-outline'}`}
            onClick={() => setViewMode('ACCESSIBLE_TABLE')}
            title="WCAG 2.2 AA compliant tabular view (ADR-009)"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <Table size={13} color={viewMode === 'ACCESSIBLE_TABLE' ? 'var(--accent-gold)' : undefined} />
            <span>Accessible Table</span>
          </button>
        </div>
      </div>

      {viewMode === 'VISUAL' ? (
        /* Side-by-Side Layout: Canvas on the Left (1fr) + Dedicated Inspector Box on the Right (340px) */
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '16px',
          alignItems: 'stretch'
        }}>
          {/* LEFT: Force Graph Canvas & Overlay Controls */}
          <div
            ref={canvasWrapperRef}
            style={{
              position: 'relative',
              borderRadius: '14px',
              overflow: 'hidden',
              border: '1.5px solid rgba(22, 101, 74, 0.4)',
              boxShadow: '0 16px 36px -10px rgba(0, 0, 0, 0.4)',
              background: '#071f1a',
              minHeight: '540px'
            }}
          >
            {/* Top Overlay Bar: High-Contrast Info Banner + Search + Counter */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              right: '12px',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px',
              pointerEvents: 'none'
            }}>
              {/* High-Contrast Readability Banner */}
              <div style={{
                pointerEvents: 'auto',
                background: 'rgba(7, 31, 26, 0.94)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(212, 160, 52, 0.5)',
                borderRadius: '8px',
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#fbbf24',
                  boxShadow: '0 0 8px #fbbf24'
                }} />
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#f8fafc' }}>
                  Click any node to inspect provenance and linked evidence
                </span>
              </div>

              {/* Cluster Count Badge */}
              <div style={{
                pointerEvents: 'auto',
                background: 'rgba(239, 68, 68, 0.18)',
                border: '1px solid rgba(239, 68, 68, 0.45)',
                borderRadius: '8px',
                padding: '5px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#fca5a5',
                fontSize: '11px',
                fontWeight: 800
              }}>
                <AlertTriangle size={13} color="#ef4444" />
                <span>3 institutions share 1 document</span>
              </div>

              {/* Fly Camera Search Box */}
              <div style={{ pointerEvents: 'auto', position: 'relative', minWidth: '200px' }}>
                <div style={{
                  background: 'rgba(7, 31, 26, 0.92)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(52, 211, 153, 0.35)',
                  borderRadius: '8px',
                  padding: '5px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Search size={13} color="#34d399" />
                  <input
                    type="text"
                    placeholder="Search institution..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 600,
                      width: '100%'
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                {matchingInstitutions.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '4px',
                    background: '#071f1a',
                    border: '1px solid rgba(52, 211, 153, 0.4)',
                    borderRadius: '8px',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.6)',
                    width: '100%',
                    zIndex: 25,
                    padding: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}>
                    {matchingInstitutions.map(inst => (
                      <button
                        key={inst.id}
                        onClick={() => {
                          handleSearchSelect(inst);
                          setSearchQuery('');
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 8px',
                          borderRadius: '4px',
                          border: 'none',
                          background: 'rgba(255, 255, 255, 0.06)',
                          color: '#f8fafc',
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontSize: '11px'
                        }}
                      >
                        <span style={{
                          background: '#10b981',
                          color: '#ffffff',
                          fontSize: '9px',
                          fontWeight: 800,
                          padding: '1px 4px',
                          borderRadius: '3px'
                        }}>
                          {inst.initials}
                        </span>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {inst.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 3-Item Legend strictly matching requirement */}
            <div style={{
              position: 'absolute',
              bottom: '62px',
              left: '12px',
              zIndex: 10,
              background: 'rgba(7, 31, 26, 0.92)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.35)'
            }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                Overlap Key:
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: OVERLAP_COLORS.land_deed }} />
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#f8fafc' }}>Land deed</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: OVERLAP_COLORS.faculty }} />
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#f8fafc' }}>Faculty</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: OVERLAP_COLORS.fire_noc }} />
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#f8fafc' }}>Fire NOC</span>
              </div>
            </div>

            {/* Bottom Controls: Filter Chips & Time Scrubber */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              right: '10px',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
              background: 'rgba(7, 31, 26, 0.94)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(52, 211, 153, 0.25)',
              borderRadius: '10px',
              padding: '8px 12px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
            }}>
              {/* Filter Chips */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255, 255, 255, 0.55)', textTransform: 'uppercase' }}>
                  Filter:
                </span>
                {[
                  { id: 'ALL', label: 'All' },
                  { id: 'land_deed', label: 'Land deeds', color: OVERLAP_COLORS.land_deed },
                  { id: 'faculty', label: 'Faculty', color: OVERLAP_COLORS.faculty },
                  { id: 'fire_noc', label: 'Fire NOC', color: OVERLAP_COLORS.fire_noc }
                ].map(chip => {
                  const isActive = activeFilter === chip.id;
                  return (
                    <button
                      key={chip.id}
                      onClick={() => setActiveFilter(chip.id as any)}
                      style={{
                        background: isActive
                          ? chip.color ? `${chip.color}33` : 'rgba(212, 160, 52, 0.25)'
                          : 'rgba(255, 255, 255, 0.06)',
                        border: isActive
                          ? `1.5px solid ${chip.color || 'var(--accent-gold)'}`
                          : '1px solid rgba(255, 255, 255, 0.12)',
                        color: isActive ? '#ffffff' : '#cbd5e1',
                        padding: '3px 9px',
                        borderRadius: '16px',
                        fontSize: '10px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {chip.color && (
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: chip.color }} />
                      )}
                      {chip.label}
                    </button>
                  );
                })}
              </div>

              {/* Time Scrubber */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setIsPlayingTimeline(!isPlayingTimeline)}
                  style={{
                    background: isPlayingTimeline ? '#ef4444' : 'var(--accent-gold)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#071f1a'
                  }}
                  title={isPlayingTimeline ? 'Pause playback' : 'Play timeline progression'}
                >
                  {isPlayingTimeline ? <Pause size={11} /> : <Play size={11} style={{ marginLeft: '1px' }} />}
                </button>
                <button
                  onClick={() => { setSelectedYear(2023); setIsPlayingTimeline(false); }}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#cbd5e1'
                  }}
                  title="Reset to 2023"
                >
                  <RotateCcw size={10} />
                </button>
                <span style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>
                  AY:
                </span>
                <input
                  type="range"
                  min="2023"
                  max="2027"
                  step="1"
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(parseInt(e.target.value));
                    setIsPlayingTimeline(false);
                  }}
                  style={{
                    width: '90px',
                    accentColor: 'var(--accent-gold)',
                    cursor: 'pointer'
                  }}
                />
                <span style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: 'var(--accent-gold)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {selectedYear}
                </span>
              </div>
            </div>

            {/* Stable ForceGraph2D Canvas */}
            <ForceGraph2D
              ref={fgRef as any}
              width={canvasDimensions.width}
              height={canvasDimensions.height}
              graphData={{
                nodes: visibleNodes,
                links: visibleLinks
              }}
              backgroundColor="#071f1a"
              nodeRelSize={7}
              nodeCanvasObject={renderNode}
              linkCanvasObject={renderLink}
              onRenderFramePre={renderBackground}
              onNodeHover={(node) => setHoveredNode(node as any)}
              onNodeClick={(node) => {
                if (node) setSelectedNode(node as any);
              }}
              cooldownTicks={0}
              warmupTicks={0}
              enableNodeDrag={true}
            />
          </div>

          {/* RIGHT: Dedicated Permanent Inspector Box */}
          <div
            style={{
              background: 'var(--bg-surface-elevated)',
              border: '1.5px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: 'var(--shadow-md)',
              overflowY: 'auto',
              minHeight: '540px'
            }}
          >
            {/* Box Header */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                <span style={{
                  background: selectedNode.type === 'INSTITUTION' ? '#10b981' : '#f59e0b',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '2px 7px',
                  borderRadius: '5px'
                }}>
                  {selectedNode.type}
                </span>
                {activeFinding ? (
                  <span style={{
                    background: activeFinding.severity === 'CRITICAL' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    color: activeFinding.severity === 'CRITICAL' ? 'var(--status-reject-text)' : 'var(--status-review-text)',
                    border: activeFinding.severity === 'CRITICAL' ? '1px solid #ef4444' : '1px solid #f59e0b',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '2px 7px',
                    borderRadius: '5px'
                  }}>
                    {activeFinding.severity} SEVERITY
                  </span>
                ) : (
                  <span className="badge badge-pass" style={{ fontSize: '10px' }}>VERIFIED</span>
                )}
              </div>

              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', marginTop: '8px', lineHeight: 1.3 }}>
                {activeFinding ? activeFinding.title : selectedNode.name}
              </h3>
            </div>

            {/* Plain-English Advisory Explanation */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Plain-English Observation:
              </span>
              <p style={{ fontSize: '12px', color: 'var(--text-main)', lineHeight: 1.5, margin: 0 }}>
                {activeFinding
                  ? activeFinding.plainEnglish
                  : `Active entity in regulatory topology. Linked to ${selectedNode.academicYear || 'AY 2026-27'} compliance verification dossiers.`}
              </p>
            </div>

            {/* 3 Horizontal Confidence Bars for Contributing Factors */}
            {activeFinding?.factors && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Contributing Factor Confidence:
                </span>
                {activeFinding.factors.map((factor, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                      <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{factor.label}</span>
                      <span style={{ color: 'var(--accent-gold-dark)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                        {factor.confidence}%
                      </span>
                    </div>
                    {/* Bar Track */}
                    <div style={{
                      width: '100%',
                      height: '6px',
                      background: 'rgba(38, 61, 57, 0.15)',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${factor.confidence}%`,
                        height: '100%',
                        background: factor.confidence >= 95
                          ? 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)'
                          : 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
                        borderRadius: '3px'
                      }} />
                    </div>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                      {factor.detail}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Associated Filing Dossier Info */}
            <div style={{
              background: 'var(--bg-surface)',
              borderRadius: '8px',
              padding: '10px 12px',
              border: '1px solid var(--border-subtle)',
              fontSize: '11px'
            }}>
              <div style={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '9px' }}>
                Referenced Case Dossier
              </div>
              <div style={{ color: 'var(--text-main)', fontWeight: 700, marginTop: '2px' }}>
                {selectedNode.applicationId || 'DEMO-EOA-2026-001'}
              </div>
              <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>
                Filing Cycle: {selectedNode.academicYear || 'AY 2026-27'}
              </div>
            </div>

            {/* Primary Gold "Open Case Review" Button */}
            <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
              <button
                onClick={() => {
                  if (activeFinding && onOpenCaseReview) {
                    onOpenCaseReview(activeFinding);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '9px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: '#071f1a',
                  fontWeight: 800,
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 18px rgba(245, 158, 11, 0.35)',
                  transition: 'all 0.15s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                <Sparkles size={15} />
                <span>Open Case Review</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* WCAG 2.2 AA Accessible Table View */
        <div className="table-wrapper" style={{ marginTop: '10px' }}>
          <table className="data-table" aria-label="Evidence Traceability Matrix">
            <thead>
              <tr>
                <th scope="col">Entity / Node</th>
                <th scope="col">Type</th>
                <th scope="col">Overlap Classification</th>
                <th scope="col">Risk Level</th>
                <th scope="col">Connected Institutions</th>
                <th scope="col">Observation Rationale</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {GRAPH_NODES.filter(n => n.finding).map(node => (
                <tr key={node.id}>
                  <td>
                    <strong>{node.name}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{node.id}</div>
                  </td>
                  <td>
                    <span className="badge badge-info">{node.type}</span>
                  </td>
                  <td>
                    <span style={{
                      fontWeight: 700,
                      color: node.category ? OVERLAP_COLORS[node.category] : 'inherit'
                    }}>
                      {node.category === 'land_deed' ? 'Land Deed Survey 44/2' : node.category === 'faculty' ? 'Faculty Roster PAN Match' : 'Municipal Fire NOC'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${node.isHighRisk ? 'badge-review' : 'badge-pass'}`}>
                      {node.finding?.severity || 'NORMAL'}
                    </span>
                  </td>
                  <td>
                    {node.clusterId === 'cluster-pune-land' ? 'AK, SP, VV (3 Institutions)' : 'MI, CE (2 Institutions)'}
                  </td>
                  <td style={{ fontSize: '12px' }}>
                    {node.finding?.plainEnglish}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        setSelectedNode(node);
                        setViewMode('VISUAL');
                      }}
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AccessibleGraph;
