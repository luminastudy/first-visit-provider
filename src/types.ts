/**
 * ISO 639-1 language code (two-letter code)
 * Examples: 'en', 'he', 'es', 'fr', etc.
 */
export type LanguageCode = string

/**
 * Configuration options for the FirstVisitProvider
 */
export interface FirstVisitProviderProps {
  /**
   * List of available language codes in ISO 639-1 format
   * @example ['en', 'he', 'es']
   */
  languages: LanguageCode[]

  /**
   * Key used for localStorage persistence
   * @default 'lumina_first_visit'
   */
  storageKey?: string

  /**
   * Callback fired when a language is selected
   * @param languageCode - The selected language code
   */
  onLanguageSelect?: (languageCode: LanguageCode) => void

  /**
   * Children render prop - receives the first visit state and selection handler
   */
  children: (props: FirstVisitRenderProps) => React.ReactNode
}

/**
 * Props provided to the children render function
 */
export interface FirstVisitRenderProps {
  /**
   * Whether this is the user's first visit
   */
  isFirstVisit: boolean

  /**
   * Available language codes
   */
  languages: LanguageCode[]

  /**
   * Selected language code (if any)
   */
  selectedLanguage: LanguageCode | null

  /**
   * Function to select a language and mark visit as complete
   * @param languageCode - The language code to select
   */
  selectLanguage: (languageCode: LanguageCode) => void

  /**
   * Function to dismiss the first visit flow without selecting a language
   */
  dismiss: () => void
}

/**
 * Shape of the stored data in localStorage
 */
export interface FirstVisitStorageData {
  hasVisited: boolean
  selectedLanguage: LanguageCode | null
  timestamp: number
}
