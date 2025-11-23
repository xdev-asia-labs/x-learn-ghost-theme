# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- CI/CD pipeline with automated testing and security checks
- CodeQL security analysis
- Dependabot for automatic dependency updates
- Comprehensive security policy
- Issue and PR templates
- Automated release workflow

### Changed
- Improved build process with Tailwind CSS optimization

### Security
- Added automated vulnerability scanning
- Added dependency review process
- Added security reporting guidelines

## [1.0.0] - 2025-11-23

### Added
- Initial release of xDev Learn Ghost Theme
- Ghost CMS v5.0+ compatible theme
- Tailwind CSS 3.4 integration
- Handlebars template system
- Multi-language support (EN, VI, JA, ZH)
- Tag-based content classification (`hash-course`, `hash-lesson`, `hash-blog`)
- Custom routes for courses, lessons, and blog posts
- Dark mode support with localStorage persistence
- Responsive design with mobile-first approach
- Glass-morphism UI effects
- Syntax highlighting with Prism.js
- Table of contents generation with Tocbot
- Course slider with Swiper.js
- Author profile pages
- Social sharing functionality
- Breadcrumb navigation
- Related content sections
- SEO optimization
- Accessible design patterns

### Template System
- `default.hbs` - Base layout with header/footer
- `index.hbs` - Homepage with featured content
- `custom-course-layout.hbs` - Course detail pages
- `custom-lesson-layout.hbs` - Lesson pages with navigation
- `post.hbs` - Blog post template
- Modular partials system (cards, navigation, footer, etc.)

### Features
- 📚 Course management system
- 📝 Blog article system
- 👥 Author profiles with bio and social links
- 🎨 Glass-morphism card designs
- 🌙 Dark/light mode toggle
- 🔍 Search-friendly URLs
- 📱 Mobile responsive
- ♿ Accessibility compliant
- 🌍 Multi-language ready
- 🎯 SEO optimized
- ⚡ Performance optimized

### Technical
- Node.js 18+ support
- npm package management
- Webpack-free build process
- PostCSS with Tailwind CSS
- Be Vietnam Pro font family
- Ghost API integration
- Custom helper functions
- Image optimization support

[Unreleased]: https://github.com/xdev-asia-labs/x-learn-ghost-theme/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/xdev-asia-labs/x-learn-ghost-theme/releases/tag/v1.0.0
