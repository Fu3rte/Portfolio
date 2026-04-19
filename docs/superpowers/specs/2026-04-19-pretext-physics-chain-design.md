# HomePageContact pretext Integration Design

## Overview

Refactor `HomePageContact.tsx` to use `@chenglou/pretext` for accurate character width measurement, while keeping the existing Verlet physics chain logic intact.

## Changes

### 1. New Hook: `usePretextWidths`

Location: `src/features/HomePageContact/hooks/usePretextWidths.ts`

```typescript
import { useMemo } from 'react';
import { prepareWithSegments } from '@chenglou/pretext';

export function usePretextWidths(text: string, font: string): number[] {
  return useMemo(() => {
    const prepared = prepareWithSegments(text, font);
    const widths: number[] = [];

    for (const segment of prepared) {
      for (const grapheme of segment.graphemeRuns) {
        widths.push(grapheme.width);
      }
    }

    return widths;
  }, [text, font]);
}
```

### 2. Modified: `HomePageContact.tsx`

**Remove:**
- Hardcoded spacing `index * 4` in init
- `PRETEXT_TRACK` letterSpacing constant
- Manual character splitting for width calculation

**Change:**
- Import `usePretextWidths` hook
- Use `widths[i]` for `LINK_LENGTH` per segment
- Use `widths[i]` for initial y offset stack
- Remove `letterSpacing` from JSX spans

### 3. File Structure

```
src/features/HomePageContact/
├── HomePageContact.tsx   # Main component (modified)
├── hooks/
│   └── usePretextWidths.ts  # New hook
└── type.ts
```

## Data Flow

```
usePretextWidths(text, font) → widths: number[]
     ↓
PRETEXT.split('').map((ch, i) => ({
  x: centerX,
  y: startY + cumulativeWidths[i],
  ...
}))
     ↓
LINK_LENGTH = widths[i]  // Each segment uses actual character width
```

## Constants to Update

| Constant | Old Value | New Value |
|---|---|---|
| `LINK_LENGTH` | `20` (hardcoded) | `widths[i]` (per char) |
| `index * 4` (y offset) | `4` (fixed) | `widths[i-1]` (dynamic) |
| `PRETEXT_TRACK` | `-0.04` | Remove |

## No Changes to Physics Logic

- Verlet integration (x, y, oldx, oldy)
- Gravity, friction, bounce
- Constraint solving (ITERATIONS loop)
- Pointer drag handling
- Rotation angle calculation
