# Design System Document

## 1. Overview & Creative North Star: "The Neon Monolith"

This design system is engineered to transform a utilitarian tool—a unit converter—into a high-end digital artifact. Moving away from the cluttered, ad-heavy layouts typical of the genre, we embrace a Creative North Star titled **"The Neon Monolith."**

The aesthetic centers on a singular, powerful focal point (the conversion result) set against an infinite, dark void. By utilizing **intentional asymmetry**, we break the predictable "input-equals-output" grid. We favor **tonal depth** over structural lines, using glassmorphism and light-leaks to create an environment that feels less like a website and more like a premium physical console.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule

The palette is anchored in deep charcoal and electrified by high-energy accents. Our goal is to guide the eye through luminescence rather than geometry.

### Core Palette
- **Surface & Background:** Using `surface` (#0e0e0e) as our base canvas.
- **Accents:** `primary` (#81ecff / Electric Blue) and `secondary` (#a68cff / Neon Purple) are used exclusively for interaction and emphasis.
- **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Boundaries are defined solely through background shifts:
    - Place a `surface-container-high` card on a `surface` background to create a "lifted" section.
    - Use `surface-container-low` for secondary inputs to "sink" them into the canvas.

### The Glass & Gradient Rule
To achieve "The Neon Monolith" look, floating elements (like dropdown menus) must use **Glassmorphism**:
- **Background:** `surface-container-highest` at 60% opacity.
- **Effect:** `backdrop-filter: blur(20px)`.
- **Signature Texture:** Primary buttons must utilize a linear gradient from `primary` to `primary-container` at a 135-degree angle to provide a "glowing" physical presence.

---

## 3. Typography: Editorial Precision

We use a dual-typeface system to create a high-contrast hierarchy that feels custom and intentional.

- **Display & Headlines (Space Grotesk):** This typeface provides a technical, slightly futuristic edge. Used for the unit categories (Uzunluk, Sıcaklık) and the large-scale result display.
- **Title & Body (Inter):** Chosen for its unparalleled legibility at small sizes. Used for input labels, unit selectors, and functional text.

**Visual Hierarchy Note:** The `display-lg` scale (3.5rem) should be reserved strictly for the final conversion result, ensuring the user's primary goal is met with immediate visual impact.

---

## 4. Elevation & Depth: Tonal Layering

Traditional shadows and borders create "visual noise." Instead, we use **Tonal Layering** to communicate hierarchy.

- **The Layering Principle:** 
    - **Level 0 (Base):** `surface` (#0e0e0e)
    - **Level 1 (Sections):** `surface-container-low` (#131313)
    - **Level 2 (Interactive Elements):** `surface-container-high` (#20201f)
- **Ambient Shadows:** For floating modals or tooltips, use a shadow with a blur radius of 40px and 4% opacity, tinted with the `primary` color to simulate a soft neon glow.
- **The "Ghost Border" Fallback:** If a container requires further definition, use `outline-variant` at 15% opacity. Never use a 100% opaque border.

---

## 5. Components: Functional Elegance

### Input Fields & Selectors
- **Style:** Large padding, `md` (1.5rem) corner radius.
- **State:** Active inputs transition from `surface-container-highest` to a subtle gradient glow on the bottom edge using the `primary` token.
- **Forbid Dividers:** Do not use lines between the unit type and the value. Use vertical spacing of `2rem` to separate the "From" and "To" sections.

### Primary Conversion Result
- **Placement:** Asymmetric. Position the result slightly off-center or significantly larger than the input to create a modern, editorial "hero" moment.
- **Color:** Use `primary` for the number and `on_surface_variant` for the unit label (e.g., "1.284,50 **KM**").

### Category Navigation (Tabs)
- **Design:** Instead of standard buttons, use a "Pill" design with `full` (9999px) roundedness.
- **Inactive:** `surface-container-lowest`.
- **Active:** `secondary_container` with `on_secondary_container` text. This provides a clear, vibrant "Neon" indicator of the current mode.

### Signature Component: The "Quick-Swap"
A floating glassmorphism circle with a `secondary` icon that sits *between* the input and output containers, overlapping both to break the flat grid.

---

## 6. Do's and Don'ts

### Do
- **Use White Space:** Treat negative space as a luxury. Allow components to breathe.
- **Subtle Motion:** Use 300ms "ease-out" transitions for all hover states and background shifts.
- **Turkish Localization:** Ensure labels like "Dönüştür," "Miktar," and "Birim Seçin" follow the `label-md` typography scale for clarity.

### Don't
- **Don't use Box Shadows on everything:** Only use shadows for elements that "float" (modals, dropdowns). Everything else uses tonal shifts.
- **Don't use pure black (#000) for backgrounds:** It feels "dead." Use the `surface` token (#0e0e0e) to maintain depth.
- **Don't use standard scrollbars:** Style them to be thin, `surface-container-highest` bars that blend into the background.
- **Don't use lines:** If you feel the need for a divider, increase the margin-bottom by `1rem` instead.