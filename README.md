# 🎓 X-Learn Ghost Theme

A modern, feature-rich Ghost theme designed for online courses, learning platforms, and educational content. Built with Tailwind CSS, featuring a beautiful glass-morphism design, dark mode support, and multi-language capabilities.

![Ghost Version](https://img.shields.io/badge/Ghost-6.0%2B-blue)
![License](https://img.shields.io/badge/license-CC--BY--NC--ND--4.0-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![CI/CD](https://github.com/xdev-asia-labs/x-learn-ghost-theme/workflows/CI%2FCD%20Pipeline/badge.svg)
![Release](https://img.shields.io/github/v/release/xdev-asia-labs/x-learn-ghost-theme)

## ✨ Features

### 🎨 Design & UI

- **Glass-morphism Design** - Modern glassmorphic cards with frosted glass effects
- **Dark Mode Support** - Auto-detection based on system preference with manual toggle
- **Responsive Layout** - Fully responsive design for all devices
- **Animated UI** - Smooth animations and transitions throughout
- **Cyber Grid Background** - Dynamic grid pattern in dark mode
- **Custom 404 Page** - Beautiful error page with gradient text and animations

### 📚 Course Management

- **Course Layouts** - Dedicated templates for courses and lessons
- **Lesson Navigation** - Previous/Next lesson navigation
- **Table of Contents** - Auto-generated TOC for lessons
- **Course Progress** - Mark lessons as complete/incomplete
- **Related Lessons** - Display related content
- **Course Topics Filter** - Filter courses by topics
- **Featured Courses** - Highlight important courses

### 🌍 Multi-Language Support

- **4 Languages Included**:
  - 🇻🇳 Vietnamese (vi.json)
  - 🇬🇧 English (en.json)
  - 🇯🇵 Japanese (ja.json)
  - 🇨🇳 Chinese (zh.json)
- **Easy to Extend** - Add more languages by creating new JSON files
- **Kebab-case Keys** - Clean and maintainable translation keys

### 💻 Developer Features

- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Syntax Highlighting** - Prism.js for code blocks
- **Code Copy Button** - One-click code copying
- **Swiper Integration** - Modern touch slider
- **Newsletter Widget** - Built-in subscription form
- **Social Sharing** - Share posts on social media
- **Breadcrumb Navigation** - Improved navigation
- **Search Integration** - Ghost's native search support

### 🎯 Content Types

- **Blog Posts** - Standard blog layout
- **Courses** - Full course management
- **Lessons** - Individual lesson pages
- **Author Pages** - Author profile and content listing
- **Tag Pages** - Content filtering by tags
- **Custom Pages** - Flexible page templates

### 🔧 Technical Features

- **No Gulp** - Simple Node.js build scripts
- **Custom Fonts** - Be Vietnam Pro font family
- **Icon System** - SVG icons with custom partials
- **Portal Customization** - Hidden Ghost branding
- **Lazy Loading** - Optimized image loading
- **SEO Optimized** - Proper meta tags and Open Graph
- **Performance First** - Minified CSS and optimized assets

## 🚀 Quick Start

### Installation

1. Download or clone this repository
2. Upload to your Ghost installation's `content/themes` directory
3. Restart Ghost
4. Activate the theme in Ghost Admin

```bash
# Navigate to your Ghost themes directory
cd /path/to/ghost/content/themes

# Clone the theme
git clone https://github.com/xdev-asia-labs/x-learn-ghost-theme.git

# Navigate to theme directory
cd x-learn-ghost-theme

# Install dependencies
npm install
```

### Development

This theme uses pre-compiled CSS and doesn't require a build step. Simply install and activate.

```bash
# Install dependencies (optional - only needed for development tools)
npm install

# Test theme compatibility
npm test

# Create zip for distribution
npm run zip
```

### Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install development dependencies |
| `npm run build` | Build Tailwind CSS (production) |
| `npm run watch` | Watch and rebuild CSS (development) |
| `npm run dev` | Build + watch mode |
| `npm test` | Run GScan theme validator |
| `npm run zip` | Create distribution zip file |

### Creating a Release

See [Release Instructions](docs/RELEASE.md) for detailed steps.

```bash
# Quick release (automated)
./scripts/release.sh 1.0.1

# This will:
# 1. Run all tests and validations
# 2. Update version in package.json
# 3. Update CHANGELOG.md
# 4. Create and push git tag
# 5. Trigger GitHub Actions to create release
```

## 📁 File Structure

```
xdev-learn/
├── assets/
│   ├── css/
│   │   ├── app.min.css           # Main compiled CSS
│   │   ├── aos.css               # Animation library
│   │   ├── ghost.typofix.css     # Typography fixes
│   │   ├── liquid-glass.css      # Glass-morphism styles
│   │   ├── prism.css             # Code highlighting
│   │   ├── tailwind.css          # Tailwind utilities
│   │   └── tocbot.css            # Table of contents
│   ├── js/
│   │   ├── app.js                # Main JavaScript
│   │   ├── code-copy.js          # Copy code functionality
│   │   ├── dropdown-navigation.js
│   │   ├── prism.js              # Syntax highlighting
│   │   ├── tocbot.min.js         # TOC generator
│   │   └── topics-swiper.js      # Course slider
│   └── images/                   # Theme images
├── partials/
│   ├── cards/
│   │   ├── card-author.hbs       # Author card
│   │   ├── card-course.hbs       # Course card
│   │   └── card-post.hbs         # Post card
│   ├── icons/                    # SVG icon partials
│   ├── breadcrumb.hbs            # Breadcrumb navigation
│   ├── footer.hbs                # Footer component
│   ├── header.hbs                # Header & navigation
│   ├── hero-section.hbs          # Homepage hero
│   ├── latest-articles.hbs       # Article list
│   ├── latest-courses.hbs        # Course list
│   ├── newsletter.hbs            # Newsletter form
│   └── ...                       # More partials
├── locales/
│   ├── vi.json                   # Vietnamese
│   ├── en.json                   # English
│   ├── ja.json                   # Japanese
│   └── zh.json                   # Chinese
├── demo_content/
│   └── README.md                 # Demo setup guide
├── default.hbs                   # Main layout
├── index.hbs                     # Homepage
├── post.hbs                      # Blog post layout
├── custom-course-layout.hbs      # Course page
├── custom-lesson-layout.hbs      # Lesson page
├── error-404.hbs                 # 404 page
├── author.hbs                    # Author page
├── tag.hbs                       # Tag page
├── page.hbs                      # Page template
├── blog.hbs                      # Blog index
├── courses.hbs                   # Courses index
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind config
├── routes.yaml                   # Custom routes
└── LICENSE                       # CC BY-NC-ND 4.0
```

## 🎨 Customization

### Adding New Languages

1. Create a new locale file in `locales/` (e.g., `fr.json`)
2. Copy the structure from `en.json`
3. Translate all values (keep keys unchanged)
4. Set the language in Ghost Admin > Settings > General > Publication language
5. Restart Ghost

**Note**: This theme is provided as-is under CC BY-NC-ND 4.0 license. Modifications are not permitted for redistribution. For custom modifications, please contact <duy@xdev.asia> for commercial licensing.

## 🔧 Configuration

### Ghost Settings

Configure these in **Ghost Admin > Settings**:

1. **Publication Language**: Set to `vi`, `en`, `ja`, or `zh`
2. **Publication Title**: Your site name (used in footer copyright)
3. **Navigation**: Configure main menu items
4. **Social Accounts**: Add Facebook, Twitter, LinkedIn links
5. **Code Injection**:
   - Add Google Analytics
   - Add custom tracking scripts

### Routes

The theme includes a `routes.yaml` file for custom routing:

- `/courses/` - Course listing page
- `/blog/` - Blog posts page

## 📚 Usage Guide

### Demo Content

For a complete setup guide with sample content structure, see:

- **[demo_content/README.md](demo_content/README.md)** - Step-by-step guide to create demo courses, lessons, and blog posts

### Understanding Content Architecture

This theme uses **internal tags** (prefixed with `hash-`) to classify content types in Ghost:

| Tag | Purpose | Example |
|-----|---------|---------|
| `hash-course` | Marks a post as a course | Course overview pages |
| `hash-lesson` | Marks a post as a lesson | Individual lesson content |
| `hash-blog` | Marks a post as a blog article | Regular blog posts |
| `hash-course-id-{N}` | Links lessons to a specific course | `hash-course-id-1`, `hash-course-id-react` |

**Important**: Internal tags starting with `hash-` are hidden from readers but used by the theme to organize content.

---

### 📖 Creating a Course

Follow these steps to create a complete course:

#### Step 1: Create the Course Post

1. Go to **Ghost Admin > Posts > New Post**
2. Write your course title (e.g., "Complete React.js Course")
3. Add course description and overview content
4. Upload a feature image

#### Step 2: Add Required Tags

Add these tags in the **Tags** section:

- **Primary Tag**: Add a regular tag for the course topic (e.g., `React`, `JavaScript`, `Web Development`)
- **Internal Tags** (these will be hidden from readers):
  - `hash-course` - Identifies this as a course
  - `hash-course-id-{unique-id}` - Unique identifier for this course
    - Example: `hash-course-id-1`, `hash-course-id-react`, `hash-course-id-python-basics`
    - Use lowercase and hyphens only
    - This ID will link all lessons to this course

**Example Tags for a React Course:**

```
Regular tags: React, JavaScript, Frontend
Internal tags: hash-course, hash-course-id-react
```

#### Step 3: Set the Template

1. In the post editor, click the **Settings** gear icon (⚙️)
2. Scroll to **Post template**
3. Select **"Course Layout"** from the dropdown

#### Step 4: Publish

1. Click **Publish** or **Update** to save your course
2. Your course will now appear at `/courses/` route

#### What You Get

- Course card with glass-morphism design
- Lesson count badge
- Automatic lesson listing
- Related courses section
- Breadcrumb navigation

---

### 📝 Creating Lessons

Lessons belong to a course and are linked via the `hash-course-id-{N}` tag.

#### Step 1: Create the Lesson Post

1. Go to **Ghost Admin > Posts > New Post**
2. Write your lesson title (e.g., "React Hooks - useState")
3. Add lesson content with code examples, explanations, etc.
4. Upload a feature image

#### Step 2: Add Required Tags

Add these tags to link the lesson to its course:

- **Primary Tag**: Use the same topic tag as the parent course (e.g., `React`)
- **Internal Tags**:
  - `hash-lesson` - Identifies this as a lesson
  - `hash-course-id-{same-as-course}` - MUST match the parent course's ID
    - If your course uses `hash-course-id-react`, use the same tag here

**Example Tags for a React Lesson:**

```
Regular tags: React, Hooks
Internal tags: hash-lesson, hash-course-id-react
```

#### Step 3: Set the Template

1. Click **Settings** gear icon (⚙️)
2. Select **"Lesson Layout"** from **Post template**

#### Step 4: Set Lesson Order (Optional)

To control lesson order in the course:

1. Use **Published at** date to order lessons
2. Earlier dates appear first in the course
3. Or manually sort in Ghost Admin

#### Step 5: Publish

Click **Publish** to add the lesson to your course.

#### What You Get

- Auto-generated Table of Contents (TOC)
- Previous/Next lesson navigation
- Breadcrumb showing: Home > Course > Lesson
- Related lessons section
- Code syntax highlighting
- Copy button for code blocks

---

### 📰 Creating Blog Posts

Blog posts are regular articles separate from courses and lessons.

#### Step 1: Create the Post

1. Go to **Ghost Admin > Posts > New Post**
2. Write your post title
3. Add content, images, and formatting
4. Upload a feature image

#### Step 2: Add Tags

- **Regular Tags**: Add topic tags (e.g., `Technology`, `Tutorial`, `News`)
- **Internal Tag**: `hash-blog` - Identifies this as a blog post

**Example Tags for a Blog Post:**

```
Regular tags: Web Development, Tips, JavaScript
Internal tags: hash-blog
```

#### Step 3: Template (Optional)

The default **post.hbs** template works for blog posts. No need to change it unless you want a custom layout.

#### Step 4: Publish

Click **Publish** to make your post live.

#### Where It Appears

- `/blog/` route - Blog post listing page
- Homepage - "Latest Articles" section (shows 18 most recent)
- Author page - Under the author's posts
- Tag pages - Under relevant tags

**Note**: Blog posts are automatically excluded from `/courses/` and lesson listings.

---

### 🏠 Homepage Content

The homepage (`index.hbs`) automatically displays:

1. **Top Authors Section** - Shows the most active author with rotating rings animation
2. **Latest Courses** - Displays up to 12 most recent courses (tagged with `hash-course`)
3. **Latest Articles** - Displays up to 18 most recent blog posts (tagged with `hash-blog`)

**No configuration needed** - Content appears automatically based on tags.

---

### 🔗 Custom Routes

The theme uses `routes.yaml` for custom URL structure:

| Route | Shows | Filter |
|-------|-------|--------|
| `/` | Homepage | Featured content |
| `/courses/` | All courses | Posts tagged `hash-course` |
| `/lesson/` | All lessons | Posts tagged `hash-lesson` |
| `/blog/` | Blog posts | Posts tagged `hash-blog` |

---

### 🌍 Multi-Language Content

#### Setting the Site Language

1. Go to **Ghost Admin > Settings > General**
2. Scroll to **Publication Language**
3. Enter one of: `vi` (Vietnamese), `en` (English), `ja` (Japanese), `zh` (Chinese)
4. Click **Save**

All UI text (buttons, labels, navigation) will automatically use the correct translation.

#### Creating Multi-Language Content

**Option 1: Single Language Site**

- Set one language and create all content in that language
- Easiest for most users

**Option 2: Multi-Language Site**

- Create separate posts for each language
- Use tags to differentiate (e.g., `EN`, `VI`, `JA`, `ZH`)
- Readers can filter by language tag

#### Adding New Languages

1. Copy `locales/en.json` to `locales/{code}.json` (e.g., `fr.json` for French)
2. Translate all values
3. Keep keys unchanged (use kebab-case)
4. Set the language code in Ghost Admin
5. Restart Ghost

---

### 🎨 Content Best Practices

#### For Courses

- **Clear Structure**: Organize lessons from beginner to advanced
- **Consistent Naming**: Use numbered lessons (e.g., "Lesson 1: Introduction")
- **Feature Images**: Use high-quality images (recommended: 1200x630px)
- **Excerpt**: Write a compelling course description (shows in course cards)
- **Lesson Order**: Use published dates to control lesson sequence

#### For Lessons

- **Table of Contents**: Use H2 and H3 headings for auto-generated TOC
- **Code Blocks**: Use fenced code blocks with language specifiers

  ````markdown
  ```javascript
  const example = "code here";
  ```
  ````

- **Images**: Optimize images before uploading (use WebP format)
- **Internal Links**: Link to related lessons and course overview

#### For Blog Posts

- **SEO**: Write descriptive titles and meta descriptions
- **Tags**: Use 3-5 relevant tags (not too many)
- **Feature Image**: Always include (shows in social sharing)
- **Excerpt**: Write a clear summary (150-160 characters)
- **Content**: Break content with headings, images, and lists

---

### 🔍 Finding Your Content

#### View All Courses

Navigate to: `https://yoursite.com/courses/`

#### View All Lessons

Navigate to: `https://yoursite.com/lesson/`

#### View Blog Posts

Navigate to: `https://yoursite.com/blog/`

#### Filter by Tag

Click any tag to see related content: `https://yoursite.com/tag/{tag-name}/`

#### Filter by Author

Click author name to see their content: `https://yoursite.com/author/{author-name}/`

## 🎯 Template Hierarchy

| Page Type | Template | Fallback |
|-----------|----------|----------|
| Homepage | `index.hbs` or `custom-home.hbs` | `default.hbs` |
| Course | `custom-course-layout.hbs` | `page.hbs` |
| Lesson | `custom-lesson-layout.hbs` | `post.hbs` |
| Blog Post | `post.hbs` | `default.hbs` |
| Page | `page.hbs` | `default.hbs` |
| Author | `author.hbs` | `default.hbs` |
| Tag | `tag.hbs` | `default.hbs` |
| 404 | `error-404.hbs` | Default Ghost 404 |

## 🔧 Dependencies

### CSS Libraries

- **Tailwind CSS 3.4** - Utility-first CSS framework
- **AOS** - Animate on scroll library
- **Prism.js** - Syntax highlighting
- **TocBot** - Table of contents generator

### JavaScript Libraries

- **Swiper 11** - Modern slider
- **Prism.js** - Code highlighting
- **TocBot** - TOC generation

### Fonts

- **Be Vietnam Pro** - Primary font family (Google Fonts)

## 📝 Best Practices

### Performance

- Keep CSS minimal and use Tailwind's purge feature
- Optimize images before uploading
- Use lazy loading for images
- Minify JavaScript in production

### SEO

- Use proper heading hierarchy (h1 > h2 > h3)
- Add descriptive alt text to images
- Write compelling meta descriptions
- Use the breadcrumb navigation

### Accessibility

- Maintain good color contrast
- Use semantic HTML
- Add ARIA labels where needed
- Test with keyboard navigation

## 🐛 Troubleshooting

### Theme Not Activating

1. Check Ghost version (requires 6.0+)
2. Run `npm test` to validate theme
3. Check Ghost logs for errors
4. Ensure all files uploaded correctly

### CSS Not Loading

```bash
# Clear Ghost cache
ghost restart

# Clear browser cache
# Hard reload: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

### Dark Mode Not Working

- Check localStorage: `color-theme` key
- Clear browser cache
- Verify JavaScript is loading

### Translations Not Showing

- Verify locale file exists
- Check Publication Language setting in Ghost Admin
- Ensure translation keys match (kebab-case)
- Restart Ghost after adding new locale files

### Portal "Powered by Ghost" Still Visible

- Clear browser cache
- Check if JavaScript is blocked
- Verify CSS is loading in `<head>`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This theme is licensed under **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)**.

### You are free to

- ✅ **Use** - Use this theme for personal, educational, or non-commercial projects

### Under the following terms

- 📝 **Attribution** - You must give appropriate credit to xDev Asia
- 🚫 **NonCommercial** - You may not use the material for commercial purposes or generate revenue
- 🔒 **NoDerivatives** - You may not distribute modified versions of this theme

### Prohibited

- ❌ Commercial use or monetization
- ❌ Selling or reselling this theme
- ❌ Using on websites with advertisements or revenue generation
- ❌ Modifying and redistributing
- ❌ Creating derivative works

For commercial licensing options, please contact: <duy@xdev.asia>

See full license: <https://creativecommons.org/licenses/by-nc-nd/4.0/>

## 🙏 Credits

Developed by **xDev Asia** - [https://xdev.asia](https://xdev.asia)

### Built With

- [Ghost CMS](https://ghost.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Swiper](https://swiperjs.com/)
- [Prism.js](https://prismjs.com/)

## 📧 Support

- **Documentation**: [Ghost Docs](https://ghost.org/docs/)
- **Repository**: [GitHub](https://github.com/xdev-asia-labs/x-learn-ghost-theme)
- **Issues**: [GitHub Issues](https://github.com/xdev-asia-labs/x-learn-ghost-theme/issues)
- **Website**: [xdev.asia](https://xdev.asia)

---

Made with ❤️ by xDev Asia
