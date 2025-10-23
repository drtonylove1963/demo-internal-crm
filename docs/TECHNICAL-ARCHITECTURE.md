# Technical Architecture Document
**Project:** Visual Website Builder Platform
**Version:** 1.0
**Date:** October 22, 2025
**Status:** Draft for Review
**Prepared By:** Business Analyst (Mary) 📊

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Architecture Overview](#2-system-architecture-overview)
3. [Technology Stack](#3-technology-stack)
4. [Database Architecture](#4-database-architecture)
5. [API Architecture](#5-api-architecture)
6. [Builder System Architecture](#6-builder-system-architecture)
7. [Element System Architecture](#7-element-system-architecture)
8. [State Management](#8-state-management)
9. [Rendering & Publishing Architecture](#9-rendering--publishing-architecture)
10. [Authentication & Authorization](#10-authentication--authorization)
11. [File Storage & Media Management](#11-file-storage--media-management)
12. [Performance Optimization Strategy](#12-performance-optimization-strategy)
13. [Security Architecture](#13-security-architecture)
14. [Scalability & Infrastructure](#14-scalability--infrastructure)
15. [Development Workflow](#15-development-workflow)
16. [Appendices](#16-appendices)

---

## 1. Executive Summary

### 1.1 Purpose

This document defines the technical architecture for the Visual Website Builder Platform - a modern, Oxygen-inspired website builder built on Next.js 15, React 19, and TypeScript. The architecture supports both beginner-friendly visual editing and advanced developer features.

### 1.2 Key Design Principles

1. **Component-Driven** - Everything is a reusable component
2. **Type-Safe** - Full TypeScript coverage with strict mode
3. **Performant** - SSR/SSG by default, optimized rendering
4. **Scalable** - Designed to handle thousands of sites
5. **Developer-Friendly** - Clean code output, export capabilities
6. **Modular** - Plugin-like element system
7. **Secure** - Security-first approach, validated inputs

### 1.3 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Builder    │  │  Dashboard   │  │   Published Sites    │  │
│  │   Canvas     │  │   (Projects) │  │   (Public Preview)   │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Next.js API  │  │    Server    │  │   State Management   │  │
│  │   Routes     │  │   Actions    │  │   (Zustand/React)    │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                         DATA LAYER                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  PostgreSQL  │  │   S3/R2      │  │      Redis Cache     │  │
│  │  (Prisma)    │  │  (Media)     │  │   (Sessions/Cache)   │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                    INFRASTRUCTURE LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Vercel/    │  │     CDN      │  │    Monitoring        │  │
│  │   AWS/Docker │  │ (Cloudflare) │  │   (Sentry/Datadog)   │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. System Architecture Overview

### 2.1 Architectural Layers

#### **Presentation Layer** (Client-Side)
- **Technology:** React 19, Next.js 15 App Router
- **Responsibilities:**
  - User interface rendering
  - User interactions (drag-drop, clicks, forms)
  - Client-side state management
  - Optimistic updates

#### **Application Layer** (Server + Client)
- **Technology:** Next.js API Routes, Server Actions, Server Components
- **Responsibilities:**
  - Business logic
  - Data validation
  - Authentication/authorization
  - API request handling
  - Server-side rendering

#### **Data Layer**
- **Technology:** Prisma ORM, PostgreSQL, S3-compatible storage
- **Responsibilities:**
  - Data persistence
  - Query optimization
  - Transactions
  - File storage

#### **Infrastructure Layer**
- **Technology:** Vercel/Docker, CDN, Monitoring
- **Responsibilities:**
  - Hosting and deployment
  - Scaling
  - Monitoring and logging
  - CDN and caching

### 2.2 Key Subsystems

```
Website Builder Platform
├── Authentication System (NextAuth.js)
├── Project Management System
├── Builder System
│   ├── Canvas Subsystem
│   ├── Element Library Subsystem
│   ├── Properties Panel Subsystem
│   └── Toolbar Subsystem
├── Element System (Registry + Renderer)
├── Design System (CSS Variables + Classes)
├── Media Management System
├── Publishing System
├── Preview System
└── Analytics & Monitoring System
```

---

## 3. Technology Stack

### 3.1 Core Framework

| Technology | Version | Purpose | Decision Rationale |
|------------|---------|---------|-------------------|
| **Next.js** | 15.5.6 | Full-stack framework | App Router, RSC, Server Actions, Turbopack |
| **React** | 19.1.0 | UI library | Latest features, compiler optimizations |
| **TypeScript** | 5.x | Type safety | Better DX, fewer runtime errors |
| **Tailwind CSS** | 4.x | Styling framework | Utility-first, rapid development |

### 3.2 State Management

| Library | Purpose | Use Case |
|---------|---------|----------|
| **Zustand** | Global state | Builder state, canvas state, element selection |
| **React Query** | Server state | Data fetching, caching, mutations |
| **React Context** | Local state | Theme, user preferences |

### 3.3 Drag & Drop

| Library | Purpose |
|---------|---------|
| **@dnd-kit/core** | Core drag-drop logic |
| **@dnd-kit/sortable** | Sortable lists |
| **@dnd-kit/utilities** | Helper utilities |

**Why @dnd-kit?**
- Modern, performant, accessible
- Built for React
- TypeScript support
- Better than react-dnd (legacy, complex API)

### 3.4 Database & ORM

| Technology | Purpose | Configuration |
|------------|---------|---------------|
| **Prisma** | ORM | Type-safe database access |
| **PostgreSQL** | Database | Relational data, JSONB support |
| **Prisma Migrate** | Migrations | Schema versioning |

### 3.5 Authentication

| Library | Purpose |
|---------|---------|
| **NextAuth.js v5** | Authentication |
| **@auth/prisma-adapter** | Database adapter |

### 3.6 Form Handling

| Library | Purpose |
|---------|---------|
| **React Hook Form** | Form state management |
| **Zod** | Schema validation |

### 3.7 UI Component Libraries

| Library | Purpose |
|---------|---------|
| **@radix-ui/react-*** | Headless UI primitives (dropdown, dialog, etc.) |
| **lucide-react** | Icon library |
| **framer-motion** | Animations |
| **cmdk** | Command palette |

### 3.8 Rich Text Editing

| Library | Purpose | Decision |
|---------|---------|----------|
| **Tiptap** | WYSIWYG editor | Modern, extensible, ProseMirror-based |

### 3.9 File Storage

| Technology | Purpose |
|------------|---------|
| **AWS S3 / Cloudflare R2** | Media storage |
| **@aws-sdk/client-s3** | S3 client |
| **sharp** | Image optimization |

### 3.10 Development Tools

| Tool | Purpose |
|------|---------|
| **Turbopack** | Build tool (Next.js 15 default) |
| **ESLint 9** | Linting |
| **Prettier** | Code formatting |
| **Husky** | Git hooks |
| **pnpm** | Package management |

---

## 4. Database Architecture

### 4.1 Prisma Schema Overview

**File:** `prisma/schema.prisma`

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ============================================
// USER & AUTHENTICATION
// ============================================

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?   // For email/password auth
  role          UserRole  @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  accounts      Account[]
  sessions      Session[]
  projects      Project[]
  mediaFiles    MediaFile[]

  @@map("users")
}

enum UserRole {
  USER
  PRO
  AGENCY
  ADMIN
}

model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?
  access_token       String?
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

// ============================================
// PROJECT & PAGES
// ============================================

model Project {
  id          String   @id @default(cuid())
  name        String
  description String?
  domain      String?  @unique  // Custom domain
  subdomain   String?  @unique  // project-name.builder.com
  favicon     String?
  isPublished Boolean  @default(false)

  // Design system / Global styles
  designSystem Json?   // CSS variables, color palette, fonts

  userId      String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  pages       Page[]
  mediaFiles  MediaFile[]
  components  Component[]

  @@index([userId])
  @@map("projects")
}

model Page {
  id          String   @id @default(cuid())
  name        String   // "Home", "About", etc.
  slug        String   // "home", "about"
  title       String?  // SEO title
  description String?  // SEO description
  path        String   // "/", "/about"
  isHomePage  Boolean  @default(false)
  isPublished Boolean  @default(false)

  // Page content (JSON tree of elements)
  content     Json     // Element tree

  // Page settings
  settings    Json?    // Custom CSS, JS, metadata

  projectId   String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  project     Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)

  @@unique([projectId, slug])
  @@index([projectId])
  @@map("pages")
}

// ============================================
// ELEMENT SYSTEM
// ============================================

// Reusable components (user-created)
model Component {
  id          String   @id @default(cuid())
  name        String
  description String?
  thumbnail   String?
  category    String?  // "header", "footer", "card", etc.

  // Component structure (JSON tree)
  content     Json     // Element tree

  // Component props (for variants)
  props       Json?    // Schema for customizable properties

  projectId   String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  project     Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)

  @@index([projectId])
  @@map("components")
}

// ============================================
// MEDIA LIBRARY
// ============================================

model MediaFile {
  id          String   @id @default(cuid())
  name        String
  url         String   // S3/R2 URL
  thumbnailUrl String? // Optimized thumbnail
  type        MediaType
  mimeType    String
  size        Int      // bytes
  width       Int?     // for images/videos
  height      Int?     // for images/videos
  alt         String?
  caption     String?

  userId      String
  projectId   String?
  createdAt   DateTime @default(now())

  // Relations
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  project     Project? @relation(fields: [projectId], references: [id], onDelete: SetNull)

  @@index([userId])
  @@index([projectId])
  @@map("media_files")
}

enum MediaType {
  IMAGE
  VIDEO
  AUDIO
  DOCUMENT
  OTHER
}

// ============================================
// ANALYTICS (Optional for Phase 3+)
// ============================================

model PageView {
  id         String   @id @default(cuid())
  pageId     String
  projectId  String
  visitorId  String   // Anonymous visitor ID
  userAgent  String?
  referer    String?
  country    String?
  createdAt  DateTime @default(now())

  @@index([projectId, createdAt])
  @@index([pageId, createdAt])
  @@map("page_views")
}
```

### 4.2 Data Models Explanation

#### **User Model**
- Stores user account information
- Supports multiple auth providers (email/password, Google, GitHub)
- Role-based access (USER, PRO, AGENCY, ADMIN)

#### **Project Model**
- Container for a website
- Has subdomain (free) or custom domain (paid)
- Stores global design system (CSS variables)
- Can be published or draft

#### **Page Model**
- Individual pages within a project
- `content` field stores entire element tree as JSON
- Each page has unique slug
- SEO metadata (title, description)

**Example Page Content JSON:**
```json
{
  "version": "1.0",
  "elements": [
    {
      "id": "elem_1",
      "type": "container",
      "props": {
        "className": "max-w-7xl mx-auto px-4",
        "tag": "section"
      },
      "children": [
        {
          "id": "elem_2",
          "type": "heading",
          "props": {
            "level": 1,
            "text": "Welcome to My Site",
            "className": "text-4xl font-bold"
          }
        }
      ]
    }
  ]
}
```

#### **Component Model**
- Reusable components created by users
- Similar to Page content but with props schema
- Can be inserted into pages multiple times

#### **MediaFile Model**
- Tracks uploaded media
- Stores S3/R2 URLs
- Metadata for optimization (width, height, alt)

### 4.3 Relationships

```
User (1) ──────> (Many) Project
Project (1) ────> (Many) Page
Project (1) ────> (Many) Component
Project (1) ────> (Many) MediaFile
User (1) ───────> (Many) MediaFile
```

### 4.4 Indexing Strategy

**Critical Indexes:**
- `Project.userId` - Fast project lookup per user
- `Page.projectId` - Fast page lookup per project
- `Page[projectId, slug]` - Unique constraint + fast lookup
- `MediaFile.userId` - User's media library
- `MediaFile.projectId` - Project's media

---

## 5. API Architecture

### 5.1 API Design Philosophy

**Approach:** Hybrid (API Routes + Server Actions)

- **Server Actions** - For mutations (create, update, delete)
- **API Routes** - For data fetching, webhooks, public APIs
- **Server Components** - For initial data loading

### 5.2 API Routes Structure

```
app/api/
├── auth/
│   └── [...nextauth]/
│       └── route.ts          # NextAuth.js handler
├── projects/
│   ├── route.ts              # GET (list), POST (create)
│   └── [id]/
│       ├── route.ts          # GET, PATCH, DELETE
│       ├── pages/
│       │   └── route.ts      # GET pages, POST page
│       ├── publish/
│       │   └── route.ts      # POST (publish project)
│       └── export/
│           └── route.ts      # GET (export HTML/CSS/JS)
├── pages/
│   └── [id]/
│       └── route.ts          # GET, PATCH, DELETE page
├── media/
│   ├── upload/
│   │   └── route.ts          # POST (upload file)
│   ├── route.ts              # GET (list media)
│   └── [id]/
│       └── route.ts          # GET, DELETE media file
├── components/
│   ├── route.ts              # GET, POST
│   └── [id]/
│       └── route.ts          # GET, PATCH, DELETE
└── webhooks/
    └── stripe/
        └── route.ts          # POST (Stripe webhooks)
```

### 5.3 Server Actions Structure

```
app/actions/
├── projects.ts
│   ├── createProject()
│   ├── updateProject()
│   ├── deleteProject()
│   └── publishProject()
├── pages.ts
│   ├── createPage()
│   ├── updatePage()
│   ├── deletePage()
│   └── duplicatePage()
├── elements.ts
│   ├── createElement()
│   ├── updateElement()
│   ├── deleteElement()
│   └── reorderElements()
├── components.ts
│   ├── createComponent()
│   ├── updateComponent()
│   └── deleteComponent()
└── media.ts
    ├── uploadMedia()
    ├── deleteMedia()
    └── optimizeImage()
```

### 5.4 API Response Format

**Success Response:**
```typescript
{
  success: true,
  data: {
    // Response data
  },
  meta?: {
    // Pagination, etc.
  }
}
```

**Error Response:**
```typescript
{
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Invalid input",
    details?: {
      // Field-specific errors
    }
  }
}
```

### 5.5 API Authentication

**Method:** JWT tokens via NextAuth.js

**Protected Routes:**
```typescript
// middleware.ts
export { auth as middleware } from "@/lib/auth"

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/editor/:path*",
    "/api/projects/:path*",
    "/api/pages/:path*",
    // ... other protected routes
  ]
}
```

### 5.6 Rate Limiting

**Strategy:** Per-user, per-endpoint

**Limits (MVP):**
- API requests: 1000/hour per user
- File uploads: 100/hour per user
- Publish actions: 100/day per user

**Implementation:** Redis-based (using Upstash or local Redis)

---

## 6. Builder System Architecture

### 6.1 Builder Overview

The Builder is the core interface where users create websites. It consists of four main components:

```
┌────────────────────────────────────────────────────────────────┐
│                         BUILDER UI                             │
│                                                                │
│  ┌─────────────┬────────────────────────────┬─────────────┐   │
│  │             │                            │             │   │
│  │  Element    │         Canvas             │ Properties  │   │
│  │  Library    │      (Drag & Drop)         │   Panel     │   │
│  │  (Left)     │         (Center)           │   (Right)   │   │
│  │             │                            │             │   │
│  │  - Layouts  │  ┌──────────────────────┐  │ - Styles    │   │
│  │  - Content  │  │                      │  │ - Settings  │   │
│  │  - Media    │  │   User's Content     │  │ - Advanced  │   │
│  │  - Forms    │  │                      │  │             │   │
│  │  - Advanced │  │                      │  │             │   │
│  │             │  └──────────────────────┘  │             │   │
│  │             │                            │             │   │
│  └─────────────┴────────────────────────────┴─────────────┘   │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                    Toolbar (Top)                         │ │
│  │  [Undo] [Redo] [Desktop▼] [Preview] [Publish]           │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

### 6.2 Component Structure

```
components/builder/
├── BuilderLayout.tsx          # Main builder wrapper
├── Toolbar/
│   ├── Toolbar.tsx            # Top toolbar
│   ├── UndoRedoButtons.tsx
│   ├── DeviceSelector.tsx     # Desktop/Tablet/Mobile
│   ├── PreviewButton.tsx
│   └── PublishButton.tsx
├── ElementLibrary/
│   ├── ElementLibrary.tsx     # Left sidebar
│   ├── ElementCategory.tsx
│   ├── DraggableElement.tsx   # Element to drag onto canvas
│   └── SearchElements.tsx
├── Canvas/
│   ├── Canvas.tsx             # Main canvas
│   ├── CanvasElement.tsx      # Rendered element on canvas
│   ├── DropZone.tsx           # Drop target
│   ├── SelectionOverlay.tsx   # Blue outline on selected element
│   ├── ResizeHandles.tsx      # Corner/edge handles
│   └── GridGuides.tsx         # Alignment guides
├── PropertiesPanel/
│   ├── PropertiesPanel.tsx    # Right sidebar
│   ├── StylesTab.tsx          # Typography, colors, spacing
│   ├── SettingsTab.tsx        # Element-specific settings
│   ├── AdvancedTab.tsx        # Custom CSS, classes
│   └── controls/              # Form controls
│       ├── ColorPicker.tsx
│       ├── FontPicker.tsx
│       ├── SpacingControl.tsx
│       └── ...
└── LayersPanel/
    └── LayersPanel.tsx        # Tree view of elements (optional)
```

### 6.3 Canvas State Management

**State Structure:**
```typescript
interface CanvasState {
  // Current page being edited
  pageId: string;

  // Element tree
  elements: ElementNode[];

  // Selection
  selectedElementId: string | null;
  hoveredElementId: string | null;

  // Viewport
  device: 'desktop' | 'tablet' | 'mobile';
  zoom: number;

  // History (undo/redo)
  history: {
    past: ElementNode[][];
    present: ElementNode[];
    future: ElementNode[][];
  };

  // UI state
  isDragging: boolean;
  isResizing: boolean;
  showGrid: boolean;
}
```

**Store:** Zustand

```typescript
// lib/stores/canvas-store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CanvasStore extends CanvasState {
  // Actions
  selectElement: (id: string | null) => void;
  addElement: (element: ElementNode, parentId?: string) => void;
  updateElement: (id: string, props: Partial<ElementProps>) => void;
  deleteElement: (id: string) => void;
  moveElement: (id: string, newParentId: string, index: number) => void;
  undo: () => void;
  redo: () => void;
  setDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
}

export const useCanvasStore = create<CanvasStore>()(
  devtools((set, get) => ({
    // Initial state
    pageId: '',
    elements: [],
    selectedElementId: null,
    // ... initial state

    // Actions implementation
    selectElement: (id) => set({ selectedElementId: id }),
    addElement: (element, parentId) => {
      // Implementation with history tracking
    },
    // ... other actions
  }))
);
```

### 6.4 Drag & Drop Implementation

**Library:** @dnd-kit

**Setup:**
```typescript
// components/builder/Canvas/Canvas.tsx
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

export function Canvas() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement to activate drag
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {/* Canvas content */}
      <DragOverlay>
        {activeElement && <ElementPreview element={activeElement} />}
      </DragOverlay>
    </DndContext>
  );
}
```

---

## 7. Element System Architecture

### 7.1 Element Definition

Every element in the builder follows a consistent interface:

```typescript
// types/element.ts

export interface ElementNode {
  id: string;                    // Unique ID (cuid)
  type: string;                  // "text", "image", "button", etc.
  props: ElementProps;           // Element-specific properties
  styles: ElementStyles;         // CSS styles
  children?: ElementNode[];      // Nested elements
  parent?: string;               // Parent element ID
}

export interface ElementProps {
  // Common props
  className?: string;            // Tailwind classes
  customCSS?: string;            // Custom CSS
  id?: string;                   // HTML ID attribute

  // Element-specific props (varies by type)
  [key: string]: any;
}

export interface ElementStyles {
  // Layout
  display?: string;
  position?: string;
  width?: string;
  height?: string;

  // Spacing
  margin?: SpacingValue;
  padding?: SpacingValue;

  // Typography
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  color?: string;

  // Background
  backgroundColor?: string;
  backgroundImage?: string;

  // Border
  border?: string;
  borderRadius?: string;

  // Effects
  boxShadow?: string;
  opacity?: number;

  // Responsive overrides
  tablet?: Partial<ElementStyles>;
  mobile?: Partial<ElementStyles>;
}

export interface SpacingValue {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}
```

### 7.2 Element Registry

Centralized registry of all available elements:

```typescript
// lib/elements/element-registry.ts

export interface ElementDefinition {
  type: string;
  name: string;
  category: 'layout' | 'content' | 'media' | 'form' | 'advanced';
  icon: React.ComponentType;
  defaultProps: ElementProps;
  defaultStyles: ElementStyles;
  canHaveChildren: boolean;
  allowedChildren?: string[];     // Specific types allowed
  renderComponent: React.ComponentType<ElementNode>;
  propertiesComponent: React.ComponentType<ElementNode>;
}

const elementRegistry: Record<string, ElementDefinition> = {
  container: {
    type: 'container',
    name: 'Container',
    category: 'layout',
    icon: BoxIcon,
    defaultProps: {
      tag: 'div',
      className: 'container mx-auto',
    },
    defaultStyles: {
      display: 'block',
      width: '100%',
    },
    canHaveChildren: true,
    renderComponent: ContainerElement,
    propertiesComponent: ContainerProperties,
  },

  heading: {
    type: 'heading',
    name: 'Heading',
    category: 'content',
    icon: TypeIcon,
    defaultProps: {
      level: 1,
      text: 'Heading Text',
    },
    defaultStyles: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
    },
    canHaveChildren: false,
    renderComponent: HeadingElement,
    propertiesComponent: HeadingProperties,
  },

  // ... more elements
};

export function getElement(type: string): ElementDefinition | undefined {
  return elementRegistry[type];
}

export function getAllElements(): ElementDefinition[] {
  return Object.values(elementRegistry);
}

export function getElementsByCategory(
  category: string
): ElementDefinition[] {
  return Object.values(elementRegistry).filter(
    (el) => el.category === category
  );
}
```

### 7.3 Element Components

Each element type has two components:

#### **Render Component** (Canvas)
Displays the element on the canvas with edit functionality:

```typescript
// components/elements/HeadingElement.tsx

interface HeadingElementProps {
  node: ElementNode;
  isSelected: boolean;
  onSelect: () => void;
}

export function HeadingElement({ node, isSelected, onSelect }: HeadingElementProps) {
  const { props, styles } = node;
  const Tag = `h${props.level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      onClick={onSelect}
      style={{
        ...styles,
        outline: isSelected ? '2px solid #3b82f6' : 'none',
      }}
      className={props.className}
      contentEditable={isSelected}
      suppressContentEditableWarning
    >
      {props.text}
    </Tag>
  );
}
```

#### **Properties Component** (Right Panel)
Controls for editing element properties:

```typescript
// components/properties/HeadingProperties.tsx

interface HeadingPropertiesProps {
  node: ElementNode;
  onChange: (props: Partial<ElementProps>) => void;
}

export function HeadingProperties({ node, onChange }: HeadingPropertiesProps) {
  return (
    <div className="space-y-4">
      <div>
        <label>Heading Level</label>
        <select
          value={node.props.level}
          onChange={(e) => onChange({ level: Number(e.target.value) })}
        >
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <option key={level} value={level}>
              H{level}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Text</label>
        <input
          type="text"
          value={node.props.text}
          onChange={(e) => onChange({ text: e.target.value })}
        />
      </div>

      {/* Style controls */}
      <StyleControls node={node} onChange={onChange} />
    </div>
  );
}
```

### 7.4 Element List (MVP - Phase 1)

**Priority P0 (MVP):**

1. **Layout Elements**
   - Container
   - Section
   - Column (Flexbox)
   - Div

2. **Content Elements**
   - Heading (H1-H6)
   - Paragraph
   - Text
   - Button
   - Link

3. **Media Elements**
   - Image
   - Video (YouTube/Vimeo embed)

4. **Form Elements**
   - Input
   - Textarea
   - Form (container)

5. **Special**
   - Spacer
   - Divider

**Total MVP Elements: 15**

---

## 8. State Management

### 8.1 State Management Strategy

**Multi-layered Approach:**

1. **Server State** - React Query (TanStack Query)
2. **Client State** - Zustand
3. **UI State** - React Context / Local State
4. **Form State** - React Hook Form

### 8.2 Zustand Stores

```
lib/stores/
├── canvas-store.ts        # Canvas/editor state
├── ui-store.ts            # UI state (panels, modals)
├── project-store.ts       # Current project metadata
└── auth-store.ts          # Client-side auth state
```

**Example Store:**
```typescript
// lib/stores/ui-store.ts

interface UIStore {
  // Panels
  leftPanelOpen: boolean;
  rightPanelOpen: boolean;
  layersPanelOpen: boolean;

  // Modals
  publishModalOpen: boolean;
  settingsModalOpen: boolean;

  // Actions
  toggleLeftPanel: () => void;
  toggleRightPanel: () => void;
  openPublishModal: () => void;
  closePublishModal: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  leftPanelOpen: true,
  rightPanelOpen: true,
  layersPanelOpen: false,
  publishModalOpen: false,
  settingsModalOpen: false,

  toggleLeftPanel: () =>
    set((state) => ({ leftPanelOpen: !state.leftPanelOpen })),
  toggleRightPanel: () =>
    set((state) => ({ rightPanelOpen: !state.rightPanelOpen })),
  openPublishModal: () => set({ publishModalOpen: true }),
  closePublishModal: () => set({ publishModalOpen: false }),
}));
```

### 8.3 React Query Setup

```typescript
// app/providers.tsx

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

**Usage:**
```typescript
// hooks/use-projects.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      return res.json();
    },
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateProjectInput) => {
      const res = await fetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      // Invalidate and refetch projects
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
```

---

## 9. Rendering & Publishing Architecture

### 9.1 Rendering System

**Two Rendering Modes:**

1. **Builder Mode** - Interactive, editable elements
2. **Published Mode** - Static, optimized HTML

#### **Builder Renderer**
```typescript
// components/builder/Renderer.tsx

export function BuilderRenderer({ elements }: { elements: ElementNode[] }) {
  const { selectedElementId } = useCanvasStore();

  return (
    <>
      {elements.map((element) => (
        <RenderElement
          key={element.id}
          node={element}
          mode="builder"
          isSelected={selectedElementId === element.id}
        />
      ))}
    </>
  );
}
```

#### **Published Renderer**
```typescript
// app/preview/[id]/page.tsx

export default async function PublishedSite({ params }: { params: { id: string } }) {
  const page = await getPublishedPage(params.id);

  return (
    <PublishedRenderer elements={page.content.elements} />
  );
}

function PublishedRenderer({ elements }: { elements: ElementNode[] }) {
  return (
    <>
      {elements.map((element) => (
        <RenderElement
          key={element.id}
          node={element}
          mode="published"
        />
      ))}
    </>
  );
}
```

### 9.2 Element Renderer

```typescript
// lib/renderer/render-element.tsx

interface RenderElementProps {
  node: ElementNode;
  mode: 'builder' | 'published';
  isSelected?: boolean;
}

export function RenderElement({ node, mode, isSelected }: RenderElementProps) {
  const elementDef = getElement(node.type);

  if (!elementDef) {
    console.warn(`Unknown element type: ${node.type}`);
    return null;
  }

  const Component = elementDef.renderComponent;

  return (
    <Component
      node={node}
      mode={mode}
      isSelected={isSelected}
    >
      {node.children?.map((child) => (
        <RenderElement
          key={child.id}
          node={child}
          mode={mode}
        />
      ))}
    </Component>
  );
}
```

### 9.3 Publishing Workflow

**Steps:**

1. **Validate Page** - Ensure all elements are valid
2. **Optimize Assets** - Compress images, minify CSS/JS
3. **Generate HTML** - Server-side render to static HTML
4. **Deploy to CDN** - Upload to S3/R2 + CloudFront/Cloudflare
5. **Update Database** - Mark as published, store version

```typescript
// app/actions/publish.ts

'use server';

export async function publishProject(projectId: string) {
  // 1. Get project and all pages
  const project = await db.project.findUnique({
    where: { id: projectId },
    include: { pages: true },
  });

  if (!project) throw new Error('Project not found');

  // 2. Generate static HTML for each page
  const generatedPages = await Promise.all(
    project.pages.map(async (page) => {
      const html = await generateStaticHTML(page);
      return { slug: page.slug, html };
    })
  );

  // 3. Upload to S3/R2
  await uploadToStorage(projectId, generatedPages);

  // 4. Update database
  await db.project.update({
    where: { id: projectId },
    data: {
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  return {
    success: true,
    url: `https://${project.subdomain}.builder.com`,
  };
}

async function generateStaticHTML(page: Page): Promise<string> {
  const elements = page.content.elements as ElementNode[];

  // Render to string
  const html = renderToString(
    <PublishedRenderer elements={elements} />
  );

  // Wrap in HTML document
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${page.title || page.name}</title>
        <meta name="description" content="${page.description || ''}">
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        ${html}
        <script src="/scripts.js"></script>
      </body>
    </html>
  `;
}
```

### 9.4 Preview System

**Live Preview (Without Publishing):**

```typescript
// app/preview/[projectId]/[pageId]/page.tsx

export default async function PreviewPage({
  params,
}: {
  params: { projectId: string; pageId: string };
}) {
  const page = await db.page.findUnique({
    where: { id: params.pageId },
  });

  if (!page) return notFound();

  return (
    <div className="preview-mode">
      <PreviewBanner />
      <PublishedRenderer elements={page.content.elements} />
    </div>
  );
}
```

---

## 10. Authentication & Authorization

### 10.1 NextAuth.js Configuration

```typescript
// lib/auth.ts

import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
});
```

### 10.2 Authorization Patterns

**Protect Server Actions:**
```typescript
// app/actions/projects.ts

'use server';

import { auth } from '@/lib/auth';

export async function createProject(data: CreateProjectInput) {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  // Create project for authenticated user
  const project = await db.project.create({
    data: {
      ...data,
      userId: session.user.id,
    },
  });

  return project;
}
```

**Protect API Routes:**
```typescript
// app/api/projects/route.ts

import { auth } from '@/lib/auth';

export async function GET(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const projects = await db.project.findMany({
    where: { userId: session.user.id },
  });

  return Response.json(projects);
}
```

**Middleware Protection:**
```typescript
// middleware.ts

export { auth as middleware } from '@/lib/auth';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/editor/:path*',
    '/api/projects/:path*',
  ],
};
```

---

## 11. File Storage & Media Management

### 11.1 Storage Architecture

**Storage Provider:** AWS S3 / Cloudflare R2

**Bucket Structure:**
```
builder-media/
├── users/
│   └── {userId}/
│       ├── profile-images/
│       └── uploads/
└── projects/
    └── {projectId}/
        ├── images/
        ├── videos/
        ├── documents/
        └── optimized/
            ├── thumbnails/
            └── webp/
```

### 11.2 Upload Flow

```typescript
// app/api/media/upload/route.ts

import { auth } from '@/lib/auth';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import sharp from 'sharp';

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File;
  const projectId = formData.get('projectId') as string;

  if (!file) {
    return Response.json({ error: 'No file provided' }, { status: 400 });
  }

  // Validate file type and size
  if (!file.type.startsWith('image/')) {
    return Response.json({ error: 'Invalid file type' }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return Response.json({ error: 'File too large' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Optimize image
  const optimized = await sharp(buffer)
    .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  // Generate unique filename
  const filename = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, '')}.webp`;
  const key = `projects/${projectId}/images/${filename}`;

  // Upload to S3
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
      Body: optimized,
      ContentType: 'image/webp',
    })
  );

  const url = `${process.env.CDN_URL}/${key}`;

  // Save to database
  const mediaFile = await db.mediaFile.create({
    data: {
      name: file.name,
      url,
      type: 'IMAGE',
      mimeType: 'image/webp',
      size: optimized.length,
      userId: session.user.id,
      projectId,
    },
  });

  return Response.json({ success: true, data: mediaFile });
}
```

### 11.3 Image Optimization

**Strategy:**
- Convert to WebP on upload
- Generate thumbnails (small, medium, large)
- Serve via CDN
- Lazy loading on frontend

---

## 12. Performance Optimization Strategy

### 12.1 Frontend Optimizations

**Code Splitting:**
```typescript
// Dynamic imports for heavy components
const BuilderCanvas = dynamic(() => import('@/components/builder/Canvas'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
```

**Image Optimization:**
```typescript
import Image from 'next/image';

<Image
  src={element.props.src}
  alt={element.props.alt}
  width={element.props.width}
  height={element.props.height}
  loading="lazy"
  placeholder="blur"
/>
```

**Bundle Size Optimization:**
- Tree-shaking (automatic with Next.js)
- Code splitting per route
- Lazy load builder components

### 12.2 Backend Optimizations

**Database Query Optimization:**
```typescript
// Use Prisma select to fetch only needed fields
const projects = await db.project.findMany({
  where: { userId },
  select: {
    id: true,
    name: true,
    updatedAt: true,
    // Don't fetch heavy fields like designSystem
  },
});
```

**Caching Strategy:**
- Redis for session storage
- React Query for client-side caching
- CDN for static assets and published sites

**Connection Pooling:**
```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
```

### 12.3 Rendering Performance

**Virtual Scrolling** (for long element lists):
```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

export function ElementList({ elements }: { elements: ElementNode[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: elements.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
  });

  return (
    <div ref={parentRef} style={{ height: '100%', overflow: 'auto' }}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((item) => (
          <div
            key={item.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${item.size}px`,
              transform: `translateY(${item.start}px)`,
            }}
          >
            <ElementItem element={elements[item.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 13. Security Architecture

### 13.1 Security Measures

**Input Validation:**
```typescript
// lib/validation/project.ts
import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
```

**SQL Injection Prevention:**
- Prisma ORM (parameterized queries by default)
- Never concatenate user input into raw SQL

**XSS Prevention:**
- React escapes output by default
- Sanitize user HTML with DOMPurify (for custom HTML blocks)
```typescript
import DOMPurify from 'isomorphic-dompurify';

const clean = DOMPurify.sanitize(userHTML);
```

**CSRF Protection:**
- NextAuth.js handles CSRF tokens
- SameSite cookies

**Rate Limiting:**
```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 h'),
});
```

**Content Security Policy (CSP):**
```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};
```

### 13.2 File Upload Security

**Validation:**
```typescript
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

if (!ALLOWED_TYPES.includes(file.type)) {
  throw new Error('Invalid file type');
}

if (file.size > MAX_SIZE) {
  throw new Error('File too large');
}
```

**Filename Sanitization:**
```typescript
import sanitize from 'sanitize-filename';

const safeFilename = sanitize(file.name);
const uniqueFilename = `${Date.now()}-${safeFilename}`;
```

---

## 14. Scalability & Infrastructure

### 14.1 Deployment Options

**Option A: Vercel (Recommended for MVP)**
- Automatic scaling
- Edge network
- Zero-config deployment
- Integrated monitoring

**Option B: AWS/Docker**
- More control
- Cost-effective at scale
- Custom infrastructure

### 14.2 Database Scalability

**Connection Pooling:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // For migrations
}
```

**Read Replicas** (Phase 3+):
- Primary for writes
- Replicas for reads
- Prisma Read Replicas extension

### 14.3 CDN Strategy

**Static Assets:**
- Serve from Cloudflare CDN
- Cache published sites globally
- Automatic compression (Brotli)

**Cache Headers:**
```typescript
export const revalidate = 3600; // 1 hour

export async function GET() {
  return new Response(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
```

---

## 15. Development Workflow

### 15.1 Development Environment Setup

```bash
# Clone repo
git clone <repo-url>
cd demo-internal-crm

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Initialize database
npx prisma migrate dev

# Start development server
pnpm dev
```

### 15.2 Git Workflow

**Branch Strategy:**
- `main` - Production
- `develop` - Integration branch
- `feature/*` - Feature branches
- `fix/*` - Bug fixes

**Commit Convention:**
```
<type>(<scope>): <subject>

Types: feat, fix, docs, style, refactor, test, chore
Example: feat(canvas): add undo/redo functionality
```

### 15.3 Testing Strategy

**Unit Tests:**
```bash
pnpm test
```

**E2E Tests:**
```bash
pnpm test:e2e
```

**Testing Stack:**
- Vitest (unit tests)
- Playwright (E2E tests)
- React Testing Library (component tests)

---

## 16. Appendices

### Appendix A: Environment Variables

```bash
# .env.example

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/builder"
DIRECT_URL="postgresql://user:password@localhost:5432/builder"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<generate-with-openssl-rand-base64-32>"

# OAuth Providers
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_ID="..."
GITHUB_SECRET="..."

# AWS S3
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
S3_BUCKET_NAME="builder-media"

# CDN
CDN_URL="https://cdn.builder.com"

# Redis (optional, for caching)
REDIS_URL="redis://localhost:6379"

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL="..."
UPSTASH_REDIS_REST_TOKEN="..."
```

### Appendix B: Project File Structure

```
demo-internal-crm/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── signup/
│   │   └── layout.tsx
│   ├── (builder)/
│   │   ├── dashboard/
│   │   └── editor/[id]/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   ├── projects/
│   │   ├── pages/
│   │   ├── media/
│   │   └── components/
│   ├── preview/[id]/
│   ├── actions/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── builder/
│   ├── elements/
│   ├── properties/
│   ├── ui/
│   └── providers.tsx
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   ├── stores/
│   ├── elements/
│   ├── renderer/
│   ├── utils/
│   └── validation/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── types/
│   ├── element.ts
│   ├── project.ts
│   └── index.ts
├── hooks/
│   ├── use-projects.ts
│   ├── use-pages.ts
│   └── use-media.ts
├── docs/
├── .env.local
├── next.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

### Appendix C: Dependencies List

```json
{
  "dependencies": {
    "next": "15.5.6",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "@prisma/client": "^6.0.0",
    "next-auth": "^5.0.0-beta",
    "@auth/prisma-adapter": "^2.0.0",
    "zustand": "^5.0.0",
    "@tanstack/react-query": "^5.0.0",
    "@dnd-kit/core": "^6.0.0",
    "@dnd-kit/sortable": "^8.0.0",
    "@dnd-kit/utilities": "^3.0.0",
    "react-hook-form": "^7.0.0",
    "zod": "^3.0.0",
    "@radix-ui/react-dialog": "^1.0.0",
    "@radix-ui/react-dropdown-menu": "^2.0.0",
    "@radix-ui/react-select": "^2.0.0",
    "lucide-react": "^0.400.0",
    "framer-motion": "^11.0.0",
    "@tiptap/react": "^2.0.0",
    "@tiptap/starter-kit": "^2.0.0",
    "@aws-sdk/client-s3": "^3.0.0",
    "sharp": "^0.34.0",
    "bcryptjs": "^2.4.3",
    "date-fns": "^3.0.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/bcryptjs": "^2.4.6",
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "15.5.6",
    "prisma": "^6.0.0",
    "vitest": "^2.0.0",
    "@testing-library/react": "^16.0.0",
    "playwright": "^1.40.0"
  }
}
```

---

## Conclusion

This Technical Architecture Document provides a comprehensive blueprint for building the Visual Website Builder Platform. The architecture is designed to be:

- **Scalable** - Can handle thousands of users and projects
- **Performant** - Optimized at every layer
- **Maintainable** - Clean code, modular design
- **Secure** - Security-first approach
- **Developer-Friendly** - Modern tools, TypeScript, good DX

### Next Steps

1. **Review & Approve** - Review this architecture with team
2. **Set Up Infrastructure** - Database, storage, deployment
3. **Create User Stories** - Break down into development tasks
4. **Start Phase 1 Development** - Build MVP features

---

**Document Status:** Draft for Review
**Next Review Date:** TBD
**Prepared By:** Mary 📊 (Business Analyst)
**Contact:** Use `/analyst` command
