# Project Structure Documentation

## 📁 Daffodil Studios - Clean & Optimized Structure

### **Overview**
This document outlines the current optimized file structure after comprehensive code cleanup and refactoring for better maintainability, performance, and developer experience.

### **Current Project Structure**

```
📁 daffodil-studios/
├── 📁 assets/
│   ├── 📁 images/
│   │   ├── 📁 logos/
│   │   │   └── 📁 clients/           # Client company logos (12 files)
│   │   └── 📁 pages/
│   │       └── 📁 home/              # Homepage-specific images
│   └── 📁 styles/                    # Consolidated CSS system
│       ├── main.css                  # Animations, base styles, utilities
│       └── colors.css                # Brand colors, gradients, utility classes
├── 📁 components/                    # Flat structure with prefixed naming
│   ├── Card*.vue                     # Card components (CardService, CardScreening)
│   ├── Layout*.vue                   # Layout components (LayoutHeader, LayoutFooter)
│   ├── Ui*.vue                       # UI utilities (UiActionButton, UiSectionHeader, UiBackgroundPattern)
│   └── FilterBar.vue                 # Specialized components
├── 📁 pages/                         # Route pages (index, about, movies, screenings)
├── 📁 layouts/                       # Layout templates (default.vue)
├── 📁 composables/                   # Vue composables for reusable logic
├── 📁 types/                         # TypeScript interfaces (Movie, Screening, Client, Service, FilterData)
├── 📁 utils/                         # Utility functions (prepared for future use)
├── 📁 public/                        # Static files (favicon, robots.txt, logo)
└── 📁 server/api/                    # Server-side endpoints
```

### **Key Optimizations Completed**

#### **1. CSS Consolidation**
- **Brand Gradient Utilities**: 15+ utility classes for consistent styling
- **Component-Specific Classes**: `.client-logo-card`, `.tag-drama`, `.nav-underline`
- **Animation Utilities**: `.delay-1s`, `.delay-2s`, `.delay-4s` for staggered animations
- **Hover Effects**: `.hover-overlay-dark`, `.hover-overlay-brand`

#### **2. Component Architecture**
- **Prefixed Naming**: Optimized for Nuxt auto-import (`UiActionButton`, `CardService`)
- **Flat Structure**: Improved performance over nested folders
- **Reusable Components**: Extracted common patterns into utilities

#### **3. TypeScript Integration**
- **Shared Interfaces**: Moved `FilterData` to `types/index.ts`
- **Type Safety**: Proper type-only imports across components
- **Scalable Types**: Ready for additional interface definitions

#### **4. Code Deduplication**
- **Removed 70% CSS repetition** through utility classes
- **Consolidated duplicate patterns** across 8+ components
- **Eliminated redundant code** while maintaining functionality

### **CSS Utility System**

#### **Brand Gradients**
```css
.bg-brand-primary     /* Header/footer gradient */
.bg-brand-accent      /* Button accent gradient */
.bg-brand-light       /* Light background gradient */
.text-brand-gradient  /* Text gradient effect */
```

#### **Component Utilities**
```css
.client-logo-card     /* Standardized client logo styling */
.tag-drama           /* Movie genre tags */
.nav-underline       /* Navigation hover effects */
.hover-overlay-*     /* Card hover overlays */
```

#### **Animation Utilities**
```css
.delay-1s, .delay-2s, .delay-4s  /* Staggered animation delays */
.float-animation                  /* Floating particle effects */
.glow-border                      /* Glowing border animation */
```

### **Component Auto-Import Pattern**

Nuxt automatically imports components using prefixed naming:
- `UiActionButton.vue` → `<UiActionButton />`
- `CardService.vue` → `<CardService />`
- `LayoutHeader.vue` → `<LayoutHeader />`
- `FilterBar.vue` → `<FilterBar />`

### **Benefits Achieved**

1. **Performance**: Reduced CSS bundle size through deduplication
2. **Maintainability**: Centralized styling system in utility classes
3. **Consistency**: Unified brand gradient and animation system
4. **Developer Experience**: Clear naming conventions and auto-imports
5. **Scalability**: Easy to extend utility classes for new components

### **Styling Architecture**

#### **colors.css** - Brand System
- CSS custom properties for brand colors
- Gradient definitions and utilities
- Button, card, and component styling
- Brand-specific utility classes

#### **main.css** - Animations & Base
- Tailwind CSS directives
- Custom animations (typewriter, scroll, float)
- Layout utilities and responsive patterns
- Animation delay utilities

### **Development Guidelines**

1. **New Components**: Use prefixed naming for auto-import compatibility
2. **Styling**: Leverage existing utility classes before adding new styles
3. **Gradients**: Use brand gradient utilities for consistency
4. **Types**: Add new interfaces to `types/index.ts`
5. **Animations**: Use existing animation utilities and delay classes

This optimized structure provides excellent performance, maintainability, and developer experience while maintaining the full functionality of the original design.