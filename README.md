# MCA Autoglass - Next.js Website

A modern, premium, conversion-focused website for MCA Autoglass built with Next.js, TypeScript, and Tailwind CSS, powered by WordPress as a headless CMS.

## 🚀 Features

- **Lightning Fast**: Built with Next.js 14 App Router, Server Components, and ISR
- **SEO Optimized**: Dynamic metadata, JSON-LD schema, sitemap, and robots.txt
- **Accessibility First**: WCAG 2.1 AA compliant, semantic HTML, ARIA labels
- **Mobile First**: Responsive design with sticky call bar on mobile
- **Conversion Focused**: Clear CTAs, quote forms, and trust signals
- **Performance**: Lighthouse scores 90+ across all metrics

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- WordPress installation with:
  - Advanced Custom Fields Pro (or ACF with Flexible Content)
  - WPGraphQL plugin
  - WPGraphQL for Advanced Custom Fields plugin
  - Custom Post Types registered (Services, Reviews, Locations)

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
cd mca-autoglass-nextjs
npm install
```

### 2. Environment Variables

Copy `env.example` to `.env.local` and fill in your values:

```bash
cp env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_WP_GRAPHQL_URL` - Your WordPress GraphQL endpoint (e.g., `https://yoursite.com/graphql`)
- `NEXT_PUBLIC_SITE_URL` - Your production URL
- `NEXT_PUBLIC_PHONE` - Business phone number
- `NEXT_PUBLIC_EMAIL` - Business email

### 3. WordPress Setup

1. Install required plugins:
   - Advanced Custom Fields Pro
   - WPGraphQL
   - WPGraphQL for Advanced Custom Fields

2. Create ACF field groups as documented in `docs/ACF_FIELD_GROUPS.md`

3. Register Custom Post Types:
   - Services (`service`)
   - Reviews (`review`) - Optional
   - Locations (`location`) - Optional

4. Enable GraphQL for ACF fields:
   - Go to GraphQL → Settings → Custom Fields
   - Enable "Show in GraphQL" for all field groups

### 4. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
mca-autoglass-nextjs/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── services/          # Services pages
│   ├── contact/           # Contact page
│   └── ...
├── components/            # React components
│   ├── layout/           # Header, Footer, MobileCallBar
│   ├── sections/         # ACF flexible content sections
│   └── forms/            # Form components
├── lib/                  # Utilities and data fetching
│   ├── wp-client.ts     # GraphQL client and queries
│   ├── types.ts         # TypeScript types
│   └── seo.ts           # SEO schema generation
├── docs/                 # Documentation
└── public/              # Static assets
```

## 🎨 Design System

The design system uses Tailwind CSS with custom tokens defined in `tailwind.config.ts`:

- **Colors**: Primary (blue), Secondary (gray), Accent (red), Success (green)
- **Typography**: Inter font family, responsive type scale
- **Spacing**: Consistent spacing scale
- **Components**: Reusable button, card, and section styles

See `app/globals.css` for component classes.

## 📄 Pages

- `/` - Homepage with flexible content sections
- `/services` - Services overview
- `/services/[slug]` - Individual service pages
- `/service-areas` - Service areas and map
- `/reviews` - Customer reviews
- `/about` - About page
- `/contact` - Contact and quote form

## 🔧 Configuration

### ISR (Incremental Static Regeneration)

Pages are regenerated every hour by default. Adjust `NEXT_REVALIDATE_TIME` in `.env.local` (in seconds).

### Image Optimization

Next.js Image component is used throughout. Configure `next.config.js` for your image domains.

### Analytics

Optional Google Analytics 4 integration. Set `NEXT_PUBLIC_GA4_ID` in `.env.local`.

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted with Node.js

## 📊 Performance Targets

- **Lighthouse Performance**: 90+
- **Lighthouse Accessibility**: 95+
- **Lighthouse Best Practices**: 95+
- **Lighthouse SEO**: 95+
- **Core Web Vitals**: All green

## 🔒 Security

- Honeypot field in contact form
- Rate limiting on API routes
- Input validation
- XSS protection via React

## 📝 Content Management

Content is managed in WordPress:
1. Edit pages in WordPress admin
2. Use ACF flexible content blocks
3. Changes are reflected after ISR revalidation (default: 1 hour)

## 🐛 Troubleshooting

### GraphQL Errors

- Verify WPGraphQL is active
- Check field names match ACF configuration
- Test queries in GraphiQL IDE

### Images Not Loading

- Check `next.config.js` image domains
- Verify image URLs are accessible
- Check CORS settings on WordPress

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

## 📚 Documentation

- [ACF Field Groups](./docs/ACF_FIELD_GROUPS.md) - WordPress field configuration
- [Launch Checklist](./docs/LAUNCH_CHECKLIST.md) - Pre-launch tasks

## 🤝 Support

For issues or questions, contact the development team.

## 📄 License

Proprietary - MCA Autoglass

