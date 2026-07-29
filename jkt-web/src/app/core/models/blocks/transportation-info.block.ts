import { TranslatedString } from '../translated';

export interface ShuttleInfoItem {
  id: string;
  title: TranslatedString;
  time: TranslatedString;
  notes?: TranslatedString;
}

export interface ParkingInfoItem {
  id: string;
  title: TranslatedString;
  details?: TranslatedString;
}

export interface TransportationInfoBlockData {
  title: TranslatedString;
  shuttles: ShuttleInfoItem[];
  parking: ParkingInfoItem[];
}

