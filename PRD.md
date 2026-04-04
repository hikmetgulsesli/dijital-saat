# PRD — Dijital Saat

## 1. Project Overview

- **Project Name:** Dijital Saat
- **Type:** Single Page Application (SPA)
- **Core Functionality:** Real-time digital clock displaying hours, minutes, seconds, and current date with a dark minimalist design.
- **Target Users:** Anyone needing a visually appealing digital clock on the web.

---

## 2. Project Goals

- Display current time in HH:MM:SS format, updating every second.
- Display current date in human-readable format.
- Provide a clean, dark-themed, minimal UI.
- Zero external dependencies beyond React + Vite + TypeScript.

---

## 3. Target Platform

- **Platform:** Web (responsive, works on all screen sizes)
- **Framework:** React + Vite (as specified)

---

## 4. Functional Requirements

### 4.1 Core Features

| # | Feature | Description |
|---|---------|-------------|
| 1 | Real-time clock | Updates every second, displays HH:MM:SS |
| 2 | Date display | Shows current date (e.g., 5 Nisan 2026 Pazar) |
| 3 | Dark theme | Dark background, light text |
| 4 | Responsive layout | Centered clock, scales with viewport |

### 4.2 User Interactions

- None required — purely display-only, auto-updates.

### 4.3 Data Flow

- Time source: `Date` object (client-side, browser timezone).
- No persistence, no API calls, no state management needed beyond React `useState` / `useEffect`.

---

## 5. Technical Requirements

### 5.1 Stack

- **Framework:** React 18+ with Vite
- **Language:** TypeScript
- **Styling:** CSS Modules or plain CSS (no Tailwind)
- **No external UI libraries**

### 5.2 Architecture

- Single `App` component rendering the clock.
- `useEffect` + `setInterval` for 1-second tick.
- Time formatting utility functions.

### 5.3 File Structure

```
src/
  App.tsx          — main component
  App.css          — styles
  main.tsx         — entry point
  index.css        — global styles, fonts
```

---

## 6. UI/UX Requirements

### 6.1 Visual Design

| Property | Value |
|----------|-------|
| Background | #0a0a0a (near black) |
| Text color | #f0f0f0 (off-white) |
| Font | "JetBrains Mono" or "Roboto Mono" from Google Fonts |
| Clock font size | ~8rem (responsive with clamp()) |
| Date font size | ~2rem |
| Layout | Flexbox, centered both axes |

### 6.2 Typography

- Monospace font for clock digits (consistent width prevents layout shift).
- Sans-serif for date string.

---

## 7. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Performance | No lag, 60fps rendering |
| Bundle size | < 100KB gzipped |
| Accessibility | Readable contrast, semantic HTML |

---

## 8. Edge Cases

- Clock must not drift — always use `Date` object, not accumulated seconds.
- Handle page visibility (pause/resume if tab is hidden — optional).
- Timezone: uses browser's local timezone.

---

## 9. Acceptance Criteria

- [ ] Page loads with current time displayed
- [ ] Seconds increment every second without drift
- [ ] Date is shown in Turkish format
- [ ] Dark background, light text
- [ ] Responsive on mobile and desktop
- [ ] No console errors

---

## 10. Out of Scope

- Alarms / timers
- World clock (multiple timezones)
- Settings or user preferences
- Authentication

---

## Ekranlar (Screens)

| # | Ekran Adı | Tür | Açıklama |
|---|-----------|-----|----------|
| 1 | Ana Saat | single-view | Büyük fontla HH:MM:SS ve tarih gösterimi, koyu tema, responsive |
| 2 | Yükleniyor Durumu | loading-state | İlk yükleme sırasında kısa bir loading gösterimi |
| 3 | Saat Bölümü | component | Ana ekranın bir parçası olarak clock component |
