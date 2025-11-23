# Release Instructions

## Creating a New Release

### Method 1: Using the Release Script (Recommended)

```bash
# Make sure you're on main branch with clean working directory
git checkout main
git pull origin main

# Run the release script with version number
./scripts/release.sh 1.0.1
```

The script will:
1. ✅ Check git status and branch
2. ✅ Run build and tests
3. ✅ Validate theme with GScan
4. ✅ Update `package.json` version
5. ✅ Update `CHANGELOG.md`
6. ✅ Commit changes
7. ✅ Create and push git tag
8. ✅ Trigger GitHub Actions workflow

### Method 2: Manual Release

```bash
# 1. Update version
npm version 1.0.1 --no-git-tag-version

# 2. Update CHANGELOG.md manually

# 3. Commit changes
git add package.json CHANGELOG.md
git commit -m "chore: Release v1.0.1"

# 4. Create and push tag
git tag -a v1.0.1 -m "Release v1.0.1"
git push origin main
git push origin v1.0.1
```

### Method 3: Manual Trigger via GitHub Actions

1. Go to [GitHub Actions](https://github.com/xdev-asia-labs/x-learn-ghost-theme/actions)
2. Select "Create Release" workflow
3. Click "Run workflow"
4. Enter version number (e.g., 1.0.1)
5. Click "Run workflow"

## Release Workflow

When you push a tag (e.g., `v1.0.1`), GitHub Actions automatically:

1. **Run All Tests** (from CI/CD pipeline)
   - Code quality checks
   - Build verification
   - Security audit
   - Ghost theme validation
   - License compliance

2. **Create Release Package** (only if tests pass)
   - Build production assets
   - Validate with GScan
   - Create optimized zip file
   - Generate changelog

3. **Publish to GitHub Releases**
   - Create release page
   - Upload theme package
   - Add release notes
   - Link to documentation

## Versioning Guidelines

We follow [Semantic Versioning](https://semver.org/):

- **Major** (x.0.0): Breaking changes, incompatible API changes
- **Minor** (0.x.0): New features, backwards-compatible
- **Patch** (0.0.x): Bug fixes, backwards-compatible

### Examples

```bash
# Bug fix
./scripts/release.sh 1.0.1

# New feature
./scripts/release.sh 1.1.0

# Breaking change
./scripts/release.sh 2.0.0
```

## Pre-Release Checklist

Before creating a release, ensure:

- [ ] All changes are committed and pushed
- [ ] Tests pass locally (`npm run build`)
- [ ] Theme validates with GScan (`npx gscan . --fatal --verbose`)
- [ ] `CHANGELOG.md` is updated with changes
- [ ] Documentation is up to date
- [ ] Breaking changes are documented
- [ ] Version number follows semantic versioning

## Post-Release Steps

After release is created:

1. **Verify Release**
   - Check [Releases page](https://github.com/xdev-asia-labs/x-learn-ghost-theme/releases)
   - Download and test the package
   - Verify installation instructions

2. **Announce Release**
   - Update documentation if needed
   - Notify users of major changes
   - Share on social media (optional)

3. **Monitor Issues**
   - Watch for bug reports
   - Address critical issues quickly
   - Plan next release if needed

## Rollback a Release

If you need to rollback a release:

```bash
# Delete the tag locally and remotely
git tag -d v1.0.1
git push origin :refs/tags/v1.0.1

# Delete the release on GitHub
# Go to Releases → Edit → Delete release

# Revert commits if needed
git revert <commit-hash>
git push origin main
```

## Troubleshooting

### Tests Fail During Release

If tests fail during release workflow:

1. Check [Actions logs](https://github.com/xdev-asia-labs/x-learn-ghost-theme/actions)
2. Fix the issues locally
3. Delete the tag: `git push origin :refs/tags/v1.0.1`
4. Create a new release with fixed code

### Package Creation Fails

Common issues:
- Missing `node_modules` → Run `npm ci`
- Build artifacts missing → Run `npm run build`
- GScan validation fails → Fix theme issues

### Release Not Appearing

If release doesn't appear:
1. Check workflow status in Actions
2. Verify tag was pushed: `git ls-remote --tags origin`
3. Check workflow permissions in repository settings

## Support

For issues with the release process:
- 🐛 [Report Bug](https://github.com/xdev-asia-labs/x-learn-ghost-theme/issues/new?template=bug_report.yml)
- 📧 Email: security@xdev.asia
- 📖 [Documentation](https://github.com/xdev-asia-labs/x-learn-ghost-theme/blob/main/README.md)
