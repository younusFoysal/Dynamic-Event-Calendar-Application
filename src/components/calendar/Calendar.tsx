import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DAYS,
  MONTHS,
  getDaysInMonth,
  isToday,
  isSameMonth,
  isWeekend,
  formatDate,
} from '@/lib/date-utils';
import { useEvents } from '@/hooks/useEvents';
import { EventDialog } from './EventDialog';
import { EventList } from './EventList';
import { EventSearch } from './EventSearch';
import { ExportButton } from './ExportButton';
import { DraggableEvent } from './DraggableEvent';
import { DroppableDay } from './DroppableDay';
import {Day} from "date-fns";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [allDays, setAllDays] = useState([]);

  const { events, getEventsForDate, updateEvent } = useEvents();
  //console.log(getEventsForDate)
  console.log("all E", events)

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const days = getDaysInMonth(year, month);

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    console.log("sected date", date);
    setIsDialogOpen(true);
  };

  // useEffect(() => {
  //   //gfh
  //
  //   setAllDays(getEventsForDate)
  // }, [selectedDate]);


  const handleEventDrop = (date: Date, event) => {
    const newDate = formatDate(date);
    if (event.date !== newDate) {
      updateEvent({ ...event, date: newDate });
    }
  };

  return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold">
                {MONTHS[month]} {year}
              </h2>
              <div className="flex space-x-2">
                <Button
                    className="bg-black border border-gray-500 hover:text-black group"
                    onClick={handlePreviousMonth}
                >
                  <ChevronLeft className="text-white group-hover:text-black text-md" />
                </Button>
                <Button
                    className="bg-black border border-gray-500 hover:text-black group"
                    onClick={handleNextMonth}
                >
                  <ChevronRight className="text-white group-hover:text-black text-md" />
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <EventSearch />
              <ExportButton month={month} year={year} />
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px w-full bg-muted rounded-lg overflow-hidden">
            {DAYS.map((day) => (
                <div key={day} className="bg-background p-4 text-center font-semibold">
                  {day}
                </div>
            ))}
            {days.map((date, index) => {
              const dateStr = formatDate(date);
              const dayEvents = getEventsForDate(dateStr);
              //console.log(dayEvents);

              return (
                  <DroppableDay
                      key={index}
                      date={date}
                      onDrop={(event) => handleEventDrop(date, event)}
                      onClick={() => handleDateClick(date)}
                      className={cn(
                          'h-[120px] w-[112px] p-4 bg-background hover:bg-accent transition-colors',
                          'flex flex-col items-start text-left',
                          {
                            'opacity-50': !isSameMonth(date, month),
                            'bg-accent/50': isWeekend(date),
                          }
                      )}
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary">
                  <span
                      className={cn({
                        'bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center':
                            isToday(date),
                      })}
                  >
                    {date.getDate()}
                  </span>
                    </div>
                    {dayEvents.length > 0 && (
                        <div className="mt-2 w-full space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                              <DraggableEvent key={event.id} event={event} />
                          ))}
                          {dayEvents.length > 2 && (
                              <div className="text-xs text-muted-foreground">
                                +{dayEvents.length - 2} more
                              </div>
                          )}
                        </div>
                    )}
                  </DroppableDay>
              );
            })}
          </div>

          {selectedDate && (
              <>
                <EventDialog
                    date={selectedDate}
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                />
                <EventList date={selectedDate} />
              </>
          )}
        </div>
      </div>
  );
}
