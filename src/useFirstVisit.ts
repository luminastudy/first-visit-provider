import { useEffect, useState } from 'react';
import { FirstVisitStorageData, LanguageCode } from './types';

const DEFAULT_STORAGE_KEY = 'lumina_first_visit';

/**
 * Hook to check first visit status without using the provider
 * Useful for checking status in components that don't need the full provider
 *
 * @param storageKey - Optional custom storage key
 * @returns Object containing first visit status and selected language
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isFirstVisit, selectedLanguage } = useFirstVisit();
 *
 *   if (isFirstVisit) {
 *     return <WelcomeMessage />;
 *   }
 *
 *   return <MainContent language={selectedLanguage} />;
 * }
 * ```
 */
export function useFirstVisit(storageKey: string = DEFAULT_STORAGE_KEY) {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);

      if (stored) {
        const data: FirstVisitStorageData = JSON.parse(stored);
        setIsFirstVisit(!data.hasVisited);
        setSelectedLanguage(data.selectedLanguage);
      } else {
        setIsFirstVisit(true);
      }
    } catch (error) {
      console.error('Failed to read first visit data from localStorage:', error);
      setIsFirstVisit(true);
    } finally {
      setIsLoading(false);
    }
  }, [storageKey]);

  return {
    isFirstVisit,
    selectedLanguage,
    isLoading,
  };
}
