import { Color } from '@spectrum-web-components/theme';

// Local storage key to use for the theme color.
export const LS_THEME_COLOR_KEY = 'np:theme-color';
// Determine the fallback color using the client preference.
const COLOR_FALLBACK = matchMedia('(prefers-color-scheme: dark)').matches
  ? 'darkest'
  : 'light';
// Get the theme color to use.
export const DEFAULT_COLOR = (window.localStorage.getItem(LS_THEME_COLOR_KEY) ||
  COLOR_FALLBACK) as Color;
