# Besto Container Industries — Industrial Packaging Portal & Blog Management System

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore_%26_Auth-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-Proprietary-F15A24.svg)]()

> A production-grade B2B web application and secure content management system built for **Besto Container Industries**, manufacturers and certified reconditioners of industrial steel barrels, plastic drums, and Intermediate Bulk Containers (IBCs) under the registered **BESTOSIA®** brand.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
  - [1. Public Industrial Website & Product Catalog](#1-public-industrial-website--product-catalog)
  - [2. Public Technical Blog & Knowledge Directory](#2-public-technical-blog--knowledge-directory)
  - [3. Secure Admin Blog Management System](#3-secure-admin-blog-management-system)
- [Image Handling Architecture](#image-handling-architecture)
- [Security & Content Sanitization](#security--content-sanitization)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Build for Production](#build-for-production)
  - [Linting & Type Checking](#linting--type-checking)
- [Configuration & Environment Setup](#configuration--environment-setup)
- [Firestore Database & Security Rules](#firestore-database--security-rules)
- [Brand & Quality Compliance](#brand--quality-compliance)

---

## Overview

**Besto Container Industries** is an industrial packaging provider operating an environmentally conscious Zero Liquid Discharge (ZLD) facility with Maharashtra Pollution Control Board (MPCB) authorization and ISO Quality Management System (QMS) certifications.

This application provides:
1. A **responsive corporate website** showcasing reconditioned and newly manufactured industrial containers with full technical specifications and direct Request for Quote (RFQ) workflows.
2. A **public technical blog** featuring search engine-friendly URLs, category filtering, reading time estimates, and rich industrial packaging guides.
3. A **protected administration portal (`#admin`)** powered by Firebase Authentication and Cloud Firestore for managing technical articles, categories, metadata, and imagery without requiring developer intervention.

---

## Key Features

### 1. Public Industrial Website & Product Catalog

- **Interactive Product Catalog (`#new-packaging`)**:
  - Filter by **Refurbished / Reconditioned (BESTOSIA®)**, **New Packaging**, and **Legacy Stewardship Services**.
  - Detailed product cards highlighting tare weights, dimensions, UN approvals (Drop test, Leakproofness test, Hydrostatic test), lining options, and closure types.
- **Product Detail Views (`#product/:id`)**:
  - Dedicated specifications table, industrial applications (chemical, pharmaceutical, lube, paints, food-grade).
  - Direct inquiry modal with automated product pre-selection.
- **Facility & Compliance Showcase (`#facility`)**:
  - Multi-stage chemical washing, high-temperature shot blasting, robotic internal lining, and hydrostatic testing documentation.
- **Corporate Transparency**:
  - Company background (`#about`), hazardous packaging decontamination (`#legacy-services`), and interactive contact forms (`#contact`).

### 2. Public Technical Blog & Knowledge Directory

- **Dedicated Public Route (`#blog`)**:
  - High-contrast Bootstrap 5-aligned industrial design using Besto's signature orange (`#F15A24`), dark slate, and clean neutrals.
  - Category filter tabs, keyword search bar, and automatic pagination for high article volumes.
- **Dedicated SEO-Friendly Article URLs (`#blog/:slug`)**:
  - Readable URL slugs (e.g. `#blog/un-drop-test-steel-barrels`).
  - Breadcrumbs, author information, publication dates, and social share links.
  - High-resolution featured cover images with automated fallback on broken external links.
  - Responsive inline figures supporting captions and alignments (center, full width, left/right wrapped).
  - Draft isolation: drafts and unpublished articles are strictly filtered out of public views and search results.

### 3. Secure Admin Blog Management System

Accessed via `#admin`:

- **Role-Based Authentication**:
  - Google Sign-In and Email authentication via Firebase Auth.
  - Verified against an authorized administrator allowlist (`santoshnavle2010@gmail.com`).
- **Dashboard Metrics**:
  - Real-time counters for Total Articles, Published Articles, Drafts, and Active Categories.
- **Article Lifecycle Operations**:
  - Create, edit, save as draft, publish immediately, unpublish, and delete with confirmation modals.
  - Filter articles by status (`published` / `draft`) and category.
- **Rich-Text Blog Editor**:
  - Live preview toggle with sanitized HTML rendering.
  - Formatting toolbar: Heading 2, Heading 3, Bold, Italic, Bullet Lists, Numbered Lists, Blockquotes, Links.
  - Editable auto-generated URL slug with conflict warnings.
  - Excerpt, author, keywords/tags, and SEO meta title/description inputs.
  - Unsaved changes browser guard (`beforeunload`).
- **Category Management**:
  - Add, edit, and delete categories with auto-slug generation.
  - Validation to prevent duplicate category names or slugs.
  - Safety checks before category deletion to prevent orphaned blog posts.

---

## Image Handling Architecture

The application supports dual image management workflows tailored for flexibility and reliability:

### Direct HTTPS Image URLs (Primary / Recommended)
- **Featured Image URL**: Admins can paste any direct HTTPS image link (e.g., Unsplash, Cloudinary, or corporate CDN).
- **Instant Preview**: Live image preview renders immediately as the URL is typed or pasted.
- **Replace URL Action**: 1-click **Replace URL** and **Clear Image** buttons allow instant modifications.
- **No Unnecessary Storage Calls**: URL entry operates independently and never triggers a Firebase Storage upload.
- **Body Image Insertion**: Toolbar button **"Insert Image URL"** opens a dedicated modal allowing inline image insertion at the editor's cursor position with configurable alignments and captions.
- **Inline Image Removal Strip**: A visual manager below the editor displays every image embedded in the article with a 1-click trash action to detach unwanted images without modifying raw HTML.

### Firebase Storage Uploads (Alternative)
- Supports selecting local files (`.jpg`, `.jpeg`, `.png`, `.webp`) up to 5 MB.
- Configured with a 15-second watchdog timer and automatic upload cancellation to eliminate infinite 0% hanging states if Cloud Storage is uninitialized.
- Retrieves the public download URL and stores it cleanly in Firestore.

---

## Security & Content Sanitization

- **Strict HTTPS Scheme Enforcement**:
  - The `validateHttpsUrl()` utility strictly accepts `https://` protocols and actively rejects `http://`, `javascript:`, `data:`, `vbscript:`, or `file:` schemes.
- **DOMPurify HTML Sanitization**:
  - Rich HTML content is sanitized before rendering in both live preview and public article views.
  - Configured with `ALLOWED_URI_REGEXP: /^(?:(?:https|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i` to prevent XSS injection.
  - Whitelisted safe tags: `h1`-`h6`, `p`, `span`, `strong`, `em`, `ul`, `ol`, `li`, `blockquote`, `code`, `a`, `img`, `figure`, `figcaption`, `div`, `table`.
- **Graceful Error Fallbacks**:
  - All public `<img>` tags implement `onError` handlers that seamlessly fall back to high-resolution packaging imagery if an external host is unavailable.
- **Firestore Security Rules**:
  - Read access on published posts and categories is public.
  - Create, update, and delete access requires an authenticated Firebase session matching authorized admin credentials.

---

## Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | React 19 | Component-based UI with hooks & functional architecture |
| **Language** | TypeScript 5.7 | Static typing, interface definitions, and compile-time safety |
| **Build Tool** | Vite 8 | Fast development server and optimized production bundling |
| **Styling** | Tailwind CSS 4 | Utility-first responsive styling with industrial orange branding |
| **Icons** | Lucide React | High-contrast industrial and navigation iconography |
| **Database** | Firebase Cloud Firestore | Persistent NoSQL storage for articles and categories |
| **Authentication** | Firebase Authentication | Admin sign-in (Google OAuth & Email credentials) |
| **Storage** | Firebase Cloud Storage | Optional file asset hosting |
| **Security / Sanitizer** | DOMPurify | XSS prevention for user-authored rich-text HTML |

---

## Project Structure

```text
├── .env.example                  # Environment variable reference
├── firebase-applet-config.json   # Firebase client connection credentials
├── firestore.rules               # Firestore security and access control rules
├── index.html                    # Application entry point with SEO metadata
├── metadata.json                 # AI Studio project configuration
├── package.json                  # NPM scripts and project dependencies
├── public/
│   ├── images/                   # Static assets, branding logo & packaging photos
│   └── favicon.ico
├── src/
│   ├── App.tsx                   # Main router, navigation state & modal controllers
│   ├── main.tsx                  # React DOM mount
│   ├── index.css                 # Global styles & Tailwind imports
│   ├── types.ts                  # Shared TypeScript interfaces (BlogPost, Category, Product)
│   ├── components/
│   │   ├── Header.tsx            # Industrial navbar with active page states & CTA
│   │   ├── Footer.tsx            # Corporate footer with certifications & links
│   │   ├── BlogEditor.tsx        # Rich-text blog editor with URL & upload image managers
│   │   ├── AdminLoginModal.tsx   # Firebase authentication modal
│   │   ├── ProductDetailModal.tsx# Technical specs & UN test modal
│   │   └── EnquiryModal.tsx      # RFQ quote request form
│   ├── pages/
│   │   ├── HomePage.tsx          # Homepage with BESTOSIA® advantage & trust metrics
│   │   ├── NewPackagingPage.tsx  # Product catalog with category filter tabs
│   │   ├── ProductDetailPage.tsx # Deep-dive product specifications
│   │   ├── FacilityPage.tsx      # Automated reconditioning facility showcase
│   │   ├── AboutPage.tsx         # Corporate history, leadership & sustainability
│   │   ├── LegacyServicesPage.tsx# Drum decontamination & toll services
│   │   ├── ContactPage.tsx       # Factory location, phone, email & RFQ form
│   │   ├── BlogPage.tsx          # Public blog directory with search & pagination
│   │   ├── BlogPostDetailPage.tsx# Full technical article view with sanitized HTML
│   │   └── AdminBlogPage.tsx     # Admin dashboard for article and category management
│   ├── services/
│   │   └── blogService.ts        # Firestore CRUD queries & storage upload helpers
│   ├── lib/
│   │   └── firebase.ts           # Firebase app, db, auth, and storage initialization
│   └── data/
│       ├── products.ts           # Industrial container catalog data
│       └── company.ts            # Corporate details, addresses, and certifications
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **NPM**: v9.0.0 or higher

### Installation

Clone the repository and install the project dependencies:

```bash
git clone https://github.com/<your-username>/besto-container-industries.git
cd besto-container-industries
npm install
```

### Development Server

Start the local development server:

```bash
npm run dev
```

The app will be accessible at:
```text
http://localhost:3000
```

### Build for Production

Compile and bundle the application for production deployment:

```bash
npm run build
```

The production assets will be output to the `dist/` directory. You can preview the production build locally with:

```bash
npm run preview
```

### Linting & Type Checking

Validate TypeScript types across the entire codebase:

```bash
npm run lint
```

---

## Configuration & Environment Setup

Copy `.env.example` to create your local `.env` file if backend proxies or AI integrations are needed:

```bash
cp .env.example .env
```

Firebase credentials are configured in `firebase-applet-config.json`:

```json
{
  "projectId": "learned-sunbeam-dcb1c",
  "appId": "1:6485081311:web:b4be7ffa5050e3d257fd6a",
  "apiKey": "AIzaSyBkKBBk1FU9bDn6YEH-1Ejnot87_04Qnlc",
  "authDomain": "learned-sunbeam-dcb1c.firebaseapp.com",
  "firestoreDatabaseId": "ai-studio-bestocontainerin-2a7f017b-4e60-4b25-8e30-2d13bba15a32",
  "storageBucket": "learned-sunbeam-dcb1c.firebasestorage.app"
}
```

---

## Firestore Database & Security Rules

The application uses two primary Firestore collections:

1. `blog_posts`:
   - `title`, `slug`, `excerpt`, `content` (HTML), `coverImageUrl`, `imageAlt`, `category`, `tags`, `author`, `authorEmail`, `seoTitle`, `seoDescription`, `status` (`published` / `draft`), `publishedAt`, `createdAt`, `updatedAt`.
2. `blog_categories`:
   - `name`, `slug`, `description`, `createdAt`, `updatedAt`.

Security rules (`firestore.rules`) enforce:
- **Public Read**: Anyone can read categories and articles where `status == 'published'`.
- **Admin Write**: Only authenticated administrators can create, update, or delete posts and categories.

---

## Brand & Quality Compliance

- **Primary Brand Color**: `#F15A24` (Besto Industrial Orange)
- **Secondary Accent**: `#F7941D` (Warm Amber)
- **Surface Neutrals**: `#FAF9F6` (Off-white), `#FFFFFF` (Pure White), `#0F172A` (Deep Slate)
- **Registered Trademark**: **BESTOSIA®** — Quality Reconditioned Packaging
- **Certifications**: ISO 9001:2015 QMS, MPCB Zero Liquid Discharge (ZLD) Authorized.

---

## License

Copyright © Besto Container Industries. All rights reserved.
Proprietary industrial packaging platform and content management system.
