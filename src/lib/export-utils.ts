import type { DayEvents } from '@/types/event';

export function exportToJson(events: DayEvents, filename: string) {
    const data = JSON.stringify(events, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    downloadFile(blob, `${filename}.json`);
}

export function exportToCsv(events: DayEvents, filename: string) {
    const headers = ['Date', 'Title', 'Start Time', 'End Time', 'Description', 'Color'];
    const rows = Object.entries(events).flatMap(([date, dayEvents]) =>
        dayEvents.map((event) => [
            date,
            event.title,
            event.startTime,
            event.endTime,
            event.description || '',
            event.color || 'default',
        ])
    );

    const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.map(formatCsvValue).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    downloadFile(blob, `${filename}.csv`);
}

function formatCsvValue(value: string) {
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
}

function downloadFile(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}