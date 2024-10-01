import './globals.css';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-blue-500 text-white p-4">
            <div className="container mx-auto">
              <h1 className="text-3xl font-bold">Habit Tracker</h1>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-blue-500 text-white p-4">
            <div className="container mx-auto text-center">
              <p>&copy; 2024 Habit Tracker. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;
