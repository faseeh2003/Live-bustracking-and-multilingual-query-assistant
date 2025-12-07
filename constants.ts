import { Bus, Passenger, Stop } from './types';

// Simplified coordinate system for the schematic map (0-100 grid)
export const STOPS: Stop[] = [
  { id: 'KTM', name: 'Kottayam', nameMl: 'കോട്ടയം', coords: { x: 20, y: 80 } },
  { id: 'ETM', name: 'Ettumanoor', nameMl: 'ഏറ്റുമാനൂർ', coords: { x: 35, y: 65 } },
  { id: 'VAI', name: 'Vaikom', nameMl: 'വൈക്കം', coords: { x: 20, y: 50 } },
  { id: 'TRP', name: 'Thrippunithura', nameMl: 'തൃപ്പൂണിത്തുറ', coords: { x: 50, y: 30 } },
  { id: 'EKM', name: 'Ernakulam', nameMl: 'എറണാകുളം', coords: { x: 60, y: 15 } },
  { id: 'ALU', name: 'Aluva', nameMl: 'ആലുവ', coords: { x: 75, y: 10 } },
];

export const MOCK_PASSENGERS: Passenger[] = [
  { id: 'P1', name: 'Rahul Nair', seatNumber: 'A1', destination: 'Ernakulam', status: 'WAITING' },
  { id: 'P2', name: 'Sarah Joseph', seatNumber: 'A2', destination: 'Thrippunithura', status: 'BOARDED' },
  { id: 'P3', name: 'Vishnu P', seatNumber: 'B1', destination: 'Aluva', status: 'WAITING' },
];

export const INITIAL_BUSES: Bus[] = [
  {
    id: 'B001',
    name: 'Super Fast: Kottayam - Ernakulam',
    routeStart: 'KTM',
    routeEnd: 'EKM',
    currentLocation: { x: 20, y: 80 }, // Starts at KTM
    status: 'ON_TIME',
    nextStop: 'Ettumanoor',
    capacity: 40,
    occupied: 25,
    schedule: [
      { stopId: 'KTM', arrivalTime: '10:00 AM' },
      { stopId: 'ETM', arrivalTime: '10:30 AM' },
      { stopId: 'TRP', arrivalTime: '11:45 AM' },
      { stopId: 'EKM', arrivalTime: '12:15 PM' },
    ],
  },
  {
    id: 'B002',
    name: 'Fast Passenger: Vaikom - Aluva',
    routeStart: 'VAI',
    routeEnd: 'ALU',
    currentLocation: { x: 50, y: 30 }, // Near TRP
    status: 'DELAYED',
    nextStop: 'Ernakulam',
    capacity: 50,
    occupied: 42,
    schedule: [
      { stopId: 'VAI', arrivalTime: '09:00 AM' },
      { stopId: 'TRP', arrivalTime: '10:15 AM' },
      { stopId: 'EKM', arrivalTime: '10:45 AM' },
      { stopId: 'ALU', arrivalTime: '11:15 AM' },
    ],
  },
];

// Context for AI
export const CSV_CONTEXT = `
DATASET:
Route 1: Kottayam -> Ettumanoor -> Thrippunithura -> Ernakulam. Fare: ₹95. Type: Super Fast.
Route 2: Vaikom -> Thrippunithura -> Ernakulam -> Aluva. Fare: ₹70. Type: Fast Passenger.

SCHEDULES:
Bus B001 (Super Fast): KTM 10:00 -> ETM 10:30 -> TRP 11:45 -> EKM 12:15.
Bus B002 (Fast Passenger): VAI 09:00 -> TRP 10:15 -> EKM 10:45 -> ALU 11:15.
Bus B003 (Low Floor AC): KTM 14:00 -> EKM 16:00. Fare: ₹180.

FAQ:
- Concession available for students with ID.
- Luggage charges apply for bags over 10kg.
`;
