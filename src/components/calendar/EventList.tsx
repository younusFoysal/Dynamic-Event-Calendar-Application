import { formatDate } from '@/lib/date-utils';
import { useEvents } from '@/hooks/useEvents';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EventDialog } from './EventDialog';
import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface EventListProps {
  date: Date;
}

export function EventList({ date }: EventListProps) {
  const { getEventsForDate, deleteEvent } = useEvents();
  const [editingEvent, setEditingEvent] = useState<string | null>(null);
  const events = getEventsForDate(formatDate(date));

  const handleDelete = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteEvent(formatDate(date), eventId);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Events for {formatDate(date)}</CardTitle>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p className="text-muted-foreground">No events scheduled for this day.</p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 rounded-lg bg-accent"
              >
                <div>
                  <h4 className="font-semibold">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {event.startTime} - {event.endTime}
                  </p>
                  {event.description && (
                    <p className="text-sm mt-1">{event.description}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                      className="bg-black border border-gray-500 hover:text-black group"
                    onClick={() => setEditingEvent(event.id)}
                  >
                    <Pencil className="h-4 w-4 text-white group-hover:text-black text-md" />
                  </Button>
                  <Button
                      className="bg-black border border-gray-500 hover:text-black group"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 className="h-4 w-4 text-white group-hover:text-black text-md" />
                  </Button>
                </div>
                {editingEvent === event.id && (
                  <EventDialog
                    date={date}
                    event={event}
                    open={true}
                    onOpenChange={(open) => !open && setEditingEvent(null)}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}