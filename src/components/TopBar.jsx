import React from 'react';

export const TopBar = () => {
  return (
    <header className="px-4 pt-4 pb-4 md:px-8 md:pt-6 md:pb-4 bg-white dark:bg-black border-b border-gray-100 dark:border-white/10 transition-colors duration-200">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-xs md:text-sm font-normal text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">
          Real-time leave balances, half-day allocations, and monthly attendance tracking.
        </p>
      </div>
    </header>
  );
};
