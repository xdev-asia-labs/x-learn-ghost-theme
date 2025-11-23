# GitHub Actions Workflows

## 📋 Available Workflows

### 1. `ci.yml` - CI/CD Pipeline

**Trigger:** Push/PR to `main` or `develop`

**Steps:**

- Lint code quality
- Build Tailwind CSS
- Validate with GScan
- Check required files

### 2. `deploy-railway.yml` - Deploy to Railway ⭐ NEW

**Trigger:**

- Push to `main` or `dev`
- Manual dispatch

**Steps:**

1. ✅ Build production assets
2. ✅ Validate theme with GScan
3. ✅ Create optimized `.zip` package
4. ✅ Upload as GitHub artifact
5. 🚀 (Optional) Auto-deploy to Railway

**Artifacts:** Theme package available for 30 days

### 3. `release.yml` - Create Release

**Trigger:** Push tag `v*.*.*` or manual dispatch

**Steps:**

- Run full test suite
- Build production assets
- Create versioned package
- Generate changelog
- Create GitHub release

### 4. `auto-release.yml` - Auto Release

**Trigger:** Depends on repository configuration

### 5. `dependency-review.yml` - Dependency Review

**Trigger:** Pull requests

### 6. `codeql.yml` - Code Security Scan

**Trigger:** Push/PR/Schedule

---

## 🚀 How to Use Deploy Workflow

### Option A: Automatic (Push to main/dev)

```bash
git add .
git commit -m "Update theme"
git push origin dev  # or main
```

→ Workflow runs automatically  
→ Download artifact from GitHub Actions tab

### Option B: Manual Trigger

1. Go to **Actions** tab on GitHub
2. Select **"Deploy to Railway"**
3. Click **"Run workflow"**
4. Choose branch → Run

### Option C: Enable Auto-Deploy to Railway

Add Railway token to GitHub secrets:

1. Get Railway token:

```bash
railway login
railway whoami --token
```

2. Add to GitHub:

- Go to **Settings → Secrets → Actions**
- Add secret: `RAILWAY_TOKEN` = `your_token_here`

3. Push code → Auto deploys! 🎉

---

## 📦 Download Built Theme

After workflow runs:

1. Go to **Actions** tab
2. Click on the workflow run
3. Download artifact: `ghost-theme.zip`
4. Upload to Ghost Admin

---

## 🔧 Troubleshooting

### Build fails?

- Check if `npm run build` works locally
- Ensure `assets/css/app.min.css` is generated

### GScan validation fails?

- Run locally: `npx gscan . --fatal --verbose`
- Fix reported issues

### Railway deploy fails?

- Check if `RAILWAY_TOKEN` secret is set
- Verify Railway project is linked
- Deploy manually via Ghost Admin instead

---

## 📝 Best Practices

1. **Test locally first:**

```bash
npm run build
npx gscan . --fatal
```

2. **Use semantic versioning:**

```bash
git tag v1.0.0
git push --tags
```

3. **Review artifacts before deploying to production**

4. **Keep dependencies updated:**

```bash
npm update
npm audit fix
```
