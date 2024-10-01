# Frontend - Habit Tracker Application

## Project Overview

The frontend is a React application (using TypeScript) that provides a user interface for managing habits. Users can add, edit, delete, and view their habits. The project is built using **Next.js** and styled with **Tailwind CSS** for responsive design.

## Project Structure

```
app
├── globals.css
├── habits
│   ├── components
│   │   ├── HabitForm.tsx
│   │   ├── HabitList.tsx
│   │   └── ProgressForm.tsx
│   └── page.tsx
├── layout.tsx
├── components
│   └── Modal.tsx
├── Dockerfile
├── next.config.mjs
├── next-env.d.ts
├── package.json
├── package-lock.json
├── pages
│   └── _app.tsx
├── postcss.config.mjs
├── README.md
├── styles
│   └── globals.css
├── tailwind.config.ts
└── tsconfig.json
```

### Explanation of Key Directories:
- **habits/components**: Contains reusable components related to habit management (`HabitForm`, `HabitList`, `ProgressForm`).
- **components**: Includes shared components like `Modal`.
- **styles**: Global CSS styles are defined in `globals.css`.
- **Dockerfile**: Docker configuration for containerization.

## Setup and Installation

### Prerequisites

Ensure you have **Node.js** and **Docker** installed on your machine.

### Steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yashkothari21/habit-tracker
   cd frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

## Running the Application

### Option 1: Using Docker

1. **Build Docker Image:**

   ```bash
   docker build -t habit-tracker-frontend .
   ```

2. **Run the Application in Docker:**

   ```bash
   docker run -p 3000:3000 habit-tracker-frontend
   ```

3. **Access the Application:**

   Open `http://localhost:3000` in your web browser.

### Option 2: Local Development

1. **Start the Application Locally:**

   ```bash
   npm run dev
   ```

2. **Access the Application:**

   Open `http://localhost:3000/habits` in your web browser.

## Configuration

### API Integration

- The frontend communicates with the backend through API calls. The API URL should be configured in your components or service files where the API is called. Ensure you use an environment variable or configuration file to set your backend URL correctly.

### Tailwind CSS Configuration

- You can customize Tailwind CSS styles in the `tailwind.config.ts` file. This file allows you to extend or override default Tailwind settings.

## Troubleshooting

- **CORS Issues:** Ensure that the backend CORS settings allow requests from the frontend URL (`http://localhost:3000`).
- **TypeScript Errors:** Ensure that all required types are defined correctly in your TypeScript files.
- **Build Errors:** If using Docker, confirm that the Dockerfile is set up correctly and that all dependencies are installed.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.