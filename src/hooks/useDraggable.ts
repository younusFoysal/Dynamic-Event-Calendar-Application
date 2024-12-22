import {useRef, useEffect, useState} from 'react';
import type { Event } from '@/types/event';

interface DraggableOptions {
    type: string;
    item: Event;
}

interface DroppableOptions {
    accept: string;
    onDrop: (item: Event) => void;
}

export function useDraggable({ type, item }: DraggableOptions) {
    const dragRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = dragRef.current;
        if (!element) return;

        const handleDragStart = (e: DragEvent) => {
            e.dataTransfer?.setData('application/json', JSON.stringify({ type, item }));
        };

        element.setAttribute('draggable', 'true');
        element.addEventListener('dragstart', handleDragStart);

        return () => {
            element.removeEventListener('dragstart', handleDragStart);
        };
    }, [type, item]);

    return { dragRef };
}

export function useDroppable({ accept, onDrop }: DroppableOptions) {
    const dropRef = useRef<HTMLDivElement>(null);
    const [isOver, setIsOver] = useState(false);

    useEffect(() => {
        const element = dropRef.current;
        if (!element) return;

        const handleDragOver = (e: DragEvent) => {
            e.preventDefault();
            setIsOver(true);
        };

        const handleDragLeave = () => {
            setIsOver(false);
        };

        const handleDrop = (e: DragEvent) => {
            e.preventDefault();
            setIsOver(false);

            const data = e.dataTransfer?.getData('application/json');
            if (!data) return;

            const { type, item } = JSON.parse(data);
            if (type !== accept) return;

            onDrop(item);
        };

        element.addEventListener('dragover', handleDragOver);
        element.addEventListener('dragleave', handleDragLeave);
        element.addEventListener('drop', handleDrop);

        return () => {
            element.removeEventListener('dragover', handleDragOver);
            element.removeEventListener('dragleave', handleDragLeave);
            element.removeEventListener('drop', handleDrop);
        };
    }, [accept, onDrop]);

    return { dropRef, isOver };
}