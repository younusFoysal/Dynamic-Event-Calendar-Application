import { useDroppable } from '@/hooks/useDraggable';
import { cn } from '@/lib/utils';
import type { Event } from '@/types/event';

interface DroppableDayProps {
    date: Date;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    onDrop: (event: Event) => void;
}

export function DroppableDay({  children, className, onClick, onDrop }: DroppableDayProps) {
    const { dropRef, isOver } = useDroppable({
        accept: 'event',
        onDrop,
    });

    const handleClick = (e: React.MouseEvent) => {
        // Prevent click when dropping
        if (isOver) {
            e.preventDefault();
            return;
        }
        onClick?.();
    };

    return (
        <div
            ref={dropRef}
            onClick={handleClick}
            className={cn(className, {
                'ring-2 ring-primary ring-inset': isOver,
            })}
        >
            {children}
        </div>
    );
}