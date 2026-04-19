import { useMemo } from 'react';
import { prepareWithSegments } from '@chenglou/pretext';

export function usePretextWidths(text: string, font: string): number[] {
  return useMemo(() => {
    const prepared = prepareWithSegments(text, font);
    return prepared.widths;
  }, [text, font]);
}
