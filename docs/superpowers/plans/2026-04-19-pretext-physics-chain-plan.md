# pretext Physics Chain Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Use `@chenglou/pretext` for character width measurement in HomePageContact, while keeping existing Verlet physics chain logic.

**Architecture:** Create a `usePretextWidths` hook to extract character widths from pretext, then update HomePageContact to use dynamic widths instead of hardcoded spacing values.

**Tech Stack:** React 19, TypeScript, `@chenglou/pretext`, GSAP

---

## File Structure

```
src/features/HomePageContact/
├── HomePageContact.tsx        # Modified - use pretext widths
├── hooks/
│   └── usePretextWidths.ts    # New - pretext width extraction
└── type.ts                    # Existing
```

---

## Tasks

### Task 1: Create usePretextWidths hook

**Files:**
- Create: `src/features/HomePageContact/hooks/usePretextWidths.ts`

- [ ] **Step 1: Write the hook**

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

- [ ] **Step 2: Verify file creation**

Run: `ls src/features/HomePageContact/hooks/`

---

### Task 2: Update HomePageContact imports and constants

**Files:**
- Modify: `src/features/HomePageContact/HomePageContact.tsx`

- [ ] **Step 1: Add pretext import and remove unused constants**

Find line 1 (`import { useEffect, useRef, useState } from 'react';`) and add:

```typescript
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePretextWidths } from './hooks/usePretextWidths';
```

Find and remove (or comment out):
```typescript
const PRETEXT_TRACK = -0.04;
const PRETEXT_FONT_SIZE = '0.9rem';
```

- [ ] **Step 2: Verify imports work**

Run: `npx tsc --noEmit src/features/HomePageContact/hooks/usePretextWidths.ts`

---

### Task 3: Integrate pretext widths into physics init

**Files:**
- Modify: `src/features/HomePageContact/HomePageContact.tsx`

- [ ] **Step 1: Add hook call inside component**

Find the component function and add after existing refs:

```typescript
const PRETEXT = 'DRAG ME!';
const CHARS = PRETEXT.split('');
const FONT = '0.9rem system-ui, sans-serif';

const widths = usePretextWidths(PRETEXT, FONT);
```

- [ ] **Step 2: Update init to use dynamic spacing**

Find the init effect where `pointsRef.current` is set. Change:

```typescript
// Old:
const y = startY + index * 4;

// New:
const y = startY + (index > 0 ? widths.slice(0, index).reduce((a, b) => a + b, 0) : 0);
```

And update LINK_LENGTH usage in the constraint loop. The LINK_LENGTH constant at top of file should be replaced with dynamic value:

```typescript
// In the constraint solving loop (around line 157-188), replace:
const LINK_LENGTH = 20;

// With a per-segment lookup:
const linkLength = widths[j] || 20;
const diff = linkLength - dist;
```

- [ ] **Step 3: Update JSX letterSpacing**

Find the `<span>` style in the map and remove letterSpacing:

```typescript
// Remove:
// letterSpacing: index === 0 ? `${PRETEXT_TRACK}em` : `${PRETEXT_TRACK * 1.25}em`,
```

Keep only `fontSize` and `lineHeight`.

- [ ] **Step 4: Verify build**

Run: `npm run build` (or `npx tsc --noEmit`)

---

### Task 4: Verify in browser

**Files:**
- Modify: `src/features/HomePageContact/HomePageContact.tsx`

- [ ] **Step 1: Start dev server**

Run: `npm run dev`

- [ ] **Step 2: Open browser and verify**
- Navigate to page with HomePageContact
- Verify "DRAG ME!" chain renders below "Contact" text
- Verify chain responds to pointer drag
- Verify characters have proper spacing based on their actual widths

---

## Verification Checklist

- [ ] `usePretextWidths` hook created and exports correctly
- [ ] Component builds without TypeScript errors
- [ ] Chain text "DRAG ME!" renders below "Contact"
- [ ] Character spacing uses actual character widths
- [ ] Physics chain responds to drag interaction
- [ ] No console errors

---

## Dependencies

- `@chenglou/pretext` - already in project (used by BallPretext)
