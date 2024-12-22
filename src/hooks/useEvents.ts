import { useCallback, useEffect, useState } from 'react';
import type { DayEvents, Event } from '@/types/event';
import { toast } from 'sonner';

const STORAGE_KEY = 'calendar-events';

export function useEvents() {
    const [events, setEvents] = useState<DayEvents>(() => {
        // Initialize from localStorage on mount
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    });

    // Save to localStorage whenever events change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
        console.log('Updated events:', events); // Log updated events
    }, [events]);

    const addEvent = useCallback(
        (event: Event) => {
            setEvents((currentEvents) => {
                console.log('Current addEvent:', currentEvents);
                // Check for overlapping events
                const dayEvents = currentEvents[event.date] || [];
                const hasOverlap = dayEvents.some(
                    (existingEvent) =>
                        (event.startTime >= existingEvent.startTime &&
                            event.startTime < existingEvent.endTime) ||
                        (event.endTime > existingEvent.startTime &&
                            event.endTime <= existingEvent.endTime)
                );

                if (hasOverlap) {
                    throw new Error('Event overlaps with an existing event');
                }

                // Add new event and sort by start time
                const updatedDayEvents = [...dayEvents, event].sort((a, b) =>
                    a.startTime.localeCompare(b.startTime)
                );

                const newEvents = {
                    ...currentEvents,
                    [event.date]: updatedDayEvents,
                };

                toast.success('Event added successfully');
                console.log('New events after adding:', newEvents); // Log updated state immediately
                return newEvents;
            });
        },
        []
    );

    const updateEvent = useCallback(
        (event: Event) => {
            setEvents((currentEvents) => {
                console.log('Current updateEvent:', currentEvents);
                const newEvents = { ...currentEvents };

                // Remove event from old date if it changed
                Object.keys(newEvents).forEach((date) => {
                    newEvents[date] = newEvents[date].filter((e) => e.id !== event.id);
                    if (newEvents[date].length === 0) {
                        delete newEvents[date];
                    }
                });

                // Add event to new date
                if (!newEvents[event.date]) {
                    newEvents[event.date] = [];
                }
                newEvents[event.date].push(event);
                newEvents[event.date].sort((a, b) => a.startTime.localeCompare(b.startTime));

                toast.success('Event updated successfully');
                console.log('New events after updating:', newEvents); // Log updated state immediately
                return newEvents;
            });
        },
        []
    );

    const deleteEvent = useCallback(
        (date: string, eventId: string) => {
            setEvents((currentEvents) => {
                console.log('Current deleteEvent:', currentEvents);
                const newEvents = { ...currentEvents };
                if (!newEvents[date]) return currentEvents;

                newEvents[date] = newEvents[date].filter((e) => e.id !== eventId);
                if (newEvents[date].length === 0) {
                    delete newEvents[date];
                }

                toast.success('Event deleted successfully');
                console.log('New events after deleting:', newEvents); // Log updated state immediately
                return newEvents;
            });
        },
        []
    );

    const getEventsForDate = useCallback(
        (date: string) => {
            const eventsForDate = events[date] || [];
            //console.log(`Events for ${date}:`, eventsForDate);
            return eventsForDate;
        },
        [events]
    );

    const filterEvents = useCallback(
        (keyword: string) => {
            if (!keyword.trim()) return {};

            const filteredEvents: DayEvents = {};
            Object.entries(events).forEach(([date, dayEvents]) => {
                const filtered = dayEvents.filter(
                    (event) =>
                        event.title.toLowerCase().includes(keyword.toLowerCase()) ||
                        (event.description &&
                            event.description.toLowerCase().includes(keyword.toLowerCase()))
                );
                if (filtered.length > 0) {
                    filteredEvents[date] = filtered;
                }
            });
            return filteredEvents;
        },
        [events]
    );

    return {
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        getEventsForDate,
        filterEvents,
    };
}
