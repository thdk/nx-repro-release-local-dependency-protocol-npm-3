import { libA } from '@thdk/lib-a';
import { libB } from '@thdk/lib-b';

export function libC(): string {
  return `lib-c depends on ${libA()} and ${libB()}`;
}
