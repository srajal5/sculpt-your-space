# 🌌 Sculpt Your Space — Immersive 3D Interactive Portfolio

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.159-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Playwright](https://img.shields.io/badge/Playwright-1.61.0-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)

**Sculpt Your Space** is a state-of-the-art, high-performance 3D interactive web portfolio built to showcase creative web development, 3D WebGL experiences, full-stack projects, and modern UI/UX design.

Designed with a futuristic cyberpunk neon aesthetic and glassmorphism elements, the application seamlessly blends interactive 3D graphics with responsive web interfaces.

---

## ✨ Key Features

- **🌐 Interactive 3D WebGL Scene**:
  - Custom camera controller with gentle mouse parallax and breathing motion (`SmoothCameraController`).
  - Animated multi-point lighting setup with dynamic color shifting.
  - Floating geometric 3D crystals with metallic reflections (`FloatingCrystals`).
  - Atmospheric 3D nebula particle cloud system (`NebulaParticles`).
  - Procedural volumetric aurora background waves (`AuroraWaves`).
  - Perspective responsive wireframe landscape grid (`WireframeGrid`).
  - Dynamic color-shifting light trails (`LightTrails`).

- **🎨 Modern Glassmorphism & Cyberpunk Design System**:
  - Rich HSL color palette tailored with neon accents (`#9b87f5` Neon Purple, `#0EA5E9` Neon Blue, `#D946EF` Neon Pink).
  - Micro-animations, glowing borders, and smooth hover feedback built with **Framer Motion**.
  - Custom backdrop blur glassmorphism card components.

- **💼 Featured Projects Showcase**:
  - Interactive grid highlighting production projects such as **QuickCart E-commerce**, **Shareable FileHub**, **Immersive Web Experiences**, and **Virtual Reality Tours**.
  - Direct integration with live demo URLs and source code repositories.

- **📊 Animated Skill Progress Gauges**:
  - Visualized skill bars categorized by Frontend, Backend, UI/UX Design, and Developer Tools with smooth scroll-triggered animations.

- **📩 Smart Contact System with Local Storage Fallback**:
  - Direct email sending using **EmailJS**.
  - Persistent message history stored safely in `localStorage` so user input is never lost.
  - Automatic fallback to `mailto:` client launching if EmailJS credentials are not configured.

- **🧪 Automated E2E Test Suite**:
  - End-to-end testing powered by **Playwright** covering loading state clearance, header visibility, and smooth section navigation.

---

## 🛠️ Tech Stack Overview

### 🔹 Core Framework & Compiler
| Technology | Description |
| :--- | :--- |
| **React 18** | Core component UI framework |
| **TypeScript 5.5** | Strongly typed JavaScript development |
| **Vite 5.4** | Ultra-fast dev server and build tool |
| **@vitejs/plugin-react-swc** | Speedy SWC compiler for React transformation |

---

### 🔹 3D WebGL & Interactive Graphics
| Technology | Description |
| :--- | :--- |
| **Three.js** | 3D WebGL graphics library |
| **React Three Fiber (@react-three/fiber v8)** | React renderer for Three.js scene graphs |
| **React Three Drei (@react-three/drei v9)** | High-level helpers & abstractions for R3F |
| **WebGL & Shaders** | Custom procedural animation shaders and multi-light setups |

---

### 🔹 Animations & Styling
| Technology | Description |
| :--- | :--- |
| **Tailwind CSS v3.4** | Utility-first CSS framework |
| **@tailwindcss/typography** | Rich text formatting plugin |
| **tailwindcss-animate** | Animation primitives for Tailwind CSS |
| **Framer Motion v12** | Scroll-triggered entrance animations, layout transitions, & UI feedback |
| **Lucide React** | Modern, clean vector icon library |

---

### 🔹 UI Components & Architecture
| Technology | Description |
| :--- | :--- |
| **Radix UI Primitives** | Unstyled, accessible UI components (Dialog, Popover, Dropdown, Accordion, Tooltip, Toast, etc.) |
| **shadcn/ui** | Reusable, beautiful component library architecture |
| **Sonner & Toast** | Smooth toast notification feedback system |

---

### 🔹 State, Form & Utilities
| Technology | Description |
| :--- | :--- |
| **TanStack React Query v5** | Asynchronous state management & data fetching |
| **React Router DOM v6** | Client-side routing (`/` home and `*` 404 page) |
| **React Hook Form** | Performant, flexible form handling |
| **Zod** | TypeScript-first schema validation |
| **EmailJS (@emailjs/browser v4)** | Client-side email dispatch engine |
| **date-fns & clsx / tailwind-merge** | Date formatting and conditional CSS class merging |

---

### 🔹 Testing & Developer Tools
| Technology | Description |
| :--- | :--- |
| **Playwright (@playwright/test v1.61)** | End-to-end integration and UI browser testing |
| **ESLint 9** | Flat config code linting with React Hooks & TypeScript plugins |
| **Lovable Tagger** | Dev-mode element inspection tagger |

---

## 📁 Project Structure

```text
sculpt-your-space/
├── public/                    # Static assets & favicon
├── src/
│   ├── components/
│   │   ├── 3d/               # 3D R3F components (Aurora, Crystals, Particles, Grid, etc.)
│   │   ├── ui/               # Radix / shadcn UI primitives (button, card, input, toast, etc.)
│   │   ├── Scene.tsx         # Main 3D Canvas wrapper & camera / light controller
│   │   ├── Navbar.tsx        # Navigation header with backdrop blur
│   │   ├── HeroSection.tsx   # Hero greeting & social links
│   │   ├── ProjectsSection.tsx# Projects grid & cards
│   │   ├── AboutSection.tsx  # Bio & expertise breakdown
│   │   ├── SkillsSection.tsx # Animated technical skill bars
│   │   ├── ContactSection.tsx# Contact form with EmailJS & local storage
│   │   ├── LoadingScreen.tsx # Interactive preloader
│   │   └── Footer.tsx        # Footer copyright & links
│   ├── Imagecomponents/      # Project preview screenshots
│   ├── pages/                # Route pages (Index.tsx, NotFound.tsx)
│   ├── lib/                  # Utility functions (utils.ts)
│   ├── App.tsx               # App entry & provider setup
│   ├── main.tsx              # DOM root mount point
│   └── index.css             # Design system tokens & global styling
├── tests/
│   └── portfolio.spec.ts     # Playwright E2E test suite
├── package.json              # Dependencies and npm scripts
├── tailwind.config.ts        # Tailwind CSS theme & glassmorphism extension
├── vite.config.ts            # Vite server & build configurations
└── playwright.config.ts      # Playwright test runner config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/srajal5/sculpt-your-space.git
   cd sculpt-your-space
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables** *(Optional)*:
   Create a `.env` file in the root directory to enable direct email delivery via EmailJS:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
   *(Note: If left unconfigured, the contact form automatically saves messages to `localStorage` and opens your default mail client).*

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:8080` in your browser to view the live application.

---

## 📜 Available NPM Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Vite development server at `http://localhost:8080` |
| `npm run build` | Builds optimized production bundle into `dist/` |
| `npm run build:dev` | Builds bundle in development mode |
| `npm run preview` | Previews production build locally |
| `npm run lint` | Runs ESLint to check for code quality and style issues |
| `npm run test:e2e` | Runs Playwright end-to-end tests headlessly |
| `npm run test:e2e:ui` | Runs Playwright tests with interactive UI test runner |

---

## 🧪 Running E2E Tests

To run the Playwright test suite and verify component visibility and navigation:

```bash
# Run tests in headless mode
npm run test:e2e

# Run tests with Playwright UI runner
npm run test:e2e:ui
```

---

## 👨‍💻 Author & Contact

**Srajal**
- **GitHub**: [@srajal5](https://github.com/srajal5)
- **Email**: [Srajalpuri55@gmail.com](mailto:Srajalpuri55@gmail.com)
- **Location**: Lucknow, Uttar Pradesh, India

---

⭐ *If you like this project, feel free to give it a star on GitHub!*
