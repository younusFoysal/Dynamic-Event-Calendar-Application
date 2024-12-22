# Dynamic Event Calendar Application

## Project Overview

The **Dynamic Event Calendar Application** is a React.js-based web application that allows users to manage events dynamically. The application features a fully interactive calendar grid with event management capabilities, clean UI design, and persistence through localStorage.

---

## Features

### Core Features
- **Calendar View**:
    - Display the current month's calendar in a grid format.
    - Navigation buttons to switch between months ("Previous" and "Next").
- **Event Management**:
    - Add, edit, and delete events on specific days.
    - Event details include:
        - Event name
        - Start time and end time
        - Optional description
- **Event List**:
    - Show all events for the selected day in a modal or side panel.
- **Data Persistence**:
    - Store events in localStorage to maintain data across page refreshes.

### Advanced Logic
- Month transitions handled automatically (e.g., Jan 31 to Feb 1).
- Overlapping events are prevented.
- Filter events by keyword.

### Bonus Features (Optional)
- Drag-and-drop functionality to reschedule events.
- Color-coded events (e.g., work, personal, others).
- Export events for a specific month as JSON or CSV.

---

## Tech Stack

- **Frontend**: React.js (with functional components and hooks)
- **UI Library**: shadcn for components
- **Persistence**: LocalStorage
- **Deployment**: Vercel (or equivalent)

---

## Installation and Usage

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm or yarn

### Steps to Run Locally
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/younusFoysal/Dynamic-Event-Calendar-Application
   cd Dynamic-Event-Calendar-Application
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```


4. Open your browser and navigate to `http://localhost:5173`.

### Build for Production
To create a production-ready build:
```bash
npm run build
# or
yarn build
```

The build files will be available in the `build/` directory.

---

## Deployment

The application is deployed on Vercel. You can view the live application using the link below:

[Live Demo](<https://dynamic-event-calendar-application-ei7y.vercel.app/>)

To deploy yourself:
1. Create an account on [Vercel](https://vercel.com/).
2. Import the GitHub repository.
3. Follow the deployment steps.



---

## Future Improvements

- Drag-and-drop event rescheduling.
- Enhanced filters (e.g., date range, category).
- Mobile-responsive design.

---


## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Feedback
Feel free to open an issue or submit a pull request for suggestions or improvements!
