import { useDraggable } from '@/hooks/useDraggable';
import { cn } from '@/lib/utils';
import type { Event } from '@/types/event';

interface DraggableEventProps {
    event: Event;
}

export function DraggableEvent({ event }: DraggableEventProps) {
    const { dragRef } = useDraggable({
        type: 'event',
        item: event,
    });

    const colorClasses = {
        default: 'bg-secondary',
        work: 'bg-blue-100 dark:bg-blue-900',
        personal: 'bg-green-100 dark:bg-green-900',
        other: 'bg-purple-100 dark:bg-purple-900',
    };

    return (
        <div
            ref={dragRef}
            className={cn(
                'text-xs p-1 rounded cursor-move truncate',
                colorClasses[event.color || 'default']
            )}
        >
            {event.title}
        </div>
    );
}