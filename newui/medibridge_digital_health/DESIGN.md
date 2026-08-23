---
name: MediBridge Digital Health
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#3c4a46'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6b7a76'
  outline-variant: '#bacac5'
  surface-tint: '#006b5f'
  primary: '#006b5f'
  on-primary: '#ffffff'
  primary-container: '#2dd4bf'
  on-primary-container: '#00574d'
  inverse-primary: '#3cddc7'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#505f76'
  on-tertiary: '#ffffff'
  tertiary-container: '#afbfd9'
  on-tertiary-container: '#3e4e63'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#62fae3'
  primary-fixed-dim: '#3cddc7'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#005047'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  surface-white: '#FFFFFF'
  success-emerald: '#10B981'
  warning-amber: '#F59E0B'
  alert-rose: '#F43F5E'
  border-subtle: '#E2E8F0'
typography:
  hero-display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-tabular:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  status-label:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '700'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  card-padding: 24px
  bento-gap: 16px
---

## Brand & Style

The brand personality is **authoritative yet approachable**, blending the sterile precision of high-end healthcare with the fluid efficiency of a modern SaaS platform. It serves a dual audience: patients seeking clarity in complex medical journeys and retailers managing high-stakes pharmaceutical operations.

The design system adopts a **Sophisticated Bento UI** style. This approach uses a modular, card-based layout to organize dense data—such as surgical expense breakdowns or pharmacy stock levels—into digestible, high-hierarchy "tiles." 

**Key Visual Principles:**
- **Subtle Glassmorphism:** Used sparingly for persistent elements like navigation sidebars and floating action headers to maintain a sense of depth and modernity.
- **Atmospheric Professionalism:** A reliance on wide margins and "breathable" layouts to reduce the cognitive load often associated with medical data.
- **Precision Engineering:** Sharp typography paired with soft-radius containers to balance technical accuracy with user-centered accessibility.

## Colors

The palette is anchored by **Deep Navy (#0F172A)**, providing a foundation of trust and institutional stability. **Vibrant Teal (#2DD4BF)** serves as the high-energy primary accent, reserved for critical calls-to-action, success states, and interactive elements.

**Color Application:**
- **Primary (Teal):** Buttons, active navigation states, and "Verified" badges.
- **Secondary (Navy):** Primary headings, sidebar backgrounds, and high-level structural containers.
- **Neutrals:** Backgrounds utilize the cool-toned **#F8FAFC** to maintain a "clinical-clean" aesthetic without the harshness of pure white.
- **Status Tones:** Success (Emerald) for prescription verification, Warning (Amber) for near-expiry stock, and Alert (Rose) for restricted drug warnings.

## Typography

This design system uses a dual-font strategy to balance character with utility. **Geist** is employed for headings and UI labels, providing a technical, monolinear feel that suggests precision. **Inter** is used for all body copy and data-dense tables to ensure maximum legibility across different screen densities.

**Usage Rules:**
- **Hero Display:** Reserved for main dashboard welcomes or primary landing sections.
- **Label Caps:** Used for section headers within Bento cards (e.g., "EXPENSES BREAKDOWN").
- **Data Tabular:** Specifically optimized for the Retailer Portal’s stock management and billing lists, utilizing Inter's neutral glyph shapes for clarity in numbers.

## Layout & Spacing

The layout follows a **12-column Fluid Grid** for desktop and a **single-column flow** for mobile. The "Bento" philosophy dictates that content is housed in cards of varying spans (e.g., a 4-column card for "Doctor Info" next to an 8-column card for "Expense Breakdown").

**Grid & Rhythm:**
- **Bento Gaps:** A consistent 16px (1rem) gap between all dashboard cards.
- **Container Max-Width:** 1440px for desktop to prevent line lengths from becoming unreadable.
- **Vertical Rhythm:** Elements follow an 8px stepping scale for padding and margins to maintain mathematical harmony.
- **Mobile Reflow:** On screens <768px, all Bento cards stack vertically, maintaining the same order as the desktop 12-column priority.

## Elevation & Depth

To achieve the premium SaaS aesthetic, the design system avoids heavy shadows in favor of **Tonal Layering** and **Glassmorphism**.

**Depth Levels:**
1. **Level 0 (Background):** The neutral #F8FAFC surface.
2. **Level 1 (Bento Cards):** White (#FFFFFF) surfaces with a 1px border (#E2E8F0). No shadow, or a very faint "Ambient Glow" (0px 2px 4px rgba(15, 23, 42, 0.04)).
3. **Level 2 (Overlays/Modals):** Subtle glassmorphism using a backdrop-filter (blur: 12px) and 80% opacity white fill. These represent temporary states like "Prescription Upload" or "Scan Confirmation."
4. **Interactive States:** On hover, cards should subtly lift using a soft, diffused shadow (0px 10px 15px rgba(15, 23, 42, 0.08)).

## Shapes

The shape language is defined by **modern geometric softness**. A base radius of 8px (0.5rem) is used for standard components to communicate approachability without appearing "toy-like."

**Radius Scale:**
- **Small (4px):** Checkboxes, tags, and small input fields.
- **Medium (8px):** Primary buttons and standard input fields.
- **Large (16px):** Bento cards and main container wrappers.
- **Full (Pill):** Status badges (e.g., "In Stock") and search bars.

## Components

### Buttons
- **Primary:** Solid Teal (#2DD4BF) with white text. High-contrast, 8px roundedness.
- **Secondary:** Transparent with a Navy (#0F172A) border.
- **Ghost:** No border, Navy text, used for secondary actions like "Cancel."

### Bento Cards
Every card must have a consistent 24px internal padding. Titles within cards use the `label-caps` style in Tertiary Gray (#64748B) to act as an eyebrow above the main content.

### Inputs & Search
Fields use a white background with a 1px #E2E8F0 border. The persistent search bar in the customer portal should feature a "Pill" shape (full rounding) and a subtle glass effect when scrolled.

### Retailer Scanner
The scanner interface should use a "viewfinder" overlay with a high-contrast Alert Rose frame if a prescription is required, and a Teal frame if the item is cleared for billing.

### Status Chips
Small, pill-shaped indicators with low-opacity backgrounds (e.g., Success Emerald at 10% opacity) and high-opacity text of the same color for high legibility without visual noise.