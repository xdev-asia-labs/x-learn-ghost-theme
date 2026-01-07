# X-Learn Ghost Theme

A modern, feature-rich Ghost theme designed for online learning platforms with built-in course and lesson management.

## Features

- 🎓 **Course Management** - Dynamic course and lesson system with AJAX loading
- � **Showcase** - Display projects and libraries portfolio
- �📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🎨 **Dark Mode** - Built-in dark mode support
- 🔍 **SEO Optimized** - Structured data and meta tags
- ⚡ **Fast Loading** - Optimized assets and lazy loading
- 🌐 **Multi-language** - i18n support with translation files

## Installation

1. Upload the theme to your Ghost installation:

   ```bash
   # Copy theme to Ghost content/themes directory
   cp -r x-learn-ghost-theme /path/to/ghost/content/themes/
   ```

2. Restart Ghost:

   ```bash
   ghost restart
   ```

3. Activate the theme in Ghost Admin:
   - Go to **Settings → Design**
   - Select **X-Learn Ghost Theme**
   - Click **Activate**

## Setup Content API Key

The theme uses Ghost Content API to dynamically load course lessons. You need to create an API key:

### Initial Setup

1. Copy the example config file to your Ghost root directory:

   ```bash
   cp config.example.json ../../../../config.development.json
   ```

2. Update Ghost's config file with your settings (database, mail, etc.)

3. Configure the Content API key for dynamic lesson loading (see below)

### Configure Content API Key

This theme uses AJAX to dynamically load course lessons. You need to configure the Ghost Content API key via **Code Injection**.

#### Step 1: Create Custom Integration

1. Go to <http://localhost:2368/ghost/#/settings/integrations>
2. Click **Add custom integration**
3. Name it: `Theme API` (or any name you prefer)
4. Copy the **Content API Key** (e.g., `1f06b81ddee9f42ffca580be1b`)

#### Step 2: Add to Code Injection

1. Go to **Settings → Code Injection** (<http://localhost:2368/ghost/#/settings/code-injection>)
2. In the **Site Header** section, add:

   ```html
   <script>
     window.ghostConfig = {
       apiKey: 'YOUR_CONTENT_API_KEY_HERE'
     };
   </script>
   ```

3. Replace `YOUR_CONTENT_API_KEY_HERE` with the key you copied in Step 1
4. Click **Save**

#### How It Works

- The theme's course and lesson pages use AJAX to fetch lesson lists from the Ghost Content API
- The API key is read from `window.ghostConfig.apiKey` in JavaScript
- If no key is configured, you'll see "Không thể tải danh sách bài học" (Cannot load lesson list)

### Security Notes

⚠️ **Important:**

- Content API keys are **read-only** and safe to expose in client-side code
- Never use Admin API keys in Code Injection (they have write access)
- The key is only used to fetch published posts via the Content API
- For production, create a separate integration for better tracking

## Import Demo Content

1. Go to <http://localhost:2368/ghost>
2. Navigate to **Settings → Labs → Import content**
3. Select `content/themes/xdev-learn/demo_content/demo-2025-09-29-12-28-24.json`

## Theme

Custom theme: `x-learn-ghost-theme` located in `content/themes/x-learn-ghost-theme/`

### Course & Lesson System

The theme uses a tagging system for courses and lessons:

**For Courses:**

- Tag with `hash-course` (required)
- Tag with `hash-course-id-X` where X is a unique number (e.g., `hash-course-id-1`, `hash-course-id-2`)

**For Lessons:**

- Tag with `hash-lesson` (required)
- Tag with the same `hash-course-id-X` as the parent course

**For Showcase (Projects/Libraries):**

- Tag with `hash-showcase` (required)
- Add project details in post content
- Use custom fields for tech stack, external links

**Example:**

```
Course: PostgreSQL HA
Tags: hash-course, hash-course-id-1

Lesson 1: Introduction to PostgreSQL HA
Tags: hash-lesson, hash-course-id-1

Lesson 2: Setup Patroni
Tags: hash-lesson, hash-course-id-1

Project: My Awesome Library
Tags: hash-showcase
```

The lessons will be automatically loaded via AJAX when viewing the course page. Showcase items will be displayed on the `/showcase/` page with the first item featured.

## Development

### Local Setup

```bash
# Navigate to theme directory
cd content/themes/x-learn-ghost-theme

# Install dependencies (if any)
npm install

# Watch for changes (if using build tools)
npm run dev
```

### File Structure

```
x-learn-ghost-theme/
├── assets/
│   ├── css/           # Compiled CSS
│   ├── js/            # JavaScript files
│   └── images/        # Theme images
├── partials/          # Handlebars partials
├── locales/           # Translation files
├── custom-course-layout.hbs    # Course page template
├── showcase.hbs       # Showcase page template
├── custom-lesson-layout.hbs    # Lesson page template
├── index.hbs          # Home page template
├── package.json       # Theme metadata
└── README.md          # This file
```

### Customization

1. **Styling**: Modify `assets/css/` files or use Tailwind CSS classes
2. **Templates**: Edit `.hbs` files for layout changes
3. **Translations**: Update files in `locales/` directory
4. **API Key**: Update in `custom-course-layout.hbs` line ~54

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

For issues and questions:

- GitHub Issues: <https://github.com/xdev-asia-labs/x-learn-ghost-theme/issues>
- Documentation: <https://xdev.asia/docs>
