# Website Builder Platform

A powerful visual website builder inspired by Webflow and Oxygen Builder, built with Next.js 15, React 19, and TypeScript.

## Features

- **Visual Drag-and-Drop Editor** - Intuitive canvas interface for building websites
- **50+ Elements** - Comprehensive element library for any design need
- **Design System** - CSS variables and global styles for consistent branding
- **Responsive Design** - Built-in breakpoints for mobile, tablet, and desktop
- **Dynamic Data** - Custom fields, loops, and conditional logic
- **Clean Code Export** - Generate production-ready HTML/CSS/JS
- **Authentication** - Email/password, Google, and GitHub OAuth
- **Team Collaboration** - Multi-user support with role-based access

## Tech Stack

- **Framework:** Next.js 15.5.6 (App Router, Server Components)
- **UI:** React 19, Tailwind CSS 4
- **Language:** TypeScript 5
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** NextAuth.js v5
- **State Management:** Zustand + TanStack React Query
- **Drag & Drop:** @dnd-kit
- **Package Manager:** pnpm

## Getting Started

### Prerequisites

- Node.js 20+ installed
- pnpm 8+ installed (`npm install -g pnpm`)
- PostgreSQL database (local, Supabase, or Neon)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd demo-internal-crm
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your configuration:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
   - OAuth credentials (optional)

4. **Set up the database**
   ```bash
   # Run migrations
   npx prisma migrate dev --name init

   # Open Prisma Studio (optional)
   npx prisma studio
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
demo-internal-crm/
├── app/                    # Next.js App Router pages
│   ├── api/                # API routes
│   ├── (auth)/             # Auth pages (login, signup)
│   ├── (builder)/          # Builder interface
│   ├── dashboard/          # Dashboard
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── builder/            # Builder-specific components
│   ├── elements/           # Draggable elements
│   └── ui/                 # Shared UI components
├── lib/                    # Utilities and configurations
│   ├── auth.ts             # NextAuth config
│   ├── db.ts               # Prisma client
│   ├── stores/             # Zustand stores
│   └── utils.ts            # Helper functions
├── types/                  # TypeScript type definitions
│   ├── element.ts          # Element types
│   └── next-auth.d.ts      # NextAuth extensions
├── prisma/                 # Database schema
│   └── schema.prisma       # Prisma schema
└── docs/                   # Documentation
```

## Development Workflow

### Database Changes

When you modify the Prisma schema:

```bash
# Create migration
npx prisma migrate dev --name your_migration_name

# Generate Prisma Client
npx prisma generate
```

### Available Scripts

```bash
pnpm dev          # Start development server (Turbopack)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking (add to package.json)
```

## Documentation

See the `docs/` folder for detailed documentation:

- [PRD.md](PRD.md) - Product Requirements Document
- [docs/TECHNICAL-ARCHITECTURE.md](docs/TECHNICAL-ARCHITECTURE.md) - Technical architecture
- [docs/CODEBASE-ANALYSIS.md](docs/CODEBASE-ANALYSIS.md) - Codebase analysis
- [docs/USER-STORIES-PHASE-1.md](docs/USER-STORIES-PHASE-1.md) - User stories for MVP
- [docs/SPRINT-PLAN.md](docs/SPRINT-PLAN.md) - Sprint planning

## Phase 1 MVP Status

✅ **Sprint 1 - Day 1 Complete:**
- Dependencies installed
- Project structure created
- Database schema defined
- Authentication configured
- State management set up
- Type definitions created

🔜 **Next Steps:**
- Create authentication pages (login/signup)
- Build dashboard
- Implement project creation
- Develop canvas interface

## Contributing

This is an internal project. For questions or issues, please contact the development team.

## License

Proprietary - All rights reserved
