import React, { createContext, useContext, useEffect, useState } from 'react';

export type PerformanceMode = 'high' | 'low' | 'off';

interface PerformanceContextType {
  mode: PerformanceMode;
  setMode: (mode: PerformanceMode) => void;
  cycleMode: () => void;
  isHigh: boolean;
  isLow: boolean;
  isOff: boolean;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_fx_mode';

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<PerformanceMode>('high');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as PerformanceMode | null;
      if (saved && (saved === 'high' || saved === 'low' || saved === 'off')) {
        setModeState(saved);
      }
    } catch {
      // Safe fallback if localStorage is disabled or restricted
    }
  }, []);

  const setMode = (newMode: PerformanceMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem(STORAGE_KEY, newMode);
    } catch {
      // Ignore write errors
    }
  };

  const cycleMode = () => {
    const nextMode: PerformanceMode =
      mode === 'high' ? 'low' : mode === 'low' ? 'off' : 'high';
    setMode(nextMode);
  };

  return (
    <PerformanceContext.Provider
      value={{
        mode,
        setMode,
        cycleMode,
        isHigh: mode === 'high',
        isLow: mode === 'low',
        isOff: mode === 'off',
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = (): PerformanceContextType => {
  const context = useContext(PerformanceContext);
  if (!context) {
    // Return graceful default if used outside provider
    return {
      mode: 'high',
      setMode: () => {},
      cycleMode: () => {},
      isHigh: true,
      isLow: false,
      isOff: false,
    };
  }
  return context;
};
