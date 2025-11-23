# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within xDev Learn Ghost Theme, please send an email to security@xdev.asia. All security vulnerabilities will be promptly addressed.

Please include the following information:

- Type of issue (e.g., XSS, SQL injection, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

## Security Best Practices

When using this theme:

1. **Keep Dependencies Updated**: Regularly run `npm audit` and `npm update`
2. **Content Security Policy**: Configure Ghost's CSP headers appropriately
3. **Input Validation**: Ghost handles most input validation, but ensure custom code validates inputs
4. **XSS Prevention**: Use `{{}}` instead of `{{{}}}` for untrusted content
5. **Regular Updates**: Keep Ghost CMS and this theme updated to the latest versions

## Automated Security Checks

This repository uses:
- **GitHub Dependabot**: Automatic dependency updates
- **CodeQL Analysis**: Static code analysis for vulnerabilities
- **npm audit**: Dependency vulnerability scanning
- **Dependency Review**: PR-based dependency checks

## Disclosure Policy

- Security issues are addressed within 48 hours
- Fixes are released as soon as possible
- A security advisory is published after the fix is available
- Credit is given to reporters (unless they prefer anonymity)

## Contact

- Email: security@xdev.asia
- GitHub Issues: For non-security bugs only
- Private Security Reports: Use GitHub's private vulnerability reporting feature
