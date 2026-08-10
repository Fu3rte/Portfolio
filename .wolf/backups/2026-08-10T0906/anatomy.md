# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-08-10T08:49:54.346Z
> Files: 99 tracked | Anatomy hits: 0 | Misses: 0

## ./

- `.gitignore` — Git ignore rules (~164 tok)
- `.prettierignore` (~28 tok)
- `.prettierrc` — Prettier configuration (~70 tok)
- `AGENTS.md` — AGENTS.md (~806 tok)
- `BUG_FIX_LOG.md` — 问题修复日志 (~602 tok)
- `CLAUDE.md` — OpenWolf (~1230 tok)
- `components.json` (~192 tok)
- `eslint.config.js` — ESLint flat configuration (~183 tok)
- `GEMINI.md` — OpenWolf (~68 tok)
- `index.html` — Fu3rte (~375 tok)
- `package-lock.json` — npm lock file (~107428 tok)
- `package.json` — Node.js package manifest (~576 tok)
- `README.md` — Project documentation (~120 tok)
- `tsconfig.app.json` (~238 tok)
- `tsconfig.json` — TypeScript configuration (~65 tok)
- `tsconfig.node.json` (~194 tok)
- `vite.config.ts` — Vite build configuration (~105 tok)

## .claude/

- `settings.json` (~642 tok)
- `settings.local.json` (~530 tok)

## .claude/commands/

- `reframe.md` — Mode: migrate [framework] (~551 tok)
- `security-audit.md` — Layer 1 — Dependencies (~510 tok)

## .claude/rules/

- `openwolf.md` (~328 tok)

## .codex/

- `config.toml` (~7 tok)
- `hooks.json` (~661 tok)

## .codex/prompts/

- `reframe.md` — Mode: migrate [framework] (~551 tok)
- `security-audit.md` — Layer 1 — Dependencies (~510 tok)

## .cursor/rules/

- `openwolf.mdc` (~87 tok)

## .github/workflows/

- `deploy.yml` — CI: Deploy to GitHub Pages (~262 tok)

## .opencode/command/

- `reframe.md` — Mode: migrate [framework] (~551 tok)
- `security-audit.md` — Layer 1 — Dependencies (~510 tok)

## .opencode/plugin/

- `openwolf.ts` — OpenWolf plugin entry — installed by `openwolf init --agent opencode`. (~74 tok)

## .opencode/plugin/openwolf/

- `anatomy.ts` — Exports parseAnatomy, serializeAnatomy, extractDescription, STORE_FILE + 12 more (~2922 tok)
  - fn `parseAnatomy` L5-28 (~207 tok)
  - fn `serializeAnatomy` L29-53 (~240 tok)
  - fn `extractDescription` L54-106 (~577 tok)
  - fn `sha256` L107-110 (~33 tok)
  - section `StoreFileEntry` L111-121 (~83 tok)
  - section `AnatomyStoreData` L122-127 (~63 tok)
  - fn `newStore` L128-132 (~64 tok)
  - fn `loadStore` L133-142 (~92 tok)
  - fn `saveStore` L143-157 (~162 tok)
  - fn `renderStore` L158-188 (~380 tok)
  - fn `renderToFile` L189-202 (~146 tok)
  - fn `importFromMarkdown` L203-227 (~305 tok)
  - fn `loadStoreReconciled` L228-240 (~137 tok)
  - fn `lockSleep` L241-244 (~31 tok)
  - fn `withAnatomyLock` L245-276 (~373 tok)
- `fs.ts` — Exports getWolfDir, wolfDirExists, readJSON, writeJSON + 6 more (~538 tok)
  - fn `getWolfDir` L5-8 (~28 tok)
  - fn `wolfDirExists` L9-12 (~31 tok)
  - fn `readJSON` L13-20 (~50 tok)
  - fn `writeJSON` L21-33 (~144 tok)
  - fn `readMarkdown` L34-41 (~41 tok)
  - fn `appendMarkdown` L42-47 (~64 tok)
  - fn `timeShort` L48-52 (~46 tok)
  - fn `timestamp` L53-56 (~22 tok)
  - fn `normalizePath` L57-60 (~24 tok)
  - fn `estimateTokens` L61-64 (~60 tok)
- `index.ts` — Exports OpenWolf (~1081 tok)
- `post-read.ts` — Exports handlePostRead (~629 tok)
  - fn `handlePostRead` L7-57 (~553 tok)
- `post-write.ts` — Exports handlePostWrite, summarizeEdit, autoDetectBugFix, detectFixPattern (~3226 tok)
  - fn `handlePostWrite` L8-39 (~302 tok)
  - fn `updateAnatomy` L40-86 (~473 tok)
  - fn `appendToMemory` L87-114 (~302 tok)
  - fn `trackSession` L115-150 (~338 tok)
  - fn `summarizeEdit` L151-184 (~471 tok)
  - fn `autoDetectBugFix` L185-228 (~523 tok)
  - fn `detectFixPattern` L229-265 (~610 tok)
  - fn `extractChangedLines` L266-270 (~88 tok)
- `pre-read.ts` — Exports handlePreRead (~685 tok)
  - fn `handlePreRead` L7-63 (~613 tok)
- `pre-write.ts` — Exports handlePreWrite (~1167 tok)
  - fn `tokenize` L14-21 (~63 tok)
  - fn `handlePreWrite` L22-35 (~132 tok)
  - fn `checkCerebrum` L36-65 (~369 tok)
  - section `BugEntry` L66-74 (~37 tok)
  - fn `checkBugLog` L75-105 (~399 tok)
- `session.ts` — Exports getSessionState, setSessionState, deleteSession, handleSessionStart (~952 tok)
  - fn `getSessionState` L8-11 (~33 tok)
  - fn `setSessionState` L12-15 (~33 tok)
  - fn `deleteSession` L16-19 (~26 tok)
  - fn `handleSessionStart` L20-89 (~783 tok)
- `stop.ts` — Exports handleStop (~1444 tok)
  - fn `handleStop` L6-35 (~262 tok)
  - fn `checkForMissingBugLogs` L36-50 (~165 tok)
  - fn `buildLedgerEntry` L51-114 (~743 tok)
  - fn `appendSessionSummary` L115-126 (~218 tok)
- `types.ts` — Exports FileRead, FileWrite, SessionState, PartialSessionState + 2 more (~217 tok)

## docs/superpowers/specs/

- `2026-04-20-contact-email-design.md` — Contact Form Email Backend - Design Spec (~928 tok)

## public/

- `404.html` — Redirecting... (~270 tok)

## scripts/

- `optimize-photos.mjs` — scriptDir: readSourceImages, clearGeneratedPhotos, optimizePhotos (~643 tok)
  - fn `readSourceImages` L21-40 (~145 tok)
  - fn `clearGeneratedPhotos` L41-51 (~101 tok)
  - fn `optimizePhotos` L52-90 (~271 tok)

## src/

- `App.tsx` — HomePage — uses useState, useEffect (~703 tok)
  - fn `App` L29-84 (~448 tok)
- `index.css` — Styles: 15 rules, 108 vars, 5 animations, 2 layers (~2030 tok)
- `main.tsx` (~142 tok)

## src/api/

- `contact.ts` — API routes: POST (1 endpoints) (~118 tok)

## src/assets/Photos/optimized/

- `photo-01.webp` (~46861 tok)
- `photo-02.webp` (~25515 tok)
- `photo-03.webp` (~13675 tok)
- `photo-04.webp` (~73683 tok)
- `photo-05.webp` (~148070 tok)
- `photo-06.webp` (~29216 tok)
- `photo-07.webp` (~98067 tok)
- `photo-08.webp` (~98996 tok)
- `photo-09.webp` (~151691 tok)
- `photo-10.webp` (~231845 tok)

## src/components/

- `theme-provider.tsx` — COLOR_SCHEME_QUERY — uses useCallback, useEffect, useMemo, useContext (~1511 tok)
  - fn `isTheme` L26-33 (~44 tok)
  - fn `getSystemTheme` L34-41 (~40 tok)
  - fn `disableTransitionsTemporarily` L42-60 (~130 tok)
  - fn `isEditableTarget` L61-79 (~97 tok)
  - fn `ThemeProvider` L80-221 (~900 tok)
  - fn `useTheme` L222-231 (~61 tok)

## src/components/InfiniteGallery/

- `InfiniteGallery.tsx` — MOVEMENT_DAMPING — renders chart (~4908 tok)
  - fn `getCachedImage` L14-24 (~73 tok)
  - fn `getTileOffsets` L25-564 (~4555 tok)
- `type.ts` — Exports PhotoItem, CanvasPhoto, InfiniteGalleryProps (~163 tok)

## src/components/Navbar/

- `Navbar.tsx` — HamburgerButton — uses useNavigate, useState, useEffect (~2442 tok)
  - fn `Navbar` L90-282 (~1695 tok)
- `style.css` — Styles: 11 rules (~336 tok)

## src/components/WholePage/

- `Loading.tsx` — Loading — uses useEffect (~586 tok)
  - section `LoadingProps` L4-8 (~22 tok)
  - fn `Loading` L9-86 (~520 tok)
- `ScrollProgress.tsx` — ScrollProgress — uses useEffect (~292 tok)

## src/components/customComponent/

- `Input.tsx` — Input (~497 tok)
- `LocationCard.tsx` — LOCATION — renders map (~622 tok)
  - fn `LocationCard` L12-68 (~531 tok)
- `ProjectCard.tsx` — ProjectCard (~1021 tok)
  - fn `ProjectCard` L4-17 (~131 tok)
  - fn `ProjectCardFront` L18-33 (~111 tok)
  - fn `ProjectCardImage` L34-52 (~95 tok)
  - fn `ProjectCardBack` L53-65 (~108 tok)
  - fn `ProjectCardTitle` L66-75 (~64 tok)
  - fn `ProjectCardDescription` L76-91 (~83 tok)
  - fn `ProjectCardTags` L92-115 (~232 tok)
  - fn `ProjectCardCTA` L116-139 (~139 tok)
- `TiltCard.tsx` — TiltCard — uses useEffect (~506 tok)
- `Tooltip.css` — Styles: 11 rules, 1 media queries, 4 animations (~686 tok)
- `Tooltip.tsx` — TooltipProvider (~481 tok)

## src/components/ui/

- `animated-theme-toggler.tsx` — AnimatedThemeToggler — uses useState, useEffect, useCallback (~762 tok)
  - section `AnimatedThemeTogglerProps` L7-98 (~684 tok)
- `badge.tsx` — badgeVariants (~547 tok)
  - fn `Badge` L30-50 (~121 tok)
- `blur-fade.tsx` — getFilter — uses useRef (~657 tok)
  - section `BlurFadeProps` L13-28 (~96 tok)
  - fn `getFilter` L29-31 (~27 tok)
  - fn `BlurFade` L32-93 (~448 tok)
- `button.tsx` — buttonVariants (~974 tok)
  - fn `Button` L44-68 (~140 tok)
- `card.tsx` — Card (~784 tok)
  - fn `Card` L5-22 (~178 tok)
  - fn `CardHeader` L23-35 (~145 tok)
  - fn `CardTitle` L36-48 (~85 tok)
  - fn `CardDescription` L49-58 (~66 tok)
  - fn `CardAction` L59-71 (~80 tok)
  - fn `CardContent` L72-81 (~66 tok)
  - fn `CardFooter` L82-104 (~118 tok)
- `dock.tsx` — DEFAULT_SIZE (~1175 tok)
  - section `DockProps` L14-87 (~574 tok)
  - section `DockIconProps` L88-154 (~468 tok)
- `dot-pattern.tsx` — DotPattern Component Props (~1256 tok)
  - section `DotPatternProps` L19-61 (~294 tok)
  - fn `DotPattern` L62-157 (~693 tok)
- `draggable-card.tsx` — DraggableCardBody — uses useState, useEffect (~1171 tok)
- `highlighter.tsx` — Highlighter (~658 tok)
  - section `HighlighterProps` L16-27 (~68 tok)
  - fn `Highlighter` L28-101 (~458 tok)
- `lens.tsx` — The x coordinate of the lens (~1058 tok)
  - section `Position` L4-10 (~36 tok)
  - section `LensProps` L11-31 (~159 tok)
  - fn `Lens` L32-131 (~784 tok)
- `orbiting-circles.tsx` — OrbitingCircles (~526 tok)
  - section `OrbitingCirclesProps` L5-16 (~79 tok)
  - fn `OrbitingCircles` L17-74 (~408 tok)
- `sheet.tsx` — Sheet (~1410 tok)
  - fn `Sheet` L8-11 (~42 tok)
  - fn `SheetTrigger` L12-17 (~49 tok)
  - fn `SheetClose` L18-23 (~46 tok)
  - fn `SheetPortal` L24-29 (~48 tok)
  - fn `SheetOverlay` L30-45 (~126 tok)
  - fn `SheetContent` L46-95 (~656 tok)
  - fn `SheetHeader` L96-105 (~63 tok)
  - fn `SheetFooter` L106-115 (~65 tok)
  - fn `SheetTitle` L116-131 (~89 tok)
  - fn `SheetDescription` L132-155 (~121 tok)
- `sonner.tsx` — Toaster (~373 tok)
- `typing-animation.tsx` — motionElements — uses useState, useMemo, useEffect (~1683 tok)
  - section `TypingAnimationProps` L43-59 (~114 tok)
  - fn `TypingAnimation` L60-235 (~1280 tok)

## src/features/About/

- `About.tsx` — HEADING (~1688 tok)
  - fn `About` L26-180 (~1458 tok)

## src/features/Footer/

- `Footer.tsx` — socialLinks (~1350 tok)
  - fn `SocialDock` L32-61 (~214 tok)
  - fn `Footer` L62-169 (~869 tok)

## src/features/Hero/

- `Hero.tsx` — Hero (~1460 tok)
  - fn `Hero` L13-131 (~1268 tok)
- `style.css` (~0 tok)

## src/features/HomePageContact/

- `HomePageContact.tsx` — CONTACT_TEXT — uses useRef, useState, useEffect (~3027 tok)
  - fn `distanceSq` L30-39 (~70 tok)
  - fn `HomePageContact` L40-350 (~2683 tok)

## src/features/HomePageContact/hooks/

- `usePretextWidths.ts` — Exports usePretextWidths (~87 tok)

## src/features/Project/

- `Project.tsx` — PROJECTS (~1613 tok)
  - fn `CurvedArrow` L52-80 (~180 tok)
  - fn `Project` L81-196 (~906 tok)

## src/features/TechStack/

- `StackSection.tsx` — LANGUAGES (~821 tok)
  - fn `GlassCard` L47-70 (~176 tok)
  - fn `StackSection` L71-94 (~191 tok)
- `style.css` — Styles: 2 rules (~111 tok)
- `TechStack.tsx` — TechStack — uses useRef (~577 tok)
  - fn `TechStack` L10-82 (~468 tok)

## src/lib/

- `utils.ts` — Exports cn (~50 tok)

## src/pages/

- `ContactPage.tsx` — EMAILJS_SERVICE_ID — renders form — uses useState, useEffect (~1100 tok)
  - fn `ContactPage` L13-116 (~934 tok)
- `HomePage.tsx` — About — uses useState, useEffect (~934 tok)
  - section `HomePageProps` L32-35 (~14 tok)
  - fn `SectionFallback` L36-39 (~42 tok)
  - fn `LazySection` L40-88 (~342 tok)
  - fn `HomePage` L89-118 (~271 tok)
- `PhotosPage.tsx` — photos (~740 tok)
  - fn `PhotosPage` L86-89 (~23 tok)
