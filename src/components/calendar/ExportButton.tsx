import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEvents } from '@/hooks/useEvents';
import { exportToJson, exportToCsv } from '@/lib/export-utils';
import {FaDownload} from "react-icons/fa6";

interface ExportButtonProps {
    month: number;
    year: number;
}

export function ExportButton({ month, year }: ExportButtonProps) {
    const { events } = useEvents();

    const handleExport = (format: 'json' | 'csv') => {
        const monthEvents = Object.entries(events).reduce((acc, [date, events]) => {
            const eventDate = new Date(date);
            if (
                eventDate.getMonth() === month &&
                eventDate.getFullYear() === year
            ) {
                acc[date] = events;
            }
            return acc;
        }, {} as typeof events);

        if (format === 'json') {
            exportToJson(monthEvents, `events-${year}-${month + 1}`);
        } else {
            exportToCsv(monthEvents, `events-${year}-${month + 1}`);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button  className="bg-black border border-gray-500 hover:text-black group">
                    <FaDownload  className=" text-white group-hover:text-black text-md "/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport('json')}>
                    Export as JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('csv')}>
                    Export as CSV
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}