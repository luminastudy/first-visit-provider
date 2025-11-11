# First Visit Provider

A headless React provider for handling first-time visitor language selection. Built for flexibility and full UI control.

## Features

- 🎨 **Headless/Unstyled** - Complete control over UI and styling
- 🌍 **ISO 639-1 Support** - Standard two-letter language codes
- 💾 **localStorage Persistence** - Remembers user preferences
- ⚡ **Lightweight** - Minimal dependencies
- 🔒 **TypeScript** - Full type safety
- 🪝 **React Hooks** - Modern React patterns

## Installation

```bash
npm install @luminastudy/first-visit-provider
```

## Usage

### Basic Example

```tsx
import { FirstVisitProvider } from '@luminastudy/first-visit-provider';

function App() {
  return (
    <FirstVisitProvider
      languages={['en', 'he', 'es']}
      onLanguageSelect={(lang) => {
        // Handle language selection (e.g., set i18n language)
        console.log('Selected language:', lang);
      }}
    >
      {({ isFirstVisit, languages, selectLanguage }) => (
        isFirstVisit ? (
          <div className="language-selector-modal">
            <h2>Welcome! Please select your language</h2>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => selectLanguage(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        ) : null
      )}
    </FirstVisitProvider>
  );
}
```

### With Custom Language Names

```tsx
import { FirstVisitProvider, LanguageCode } from '@luminastudy/first-visit-provider';

const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  en: 'English',
  he: 'עברית',
  es: 'Español',
};

function App() {
  return (
    <FirstVisitProvider languages={['en', 'he', 'es']}>
      {({ isFirstVisit, languages, selectLanguage }) => (
        isFirstVisit && (
          <div className="modal">
            <h2>Choose Your Language</h2>
            <div className="language-grid">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => selectLanguage(lang)}
                  className="language-button"
                >
                  {LANGUAGE_NAMES[lang]}
                </button>
              ))}
            </div>
          </div>
        )
      )}
    </FirstVisitProvider>
  );
}
```

### With i18n Integration

```tsx
import { FirstVisitProvider } from '@luminastudy/first-visit-provider';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();

  return (
    <FirstVisitProvider
      languages={['en', 'he', 'es']}
      onLanguageSelect={(lang) => {
        i18n.changeLanguage(lang);
      }}
    >
      {({ isFirstVisit, languages, selectLanguage, dismiss }) => (
        isFirstVisit && (
          <div className="welcome-modal">
            <h2>Welcome to Lumina!</h2>
            <p>Please select your preferred language</p>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => selectLanguage(lang)}
              >
                {lang}
              </button>
            ))}
            <button onClick={dismiss}>Skip for now</button>
          </div>
        )
      )}
    </FirstVisitProvider>
  );
}
```

### Using the Hook

For components that only need to check first visit status:

```tsx
import { useFirstVisit } from '@luminastudy/first-visit-provider';

function WelcomeBanner() {
  const { isFirstVisit, selectedLanguage, isLoading } = useFirstVisit();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isFirstVisit) {
    return <div>Welcome, new user!</div>;
  }

  return <div>Welcome back! Your language: {selectedLanguage}</div>;
}
```

## API Reference

### `FirstVisitProvider`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `languages` | `string[]` | Yes | - | Array of ISO 639-1 language codes |
| `storageKey` | `string` | No | `'lumina_first_visit'` | localStorage key for persistence |
| `onLanguageSelect` | `(lang: string) => void` | No | - | Callback fired when language is selected |
| `children` | `(props: RenderProps) => ReactNode` | Yes | - | Render prop function |

#### Render Props

The `children` function receives an object with:

| Property | Type | Description |
|----------|------|-------------|
| `isFirstVisit` | `boolean` | Whether this is the user's first visit |
| `languages` | `string[]` | The provided language codes |
| `selectedLanguage` | `string \| null` | Previously selected language (if any) |
| `selectLanguage` | `(lang: string) => void` | Function to select a language |
| `dismiss` | `() => void` | Function to dismiss without selecting |

### `useFirstVisit`

A hook to check first visit status.

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `storageKey` | `string` | No | `'lumina_first_visit'` | localStorage key |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `isFirstVisit` | `boolean` | Whether this is the first visit |
| `selectedLanguage` | `string \| null` | Selected language code |
| `isLoading` | `boolean` | Whether data is loading from localStorage |

## TypeScript

Full TypeScript support with exported types:

```tsx
import type {
  LanguageCode,
  FirstVisitProviderProps,
  FirstVisitRenderProps,
  FirstVisitStorageData,
} from '@luminastudy/first-visit-provider';
```

## Storage Format

Data is stored in localStorage with this structure:

```json
{
  "hasVisited": true,
  "selectedLanguage": "en",
  "timestamp": 1699564800000
}
```

## Browser Support

Works in all modern browsers that support:
- React 16.8+ (Hooks)
- localStorage API

## License

MIT
