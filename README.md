# X-Learn Ghost Theme

A modern, feature-rich Ghost theme designed for online learning platforms with built-in course and lesson management.

## Features

- 🎓 **Course Management** - Dynamic course and lesson system with AJAX loading
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
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

3. The `config.development.json` file should be git-ignored for security. Never commit it to the repository.

### Method 1: Via Ghost Admin (Recommended)

1. Go to <http://localhost:2368/ghost>
2. Navigate to **Settings → Integrations**
3. Click **Add custom integration**
4. Name it: `Course Lessons Loader`
5. Copy the **Content API Key**
6. Add it to your config file (`config.development.json`):

   ```json
   {
     ...
     "theme": "x-learn-ghost-theme",
     "contentApiKey": "YOUR_API_KEY_HERE"
   }
   ```

### Method 2: Via Database (Quick Setup)

Run this command to create an API key automatically:

```bash
# Generate and insert API key into database
sqlite3 content/data/ghost-local.db << 'EOF'
-- Create custom integration
INSERT INTO integrations (id, type, name, slug, created_at, updated_at)
VALUES ('a1b2c3d4e5f647890000', 'custom', 'Course Lessons Loader', 'course-lessons-loader', datetime('now'), datetime('now'));

-- Create Content API key
INSERT INTO api_keys (id, type, secret, integration_id, created_at, updated_at)
VALUES ('k1l2m3n4o5p647890000', 'content', 'GENERATED_KEY_HERE', 'a1b2c3d4e5f647890000', datetime('now'), datetime('now'));

-- Display the API key
SELECT 'API Key: ' || secret FROM api_keys WHERE id = 'k1l2m3n4o5p647890000';
EOF
```

Replace `GENERATED_KEY_HERE` with a random 26-character hex string. Generate one with:

```bash
node -e "console.log(require('crypto').randomBytes(13).toString('hex'))"
```

Then add the key to `config.development.json`:

```json
{
  ...
  "contentApiKey": "GENERATED_KEY_HERE"
}
```

**Current Setup:** API key `1f06b81ddee9f42ffca580be1b` is already configured in both database and `config.development.json`

### Security Notes

⚠️ **Important:**

- `config.development.json` and `config.production.json` are git-ignored
- Never commit real API keys to the repository
- Use `config.example.json` as a template for new setups
- For production, use environment variables or secure vault services

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

**Example:**

```
Course: PostgreSQL HA
Tags: hash-course, hash-course-id-1

Lesson 1: Introduction to PostgreSQL HA
Tags: hash-lesson, hash-course-id-1

Lesson 2: Setup Patroni
Tags: hash-lesson, hash-course-id-1
```

The lessons will be automatically loaded via AJAX when viewing the course page.

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
