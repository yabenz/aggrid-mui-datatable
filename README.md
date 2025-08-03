# AG Grid Data Grid + MUI

This project is a full-stack web application built with **Vite + React** for the frontend and **Node.js/Express** for the backend API. It connects to a **MySQL** database containing electric car data and displays it in a rich, interactive data grid (using Ag Grid for React) with filtering, searching, pagination, and row actions. Material UI is used in this project for the User Interface.

---

## Project Structure


## Project Structure

<pre> ```
  
AGGRID-MUI-APP/
│
├── backend/
│   ├── mysql-db/                 # MySQL database related files (scripts, dumps)
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js                 # Express server entry point
│
├── public/                       # Public assets for React app (favicon, index.html)
│
├── src/
│   ├── assets/                   # Images, icons, fonts, static files
│   │
│   ├── components/               # Reusable React components
│   │   ├── CustomButtonComp.tsx
│   │   └── DataGrid.tsx
│   │
│   ├── pages/                    # Page-level components (screens/routes)
│   │   ├── CarDetails.tsx
│   │   ├── CSVDataGrid.tsx
│   │   └── Home.tsx
│   │
│   ├── utils/                    # Utility/helper functions
│   │
│   ├── App.tsx                  # Main App component
│   ├── App.css                  # App specific styles
│   ├── index.css                # Global styles
│   └── main.tsx                 # React DOM render entry point
│
├── vite-env.d.ts                 # Vite environment types
├── package.json                  # Frontend dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── README.md
  
  
  ``` </pre>

---

## Features

- Fetches data from a MySQL database (`cars` database with `ElectricCars` table).
- Displays data in an **ag-Grid** table with:
  - Pagination
  - Column sorting and resizing
  - Custom action buttons (`View` and `Delete`) for each row
- Search and advanced filtering by any column field with multiple operators (contains, equals, starts with, etc.).
- Deletes rows by sending a DELETE request to the backend API.
- Navigates to detailed car views (via React Router) using the `View` button.
- Reset options to clear filters and search.

---

## Technologies Used

- **Frontend:**
  - React 18 (using TypeScript)
  - Vite (frontend build tool)
  - ag-Grid (community edition)
  - React Router v6
  - Material UI (MUI) for UI components
- **Backend:**
  - Node.js + Express
  - MySQL database connection
- **Database:**
  - MySQL (`cars` database with `ElectricCars` table)

---

## Installation

### Prerequisites

- Node.js (v16+ recommended)
- MySQL server with the `cars` database and `ElectricCars` table set up
- `npm` or `yarn` package manager

### Clone the repo

```bash
git clone https://github.com/yabenz/aggrid-mui-datatable.git
cd aggrid-mui-datatable

```

###  Setup backend

```bash

cd backend
npm install

```
# Configure your MySQL connection in server.js

### Start the backend server:

``` bash
node server.js

```

### Setup frontend

``` bash

cd ..
npm install
npm run dev

```

# The frontend will start on http://localhost:5173/ (or another port if 5173 is busy).



## Usage

- Visit `http://localhost:5173` to see the main data grid listing electric cars.
- Use the search box or the advanced filter form to filter the displayed rows.
- Click **View** to navigate to a detailed page of the selected car.
- Click **Delete** to remove a car from the database (this will update the grid).
- Use the **Reset** buttons to clear filters and show all data.

## API Endpoints

- `GET /api/data` - Retrieve all electric cars (supports optional query parameters for filtering)
- `DELETE /api/data/:id` - Delete an electric car by ID

## Important Files

- `src/components/Home.tsx`  
  Contains the main React component rendering the ag-Grid with custom buttons and filter/search functionality.

- `backend/server.js`  
  Express server handling API routes and MySQL queries.

- `src/App.tsx`  
  Sets up the React Router routes.

## Future Improvements

- Add detailed car view page for `/cars/:id`
- Implement create/edit car forms
- Add authentication and authorization
- Improve UI styling and responsiveness
- Add unit and integration tests
