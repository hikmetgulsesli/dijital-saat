# Design System Document: Digital Clock Utility (Turkish Edition)

## 1. Overview & Creative North Star: "The Temporal Monolith"
This design system is built upon the concept of **"The Temporal Monolith."** It moves away from the cluttered, widget-heavy aesthetic of traditional utilities to embrace a high-end editorial feel. We treat time not as data, but as a monumental presence. 

The experience is defined by **intentional void** (negative space) and **monolithic typography**. By utilizing centered, symmetrical layouts and removing all structural "noise" (borders and lines), we force the user’s focus onto the passage of time. The design breaks the "app template" look by treating the screen like a gallery wall—high contrast, ultra-legible, and unapologetically bold.

---

## 2. Colors: Depth Through Darkness
We move beyond flat black. The palette uses the "Slate-950" foundation (`#0c1324`) to create a deep, atmospheric environment where light elements appear to glow.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely through background color shifts.
- **Surface Nesting:** To separate a "World Clock" card from the background, use `surface_container_low` (`#151b2d`) on top of the `surface` (`#0c1324`) background.
- **The Glass & Gradient Rule:** For floating elements like a "Set Alarm" modal, use `surface_bright` (`#33394c`) with a 60% opacity and a `24px` backdrop-blur. 
- **Signature Glow:** Apply a subtle radial gradient on the `background`—a faint glow of `primary_fixed_dim` (`#454747`) centered behind the main clock digits—to provide a sense of "visual soul."

| Token | Hex | Role |
| :--- | :--- | :--- |
| `background` | `#0c1324` | The void. Used for the main app canvas. |
| `primary` | `#ffffff` | High-contrast focus. Used for clock digits and active states. |
| `surface_container` | `#191f31` | Secondary depth. Use for inset sections or list backgrounds. |
| `on_surface_variant`| `#c6c6c6` | Low-priority metadata (e.g., "Saniye", "Alarm Kapalı"). |

---

## 3. Typography: The Editorial Scale
We pair the geometric brutality of **Space Grotesk** with the Swiss precision of **Inter**.

- **Space Grotesk (Headings/Digits):** Used for the "Monolith" elements. It is wide, futuristic, and authoritative. 
- **Inter (Body/Labels):** Used for functional clarity. It provides a neutral balance to the expressive headings.

### Hierarchy (Turkish Context)
- **Display-LG (Clock):** `Space Grotesk / 3.5rem`. Used for the main time display (e.g., **22:45**).
- **Headline-MD:** `Space Grotesk / 1.75rem`. Used for section titles like "Alarmlar" or "Dünya Saati."
- **Title-MD:** `Inter / 1.125rem`. Used for city names or alarm labels.
- **Label-SM:** `Inter / 0.6875rem / Uppercase`. Used for technical data like "GMT+3" or "ÖS/ÖÖ."

---

## 4. Elevation & Depth: Tonal Layering
In this system, "up" does not mean "shadow." It means "lighter."

- **The Layering Principle:** Use the `surface_container` tiers to stack importance.
    - Level 0 (Base): `surface`
    - Level 1 (Cards): `surface_container_low`
    - Level 2 (Active States): `surface_container_high`
- **Ambient Shadows:** Only use shadows for floating Action Buttons (FAB). Use a 32px blur, 8% opacity, using the `primary` color as the shadow tint to simulate light emitting from the clock digits.
- **The "Ghost Border":** If a button needs a stroke, use `outline_variant` (`#474747`) at 20% opacity. It should be felt, not seen.

---

## 5. Components: Minimalist Utility

### Buttons (Butonlar)
- **Primary:** Background `primary` (#ffffff), Text `on_primary` (#1a1c1c). Shape: `xl` (0.75rem). Use for "Alarm Kur."
- **Secondary:** Background `secondary_container`, Text `on_secondary_container`. Use for "Vazgeç."
- **Ghost:** No background. Text `primary`. Use for "Düzenle."

### Cards & Lists (Kartlar ve Listeler)
- **Rule:** Forbid divider lines. 
- **Implementation:** Use a 16px vertical gap between list items. Use `surface_container_low` for the card background.
- **Example:** A world clock entry for "İstanbul" sits in a container with `0.75rem` (xl) rounded corners. The time is right-aligned in `headline-sm`.

### Time Pickers (Zaman Seçiciler)
- Use a vertical "scrolling drum" effect. The center selected value should be `primary` white, while the values above and below fade into `on_surface_variant` with a gradual decrease in scale.

### Toggle Switches (Anahtarlar)
- **Unselected:** `outline_variant` track with a `surface` thumb.
- **Selected:** `primary` track with an `on_primary_container` thumb. High contrast is key.

---

## 6. Do's and Don'ts

### Do
- **Center Everything:** Use symmetrical, centered layouts for main clock screens to emphasize the "Monolith" feel.
- **Embrace White Space:** If a screen feels empty, resist the urge to add a line. Let the `slate-950` breathe.
- **Turkish Localization:** Ensure Space Grotesk supports Turkish characters (İ, ı, Ğ, ğ, Ş, ş).
- **Micro-interactions:** Use soft fades (200ms) when switching between "Kronometre" and "Alarm" views.

### Don't
- **No Borders:** Never use a 100% opaque border to separate content.
- **No Pure Black:** Avoid `#000000`. The `slate-950` (`#0c1324`) provides a premium, "ink-like" depth that pure black lacks.
- **No Crowding:** Do not place text within 24px of the screen edge.
- **No Standard Blue:** If a "success" or "active" state is needed, use `primary` (white) or `secondary` (muted blue-grey). Avoid generic "Brand Blue."

---

## 7. Language Note: Turkish Implementation
All system labels must be in Turkish to maintain the boutique local feel:
- **Alarm:** Alarm
- **World Clock:** Dünya Saati
- **Stopwatch:** Kronometre
- **Timer:** Zamanlayıcı
- **Settings:** Ayarlar
- **Done:** Tamam