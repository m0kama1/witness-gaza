
import React, { useState } from 'react';
import { DISPLACEMENT_PATHS } from '../constants';
import { Incident, Category, DisplacementPath, Region } from '../types';
import { MapPin, Layers, Users, MoveLeft } from 'lucide-react';

interface GazaMapProps {
  incidents: Incident[];
  onSelectIncident: (incident: Incident) => void;
}

const GazaMap: React.FC<GazaMapProps> = ({ incidents, onSelectIncident }) => {
  const [hoveredIncident, setHoveredIncident] = useState<Incident | null>(null);
  const [showPopulationDensity, setShowPopulationDensity] = useState(false);
  const [showDisplacementPaths, setShowDisplacementPaths] = useState(true);

  return (
    <div className="relative bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden aspect-[4/5] md:aspect-auto h-full flex items-center justify-center p-8 transition-all">
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      {/* Dynamic Background Layer: Population Density Simulation */}
      {showPopulationDensity && (
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none transition-opacity duration-500" style={{ 
          background: 'radial-gradient(circle at 35% 30%, #ff4d4d 0%, transparent 40%), radial-gradient(circle at 75% 90%, #ff4d4d 0%, transparent 30%), radial-gradient(circle at 65% 80%, #ff4d4d 0%, transparent 30%)' 
        }} />
      )}

      {/* Gaza SVG Outline */}
      <svg viewBox="0 0 100 100" className="w-full h-full max-h-[500px] drop-shadow-[0_0_20px_rgba(239,68,68,0.1)] z-10">
        <defs>
          <marker id="arrowhead" markerWidth="3" markerHeight="3" refX="2" refY="1.5" orient="auto">
            <polygon points="0 0, 3 1.5, 0 3" fill="#666" fillOpacity="0.5" />
          </marker>
        </defs>

        {/* Boundary */}
        <path
          d="M 20 10 L 35 15 L 45 40 L 70 80 L 80 95 L 75 98 L 50 85 L 25 50 L 15 25 Z"
          fill="#111"
          stroke="#444"
          strokeWidth="0.5"
          className="transition-colors hover:fill-[#151515]"
        />
        
        {/* Displacement Paths Layer */}
        {showDisplacementPaths && DISPLACEMENT_PATHS.map((path) => (
          <g key={path.id} className="opacity-40 hover:opacity-100 transition-opacity">
            <line
              x1={path.from.x}
              y1={path.from.y}
              x2={path.to.x}
              y2={path.to.y}
              stroke="#666"
              strokeWidth={1 * path.intensity}
              strokeDasharray="2 1"
              markerEnd="url(#arrowhead)"
            />
          </g>
        ))}

        {/* Geographic Zones (Approximate) */}
        <text x="25" y="20" className="text-[2.5px] fill-zinc-600 font-bold uppercase tracking-widest pointer-events-none">{Region.NORTH_GAZA}</text>
        <text x="35" y="45" className="text-[2.5px] fill-zinc-600 font-bold uppercase tracking-widest pointer-events-none">{Region.GAZA_CITY}</text>
        <text x="50" y="65" className="text-[2.5px] fill-zinc-600 font-bold uppercase tracking-widest pointer-events-none">{Region.MIDDLE_AREA}</text>
        <text x="65" y="80" className="text-[2.5px] fill-zinc-600 font-bold uppercase tracking-widest pointer-events-none">{Region.KHAN_YUNIS}</text>
        <text x="75" y="92" className="text-[2.5px] fill-zinc-600 font-bold uppercase tracking-widest pointer-events-none">{Region.RAFAH}</text>

        {/* Incident Pins */}
        {incidents.map((incident) => (
          <g 
            key={incident.id} 
            className="cursor-pointer group"
            onMouseEnter={() => setHoveredIncident(incident)}
            onMouseLeave={() => setHoveredIncident(null)}
            onClick={() => onSelectIncident(incident)}
          >
            <circle
              cx={incident.coordinates.x}
              cy={incident.coordinates.y}
              r="1.5"
              fill={
                incident.category === Category.HEALTHCARE ? '#3b82f6' :
                incident.category === Category.INFRASTRUCTURE ? '#10b981' :
                incident.category === Category.CULTURAL ? '#f59e0b' :
                '#ef4444'
              }
              className="animate-pulse"
            />
            <circle
              cx={incident.coordinates.x}
              cy={incident.coordinates.y}
              r="4"
              fill="white"
              fillOpacity="0"
              stroke="white"
              strokeOpacity="0.1"
              className="group-hover:stroke-opacity-50 transition-all"
            />
          </g>
        ))}
      </svg>

      {/* Hover Info Tooltip */}
      {hoveredIncident && (
        <div className="absolute bottom-10 right-10 p-4 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl animate-in slide-in-from-bottom-2 duration-200 z-50 w-64 text-right">
          <h4 className="font-bold text-white text-sm mb-1">{hoveredIncident.title}</h4>
          <p className="text-zinc-400 text-[10px] mb-2">{hoveredIncident.date} • {hoveredIncident.region}</p>
          <div className="flex justify-end items-center gap-2">
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-300 font-bold uppercase">{hoveredIncident.category}</span>
          </div>
        </div>
      )}

      {/* Map Layer Controls */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
        <div className="bg-[#1a1a1a] border border-white/5 p-4 rounded-xl space-y-3">
          <h5 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-3 h-3" />
            الطبقات
          </h5>
          <div className="space-y-2">
            <button 
              onClick={() => setShowPopulationDensity(!showPopulationDensity)}
              className={`flex items-center justify-between w-full gap-4 text-[10px] p-2 rounded transition-all ${showPopulationDensity ? 'bg-red-500/10 text-red-500' : 'text-zinc-500 hover:bg-white/5'}`}
            >
              <div className="flex items-center gap-2"><Users className="w-3 h-3" /> الكثافة</div>
              <div className={`w-2 h-2 rounded-full ${showPopulationDensity ? 'bg-red-500' : 'bg-zinc-700'}`} />
            </button>
            <button 
              onClick={() => setShowDisplacementPaths(!showDisplacementPaths)}
              className={`flex items-center justify-between w-full gap-4 text-[10px] p-2 rounded transition-all ${showDisplacementPaths ? 'bg-zinc-100 text-black' : 'text-zinc-500 hover:bg-white/5'}`}
            >
              <div className="flex items-center gap-2"><MoveLeft className="w-3 h-3" /> الحركات</div>
              <div className={`w-2 h-2 rounded-full ${showDisplacementPaths ? 'bg-white' : 'bg-zinc-700'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 text-[10px] text-zinc-500">
        البيانات المكانية: أوتشا / OpenStreetMap
      </div>
    </div>
  );
};

export default GazaMap;
