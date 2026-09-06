'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Business } from '@/lib/data/demo';

/**
 * Lagos map of search results. Client-only (Leaflet needs window).
 * Free OpenStreetMap tiles — no API key, no per-load billing.
 * The view auto-fits the visible results and follows filter changes.
 */

function pinIcon(business: Business, selected: boolean) {
  const fill = selected ? '#C25F04' : '#1F5C45';
  return L.divIcon({
    className: 'finda-pin',
    html: `<span style="
      display:flex;align-items:center;justify-content:center;
      width:${selected ? 36 : 30}px;height:${selected ? 36 : 30}px;
      background:${fill};color:#fff;border:2.5px solid #F7F5F0;
      border-radius:50% 50% 50% 4px;transform:rotate(-45deg);
      box-shadow:0 4px 12px rgba(28,26,21,.35);
      font-size:${selected ? 15 : 13}px;
    "><span style="transform:rotate(45deg)">📍</span></span>`,
    iconSize: [selected ? 36 : 30, selected ? 36 : 30],
    iconAnchor: [selected ? 18 : 15, selected ? 36 : 30],
    popupAnchor: [0, -(selected ? 30 : 26)],
  });
}

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 14, { animate: true });
    } else {
      map.fitBounds(
        points.map((p) => [p[0], p[1]] as [number, number]),
        { padding: [40, 40], animate: true }
      );
    }
  }, [map, points]);
  return null;
}

export default function ResultsMap({
  businesses,
  selectedId,
  onSelect,
}: {
  businesses: Business[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}) {
  const points = useMemo<[number, number][]>(
    () => businesses.map((b) => [b.lat, b.lng]),
    [businesses]
  );

  // Lagos fallback center
  const center = useMemo<[number, number]>(() => {
    if (points.length === 0) return [6.5244, 3.3792];
    const lat = points.reduce((s, p) => s + p[0], 0) / points.length;
    const lng = points.reduce((s, p) => s + p[1], 0) / points.length;
    return [lat, lng];
  }, [points]);

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom={false}
      className="h-full w-full z-0"
      attributionControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds points={points} />
      {businesses.map((b) => (
        <Marker
          key={b.id}
          position={[b.lat, b.lng]}
          icon={pinIcon(b, b.id === selectedId)}
          eventHandlers={{ click: () => onSelect?.(b.id) }}
        >
          <Popup>
            <div className="min-w-[220px] max-w-[260px]">
              {b.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={b.image}
                  alt=""
                  className="w-full h-24 object-cover rounded-lg mb-2"
                  loading="lazy"
                />
              )}
              <div className="flex items-start justify-between gap-2 mb-1">
                <strong className="text-[15px] leading-tight">{b.name}</strong>
                {b.verified && (
                  <span className="text-[10px] font-bold text-[#1F5C45] whitespace-nowrap">✓ Verified</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                <span className="text-[#C08A0A]">★</span>
                {b.rating.toFixed(1)}
                <span>({b.reviewCount})</span>
                <span aria-hidden>·</span>
                <span>{'₦'.repeat(b.priceLevel)}</span>
              </div>
              <div className="text-xs text-gray-500 mb-2.5 flex items-center gap-1">
                <span aria-hidden>📍</span> {b.address}, {b.neighborhood}
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/business/${b.id}`}
                  className="flex-1 text-center px-2.5 py-1.5 rounded-lg bg-[#1F5C45] text-white text-xs font-semibold hover:brightness-110"
                >
                  View profile
                </Link>
                <Link
                  href={`/store/${b.slug}`}
                  className="flex-1 text-center px-2.5 py-1.5 rounded-lg border border-[#1F5C45] text-[#1F5C45] text-xs font-semibold hover:bg-[#E7F0EA]"
                >
                  Shop
                </Link>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
