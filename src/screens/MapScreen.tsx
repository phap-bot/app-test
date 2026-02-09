import { useEffect, useRef } from 'react';
import '../AppModern.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
// (Leaflet's default icon path issues with webpack/vite)
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapScreenProps {
    onBack: () => void;
    location: {
        lat: number;
        lng: number;
        title: string;
    } | null;
}

export function MapScreen({ onBack, location }: MapScreenProps) {
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            // Initialize map
            // Default to Aspen if no location provided
            const initialLat = location?.lat || 39.1911;
            const initialLng = location?.lng || -106.8175;

            mapRef.current = L.map(mapContainerRef.current).setView([initialLat, initialLng], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapRef.current);

            // Add marker if location exists
            if (location) {
                L.marker([location.lat, location.lng])
                    .addTo(mapRef.current)
                    .bindPopup(location.title)
                    .openPopup();
            }
        }

        // Update view if location changes
        if (mapRef.current && location) {
            mapRef.current.setView([location.lat, location.lng], 15);
            // Clear existing markers (simple way, or track them used refs)
            mapRef.current.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    layer.remove();
                }
            });
            L.marker([location.lat, location.lng])
                .addTo(mapRef.current)
                .bindPopup(location.title)
                .openPopup();
        }

    }, [location]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    return (
        <div className="phone__inner" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
            <header className="phone-header" style={{ padding: '20px', background: 'white', zIndex: 10, position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button className="icon-badge" onClick={onBack} aria-label="Back">
                        <span className="chevron" style={{ transform: 'rotate(135deg)', marginLeft: '4px' }} />
                    </button>
                    <h2 className="phone-header__title" style={{ fontSize: '20px', margin: 0 }}>Map View</h2>
                </div>
            </header>

            <div
                ref={mapContainerRef}
                style={{ flex: 1, width: '100%', height: '100%', outline: 'none' }}
            />
        </div>
    );
}
