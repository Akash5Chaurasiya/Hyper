import React, { useEffect, useState } from 'react';
import WeekView from './weekView';
import CalendarEventHandler from './calendarEventHandler';

const GoogleCalendar = () => {
    const [events, setEvents] = useState(() => JSON.parse(localStorage.getItem('events')) || {});
    useEffect(() => {
        const saveToLocalStorage = () => {
            localStorage.setItem('events', JSON.stringify(events));
        };
        window.addEventListener('beforeunload', saveToLocalStorage);
        return () => {
            window.removeEventListener('beforeunload', saveToLocalStorage);
        };
    }, [events]);
    const addNewEvent = (event) => {
        event = {
            ...event,
            id: CalendarEventHandler.generateId(event),
        };
        setEvents((previousState) => ({
            ...previousState,
            ...CalendarEventHandler.add(previousState, event),
        }));
    };
    const updateEvent = (eventId, updatedEvent) => {
        setEvents((previousState) => ({
            ...previousState,
            ...CalendarEventHandler.update(eventId, updatedEvent, previousState),
        }));
    };
    const deleteEvent = (eventId) => {
        setEvents((previousState) => ({
            ...previousState,
            ...CalendarEventHandler.delete(eventId, previousState),
        }));
    };
    return (
        <WeekView
            events={events}
            onNewEvent={addNewEvent}
            onEventUpdate={updateEvent}
            onEventDelete={deleteEvent}
        />
    );
};

export default GoogleCalendar;
