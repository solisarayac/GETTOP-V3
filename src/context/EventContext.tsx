import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface EventData {
  id: string;
  name: string;
  date: string;
  location: string;
  mapsUrl: string;
}

interface EventsContextType {
  events: EventData[];
  addEvent: (event: Omit<EventData, 'id'>) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<EventData[]>([
    {
      id: '1',
      name: 'Copa Juvenil - Cancha de Baloncesto San Rafael',
      date: '16 Oct 2025, 5:00 PM',
      location: 'San Rafael de Escazú',
      mapsUrl: 'https://www.google.com/maps?q=Cancha+de+Baloncesto+San+Rafael+Escazú',
    },
    {
      id: '2',
      name: 'Torneo libre - Cancha de Baloncesto San Rafael',
      date: '22 Oct 2025, 3:30 PM',
      location: 'San Salvador',
      mapsUrl: 'https://www.google.com/maps?q=Cancha+de+Baloncesto+San+Rafael+Escazú',
    },
  ]);

  const addEvent = (event: Omit<EventData, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setEvents((prev) => [...prev, newEvent]);
  };

  return (
    <EventsContext.Provider value={{ events, addEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) throw new Error('useEvents must be used within an EventsProvider');
  return context;
};