# Mapping the Diaspora

An interactive map for exploring historical census data across Greater Manchester. Browse population, employment, housing, and migration indicators across the 1981, 1991, and 2001 censuses, shown at ward and enumeration district level.

## What it does

The app renders choropleth maps of Manchester that shade each area by a chosen indicator. You pick a census year and an indicator from the panel on the left, and the map updates accordingly. All the underlying data is bundled in the repository as static GeoJSON files, so no external database or API is needed.

## Running it locally

You need Node.js. If you do not have it, [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) is the simplest way to install it.

```sh
git clone https://github.com/jourdee-lab/mapping_diaspora_fyp.git
cd mapping_diaspora_fyp
npm install
npm run dev
```

Open the URL printed in your terminal. The page reloads automatically as you edit files.

## Other commands

| Command | What it does |
| --- | --- |
| `npm run build` | Builds the app for production into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Checks the code with ESLint |

## Project layout

```
src/
  components/   Map container, legend, side panels, header
  data/         Indicator definitions
  pages/        Page-level components (explorer, about, methodology)
  types/        Shared TypeScript types
public/
  geojson/      GeoJSON boundary files for 1981, 1991, and 2001
```

## Tech stack

- [Vite](https://vitejs.dev) and [TypeScript](https://www.typescriptlang.org)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com)
- [React Leaflet](https://react-leaflet.js.org) for the map

## Deployment

The repository includes a `vercel.json` configured for single-page app routing. Import the repo at [vercel.com](https://vercel.com) and it will deploy automatically with no extra configuration needed.
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6c14bafc-3461-41d2-aca0-5fabf5eee037) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
