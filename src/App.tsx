import { Calendar } from '@/components/calendar/Calendar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Calendar />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;