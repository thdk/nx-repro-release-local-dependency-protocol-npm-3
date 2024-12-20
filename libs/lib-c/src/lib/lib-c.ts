import { libA } from '@thdk/lib-a';

export function libC(): string {
  return `lib-c depends on ${libA()}`;
}
