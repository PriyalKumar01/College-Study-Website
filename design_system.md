# StudyHub Professional Design System & UI Standards

> **MANDATORY INSTRUCTION FOR ALL PAGES**:
> Every page, card, button, and component in College Study Hub must adhere strictly to these professional engineering standards. Do NOT use childish, bubbly, rounded-2xl/rounded-3xl cards or amateur skyblue gradient strips.

---

## 1. Corner Philosophy: Square & Crisp (Not Bubbly/Round)
- **Primary Rule**: Use sharp, square corners (`rounded-none` or micro-radius `rounded-sm` / `rounded-[4px]`).
- **NEVER** use `rounded-2xl`, `rounded-3xl`, or `rounded-full` for cards, buttons, or input boxes.
- Bounding containers, action cards, inputs, and modals must feel structured, technical, and enterprise-grade.

| Element | Allowed Classes | Forbidden Classes |
| :--- | :--- | :--- |
| **Cards & Boxes** | `rounded-none`, `rounded-sm`, `rounded-[4px]` | `rounded-2xl`, `rounded-3xl`, `rounded-xl` |
| **Buttons & Action Pills** | `rounded-none`, `rounded-sm`, `rounded-[3px]` | `rounded-full`, `rounded-2xl` |
| **Inputs & Dropdowns** | `rounded-none`, `rounded-sm` | `rounded-2xl`, `rounded-3xl` |
| **Badges & Tags** | `rounded-none`, `rounded-xs` | `rounded-full` |

---

## 2. Color Palette & Theming: Dark Professional with Emerald Hover
- **Base Background**: Deep dark technical canvas (`bg-slate-950` / `bg-[#090d16]` in dark mode, clean crisp slate in light mode).
- **Card Background**: Sleek dark slate/zinc surface (`bg-slate-900/90` or `bg-card dark:bg-[#0d1424]`).
- **Borders**: Subtle, crisp hairline borders (`border-slate-800` or `border-border/80`).
- **The Signature Hover Effect (Light Green / Emerald)**:
  - Just like the high-performing **Notes** pages, interactive cards MUST illuminate with a subtle, sophisticated emerald/light-green glow on hover:
  - Classes: `transition-all duration-200 hover:border-emerald-500/60 dark:hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.08)] group-hover:text-emerald-400`
- **Accent Badges**:
  - Emerald status: `bg-emerald-500/10 text-emerald-400 border border-emerald-500/30`
  - Recommended badge: `bg-emerald-600 text-white font-bold` or `bg-amber-500/10 text-amber-400 border border-amber-500/30`
- **FORBIDDEN**:
  - No random skyblue gradients (`from-blue-600 via-indigo-600 to-sky-500`).
  - No bloated decorative headers or fake partner promotional banners.

---

## 3. Cards & Grid Architecture
- **Box Grid**: Clean 1-col (mobile) -> 2-col (tablet) -> 3-col or 4-col (desktop) structured grids (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`).
- **Internal Card Hierarchy**:
  1. **Top Row**: Clean square icon container (`w-10 h-10 rounded-sm bg-slate-800 border border-slate-700`) + Category / Purpose Badge.
  2. **Middle Body**: High-contrast, clean font title (`font-bold text-white tracking-tight`) + concise technical description.
  3. **Feature Tags / Highlights**: Crisp square micro-tags with bullet or subtle check.
  4. **Bottom Action**: Full-width or right-aligned direct functional button:
     - Example: **"Open Website ↗"** or **"View Notes →"**
     - Sharp rectangular button with `rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs`.
- **NO Useless Actions**: Never clutter with "Copy Link", "Share" modals, or dummy buttons unless explicitly requested. Direct action only.

---

## 4. Typography & Visual Tone
- Headings: Clean, bold, compact (`font-bold tracking-tight text-slate-100`).
- Subtitles: Technical, high-utility description (`text-slate-400 text-xs sm:text-sm`).
- No childish cartoon emojis or decorative clutter. Professional icons from `lucide-react` only.
