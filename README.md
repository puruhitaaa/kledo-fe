# KLEDO Frontend Assessment

A modern, responsive Indonesian region filter application built with React 19 and Tailwind CSS 4. This application provides a cascading dropdown interface for exploring Indonesia's administrative regions (Provinces, Regencies, and Districts).

## Features

- **Cascading Region Filters** - Hierarchical selection flow: Province → Regency → District
- **URL-Based State** - Filter selections persist in URL query parameters for shareable links
- **Responsive Design** - Mobile-first layout that adapts beautifully to all screen sizes
- **Clean UI** - Minimal, professional design with smooth animations
- **Breadcrumb Navigation** - Visual indicator of current selection path

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | 19.2.0 | UI library |
| [React Router](https://reactrouter.com/) | 7.13.0 | Routing & data loading |
| [Tailwind CSS](https://tailwindcss.com/) | 4.2.0 | Styling |
| [Vite](https://vite.dev/) | 7.3.1 | Build tool & dev server |
| [TypeScript](https://www.typescriptlang.org/) | 5.9.3 | Type safety |

## Project Structure

```
kledo-fe/
├── public/
│   └── data/
│       └── indonesia_regions.json    # Region data (provinces, regencies, districts)
├── src/
│   ├── App.tsx                       # Main application component
│   ├── main.tsx                      # Application entry point & router setup
│   ├── loader.ts                     # React Router data loader
│   ├── types.ts                      # TypeScript type definitions
│   └── index.css                     # Global styles (Tailwind)
├── index.html                        # HTML template
├── vite.config.ts                    # Vite configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Dependencies & scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint for code quality |
| `npm run preview` | Preview production build locally |

## Architecture

### Data Flow

1. **Route Loader** (`src/loader.ts`) - Fetches region data and parses URL query parameters on route load
2. **App Component** (`src/App.tsx`) - Receives data via `useLoaderData()` hook and manages UI state
3. **URL Sync** - Selection changes update URL via `navigate()` for shareable state

### Key Components

#### App.tsx
The main component handles:
- Region filter state management
- Cascading dropdown logic (filtering regencies/districts based on parent selection)
- URL synchronization via React Router's `useNavigate()` and `useSearchParams()`
- Breadcrumb generation
- Responsive sidebar layout

#### Loader
Implements React Router's loader pattern for:
- Fetching static JSON data
- Parsing query parameters for initial filter state
- Providing typed data to components

### Type Definitions

```typescript
interface Province  { id: number; name: string; }
interface Regency   { id: number; province_id: number; name: string; }
interface District  { id: number; regency_id: number; name: string; }
interface Filters   { province: number | null; regency: number | null; district: number | null; }
```

## Design Decisions

### Why React Router Loaders?
Using React Router's loader pattern separates data fetching from rendering, enabling:
- Server-side rendering compatibility
- Better error handling
- Cleaner component code

### Why URL-Based State?
Storing filters in URL query parameters provides:
- Shareable links with pre-selected regions
- Browser history navigation (back/forward)
- No additional state management library needed

### Why Tailwind CSS 4?
The latest Tailwind version offers:
- Improved performance with new engine
- Simplified configuration via CSS-first approach
- Native Vite plugin integration

## Data Source

Region data is sourced from `public/data/indonesia_regions.json`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is a frontend assessment for KLEDO.
