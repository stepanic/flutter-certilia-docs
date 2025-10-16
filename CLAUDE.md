# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a documentation site built with **Fumadocs** (a Next.js-based documentation framework). The project uses:
- Next.js 15 with App Router
- Fumadocs UI and Core for documentation features
- MDX for content authoring
- Biome for linting and formatting
- TypeScript with strict mode

## Essential Commands

### Development
```bash
npm run dev        # Start dev server with Turbo (http://localhost:3000)
npm run build      # Build for production (fully static output)
npm start          # Start production server
```

### Code Quality
```bash
npm run lint       # Run Biome linter checks
npm run format     # Format code with Biome
```

### Content Processing
```bash
npm run postinstall  # Process MDX content (runs automatically after npm install)
```

The `postinstall` script runs `fumadocs-mdx` to generate the `.source` directory from MDX files in `content/`.

## Environment Setup

### Required Environment Variables

This project uses **Orama Cloud** for search functionality. You need to set up environment variables for search to work:

1. **Copy the template:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Get Orama Cloud credentials:**
   - Create account at https://cloud.orama.com/
   - Create new index with "Crawler" type
   - Select "Documentation" preset
   - Copy your API key and endpoint URL

3. **Configure `.env.local`:**
   ```bash
   NEXT_PUBLIC_ORAMA_API_KEY=your_public_api_key_here
   NEXT_PUBLIC_ORAMA_ENDPOINT=https://cloud.orama.run/v1/indexes/your-index-id
   NEXT_PUBLIC_ORAMA_INDEX_TYPE=crawler
   ```

**IMPORTANT:**
- `.env.local` is gitignored and should NEVER be committed
- These are public API keys (safe for client-side use) but should still be managed via environment variables
- For production deployment (Cloudflare Pages/Sevalla), set these variables in your hosting platform's environment settings

## Architecture

### Content Flow

1. **Source Files**: MDX content lives in `content/docs/`
2. **Processing**: `fumadocs-mdx` processes these files based on `source.config.ts` configuration
3. **Generated Source**: Processed content is output to `.source/` directory (gitignored)
4. **Content Adapter**: `lib/source.ts` creates a loader that provides the content API
5. **Page Rendering**: `app/docs/[[...slug]]/page.tsx` dynamically renders pages using the loader

### Key Files

- **`source.config.ts`**: Defines MDX processing configuration, frontmatter schema, and postprocessing options (e.g., `includeProcessedMarkdown: true` for LLM text generation)
- **`lib/source.ts`**:
  - Exports the `source` loader (baseUrl: `/docs`)
  - Includes `lucideIconsPlugin()` for icon support
  - Provides `getPageImage()` for OpenGraph images
  - Provides `getLLMText()` for generating LLM-friendly text from pages
- **`lib/layout.shared.tsx`**: Shared layout configuration (nav title, links) used by both home and docs layouts
- **`components/search-dialog.tsx`**: Client-side search component that integrates Orama Cloud (reads environment variables)
- **`app/docs/layout.tsx`**: Docs layout wrapper using `DocsLayout` component with page tree from source
- **`app/docs/[[...slug]]/page.tsx`**: Dynamic catch-all route that renders MDX content
- **`app/llms-full.txt/route.ts`**: Special endpoint that exports all documentation as text for LLM consumption

### Path Aliases

TypeScript is configured with these path aliases:
- `@/*` → Root directory
- `@/.source` → Generated `.source/index.ts`

### Route Structure

- `app/(home)/` → Landing page and other non-docs pages
- `app/docs/` → Documentation layout and pages
- Dynamic routes use catch-all `[[...slug]]` pattern for flexible page structure

## Content Authoring

### MDX Files
- Add new docs in `content/docs/`
- Frontmatter schema defined in `source.config.ts`
- After adding/modifying content, run `npm run postinstall` to regenerate `.source/`
- MDX components can be customized in `mdx-components.tsx`
- Relative links between docs are supported via `createRelativeLink()` helper

### Meta Files
- Use `meta.json` files for navigation structure
- Schema defined in `source.config.ts`

## Biome Configuration

The project uses Biome (not ESLint/Prettier) for linting and formatting:
- 2-space indentation
- Organize imports automatically
- Next.js and React recommended rules enabled
- Ignores: `node_modules`, `.next`, `dist`, `build`, `.source`

## Deployment

### Static Hosting (Cloudflare Pages / Sevalla / Vercel)

This project is **fully static** and can be deployed to any static hosting platform:

1. **Build Output**: `npm run build` produces a fully static site
2. **No Server Required**: All pages are pre-rendered at build time
3. **Search**: Uses client-side Orama Cloud API (no server-side search endpoint)

### Cloudflare Pages / Sevalla Setup:

```bash
# Build command:
npm run build

# Output directory:
.next

# Environment variables (set in hosting dashboard):
NEXT_PUBLIC_ORAMA_API_KEY=your_api_key
NEXT_PUBLIC_ORAMA_ENDPOINT=your_endpoint_url
NEXT_PUBLIC_ORAMA_INDEX_TYPE=crawler
```

### After Deployment:

1. Your site will be live at the provided URL
2. Orama Crawler will index your deployed site automatically
3. Search will work once crawler completes initial indexing
4. Re-trigger crawler from Orama Cloud dashboard after content updates

## Important Notes

- The `.source/` directory is auto-generated - never edit it directly
- Static site generation is used (see `generateStaticParams()` in page.tsx)
- OpenGraph images are generated dynamically via `/og/docs/[...slug]/route.tsx`
- Search uses **client-side Orama Cloud** with web crawler indexing
- All content is pre-rendered at build time - no runtime server needed
