import React from 'react';

export const TopBar = () => {
  return (
    <header className="px-4 pt-4 pb-2 md:px-8 md:pt-6 md:pb-3 bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-xs font-medium text-gray-400 dark:text-gray-400 mt-0.5 md:mt-1 max-w-2xl">
          Real-time leave balances, half-day allocations, and monthly attendance tracking.
        </p>
      </div>
    </header>
  );
};
