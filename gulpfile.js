import gulp from 'gulp';
import gulpZip from 'gulp-zip';
import { execSync } from 'child_process';

const { src, dest, series } = gulp;

// Build Tailwind CSS
function buildCSS(done) {
    console.log('Building Tailwind CSS...');
    try {
        // Use npx for better cross-platform compatibility (works on CI and local)
        execSync('npx tailwindcss -i ./assets/css/tailwind.css -o ./assets/css/app.min.css --minify', {
            stdio: 'inherit'
        });
        console.log('✅ Tailwind CSS built successfully');
        done();
    } catch (error) {
        done(error);
    }
}

// Watch for changes
function watch() {
    console.log('Watching for changes...');
    // Use npx for better cross-platform compatibility (works on CI and local)
    execSync('npx tailwindcss -i ./assets/css/tailwind.css -o ./assets/css/app.min.css --minify --watch', {
        stdio: 'inherit'
    });
}

// Create zip package for Ghost
function zipTheme() {
    const filename = 'x-learn-ghost-theme.zip';

    return src([
        '**',
        '!node_modules', '!node_modules/**',
        '!dist', '!dist/**',
        '!.git', '!.git/**',
        '!.github', '!.github/**',
        '!*.log',
        '!*.zip',
        '!test-ci-local.sh',
        '!fix_quotes.py',
        '!gulpfile.js',
        '!.DS_Store'
    ])
        .pipe(gulpZip(filename))
        .pipe(dest('./'));
}

export default buildCSS;
export { buildCSS as build, watch };
export const zip = series(buildCSS, zipTheme);
