import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label: string;
  type: 'boss' | 'resource' | 'base' | 'portal' | 'danger';
  description: string;
}

const markers: MapMarker[] = [
  { id: 'm1', lat: 50.5, lng: 30.5, label: 'Город Хроники', type: 'base', description: 'Главный город сервера. Рынок, Храм, порталы.' },
  { id: 'm2', lat: 51.2, lng: 29.8, label: 'Логово Тролля', type: 'boss', description: 'Каменный тролль. Осторожно: дробящий урон.' },
  { id: 'm3', lat: 49.8, lng: 31.2, label: 'Железная жила', type: 'resource', description: 'Богатое месторождение. Болотный биом.' },
  { id: 'm4', lat: 50.9, lng: 31.5, label: 'Портал: Горы', type: 'portal', description: 'Переход в ресурсный мир Горы.' },
  { id: 'm5', lat: 50.1, lng: 29.5, label: 'Лагерь Рейдеров', type: 'danger', description: 'Враждебная территория. PvP зона.' },
  { id: 'm6', lat: 51.5, lng: 30.2, label: 'Курган Древнего', type: 'boss', description: 'Подземелье. Босс: Король-Драугр.' },
];

const iconColors: Record<string, string> = {
  boss: '#8b1a1a',
  resource: '#d4af37',
  base: '#4a6b4d',
  portal: '#6b4a8b',
  danger: '#c44',
};

export function WorldMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [50.5, 30.5],
      zoom: 10,
      zoomControl: false,
      attributionControl: false,
    });

    // Dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Add markers
    markers.forEach(marker => {
      const color = iconColors[marker.type];
      
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width: 24px;
          height: 24px;
          background: ${color};
          border: 2px solid rgba(212, 175, 55, 0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px ${color}80;
          cursor: pointer;
        "><span style="color: white; font-size: 10px; font-weight: bold;">${marker.type === 'boss' ? '☠' : marker.type === 'resource' ? '◆' : marker.type === 'portal' ? 'ᛟ' : marker.type === 'danger' ? '⚠' : '⌂'}</span></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const m = L.marker([marker.lat, marker.lng], { icon }).addTo(map);
      m.bindPopup(`
        <div style="
          background: #1a231d;
          color: #e8e4dc;
          padding: 12px;
          border-radius: 6px;
          border: 1px solid rgba(212, 175, 55, 0.2);
          font-family: Inter, sans-serif;
          min-width: 180px;
        ">
          <div style="font-weight: bold; color: #d4af37; margin-bottom: 4px; font-size: 13px;">${marker.label}</div>
          <div style="font-size: 11px; color: #b8b4aa; line-height: 1.4;">${marker.description}</div>
          <div style="font-size: 9px; color: #7a7668; margin-top: 6px; text-transform: uppercase; letter-spacing: 1px;">${marker.type}</div>
        </div>
      `, {
        className: 'custom-popup',
      });
    });

    // Add zoom control to bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-[500px] rounded-lg overflow-hidden border border-norse-gold/15" />
      
      {/* Legend */}
      <div className="absolute top-4 left-4 glass-dark rounded-lg p-3 z-[1000]">
        <div className="text-[10px] text-norse-gold uppercase tracking-wider mb-2 font-semibold">Легенда</div>
        <div className="space-y-1.5">
          {Object.entries(iconColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: color }} />
              <span className="text-[10px] text-norse-muted capitalize">{type === 'boss' ? 'Босс' : type === 'resource' ? 'Ресурс' : type === 'base' ? 'База' : type === 'portal' ? 'Портал' : 'Опасность'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
