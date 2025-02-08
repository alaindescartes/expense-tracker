💰 Expense Tracker

A modern expense tracker built with Next.js for the frontend, Drizzle ORM for database management, and Clerk for secure user authentication. This application helps users track their income and expenses, offering a user-friendly interface with real-time data visualization using Recharts.

🛠 Features

User Authentication: Powered by Clerk for a seamless sign-in/sign-up experience.
Expense and Income Tracking: Add, update, and delete transactions.
Real-Time Data Visualization: Charts powered by Recharts to track spending patterns.
Dark Mode Support: Easily switch between light and dark themes using next-themes.
Emoji Support: Add emojis to transaction descriptions using emoji-picker-react.
Responsive Design: Mobile-first design for optimal usability on all devices.
📂 Project Structure

/: Next.js frontend for the user interface.
drizzle-orm: Manages database interactions with Neon Database as the backend.
tailwindcss: Handles styling with utility-first CSS classes.
@radix-ui: Provides accessible UI components like dialogs and alerts.
🚀 How to Run

Prerequisites
Node.js installed on your machine
A Neon Database instance
Clerk account for authentication
Steps
Clone the repository:
git clone https://github.com/alaindescartes/expense-tracker.git
cd expense-tracker
Install dependencies:
npm install
Set up your environment variables in a .env file:
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api_key
DATABASE_URL=your_neon_database_url
NEXT_PUBLIC_SITE_URL=your_site_url
Run the database migrations:
npm run db:push
Start the development server:
npm run dev
The application will be available at http://localhost:3000.
📦 Key Technologies

Next.js: React framework for server-side rendering and static site generation
Drizzle ORM: Type-safe and modern ORM for managing database schema and queries
Tailwind CSS: Utility-first CSS framework for styling
Clerk: Authentication service for seamless user management
Recharts: Charts for visualizing transaction data
🛡️ Future Enhancements

Recurring Transactions: Automate repeating expenses and income.
Budget Management: Set monthly budgets and receive alerts when nearing limits.
Export Data: Allow users to export their transaction history as a CSV file.
Notifications: Add reminders for upcoming bills or low budget alerts
