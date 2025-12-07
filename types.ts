export enum UserRole {
  PASSENGER = 'PASSENGER',
  DRIVER = 'DRIVER',
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface Stop {
  id: string;
  name: string;
  nameMl: string; // Malayalam name
  coords: Coordinates;
}

export interface Schedule {
  stopId: string;
  arrivalTime: string;
}

export interface Bus {
  id: string;
  name: string;
  routeStart: string;
  routeEnd: string;
  currentLocation: Coordinates; // 0-100 percentage along the route for simulation
  status: 'ON_TIME' | 'DELAYED' | 'NOT_STARTED';
  nextStop: string;
  schedule: Schedule[];
  driverId?: string;
  capacity: number;
  occupied: number;
}

export interface Passenger {
  id: string;
  name: string;
  seatNumber: string;
  destination: string;
  status: 'BOARDED' | 'WAITING';
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
