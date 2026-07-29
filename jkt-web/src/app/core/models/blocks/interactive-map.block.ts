import { TranslatedString } from '../translated';

export interface MapMarkerItem {
  id: string;
  label: TranslatedString;
  lat: number;
  lng: number;
}

export interface InteractiveMapBlockData {
  title: TranslatedString;
  center: { lat: number; lng: number };
  zoom: number;
  markers: MapMarkerItem[];
}

