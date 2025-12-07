import React from 'react';
import { Bus, Stop } from '../types';
import { STOPS } from '../constants';
import { MapPin, Bus as BusIcon } from 'lucide-react';

interface MapVisualizerProps {
  buses: Bus[];
  userRole: 'PASSENGER' | 'DRIVER';
}

const MapVisualizer: React.FC<MapVisualizerProps> = ({ buses }) => {
  // Simple schematic map rendering
  
  // Draw connection lines between stops based on their sequence in constants
  // For demo, we just connect them sequentially for a rough route shape
  const renderRouteLines = () => {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <path
          d={`M ${STOPS[0].coords.x}% ${STOPS[0].coords.y}% 
             L ${STOPS[1].coords.x}% ${STOPS[1].coords.y}%
             L ${STOPS[2].coords.x}% ${STOPS[2].coords.y}%
             L ${STOPS[3].coords.x}% ${STOPS[3].coords.y}%
             L ${STOPS[4].coords.x}% ${STOPS[4].coords.y}%
             L ${STOPS[5].coords.x}% ${STOPS[5].coords.y}%`}
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="relative w-full h-full bg-slate-50 overflow-hidden rounded-xl shadow-inner border border-slate-200">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5" 
           style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {renderRouteLines()}

      {/* Stops */}
      {STOPS.map((stop) => (
        <div
          key={stop.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
          style={{ left: `${stop.coords.x}%`, top: `${stop.coords.y}%` }}
        >
          <div className="bg-white p-1.5 rounded-full shadow-md border-2 border-indigo-500 z-10 transition-transform group-hover:scale-110">
            <MapPin size={16} className="text-indigo-600" fill="currentColor" />
          </div>
          <div className="mt-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold text-slate-700 shadow border border-slate-100 whitespace-nowrap z-20">
            {stop.name}
            <div className="text-[8px] text-slate-500 font-normal text-center">{stop.nameMl}</div>
          </div>
        </div>
      ))}

      {/* Buses */}
      {buses.map((bus) => (
        <div
          key={bus.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-linear z-30"
          style={{ left: `${bus.currentLocation.x}%`, top: `${bus.currentLocation.y}%` }}
        >
          <div className={`relative p-2 rounded-full shadow-lg text-white ${bus.status === 'DELAYED' ? 'bg-red-500' : 'bg-green-500'}`}>
             <BusIcon size={20} fill="currentColor" />
             {/* Pulse effect */}
             <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${bus.status === 'DELAYED' ? 'bg-red-400' : 'bg-green-400'}`}></div>
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap">
            {bus.id}
          </div>
        </div>
      ))}
      
      {/* Legend */}
      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur p-2 rounded-lg shadow border border-slate-200 text-xs z-40">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>On Time</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span>Delayed</span>
        </div>
      </div>
    </div>
  );
};

export default MapVisualizer;
