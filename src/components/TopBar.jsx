import React from 'react';

export const TopBar = () => {
  return (
    <header className="px-8 py-6 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-200">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-xs font-medium text-gray-400 dark:text-gray-400 mt-1 max-w-2xl">
          Real-time leave balances, half-day allocations, and monthly attendance tracking.
        </p>
      </div>
    </header>
  );
};
