# flutter-certilia-docs

Documentation site for Flutter Certilia, built with [Fumadocs](https://fumadocs.dev) and Next.js.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Search (Required)

This project uses **Orama Cloud** for search functionality. You need to set up your search credentials:

1. **Copy the environment template:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Get your Orama Cloud credentials:**
   - Create a free account at [https://cloud.orama.com/](https://cloud.orama.com/)
   - Create a new index with **"Crawler"** type
   - Select **"Documentation"** preset
   - Copy your **API Key** and **Endpoint URL** from the dashboard

3. **Add credentials to `.env.local`:**
   ```bash
   NEXT_PUBLIC_ORAMA_API_KEY=your_public_api_key_here
   NEXT_PUBLIC_ORAMA_ENDPOINT=https://cloud.orama.run/v1/indexes/your-index-id
   NEXT_PUBLIC_ORAMA_INDEX_TYPE=crawler
   ```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Development

### Adding Documentation

1. Create MDX files in `content/docs/`
2. Use frontmatter for metadata:
   ```mdx
   ---
   title: Page Title
   description: Page description
   ---

   Your content here...
   ```
3. Run `npm run postinstall` to regenerate the content index

### Available Commands

```bash
npm run dev        # Start development server with Turbo
npm run build      # Build for production (static output)
npm start          # Start production server
npm run lint       # Run Biome linter
npm run format     # Format code with Biome
```

## Deployment

This site is **fully static** and can be deployed to any static hosting platform:

### Cloudflare Pages / Sevalla

**Build Settings:**
- Build command: `npm run build`
- Output directory: `.next`

**Environment Variables:**
Add these in your hosting dashboard:
```
NEXT_PUBLIC_ORAMA_API_KEY=your_api_key
NEXT_PUBLIC_ORAMA_ENDPOINT=your_endpoint_url
NEXT_PUBLIC_ORAMA_INDEX_TYPE=crawler
```

**After Deployment:**
1. Your site will be live at the provided URL
2. Go to Orama Cloud dashboard and configure the crawler with your deployed URL
3. Trigger the crawler to index your site
4. Search will work once indexing is complete

### Vercel / Netlify

Same build settings as above. Add environment variables in their respective dashboards.

## Project Structure

```
├── app/
│   ├── (home)/          # Landing page
│   ├── docs/            # Documentation pages
│   ├── og/              # OpenGraph image generation
│   └── llms-full.txt/   # LLM-friendly text export
├── content/
│   └── docs/            # MDX documentation files
├── lib/
│   ├── source.ts        # Content loader
│   ├── search.config.ts # Orama Cloud configuration
│   └── layout.shared.tsx # Shared layout config
├── .source/             # Auto-generated (gitignored)
└── source.config.ts     # MDX processing config
```

## Important Notes

- **Never commit `.env.local`** - it's gitignored for security
- The `.source/` directory is auto-generated - don't edit it directly
- Search requires Orama Cloud credentials to function
- All pages are pre-rendered at build time (SSG)

## Learn More

- [Fumadocs Documentation](https://fumadocs.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Orama Cloud](https://cloud.orama.com/)

## License

[Add your license here]
