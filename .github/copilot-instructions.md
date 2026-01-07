# xDev Learn Ghost Theme - AI Agent Instructions

## Project Overview
A Ghost CMS theme (v6.0+) for educational platforms, built with Tailwind CSS 3.4 and Handlebars templates. Focus: online courses, blog posts, and multi-language learning content.

## Architecture & Content Model

### Tag-Based Content Classification
Ghost uses **internal tags** (prefixed with `hash-`) to classify content types:
- `hash-course` - Course posts (filtered in `/courses/` collection)
- `hash-lesson` - Individual lesson posts (filtered in `/lesson/` collection)
- `hash-blog` - Blog articles (filtered in `/blog/` collection)
- `hash-showcase` - Projects/libraries showcase (filtered in `/showcase/` collection)
- `hash-course-id-{N}` - Links lessons to specific courses (e.g., `hash-course-id-1`)

**Key Pattern**: Always filter content using these tags in `{{#get}}` helpers:
```handlebars
{{!-- Get only blog posts --}}
{{#get "posts" filter="tag:-[hash-course, hash-lesson]"}}

{{!-- Get lessons for a course --}}
{{#get "posts" filter="tag:hash-course-id-1+tag:hash-lesson"}}

{{!-- Get showcase projects --}}
{{#get "posts" filter="tag:hash-showcase"}}
```

### Custom Routes (`routes.yaml`)
- `/courses/` → Shows posts tagged `hash-course`
- `/lesson/` → Shows posts tagged `hash-lesson`
- `/blog/` → Shows posts tagged `hash-blog`
- `/showcase/` → Shows posts tagged `hash-showcase` (projects/libraries)
- Root `/` → Index page

## Template Hierarchy

### Main Layouts
- `default.hbs` - Base layout with header/footer, dark mode script (runs before render)
- `index.hbs` - Homepage: `{{> top-authors}}` → `{{> latest-courses}}` → `{{> latest-articles}}`
- `custom-course-layout.hbs` - Course detail page with lesson list
- `custom-lesson-layout.hbs` - Individual lesson with prev/next navigatio
- `showcase.hbs` - Projects/libraries showcase with featured item + grid layoutn, TOC
- `post.hbs` - Blog post with social share, recent posts, related content

### Key Partials
- `partials/cards/` - Reusable card components (no style parameters needed)
  - `card-post.hbs` - Glass-morphism post card with author overlay
  - `card-showcase.hbs` - Purple-themed project card with tech stack tags and external link
  - `card-course.hbs` - Course card with lesson count badge
  - `card-author.hbs` - Author profile card
- `partials/top-authors.hbs` - Featured author section (displays top 1 author)
- `partials/latest-courses.hbs` - Course grid (limit 12)
- `partials/latest-articles.hbs` - Article grid (limit 18)

**Important**: All card styles are hardcoded. No `{{#match style}}` conditionals exist anymore.

## Development Workflow

### Build Commands
```bash
npm run build  # Build minified Tailwind CSS → assets/css/app.min.css
npm run watch  # Watch mode for development
npm run dev    # Build + watch
```

### Development Testing Protocol
**MANDATORY**: After any code changes, MUST test using MCP Chrome before committing:
1. Build the theme: `npm run build`
2. Activate MCP Chrome tools if not already active
3. Test at `http://localhost:2368` (ensure Ghost is running)
4. Required test pages:
   - Homepage (`/`) - Verify top authors, latest courses, latest articles
   - Courses index (`/courses/`) - Verify course grid displays correctly
   - Course detail page - Verify lesson list, navigation, breadcrumbs
   - Blog index (`/blog/`) - Verify article grid displays correctly
   - Blog post detail - Verify content, social share, related posts
   - Lesson page - Verify TOC, prev/next navigation, breadcrumbs
   - Author page - Verify author info, courses, posts
5. Take snapshot/screenshot to verify no visual regressions
6. Check dark mode toggle functionality
7. Verify all interactive elements (navigation, dropdowns, copy buttons)

### CSS Architecture
- Source: `assets/css/tailwind.css`
- Output: `assets/css/app.min.css`
- Config: `tailwind.config.js` (uses Be Vietnam Pro font)

**CRITICAL**: Theme uses **Tailwind CSS 3.4.18**. DO NOT upgrade to v4.x+ due to missing CLI binary bug (GitHub issues #16879, #17620). Version 4+ packages lack the `tailwindcss` executable, breaking all build systems. Always use `tailwindcss: ^3.4.18` in package.json.
- Additional: `liquid-glass.css` (glass-morphism effects), `prism.css` (syntax highlighting)

### JavaScript
- `assets/js/app.js` - Main script (dark mode toggle, navigation)
- `assets/js/code-copy.js` - Copy button for code blocks
- `assets/js/prism.js` - Syntax highlighting (MIT licensed)
- `assets/js/tocbot.min.js` - Auto-generate table of contents
- `assets/js/topics-swiper.js` - Course slider (Swiper.js integration)

## Multi-Language Support
Translation files in `locales/` (vi, en, ja, zh). Use kebab-case keys:
```handlebars
{{t "latest-courses"}}  {{!-- Translates based on @site.locale --}}
```

## Critical Implementation Details

### Dark Mode
Inline script in `default.hbs` runs **before render** to prevent flash:
```javascript
if (localStorage.getItem('color-theme') === 'dark' || 
    (!('color-theme' in localStorage) && 
     window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
}
```

### Ghost Branding Removal
Critical CSS in `<head>` hides Ghost "Powered by" links:
```css
.gh-portal-powered, .gh-powered-by, [data-testid="powered-by-ghost"] {
  display: none !important;
  position: absolute !important;
  left: -9999px !important;
}
```

### Image Optimization
`package.json` defines responsive image sizes (xs: 150px → xxl: 2000px). Use in templates:
```handlebars
{{img_url feature_image size="m"}}  {{!-- 720px width --}}
```

## Configuration Notes

### No Custom Settings
**Removed** all `@custom.*` theme settings from `package.json`. Theme now uses:
- Fixed layouts (no style selectors)
- Hardcoded display logic (always show latest courses, always enable social share)

### What to Preserve
- License: MIT (keep credits to xDev Asia)
- Dependencies: Tailwind CSS, Swiper, Prism.js, AOS (animation library)
- Font: Be Vietnam Pro (preloaded from Google Fonts)

## Common Patterns

### Filtering Content
```handlebars
{{!-- Exclude all special content types --}}
filter="tag:-[hash-course, hash-lesson, hash-showcase]"

{{!-- Get specific course's lessons --}}
filter="tag:hash-course-id-1+tag:hash-lesson"

{{!-- Combined filters --}}
filter="authors:{{slug}}+tag:hash-course"

{{!-- Get showcase projects --}}
filter="tag:hash-showcalesson"

{{!-- Combined filters --}}
filter="authors:{{slug}}+tag:hash-course"
```

### Breadcrumbs
Always use `{{> breadcrumb}}` partial on detail pages (auto-generates from slug/tags).

### Related Content
Use `tags:[{{post.tags}}]+id:-{{post.id}}` pattern to find related posts excluding current.

## Testing Checklist
**CRITICAL**: Always run MCP Chrome browser tests after any changes. Never commit without testing.

### MCP Chrome Test Protocol
```bash
# 1. Start Ghost (if not running)
ghost start

# 2. Build theme
npm run build

# 3. Use MCP Chrome tools to test
```

### Required Tests
- [ ] **Homepage** - `mcp_chrome-devtoo_navigate_page` to `/`
  - [ ] Top authors section displays (1 author with rotating rings)
  - [ ] Latest courses grid loads (12 courses max)
  - [ ] Latest articles grid loads (18 posts max)
  - [ ] Dark mode toggle works without flash
- [ ] **Courses Index** - Navigate to `/courses/`
  - [ ] Course cards display with lesson count badges
  - [ ] Glass-morphism effects render correctly
  - [ ] Filter/search functionality works
- [ ] **Course Detail** - Open any course post
  - [ ] Lesson list displays in correct order
  - [ ] Breadcrumbs show correct path
  - [ ] Course info sidebar renders
  - [ ] Related courses section appears
- [ ] **Blog Index** - Navigate to `/blog/`
  - [ ] Blog post cards display (excludes courses/lessons)
  - [ ] Pagination works if >18 posts
  - [ ] Author avatars load correctly
- [ ] **Showcase Index** - Navigate to `/showcase/`
  - [ ] First project displays as featured (full-width layout)
  - [ ] Remaining projects display in grid (3 columns)
  - [ ] Purple theme consistent with design system
  - [ ] Tech stack tags render correctly
  - [ ] External links open in new tabs
- [ ] **Post Detail** - Open any blog post
  - [ ] Social share buttons functional (Facebook, Twitter, LinkedIn)
  - [ ] Code copy buttons work on syntax blocks
  - [ ] Related posts section displays
  - [ ] Recent posts sidebar loads
- [ ] **Lesson Page** - Navigate to any lesson
  - [ ] Table of contents generates automatically
  - [ ] Prev/next lesson navigation works
  - [ ] Breadcrumbs include course → lesson path
- [ ] **Author Page** - Navigate to any author
  - [ ] Author bio and avatar display
  - [ ] Author's courses filter correctly (`tag:hash-course`)
  - [ ] Author's posts filter correctly (exclude courses/lessons)
- [ ] **Cross-Page Tests**
  - [ ] All image sizes load correctly (check srcset)
  - [ ] Multi-language strings render (if `@site.locale` changed)
  - [ ] No Ghost branding visible in portal/footer
  - [ ] Mobile responsive (use `mcp_chrome-devtoo_resize_page`)

### Verification Commands
```handlebars
{{!-- Take snapshot to verify structure --}}
mcp_chrome-devtoo_take_snapshot

{{!-- Take full-page screenshot --}}
mcp_chrome-devtoo_take_screenshot fullPage=true

{{!-- Check console for errors --}}
mcp_chrome-devtoo_list_console_messages (requires activation)
```

## Files to Never Modify
- `node_modules/` (managed by npm)
- `demo_content/` (Ghost export sample)
- `.git/` (version control)
