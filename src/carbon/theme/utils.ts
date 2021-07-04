export const CARBON_THEMES = ['white', 'g10', 'g90', 'g100'] as const;
export type CarbonTheme = typeof CARBON_THEMES[number];

// Local storage key to use for the theme.
export const LS_THEME_KEY = 'np:theme-variant';

const localStorageValue = window.localStorage.getItem(LS_THEME_KEY);

// Determine the fallback theme, using the client preference.
const fallbackValue: CarbonTheme = matchMedia('(prefers-color-scheme: dark)')
  .matches
  ? 'g100'
  : 'white';

// Get the theme to use.
export const defaultTheme: CarbonTheme = CARBON_THEMES.includes(
  localStorageValue as CarbonTheme
)
  ? (localStorageValue as CarbonTheme)
  : fallbackValue;
