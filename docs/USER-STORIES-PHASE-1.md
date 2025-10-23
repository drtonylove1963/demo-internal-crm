# User Stories - Phase 1 MVP
**Project:** Visual Website Builder Platform
**Version:** 1.0
**Date:** October 22, 2025
**Sprint Duration:** 2 weeks
**Target:** 3-4 months to MVP (solo developer) | 1-1.5 months (team of 3)
**Prepared By:** Business Analyst (Mary) 📊

---

## Table of Contents

1. [Overview](#overview)
2. [Epic Breakdown](#epic-breakdown)
3. [User Personas](#user-personas)
4. [User Stories by Epic](#user-stories-by-epic)
5. [Story Point Estimation Guide](#story-point-estimation-guide)
6. [Priority Matrix](#priority-matrix)
7. [Dependencies Map](#dependencies-map)
8. [Definition of Done](#definition-of-done)

---

## Overview

### Phase 1 MVP Goals

**Primary Objective:** Build a functional website builder where users can:
1. Sign up and authenticate
2. Create a project
3. Add pages to the project
4. Drag 15 essential elements onto a canvas
5. Style elements with basic properties
6. Publish and preview their website

**Success Criteria:**
- Time to first published website: <30 minutes
- 15+ draggable elements working
- Basic styling controls functional
- Authentication working (email + Google)
- Publishing generates static HTML

### Scope

**In Scope (MVP):**
- ✅ User authentication (email/password + Google OAuth)
- ✅ Project management (CRUD)
- ✅ Page management (CRUD)
- ✅ Canvas with drag-and-drop (15 elements)
- ✅ Basic properties panel (styles, settings)
- ✅ Publishing system (static HTML generation)
- ✅ Media upload (images only)
- ✅ Mobile-responsive output

**Out of Scope (Future Phases):**
- ❌ Advanced animations and interactions
- ❌ Dynamic data/custom fields
- ❌ Reusable components system
- ❌ Design system/CSS variables
- ❌ E-commerce features
- ❌ Team collaboration
- ❌ Template marketplace
- ❌ Blog functionality

---

## Epic Breakdown

### Epic 1: Foundation & Infrastructure
**Goal:** Set up the technical foundation for the entire application

**Stories:** 8 stories | **Total Points:** 34
**Duration:** Week 1-2 (Sprint 1)

### Epic 2: Authentication & User Management
**Goal:** Enable users to sign up, log in, and manage their accounts

**Stories:** 6 stories | **Total Points:** 21
**Duration:** Week 1-2 (Sprint 1)

### Epic 3: Project & Page Management
**Goal:** Allow users to create and manage website projects and pages

**Stories:** 8 stories | **Total Points:** 34
**Duration:** Week 2-3 (Sprint 2)

### Epic 4: Builder Canvas System
**Goal:** Build the core drag-and-drop canvas where users design pages

**Stories:** 12 stories | **Total Points:** 55
**Duration:** Week 3-5 (Sprint 2-3)

### Epic 5: Element Library (15 MVP Elements)
**Goal:** Create 15 essential draggable elements

**Stories:** 15 stories | **Total Points:** 45
**Duration:** Week 4-6 (Sprint 3)

### Epic 6: Properties Panel
**Goal:** Enable users to style and configure elements

**Stories:** 8 stories | **Total Points:** 34
**Duration:** Week 5-7 (Sprint 3-4)

### Epic 7: Media Management
**Goal:** Allow users to upload and manage images

**Stories:** 5 stories | **Total Points:** 21
**Duration:** Week 6-7 (Sprint 4)

### Epic 8: Publishing & Preview
**Goal:** Generate static HTML and publish websites

**Stories:** 6 stories | **Total Points:** 34
**Duration:** Week 7-8 (Sprint 4)

### Epic 9: Dashboard & Navigation
**Goal:** Create the main dashboard and navigation

**Stories:** 5 stories | **Total Points:** 21
**Duration:** Week 8 (Sprint 4)

---

**Total Stories:** 73
**Total Story Points:** 299
**Estimated Velocity:** 40 points/sprint (solo) | 80 points/sprint (team of 3)
**Estimated Sprints:** 8 sprints solo | 4 sprints (team of 3)

---

## User Personas

### Persona 1: Sarah - Small Business Owner
**Age:** 35 | **Tech Savvy:** Low | **Goal:** Create a simple website for her bakery

**Needs:**
- Simple, intuitive interface
- Pre-built templates (future)
- Mobile-friendly output
- Fast time to publish

**Pain Points:**
- Doesn't know how to code
- Overwhelmed by complex tools
- Limited budget

### Persona 2: Mike - Freelance Web Designer
**Age:** 28 | **Tech Savvy:** High | **Goal:** Build client websites quickly

**Needs:**
- Pixel-perfect control
- Clean code output
- Fast workflow
- Reusable components (future)

**Pain Points:**
- Wix/Squarespace too limiting
- Coding from scratch too slow
- Needs client handoff capability

### Persona 3: Jessica - Marketing Manager
**Age:** 32 | **Tech Savvy:** Medium | **Goal:** Create landing pages for campaigns

**Needs:**
- Quick page creation
- A/B testing (future)
- Analytics integration (future)
- Template library (future)

**Pain Points:**
- Depends on developers
- Long iteration cycles
- Can't make quick changes

---

## User Stories by Epic

---

## EPIC 1: Foundation & Infrastructure

### Story 1.1: Project Setup & Configuration
**As a** developer
**I want to** set up the Next.js project with all required dependencies
**So that** I have a solid foundation to build upon

**Acceptance Criteria:**
- [ ] Next.js 15.5.6 installed and configured
- [ ] TypeScript strict mode enabled
- [ ] Tailwind CSS 4 configured
- [ ] pnpm as package manager
- [ ] ESLint and Prettier configured
- [ ] Git repository initialized
- [ ] All dependencies from architecture doc installed

**Technical Tasks:**
- Install core dependencies (Next.js, React, TypeScript, Tailwind)
- Install builder dependencies (@dnd-kit, Zustand, React Query, etc.)
- Configure tsconfig.json with path aliases
- Set up ESLint and Prettier
- Create folder structure as per architecture doc

**Story Points:** 3
**Priority:** P0 (Critical)
**Dependencies:** None

---

### Story 1.2: Database Setup with Prisma
**As a** developer
**I want to** set up PostgreSQL database with Prisma ORM
**So that** I can persist user data and projects

**Acceptance Criteria:**
- [ ] PostgreSQL database running locally or on Supabase
- [ ] Prisma schema created with all models (User, Project, Page, etc.)
- [ ] Prisma Client generated
- [ ] Initial migration run successfully
- [ ] Database connection tested

**Technical Tasks:**
- Install Prisma and @prisma/client
- Copy schema from architecture doc
- Set up DATABASE_URL in .env.local
- Run `npx prisma migrate dev --name init`
- Test connection with simple query

**Story Points:** 5
**Priority:** P0 (Critical)
**Dependencies:** Story 1.1

---

### Story 1.3: Environment Variables Setup
**As a** developer
**I want to** configure all required environment variables
**So that** the application can connect to external services

**Acceptance Criteria:**
- [ ] .env.local created with all variables
- [ ] .env.example created for team reference
- [ ] Database URLs configured
- [ ] NextAuth secret generated
- [ ] OAuth credentials placeholder added
- [ ] Environment validation implemented

**Technical Tasks:**
- Create .env.local file
- Add DATABASE_URL, DIRECT_URL
- Generate NEXTAUTH_SECRET (openssl rand -base64 32)
- Add placeholders for Google/GitHub OAuth
- Add environment validation with Zod

**Story Points:** 2
**Priority:** P0 (Critical)
**Dependencies:** Story 1.2

---

### Story 1.4: Project File Structure
**As a** developer
**I want to** create the recommended folder structure
**So that** code is organized and maintainable

**Acceptance Criteria:**
- [ ] All folders from architecture doc created
- [ ] Barrel exports configured for clean imports
- [ ] TypeScript paths configured in tsconfig.json
- [ ] Basic README.md updated with project info

**Technical Tasks:**
- Create app/ structure (auth, builder, api, actions)
- Create components/ structure (builder, elements, ui)
- Create lib/ structure (db, auth, stores, utils)
- Create types/ folder with base types
- Create hooks/ folder
- Update README.md

**Story Points:** 2
**Priority:** P0 (Critical)
**Dependencies:** Story 1.1

---

### Story 1.5: State Management Setup
**As a** developer
**I want to** configure Zustand and React Query
**So that** I can manage application state efficiently

**Acceptance Criteria:**
- [ ] Zustand installed and configured
- [ ] React Query installed and configured
- [ ] Query client provider set up
- [ ] Devtools enabled for development
- [ ] Canvas store created (empty initially)

**Technical Tasks:**
- Install zustand and @tanstack/react-query
- Create app/providers.tsx with QueryClientProvider
- Create lib/stores/canvas-store.ts skeleton
- Create lib/stores/ui-store.ts skeleton
- Add devtools for both libraries

**Story Points:** 3
**Priority:** P0 (Critical)
**Dependencies:** Story 1.1

---

### Story 1.6: Type Definitions
**As a** developer
**I want to** create all TypeScript type definitions
**So that** I have type safety across the application

**Acceptance Criteria:**
- [ ] ElementNode interface defined
- [ ] ElementProps interface defined
- [ ] ElementStyles interface defined
- [ ] Project, Page, User types from Prisma
- [ ] API response types defined

**Technical Tasks:**
- Create types/element.ts with all element types
- Create types/project.ts
- Create types/api.ts
- Export all types from types/index.ts

**Story Points:** 3
**Priority:** P0 (Critical)
**Dependencies:** Story 1.2

---

### Story 1.7: Database Client Setup
**As a** developer
**I want to** create a singleton Prisma client
**So that** I can query the database efficiently

**Acceptance Criteria:**
- [ ] lib/db.ts created with Prisma client
- [ ] Connection pooling configured
- [ ] Development logging enabled
- [ ] Client exported for use across app

**Technical Tasks:**
- Create lib/db.ts as per architecture doc
- Configure globalForPrisma pattern
- Add query logging for development
- Test with simple query

**Story Points:** 2
**Priority:** P0 (Critical)
**Dependencies:** Story 1.2

---

### Story 1.8: UI Component Library Setup
**As a** developer
**I want to** set up Radix UI and base components
**So that** I can build accessible UI quickly

**Acceptance Criteria:**
- [ ] Radix UI primitives installed
- [ ] shadcn/ui components configured (optional)
- [ ] Base Button component created
- [ ] Base Input component created
- [ ] Base Dialog component created
- [ ] Icon library (lucide-react) installed

**Technical Tasks:**
- Install @radix-ui/react-* packages
- Create components/ui/button.tsx
- Create components/ui/input.tsx
- Create components/ui/dialog.tsx
- Install lucide-react for icons
- Create components/ui/index.ts for exports

**Story Points:** 5
**Priority:** P1 (High)
**Dependencies:** Story 1.1

---

## EPIC 2: Authentication & User Management

### Story 2.1: NextAuth.js Setup
**As a** developer
**I want to** configure NextAuth.js for authentication
**So that** users can sign up and log in

**Acceptance Criteria:**
- [ ] NextAuth.js v5 installed
- [ ] auth.ts configured with Prisma adapter
- [ ] Session strategy set to JWT
- [ ] Callbacks configured for role in session
- [ ] API route handler created at /api/auth/[...nextauth]

**Technical Tasks:**
- Install next-auth and @auth/prisma-adapter
- Create lib/auth.ts as per architecture doc
- Create app/api/auth/[...nextauth]/route.ts
- Configure callbacks for JWT and session
- Test auth flow

**Story Points:** 5
**Priority:** P0 (Critical)
**Dependencies:** Story 1.2, 1.3, 1.7

---

### Story 2.2: Email/Password Authentication
**As a** Sarah (Small Business Owner)
**I want to** sign up with email and password
**So that** I can create an account

**Acceptance Criteria:**
- [ ] Signup page created at /signup
- [ ] Email/password form with validation
- [ ] Password hashing with bcrypt
- [ ] User created in database
- [ ] Email validation (format check)
- [ ] Password strength requirements enforced
- [ ] Error messages displayed clearly

**Technical Tasks:**
- Create app/(auth)/signup/page.tsx
- Create signup form with React Hook Form + Zod
- Install bcryptjs for password hashing
- Create server action for signup
- Add email format validation
- Add password strength validation (min 8 chars, uppercase, lowercase, number)

**Story Points:** 5
**Priority:** P0 (Critical)
**Dependencies:** Story 2.1

---

### Story 2.3: Login Page
**As a** returning user
**I want to** log in with my credentials
**So that** I can access my projects

**Acceptance Criteria:**
- [ ] Login page created at /login
- [ ] Email/password form
- [ ] "Remember me" option
- [ ] Redirect to dashboard after login
- [ ] Error messages for invalid credentials
- [ ] "Forgot password" link (UI only, functionality Phase 2)

**Technical Tasks:**
- Create app/(auth)/login/page.tsx
- Create login form with React Hook Form + Zod
- Integrate with NextAuth signIn()
- Handle redirect after successful login
- Display error messages

**Story Points:** 3
**Priority:** P0 (Critical)
**Dependencies:** Story 2.1, 2.2

---

### Story 2.4: Google OAuth Integration
**As a** user
**I want to** sign in with my Google account
**So that** I don't need to remember another password

**Acceptance Criteria:**
- [ ] Google OAuth provider configured
- [ ] "Sign in with Google" button on login/signup pages
- [ ] User account created/linked on first Google sign-in
- [ ] Profile picture from Google saved
- [ ] Name from Google pre-filled

**Technical Tasks:**
- Set up Google Cloud Console project
- Get OAuth credentials
- Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env
- Add Google provider to NextAuth config
- Add Google sign-in button to login/signup pages
- Test OAuth flow

**Story Points:** 3
**Priority:** P0 (Critical)
**Dependencies:** Story 2.1

---

### Story 2.5: Protected Routes Middleware
**As a** developer
**I want to** protect authenticated routes
**So that** unauthorized users can't access the builder

**Acceptance Criteria:**
- [ ] Middleware configured to protect /dashboard, /editor routes
- [ ] Unauthenticated users redirected to /login
- [ ] Session validated on protected routes
- [ ] Public routes remain accessible

**Technical Tasks:**
- Create middleware.ts with NextAuth middleware
- Configure matcher for protected routes
- Test redirect behavior
- Ensure /login, /signup remain public

**Story Points:** 2
**Priority:** P0 (Critical)
**Dependencies:** Story 2.1

---

### Story 2.6: User Profile Page (Basic)
**As a** logged-in user
**I want to** view and edit my profile
**So that** I can update my information

**Acceptance Criteria:**
- [ ] Profile page created at /dashboard/profile
- [ ] Display name, email, profile picture
- [ ] Edit name form
- [ ] Save changes to database
- [ ] Success/error messages

**Technical Tasks:**
- Create app/dashboard/profile/page.tsx
- Fetch user data from session
- Create form for editing name
- Create server action to update user
- Display current profile picture

**Story Points:** 3
**Priority:** P1 (High)
**Dependencies:** Story 2.1

---

## EPIC 3: Project & Page Management

### Story 3.1: Dashboard Landing Page
**As a** logged-in user
**I want to** see my dashboard
**So that** I can access my projects

**Acceptance Criteria:**
- [ ] Dashboard page created at /dashboard
- [ ] Welcome message with user's name
- [ ] "Create New Project" button prominently displayed
- [ ] Empty state when no projects exist
- [ ] Loading state while fetching projects

**Technical Tasks:**
- Create app/dashboard/page.tsx
- Fetch user session
- Display welcome message
- Create empty state component
- Add "Create Project" CTA button

**Story Points:** 3
**Priority:** P0 (Critical)
**Dependencies:** Story 2.1

---

### Story 3.2: Create Project
**As a** Sarah (Small Business Owner)
**I want to** create a new website project
**So that** I can start building my site

**Acceptance Criteria:**
- [ ] "Create Project" modal/page
- [ ] Form with project name (required)
- [ ] Form with description (optional)
- [ ] Project created in database
- [ ] User redirected to project's first page editor
- [ ] Default homepage created automatically

**Technical Tasks:**
- Create project creation modal/form
- Create server action createProject()
- Validate input with Zod
- Create project in database
- Create default homepage for project
- Redirect to /editor/[pageId]

**Story Points:** 5
**Priority:** P0 (Critical)
**Dependencies:** Story 3.1

---

### Story 3.3: Project List View
**As a** user with multiple projects
**I want to** see all my projects in a list
**So that** I can choose which one to work on

**Acceptance Criteria:**
- [ ] Projects displayed as cards or list items
- [ ] Each project shows: name, description, last modified date
- [ ] Click on project opens it (goes to editor)
- [ ] Pagination if more than 12 projects
- [ ] Search/filter (future - not MVP)

**Technical Tasks:**
- Create ProjectCard component
- Fetch projects with React Query
- Display grid of projects
- Add "Last edited" timestamp
- Make cards clickable (navigate to editor)

**Story Points:** 5
**Priority:** P0 (Critical)
**Dependencies:** Story 3.1, 3.2

---

### Story 3.4: Edit Project Settings
**As a** user
**I want to** edit my project name and description
**So that** I can keep my projects organized

**Acceptance Criteria:**
- [ ] Project settings accessible from dashboard
- [ ] Edit project name
- [ ] Edit project description
- [ ] Save changes to database
- [ ] Success/error messages

**Technical Tasks:**
- Create project settings modal
- Create form with React Hook Form
- Create server action updateProject()
- Update project in database
- Show toast notification on success

**Story Points:** 3
**Priority:** P1 (High)
**Dependencies:** Story 3.3

---

### Story 3.5: Delete Project
**As a** user
**I want to** delete a project I no longer need
**So that** I can keep my workspace clean

**Acceptance Criteria:**
- [ ] Delete button in project settings
- [ ] Confirmation dialog before deletion
- [ ] Project and all pages deleted from database
- [ ] User returned to dashboard
- [ ] Success message displayed

**Technical Tasks:**
- Add delete button to project settings
- Create confirmation dialog
- Create server action deleteProject()
- Delete project (cascade deletes pages)
- Invalidate React Query cache
- Show success toast

**Story Points:** 3
**Priority:** P1 (High)
**Dependencies:** Story 3.4

---

### Story 3.6: Create Additional Pages
**As a** user
**I want to** add more pages to my project (About, Contact, etc.)
**So that** I can build a multi-page website

**Acceptance Criteria:**
- [ ] "Add Page" button in editor
- [ ] Form with page name and slug
- [ ] Page created in database
- [ ] Switch to new page in editor
- [ ] Page appears in pages list

**Technical Tasks:**
- Create "Add Page" button in editor toolbar
- Create page creation modal
- Create server action createPage()
- Validate slug uniqueness within project
- Add page to database
- Switch canvas to new page

**Story Points:** 5
**Priority:** P0 (Critical)
**Dependencies:** Epic 4 (canvas exists)

---

### Story 3.7: Page List Sidebar
**As a** user
**I want to** see all pages in my project
**So that** I can navigate between them

**Acceptance Criteria:**
- [ ] Pages list in left sidebar or dropdown
- [ ] Click on page switches canvas to that page
- [ ] Homepage marked/highlighted
- [ ] Add new page button
- [ ] Delete page option (not homepage)

**Technical Tasks:**
- Create PageList component
- Fetch pages for current project
- Display pages as list
- Highlight active page
- Add click handler to switch pages

**Story Points:** 3
**Priority:** P1 (High)
**Dependencies:** Story 3.6

---

### Story 3.8: Delete Page
**As a** user
**I want to** delete a page I don't need
**So that** I can manage my site structure

**Acceptance Criteria:**
- [ ] Delete button for each page (except homepage)
- [ ] Confirmation dialog
- [ ] Page deleted from database
- [ ] If viewing deleted page, switch to homepage
- [ ] Success message

**Technical Tasks:**
- Add delete button to PageList items
- Create confirmation dialog
- Create server action deletePage()
- Prevent deleting homepage
- Handle navigation if on deleted page

**Story Points:** 3
**Priority:** P1 (High)
**Dependencies:** Story 3.7

---

## EPIC 4: Builder Canvas System

### Story 4.1: Basic Canvas Layout
**As a** developer
**I want to** create the builder layout structure
**So that** I have the UI framework for the builder

**Acceptance Criteria:**
- [ ] Builder page created at /editor/[id]
- [ ] Three-panel layout: Left sidebar, Canvas (center), Right sidebar
- [ ] Top toolbar
- [ ] Responsive layout (panels collapsible)
- [ ] Clean, professional design

**Technical Tasks:**
- Create app/editor/[id]/page.tsx
- Create components/builder/BuilderLayout.tsx
- Create basic layout with flexbox/grid
- Add panel resize functionality (optional)
- Style with Tailwind CSS

**Story Points:** 5
**Priority:** P0 (Critical)
**Dependencies:** Story 1.4

---

### Story 4.2: Canvas Component
**As a** developer
**I want to** create the main canvas component
**So that** users can drop elements onto it

**Acceptance Criteria:**
- [ ] Canvas component renders in center panel
- [ ] White/light background to distinguish from UI
- [ ] Device frame (desktop initially)
- [ ] Scrollable if content exceeds viewport
- [ ] Drop zone indicators

**Technical Tasks:**
- Create components/builder/Canvas/Canvas.tsx
- Add basic styling (background, padding, scroll)
- Add device frame (border to simulate browser)
- Prepare for drag-drop integration

**Story Points:** 3
**Priority:** P0 (Critical)
**Dependencies:** Story 4.1

---

### Story 4.3: Drag-and-Drop Setup with @dnd-kit
**As a** developer
**I want to** integrate @dnd-kit for drag-and-drop
**So that** users can drag elements onto the canvas

**Acceptance Criteria:**
- [ ] @dnd-kit installed and configured
- [ ] DndContext wraps canvas
- [ ] Drag sensors configured (pointer, touch)
- [ ] DragOverlay for visual feedback
- [ ] Basic drag/drop test working

**Technical Tasks:**
- Install @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities
- Set up DndContext in Canvas.tsx
- Configure pointer sensor with 8px activation distance
- Create DragOverlay
- Test with dummy draggable element

**Story Points:** 5
**Priority:** P0 (Critical)
**Dependencies:** Story 4.2

---

### Story 4.4: Element Selection System
**As a** Mike (Freelance Designer)
**I want to** click on elements to select them
**So that** I can edit their properties

**Acceptance Criteria:**
- [ ] Click on element selects it
- [ ] Selected element has visual indicator (blue outline)
- [ ] Click on canvas deselects all
- [ ] Only one element selected at a time
- [ ] Selection state stored in Zustand

**Technical Tasks:**
- Add selectedElementId to canvas store
- Create selectElement() action
- Add onClick handler to elements
- Style selected element with outline
- Add click handler to canvas background to deselect

**Story Points:** 3
**Priority:** P0 (Critical)
**Dependencies:** Story 4.3, 1.5

---

### Story 4.5: Element Hover State
**As a** user
**I want to** see which element my cursor is over
**So that** I know what I'm about to select

**Acceptance Criteria:**
- [ ] Hover on element shows subtle outline
- [ ] Hover state distinct from selection state
- [ ] Hover state stored in canvas store
- [ ] Smooth transition

**Technical Tasks:**
- Add hoveredElementId to canvas store
- Add onMouseEnter/onMouseLeave handlers
- Style hovered element (subtle gray outline)
- Ensure hover doesn't interfere with selection

**Story Points:** 2
**Priority:** P1 (High)
**Dependencies:** Story 4.4

---

### Story 4.6: Canvas State Management (Zustand)
**As a** developer
**I want to** manage canvas state in Zustand
**So that** state changes are reactive and performant

**Acceptance Criteria:**
- [ ] canvas-store.ts implemented
- [ ] ElementNode[] stored in state
- [ ] Actions: addElement, updateElement, deleteElement, moveElement
- [ ] State persists during session
- [ ] Devtools enabled for debugging

**Technical Tasks:**
- Complete lib/stores/canvas-store.ts
- Implement all CRUD actions for elements
- Add undo/redo history (optional for MVP)
- Enable Zustand devtools
- Test state changes

**Story Points:** 5
**Priority:** P0 (Critical)
**Dependencies:** Story 1.5

---

### Story 4.7: Add Element to Canvas (Drag from Library)
**As a** Sarah (Small Business Owner)
**I want to** drag an element from the library onto the canvas
**So that** I can start building my page

**Acceptance Criteria:**
- [ ] Drag element from library
- [ ] Drop element onto canvas
- [ ] Element appears at drop location
- [ ] Element added to canvas state
- [ ] Element rendered on canvas

**Technical Tasks:**
- Make library elements draggable
- Create drop handler in Canvas
- Generate unique element ID (cuid)
- Add element to Zustand store
- Render element on canvas

**Story Points:** 5
**Priority:** P0 (Critical)
**Dependencies:** Story 4.6, 5.1 (element library exists)

---

### Story 4.8: Delete Element
**As a** user
**I want to** delete an element I don't need
**So that** I can refine my design

**Acceptance Criteria:**
- [ ] Delete button appears when element is selected
- [ ] Click delete removes element from canvas
- [ ] Element removed from state
- [ ] Confirmation for accidental deletes (optional)

**Technical Tasks:**
- Add Delete key handler
- Add delete button to selection overlay
- Implement deleteElement() action in store
- Remove element from state
- Re-render canvas

**Story Points:** 2
**Priority:** P0 (Critical)
**Dependencies:** Story 4.4

---

### Story 4.9: Move Element (Reorder)
**As a** Mike (Freelance Designer)
**I want to** drag elements to reorder them
**So that** I can control the layout

**Acceptance Criteria:**
- [ ] Drag element on canvas to new position
- [ ] Visual indicator shows where element will drop
- [ ] Element position updates in state
- [ ] Smooth animation during move

**Technical Tasks:**
- Implement drag-to-reorder with @dnd-kit/sortable
- Update element order in store
- Add drop indicators
- Handle nested elements (parent/child relationships)

**Story Points:** 8
**Priority:** P1 (High)
**Dependencies:** Story 4.7

---

### Story 4.10: Save Page Content
**As a** user
**I want to** save my changes automatically
**So that** I don't lose my work

**Acceptance Criteria:**
- [ ] Auto-save every 5 seconds if changes detected
- [ ] Manual "Save" button in toolbar
- [ ] Page content JSON saved to database
- [ ] "Saving..." indicator
- [ ] "Saved" confirmation

**Technical Tasks:**
- Create server action updatePage()
- Serialize element tree to JSON
- Implement auto-save with debounce
- Add save button to toolbar
- Show save status indicator

**Story Points:** 5
**Priority:** P0 (Critical)
**Dependencies:** Story 4.6

---

### Story 4.11: Load Page Content
**As a** user
**I want to** see my previous work when I reopen a page
**So that** I can continue editing

**Acceptance Criteria:**
- [ ] Fetch page data on editor load
- [ ] Deserialize JSON to element tree
- [ ] Render elements on canvas
- [ ] Loading state while fetching

**Technical Tasks:**
- Fetch page from database using page ID
- Parse content JSON
- Populate canvas store with elements
- Render elements
- Add loading spinner

**Story Points:** 3
**Priority:** P0 (Critical)
**Dependencies:** Story 4.10

---

### Story 4.12: Device Preview Modes
**As a** user
**I want to** preview my design on different devices
**So that** I can ensure it's mobile-friendly

**Acceptance Criteria:**
- [ ] Device selector in toolbar (Desktop, Tablet, Mobile)
- [ ] Canvas width adjusts based on selected device
- [ ] Device frame shows appropriate size
- [ ] Responsive breakpoints: 1440px (desktop), 768px (tablet), 375px (mobile)

**Technical Tasks:**
- Create DeviceSelector component
- Add device state to canvas store
- Apply width constraints to canvas
- Add device frame styling
- Test responsive behavior

**Story Points:** 5
**Priority:** P1 (High)
**Dependencies:** Story 4.2

---

## EPIC 5: Element Library (15 MVP Elements)

### Element Implementation Pattern

Each element follows this structure:
1. Element definition in element registry
2. Render component (Canvas.tsx displays it)
3. Properties component (PropertiesPanel.tsx edits it)

**Common Acceptance Criteria for All Elements:**
- [ ] Element defined in element registry
- [ ] Default props and styles defined
- [ ] Render component created
- [ ] Properties component created
- [ ] Element appears in element library
- [ ] Element is draggable onto canvas
- [ ] Element renders correctly on canvas
- [ ] Element can be selected
- [ ] Element can be styled via properties panel
- [ ] Element can be deleted

---

### Story 5.1: Element Registry & Library UI
**As a** developer
**I want to** create the element registry system
**So that** I can register and manage all elements

**Acceptance Criteria:**
- [ ] lib/elements/element-registry.ts created
- [ ] ElementDefinition interface defined
- [ ] Helper functions: getElement(), getAllElements(), getElementsByCategory()
- [ ] Element library UI created (left sidebar)
- [ ] Elements grouped by category
- [ ] Search elements (optional for MVP)

**Technical Tasks:**
- Create element registry file
- Define ElementDefinition interface
- Create components/builder/ElementLibrary/ElementLibrary.tsx
- Group elements by category
- Make elements draggable (DraggableElement component)

**Story Points:** 5
**Priority:** P0 (Critical)
**Dependencies:** Story 1.6, 4.1

---

### Story 5.2: Container Element
**As a** user
**I want to** add a container element
**So that** I can group other elements

**Element Type:** Layout
**Default Props:** { tag: 'div', className: 'container mx-auto' }
**Can Have Children:** Yes

**Technical Tasks:**
- Register 'container' in element registry
- Create components/elements/ContainerElement.tsx
- Create components/properties/ContainerProperties.tsx
- Add width, padding, margin controls
- Test nesting other elements inside

**Story Points:** 3
**Priority:** P0 (Critical)
**Dependencies:** Story 5.1

---

### Story 5.3: Section Element
**As a** user
**I want to** add a section element
**So that** I can create distinct page sections

**Element Type:** Layout
**Default Props:** { tag: 'section', className: 'py-12' }
**Can Have Children:** Yes

**Technical Tasks:**
- Register 'section' in element registry
- Create SectionElement.tsx
- Create SectionProperties.tsx
- Add background color control
- Add padding controls

**Story Points:** 3
**Priority:** P0 (Critical)
**Dependencies:** Story 5.1

---

### Story 5.4: Column Element (Flexbox)
**As a** Mike (Freelance Designer)
**I want to** add a column element for layouts
**So that** I can create multi-column designs

**Element Type:** Layout
**Default Props:** { columns: 2, gap: '1rem' }
**Can Have Children:** Yes

**Technical Tasks:**
- Register 'column' in element registry
- Create ColumnElement.tsx
- Create ColumnProperties.tsx
- Add column count selector (1-4)
- Add gap control
- Use flexbox for layout

**Story Points:** 5
**Priority:** P0 (Critical)
**Dependencies:** Story 5.1

---

### Story 5.5: Div Element
**As a** developer/advanced user
**I want to** add a generic div element
**So that** I have maximum flexibility

**Element Type:** Layout
**Default Props:** { tag: 'div' }
**Can Have Children:** Yes

**Technical Tasks:**
- Register 'div' in element registry
- Create DivElement.tsx
- Create DivProperties.tsx
- Allow all style controls

**Story Points:** 2
**Priority:** P0 (Critical)
**Dependencies:** Story 5.1

---

### Story 5.6: Heading Element (H1-H6)
**As a** Sarah (Small Business Owner)
**I want to** add headings to my page
**So that** I can structure my content

**Element Type:** Content
**Default Props:** { level: 1, text: 'Heading Text' }
**Can Have Children:** No

**Technical Tasks:**
- Register 'heading' in element registry
- Create HeadingElement.tsx
- Create HeadingProperties.tsx
- Add level selector (H1-H6)
- Add text input
- Add typography controls (font, size, weight, color)

**Story Points:** 3
**Priority:** P0 (Critical)
**Dependencies:** Story 5.1

---

### Story 5.7: Paragraph Element
**As a** user
**I want to** add paragraph text
**So that** I can add body content

**Element Type:** Content
**Default Props:** { text: 'Paragraph text' }
**Can Have Children:** No

**Technical Tasks:**
- Register 'paragraph' in element registry
- Create ParagraphElement.tsx
- Create ParagraphProperties.tsx
- Add text input (textarea)
- Add typography controls
- Support line breaks

**Story Points:** 3
**Priority:** P0 (Critical)
**Dependencies:** Story 5.1

---

### Story 5.8: Text Element (Inline)
**As a** user
**I want to** add inline text
**So that** I can add labels or short text

**Element Type:** Content
**Default Props:** { text: 'Text', tag: 'span' }
**Can Have Children:** No

**Technical Tasks:**
- Register 'text' in element registry
- Create TextElement.tsx
- Create TextProperties.tsx
- Render as span or other inline element

**Story Points:** 2
**Priority:** P0 (Critical)
**Dependencies:** Story 5.1

---

### Story 5.9: Button Element
**As a** user
**I want to** add a button
**So that** I can create CTAs

**Element Type:** Content
**Default Props:** { text: 'Button', href: '#' }
**Can Have Children:** No

**Technical Tasks:**
- Register 'button' in element registry
- Create ButtonElement.tsx
- Create ButtonProperties.tsx
- Add text input
- Add link (href) input
- Add button style controls (color, size, variant)

**Story Points:** 3
**Priority:** P0 (Critical)
**Dependencies:** Story 5.1

---

### Story 5.10: Link Element
**As a** user
**I want to** add a hyperlink
**So that** I can link to other pages

**Element Type:** Content
**Default Props:** { text: 'Link', href: '#', target: '_self' }
**Can Have Children:** No

**Technical Tasks:**
- Register 'link' in element registry
- Create LinkElement.tsx
- Create LinkProperties.tsx
- Add text and href inputs
- Add target selector (_self, _blank)
- Add underline/color controls

**Story Points:** 2
**Priority:** P0 (Critical)
**Dependencies:** Story 5.1

---

### Story 5.11: Image Element
**As a** Sarah (Small Business Owner)
**I want to** add images to my page
**So that** I can show my products/services

**Element Type:** Media
**Default Props:** { src: '/placeholder.jpg', alt: 'Image' }
**Can Have Children:** No

**Technical Tasks:**
- Register 'image' in element registry
- Create ImageElement.tsx
- Create ImageProperties.tsx
- Add image URL input
- Add alt text input
- Add width/height controls
- Add "Upload Image" button (opens media library)

**Story Points:** 5
**Priority:** P0 (Critical)
**Dependencies:** Story 5.1, Epic 7 (Media Management)

---

### Story 5.12: Video Element (Embed)
**As a** user
**I want to** embed YouTube videos
**So that** I can add video content

**Element Type:** Media
**Default Props:** { url: '', provider: 'youtube' }
**Can Have Children:** No

**Technical Tasks:**
- Register 'video' in element registry
- Create VideoElement.tsx (iframe embed)
- Create VideoProperties.tsx
- Add YouTube URL input
- Parse YouTube ID from URL
- Add width/height controls
- Add support for Vimeo (optional)

**Story Points:** 3
**Priority:** P1 (High)
**Dependencies:** Story 5.1

---

### Story 5.13: Input Element (Form)
**As a** user
**I want to** add form inputs
**So that** I can collect user information

**Element Type:** Form
**Default Props:** { type: 'text', placeholder: 'Enter text', name: 'input' }
**Can Have Children:** No

**Technical Tasks:**
- Register 'input' in element registry
- Create InputElement.tsx
- Create InputProperties.tsx
- Add type selector (text, email, tel, number)
- Add placeholder input
- Add name input
- Add required checkbox

**Story Points:** 3
**Priority:** P1 (High)
**Dependencies:** Story 5.1

---

### Story 5.14: Textarea Element (Form)
**As a** user
**I want to** add a textarea field
**So that** I can collect longer text input

**Element Type:** Form
**Default Props:** { placeholder: 'Enter text', rows: 4, name: 'message' }
**Can Have Children:** No

**Technical Tasks:**
- Register 'textarea' in element registry
- Create TextareaElement.tsx
- Create TextareaProperties.tsx
- Add placeholder input
- Add rows control
- Add name input

**Story Points:** 2
**Priority:** P1 (High)
**Dependencies:** Story 5.1

---

### Story 5.15: Form Element (Container)
**As a** user
**I want to** wrap inputs in a form
**So that** I can create contact forms

**Element Type:** Form
**Default Props:** { action: '', method: 'POST' }
**Can Have Children:** Yes (inputs, textareas, buttons)

**Technical Tasks:**
- Register 'form' in element registry
- Create FormElement.tsx
- Create FormProperties.tsx
- Add action URL input
- Add method selector (GET, POST)
- Allow nesting of form elements

**Story Points:** 3
**Priority:** P1 (High)
**Dependencies:** Story 5.13, 5.14

---

### Story 5.16: Spacer Element
**As a** Mike (Freelance Designer)
**I want to** add spacers between elements
**So that** I can control spacing precisely

**Element Type:** Layout
**Default Props:** { height: '2rem' }
**Can Have Children:** No

**Technical Tasks:**
- Register 'spacer' in element registry
- Create SpacerElement.tsx (renders as div with height)
- Create SpacerProperties.tsx
- Add height control (px, rem, vh)

**Story Points:** 2
**Priority:** P1 (High)
**Dependencies:** Story 5.1

---

### Story 5.17: Divider Element
**As a** user
**I want to** add horizontal lines
**So that** I can separate content sections

**Element Type:** Layout
**Default Props:** { color: '#e5e7eb', thickness: 1 }
**Can Have Children:** No

**Technical Tasks:**
- Register 'divider' in element registry
- Create DividerElement.tsx (renders as <hr> or styled div)
- Create DividerProperties.tsx
- Add color picker
- Add thickness control

**Story Points:** 2
**Priority:** P1 (High)
**Dependencies:** Story 5.1

---

## EPIC 6: Properties Panel

### Story 6.1: Properties Panel UI
**As a** developer
**I want to** create the properties panel layout
**So that** users can edit element properties

**Acceptance Criteria:**
- [ ] Properties panel in right sidebar
- [ ] Tabs: Styles, Settings, Advanced
- [ ] Show/hide based on element selection
- [ ] Responsive, scrollable

**Technical Tasks:**
- Create components/builder/PropertiesPanel/PropertiesPanel.tsx
- Create tabs (Styles, Settings, Advanced)
- Show panel when element selected
- Hide panel when nothing selected

**Story Points:** 3
**Priority:** P0 (Critical)
**Dependencies:** Story 4.1

---

### Story 6.2: Style Controls - Typography
**As a** user
**I want to** change text styles
**So that** I can customize fonts

**Acceptance Criteria:**
- [ ] Font family selector (Google Fonts)
- [ ] Font size input
- [ ] Font weight selector
- [ ] Text color picker
- [ ] Text alignment buttons (left, center, right)

**Technical Tasks:**
- Create FontPicker component
- Create FontSizeControl component
- Create FontWeightSelector component
- Create ColorPicker component
- Create TextAlignControl component
- Update element styles on change

**Story Points:** 5
**Priority:** P0 (Critical)
**Dependencies:** Story 6.1

---

### Story 6.3: Style Controls - Spacing
**As a** Mike (Freelance Designer)
**I want to** adjust margins and padding
**So that** I can control element spacing

**Acceptance Criteria:**
- [ ] Margin controls (top, right, bottom, left)
- [ ] Padding controls (top, right, bottom, left)
- [ ] Visual spacing editor (linked/unlinked sides)
- [ ] Support for px, rem, em units

**Technical Tasks:**
- Create SpacingControl component
- Add inputs for each side
- Add "link" button to sync all sides
- Add unit selector
- Update element styles

**Story Points:** 5
**Priority:** P0 (Critical)
**Dependencies:** Story 6.1

---

### Story 6.4: Style Controls - Colors
**As a** user
**I want to** change background and text colors
**So that** I can match my brand

**Acceptance Criteria:**
- [ ] Background color picker
- [ ] Text color picker
- [ ] Color input (hex, RGB)
- [ ] Recent colors
- [ ] Opacity slider

**Technical Tasks:**
- Create ColorPicker component (use @radix-ui or react-colorful)
- Add hex input
- Add opacity slider
- Store recent colors in local state
- Update element styles

**Story Points:** 5
**Priority:** P0 (Critical)
**Dependencies:** Story 6.1

---

### Story 6.5: Style Controls - Borders
**As a** user
**I want to** add borders to elements
**So that** I can create visual separation

**Acceptance Criteria:**
- [ ] Border width input
- [ ] Border color picker
- [ ] Border style selector (solid, dashed, dotted)
- [ ] Border radius input (rounded corners)

**Technical Tasks:**
- Create BorderControl component
- Add width, color, style inputs
- Add border radius control
- Update element styles

**Story Points:** 3
**Priority:** P1 (High)
**Dependencies:** Story 6.1

---

### Story 6.6: Style Controls - Layout
**As a** Mike (Freelance Designer)
**I want to** control element width and height
**So that** I can size elements precisely

**Acceptance Criteria:**
- [ ] Width input (px, %, auto)
- [ ] Height input (px, %, auto)
- [ ] Display type selector (block, inline-block, flex)
- [ ] Position selector (relative, absolute, fixed)

**Technical Tasks:**
- Create LayoutControl component
- Add width/height inputs with unit selector
- Add display type selector
- Add position selector
- Update element styles

**Story Points:** 5
**Priority:** P1 (High)
**Dependencies:** Story 6.1

---

### Story 6.7: Advanced Tab - Custom CSS
**As a** Mike (Freelance Designer)
**I want to** add custom CSS to elements
**So that** I have full control when needed

**Acceptance Criteria:**
- [ ] Custom CSS textarea in Advanced tab
- [ ] Syntax highlighting (optional)
- [ ] CSS applied to element in real-time
- [ ] Warning if CSS is invalid

**Technical Tasks:**
- Add customCSS field to element props
- Create CSS textarea input
- Apply custom CSS to element
- Add basic validation (optional)

**Story Points:** 3
**Priority:** P2 (Medium)
**Dependencies:** Story 6.1

---

### Story 6.8: Advanced Tab - Custom Classes
**As a** Mike (Freelance Designer)
**I want to** add Tailwind/CSS classes
**So that** I can use utility classes

**Acceptance Criteria:**
- [ ] Class name input in Advanced tab
- [ ] Multiple classes supported (space-separated)
- [ ] Classes applied to element
- [ ] Autocomplete for Tailwind classes (optional)

**Technical Tasks:**
- Add className input field
- Apply classes to element
- Add class autocomplete (optional, using Tailwind IntelliSense data)

**Story Points:** 2
**Priority:** P2 (Medium)
**Dependencies:** Story 6.1

---

## EPIC 7: Media Management

### Story 7.1: Media Library UI
**As a** developer
**I want to** create a media library interface
**So that** users can manage their images

**Acceptance Criteria:**
- [ ] Media library modal/page
- [ ] Grid view of uploaded images
- [ ] Empty state when no images
- [ ] "Upload" button
- [ ] Select image to use in element

**Technical Tasks:**
- Create components/media/MediaLibrary.tsx
- Create grid layout for images
- Add "Upload New" button
- Add click-to-select functionality
- Return selected image URL to calling component

**Story Points:** 5
**Priority:** P0 (Critical)
**Dependencies:** None

---

### Story 7.2: Image Upload
**As a** Sarah (Small Business Owner)
**I want to** upload images
**So that** I can use them on my website

**Acceptance Criteria:**
- [ ] File upload button
- [ ] Drag-and-drop upload zone
- [ ] Support JPEG, PNG, GIF, WebP
- [ ] Max file size: 10MB
- [ ] Show upload progress
- [ ] Image appears in library after upload

**Technical Tasks:**
- Create file upload input
- Add drag-and-drop zone
- Validate file type and size
- Create upload API route (POST /api/media/upload)
- Integrate with S3/R2 or local storage
- Save media metadata to database
- Show progress bar

**Story Points:** 8
**Priority:** P0 (Critical)
**Dependencies:** Story 7.1

---

### Story 7.3: Image Optimization
**As a** system
**I want to** optimize uploaded images automatically
**So that** websites load faster

**Acceptance Criteria:**
- [ ] Images resized to max 2000px width
- [ ] Images converted to WebP
- [ ] Compression applied (80% quality)
- [ ] Original aspect ratio maintained
- [ ] Thumbnail generated (200px)

**Technical Tasks:**
- Install sharp for image optimization
- Resize images on upload
- Convert to WebP format
- Generate thumbnail
- Store optimized image and thumbnail URLs

**Story Points:** 5
**Priority:** P1 (High)
**Dependencies:** Story 7.2

---

### Story 7.4: Image Selection in Properties Panel
**As a** user
**I want to** select an image from my library for an Image element
**So that** I don't have to re-upload images

**Acceptance Criteria:**
- [ ] "Choose Image" button in Image element properties
- [ ] Opens media library modal
- [ ] Select image from library
- [ ] Image URL populated in element

**Technical Tasks:**
- Add "Choose Image" button to ImageProperties
- Open MediaLibrary modal
- Handle image selection
- Update element props with selected image URL

**Story Points:** 3
**Priority:** P0 (Critical)
**Dependencies:** Story 7.1, 5.11

---

### Story 7.5: Delete Media
**As a** user
**I want to** delete images I no longer need
**So that** I can manage my storage

**Acceptance Criteria:**
- [ ] Delete button on each image in library
- [ ] Confirmation dialog
- [ ] Image deleted from S3/R2
- [ ] Image removed from database
- [ ] Image removed from library UI

**Technical Tasks:**
- Add delete button to media items
- Create confirmation dialog
- Create DELETE /api/media/[id] route
- Delete from S3/R2
- Delete from database
- Update UI

**Story Points:** 3
**Priority:** P1 (High)
**Dependencies:** Story 7.1

---

## EPIC 8: Publishing & Preview

### Story 8.1: Preview Mode
**As a** user
**I want to** preview my website
**So that** I can see how it looks without publishing

**Acceptance Criteria:**
- [ ] "Preview" button in toolbar
- [ ] Opens preview in new tab
- [ ] Preview shows published site rendering (no editor UI)
- [ ] All elements render correctly
- [ ] Mobile-responsive

**Technical Tasks:**
- Add "Preview" button to toolbar
- Create /preview/[pageId] route
- Fetch page data
- Render elements using PublishedRenderer
- Style without editor chrome

**Story Points:** 5
**Priority:** P0 (Critical)
**Dependencies:** Epic 4, Epic 5

---

### Story 8.2: Static HTML Generation
**As a** developer
**I want to** generate static HTML from element tree
**So that** published sites are fast and portable

**Acceptance Criteria:**
- [ ] Convert element tree to HTML string
- [ ] Include CSS (inline or stylesheet)
- [ ] Include basic JavaScript (optional)
- [ ] Valid HTML5 output
- [ ] SEO-friendly markup

**Technical Tasks:**
- Create lib/renderer/static-html-generator.ts
- Implement renderToStaticHTML() function
- Generate <head> with meta tags
- Generate <body> with elements
- Add CSS (Tailwind CDN or extracted classes)
- Return full HTML document string

**Story Points:** 8
**Priority:** P0 (Critical)
**Dependencies:** Story 8.1

---

### Story 8.3: Publish Project
**As a** Sarah (Small Business Owner)
**I want to** publish my website
**So that** it's live on the internet

**Acceptance Criteria:**
- [ ] "Publish" button in toolbar
- [ ] Publish modal with confirmation
- [ ] All pages in project published
- [ ] Static HTML uploaded to hosting/CDN
- [ ] Project marked as published in database
- [ ] Live URL displayed to user

**Technical Tasks:**
- Add "Publish" button to toolbar
- Create publish modal
- Create server action publishProject()
- Generate HTML for all pages
- Upload to S3/R2 or deploy to Vercel
- Update project.isPublished = true
- Return live URL

**Story Points:** 8
**Priority:** P0 (Critical)
**Dependencies:** Story 8.2

---

### Story 8.4: Subdomain Assignment
**As a** system
**I want to** assign a subdomain to each project
**So that** users can access their published sites

**Acceptance Criteria:**
- [ ] Subdomain auto-generated from project name
- [ ] Format: project-name.builder.com
- [ ] Subdomain validated (no duplicates)
- [ ] Subdomain stored in database
- [ ] Published site accessible at subdomain

**Technical Tasks:**
- Generate subdomain slug from project name
- Check uniqueness in database
- Store in project.subdomain
- Configure DNS/CDN routing (or use path-based routing initially)
- Return subdomain URL

**Story Points:** 5
**Priority:** P1 (High)
**Dependencies:** Story 8.3

---

### Story 8.5: View Published Site
**As a** user
**I want to** visit my published website
**So that** I can share it with others

**Acceptance Criteria:**
- [ ] "View Site" button after publishing
- [ ] Opens published site in new tab
- [ ] Site is publicly accessible
- [ ] No authentication required to view

**Technical Tasks:**
- Add "View Site" button/link
- Create /sites/[subdomain] route (public)
- Fetch published project
- Render all pages
- Handle 404 for unpublished projects

**Story Points:** 3
**Priority:** P0 (Critical)
**Dependencies:** Story 8.3, 8.4

---

### Story 8.6: Unpublish Project
**As a** user
**I want to** unpublish my website
**So that** I can take it offline

**Acceptance Criteria:**
- [ ] "Unpublish" button in project settings
- [ ] Confirmation dialog
- [ ] Site removed from public access
- [ ] Project.isPublished = false
- [ ] Files remain in storage (for re-publishing)

**Technical Tasks:**
- Add "Unpublish" button
- Create confirmation dialog
- Update project.isPublished = false
- Remove from public routing (or return 404)
- Keep files in S3/R2 for re-publishing

**Story Points:** 3
**Priority:** P2 (Medium)
**Dependencies:** Story 8.3

---

## EPIC 9: Dashboard & Navigation

### Story 9.1: Top Navigation Bar
**As a** user
**I want to** see a consistent top navigation
**So that** I can easily navigate the app

**Acceptance Criteria:**
- [ ] Top nav on all pages (dashboard, editor)
- [ ] Logo/brand on left
- [ ] User menu on right (avatar, name)
- [ ] Logout option in user menu
- [ ] Back to dashboard link (when in editor)

**Technical Tasks:**
- Create components/layout/TopNav.tsx
- Add logo/brand
- Add user menu with dropdown
- Add logout button
- Add navigation links

**Story Points:** 3
**Priority:** P1 (High)
**Dependencies:** Epic 2 (auth)

---

### Story 9.2: Dashboard Sidebar (Optional)
**As a** user with many projects
**I want to** see project filters/categories
**So that** I can find projects easily

**Acceptance Criteria:**
- [ ] Left sidebar on dashboard
- [ ] "All Projects" view
- [ ] "Recent" view
- [ ] "Starred" view (optional)

**Technical Tasks:**
- Create dashboard sidebar component
- Add filter options
- Implement filtering logic
- Style sidebar

**Story Points:** 3
**Priority:** P2 (Medium)
**Dependencies:** Story 3.3

---

### Story 9.3: Search Projects
**As a** user with many projects
**I want to** search my projects by name
**So that** I can find them quickly

**Acceptance Criteria:**
- [ ] Search input on dashboard
- [ ] Real-time filtering as user types
- [ ] Search by project name
- [ ] Clear search button

**Technical Tasks:**
- Add search input to dashboard
- Implement client-side filtering
- Debounce search input
- Show "No results" message

**Story Points:** 3
**Priority:** P2 (Medium)
**Dependencies:** Story 3.3

---

### Story 9.4: Project Sorting
**As a** user
**I want to** sort my projects
**So that** I can organize them

**Acceptance Criteria:**
- [ ] Sort by: Last modified (default), Name, Created date
- [ ] Sort order: Ascending/Descending
- [ ] Sort state persisted in local storage

**Technical Tasks:**
- Add sort dropdown
- Implement sorting logic
- Save sort preference to localStorage
- Update project list display

**Story Points:** 3
**Priority:** P2 (Medium)
**Dependencies:** Story 3.3

---

### Story 9.5: Dashboard Empty State
**As a** new user
**I want to** see helpful guidance when I have no projects
**So that** I know what to do next

**Acceptance Criteria:**
- [ ] Friendly empty state message
- [ ] Illustration/icon
- [ ] Large "Create Your First Project" button
- [ ] Link to documentation/tutorial (optional)

**Technical Tasks:**
- Create EmptyState component
- Add illustration or icon
- Add helpful message
- Add CTA button
- Show only when projects.length === 0

**Story Points:** 2
**Priority:** P1 (High)
**Dependencies:** Story 3.1

---

## Story Point Estimation Guide

**Fibonacci Scale:** 1, 2, 3, 5, 8, 13, 21

| Points | Complexity | Time Estimate (Solo) | Examples |
|--------|------------|---------------------|----------|
| 1 | Trivial | 1-2 hours | Simple UI component, config change |
| 2 | Simple | 2-4 hours | Basic form, simple API route |
| 3 | Moderate | 4-8 hours | Feature with backend + frontend |
| 5 | Complex | 1-2 days | Drag-drop integration, auth setup |
| 8 | Very Complex | 2-3 days | Publishing system, element system |
| 13 | Epic-level | 3-5 days | Rarely used, break into smaller stories |

---

## Priority Matrix

| Priority | Label | Description | % of Total |
|----------|-------|-------------|------------|
| **P0** | Critical | Must have for MVP, blocks other work | 60% |
| **P1** | High | Important for MVP, good UX | 30% |
| **P2** | Medium | Nice to have, can be deferred | 10% |

---

## Dependencies Map

```
Foundation (Epic 1)
    ↓
Auth (Epic 2) + Projects (Epic 3)
    ↓
Canvas (Epic 4) ← Element Registry (Epic 5.1)
    ↓
Elements (Epic 5) ← Properties Panel (Epic 6)
    ↓
Media (Epic 7) → Image Element (Epic 5.11)
    ↓
Publishing (Epic 8)
    ↓
Dashboard (Epic 9)
```

**Critical Path:**
1. Foundation → Auth → Canvas → Elements → Publishing

**Parallel Tracks:**
- Projects & Pages can be built alongside Canvas
- Media Library can be built alongside Elements
- Properties Panel can be built as Elements are added

---

## Definition of Done

A story is considered DONE when:

- [ ] **Code Complete:** All code written and committed
- [ ] **Tests Pass:** Unit tests written and passing (if applicable)
- [ ] **Code Review:** PR reviewed and approved
- [ ] **Acceptance Criteria Met:** All AC checkboxes checked
- [ ] **No Critical Bugs:** No blocking bugs found
- [ ] **Deployed:** Code merged to main and deployed to dev/staging
- [ ] **Documentation:** README/docs updated if needed
- [ ] **Demo-able:** Feature can be shown in sprint demo

---

## Next Steps

1. **Review these stories** - Confirm scope and priorities
2. **Organize into sprints** - Use Sprint Planning document (next)
3. **Estimate team velocity** - Determine realistic sprint capacity
4. **Start Sprint 1!** - Begin with Foundation & Auth stories

---

**Document Status:** Ready for Sprint Planning
**Total Stories:** 73
**Total Story Points:** 299
**Prepared By:** Mary 📊 (Business Analyst)
**Next Document:** Sprint Planning & Schedule
