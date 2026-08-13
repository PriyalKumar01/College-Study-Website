# StudyHub Design System & UI Guidelines

## 1. Color Palette & Theme Tokens
This application uses Tailwind CSS theme tokens that automatically adapt to Light and Dark mode using CSS variables.

- **Background**: `bg-background` (`#ffffff` in light mode, `#0B0F17` / `#090D16` in dark mode)
- **Foreground Text**: `text-foreground` (`#0f172a` in light mode, `#f8fafc` in dark mode)
- **Muted Background & Text**: `bg-muted`, `text-muted-foreground`
- **Cards & Surfaces**: `bg-card` (`#ffffff` in light mode, `#111827` in dark mode) with `border border-border`
- **Primary Brand Color**: Indigo / Blue (`#2563eb` / `bg-primary`)
- **Accent Badges**:
  - Recommended Badge: `bg-amber-500 text-white dark:bg-amber-500/90 shadow-md`
  - Community Upload Badge: `bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20`
  - Curriculum/Official Badge: `bg-blue-600 text-white font-bold`
  - Active Status Badge: `bg-emerald-600 text-white font-bold`

## 2. Card Components & Micro-Animations
- **Hover Micro-Animations**:
  `hover:-translate-y-1 hover:shadow-lg transition-all duration-300`
- **Card Borders**:
  `border border-border hover:border-primary/40 rounded-2xl`
- **No Hardcoded Dark Blocks in Light Mode**:
  Always use `bg-card`, `bg-background`, or `bg-muted` rather than hardcoding `bg-slate-900` or `bg-[#070B14]`.

## 3. Note Card Layout & Recommended Badge Rule
- Every Note Card must have `relative` positioning.
- **Top-Right Recommended Badge Rule**:
  When `note.recommended === true` (or `isRecommended === true`), display a floating badge at `top-3 right-3`:
  ```tsx
  {note.recommended && (
    <div className="absolute top-3 right-3 z-10 pointer-events-none">
      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase bg-amber-500 text-white dark:bg-amber-500/90 shadow-md px-2.5 py-1 rounded-full">
        ⭐ Recommended
      </span>
    </div>
  )}
  ```
- **Owner Action Button Placement**:
  When `note.isCommunity && isOwner`, position the delete action button safely at `top-3 left-3` or beside badges to prevent overlap.

## 4. Accordion Step Flow (Admin Upload & Forms)
- **Form Envelope Container**:
  `border border-border bg-card shadow-lg rounded-2xl p-6 sm:p-8 space-y-6`
- **Active Step Card**:
  `border border-primary/40 bg-card rounded-xl p-5 shadow-sm`
- **Completed Step Summary Row**:
  `border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 p-3.5 rounded-xl flex items-center justify-between transition-all cursor-pointer`
  - Left: Emerald checkmark `✓` badge + Step Name + Selected Value.
  - Right: Subtle "Change" action button.
