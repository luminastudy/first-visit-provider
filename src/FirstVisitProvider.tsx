import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  FirstVisitProviderProps,
  FirstVisitStorageData,
  LanguageCode,
} from './types';

const DEFAULT_STORAGE_KEY = 'lumina_first_visit';

/**
 * FirstVisitProvider - A headless provider for handling first-time visitor language selection
 *
 * This component uses localStorage to track whether a user has visited before and their
 * selected language. It provides a render prop pattern for complete UI flexibility.
 *
 * @example
 * ```tsx
 * <FirstVisitProvider
 *   languages={['en', 'he', 'es']}
 *   onLanguageSelect={(lang) => i18n.changeLanguage(lang)}
 * >
 *   {({ isFirstVisit, languages, selectLanguage }) => (
 *     isFirstVisit ? (
 *       <LanguageSelector
 *         languages={languages}
 *         onSelect={selectLanguage}
 *       />
 *     ) : null
 *   )}
 * </FirstVisitProvider>
 * ```
 */
export const FirstVisitProvider: React.FC<FirstVisitProviderProps> = ({
  languages,
  storageKey = DEFAULT_STORAGE_KEY,
  onLanguageSelect,
  children,
}) => {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode | null>(
    null
  );
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);

      if (stored) {
        const data: FirstVisitStorageData = JSON.parse(stored);
        setIsFirstVisit(!data.hasVisited);
        setSelectedLanguage(data.selectedLanguage);
      } else {
        // First time - no data in localStorage
        setIsFirstVisit(true);
      }
    } catch (error) {
      console.error('Failed to read first visit data from localStorage:', error);
      // On error, assume first visit
      setIsFirstVisit(true);
    } finally {
      setIsInitialized(true);
    }
  }, [storageKey]);

  /**
   * Handle language selection
   */
  const selectLanguage = useCallback(
    (languageCode: LanguageCode) => {
      try {
        // Validate that the selected language is in the provided list
        if (!languages.includes(languageCode)) {
          console.warn(
            `Selected language "${languageCode}" is not in the provided languages list`
          );
        }

        const data: FirstVisitStorageData = {
          hasVisited: true,
          selectedLanguage: languageCode,
          timestamp: Date.now(),
        };

        localStorage.setItem(storageKey, JSON.stringify(data));
        setIsFirstVisit(false);
        setSelectedLanguage(languageCode);

        // Call the optional callback
        onLanguageSelect?.(languageCode);
      } catch (error) {
        console.error('Failed to save first visit data to localStorage:', error);
      }
    },
    [languages, storageKey, onLanguageSelect]
  );

  /**
   * Dismiss the first visit flow without selecting a language
   */
  const dismiss = useCallback(() => {
    try {
      const data: FirstVisitStorageData = {
        hasVisited: true,
        selectedLanguage: null,
        timestamp: Date.now(),
      };

      localStorage.setItem(storageKey, JSON.stringify(data));
      setIsFirstVisit(false);
    } catch (error) {
      console.error('Failed to save first visit data to localStorage:', error);
    }
  }, [storageKey]);

  // Memoize the render props to prevent unnecessary re-renders
  const renderProps = useMemo(
    () => ({
      isFirstVisit,
      languages,
      selectedLanguage,
      selectLanguage,
      dismiss,
    }),
    [isFirstVisit, languages, selectedLanguage, selectLanguage, dismiss]
  );

  // Don't render until we've checked localStorage
  if (!isInitialized) {
    return null;
  }

  return <>{children(renderProps)}</>;
};
