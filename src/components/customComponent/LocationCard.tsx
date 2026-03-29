import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import avatarSrc from '@/assets/sarff.jpg';

const LOCATION = {
  lat: 22.9121,
  lng: 113.8683,
  name: 'Dongguan, China',
};

export const LocationCard = () => {
  const avatarIcon = L.divIcon({
    className: 'custom-marker bg-transparent',
    html: `
      <div class="relative flex-center">
        <div class="absolute h-12 w-12 animate-[ping_2s_linear_infinite] rounded-full bg-[#007bff]/60"></div>
        
        <div class="absolute h-8 w-8 rounded-full bg-[#007bff]/20 blur-sm"></div>

        <div class="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/80 shadow-2xl bg-white flex-center">
          <img 
            src=${avatarSrc} 
            style="width: 100%; height: 100%; object-fit: cover; " 
            alt="avatar" 
          />
        </div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });

  return (
    <div className="w-full overflow-hidden rounded-[32px] border border-zinc-800 p-6">
      <div className="mb-6">
        <p className="mt-1 text-primary/80 dark:text-white/60">
          Currently living in{' '}
          <span className="font-bold text-primary dark:text-white">
            {LOCATION.name}
          </span>
          .
        </p>
      </div>

      <div className="relative h-80 w-full overflow-hidden rounded-[24px]">
        <MapContainer
          center={[LOCATION.lat, LOCATION.lng]}
          zoom={8}
          scrollWheelZoom={false}
          zoomControl={false}
          attributionControl={false}
          className="pointer-events-none h-full w-full contrast-[1.05] grayscale-[0.2]"
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

          <Marker position={[LOCATION.lat, LOCATION.lng]} icon={avatarIcon} />
        </MapContainer>
      </div>
    </div>
  );
};
