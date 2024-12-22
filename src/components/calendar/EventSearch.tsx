import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useEvents } from '@/hooks/useEvents';

export function EventSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { filterEvents } = useEvents();

  const filteredEvents = filterEvents(search);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Search className="h-4 w-4 mr-2" />
          Search Events
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search Events</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="max-h-[400px] overflow-y-auto space-y-4">
            {Object.entries(filteredEvents).map(([date, events]) => (
              <div key={date}>
                <h3 className="font-semibold mb-2">{date}</h3>
                <div className="space-y-2">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 rounded-lg bg-accent"
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {event.startTime} - {event.endTime}
                      </div>
                      {event.description && (
                        <div className="text-sm mt-1">{event.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {Object.keys(filteredEvents).length === 0 && (
              <p className="text-center text-muted-foreground">
                No events found matching your search.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}