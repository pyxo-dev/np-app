export const BP = { XXS: 0, XS: 1, S: 2, M: 3, L: 4, XL: 5 };

export const WIDTH_QUERY_LISTS = [
  window.matchMedia('(max-width: 319px)'), // XXS
  window.matchMedia('(min-width: 320px) and (max-width: 671px)'), // XS
  window.matchMedia('(min-width: 672px) and (max-width: 1055px)'), // S
  window.matchMedia('(min-width: 1056px) and (max-width: 1311px)'), // M
  window.matchMedia('(min-width: 1312px ) and (max-width: 1583px)'), // L
  window.matchMedia('(min-width: 1584px)'), // XL
];

export const BREAKPOINTS = [0, 1, 2, 3, 4, 5] as const;

export type Breakpoint = typeof BREAKPOINTS[number];

export class Responsive {
  breakpoint: Breakpoint;

  constructor() {
    this.breakpoint = BREAKPOINTS.find(b => WIDTH_QUERY_LISTS[b].matches) || 2;

    BREAKPOINTS.forEach(b => {
      WIDTH_QUERY_LISTS[b].addEventListener('change', () => {
        if (WIDTH_QUERY_LISTS[b].matches) {
          this.breakpoint = b;
          window.dispatchEvent(new Event('np:responsive:bpchange'));
        }
      });
    });
  }
}
