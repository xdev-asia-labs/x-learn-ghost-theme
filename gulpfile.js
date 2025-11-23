const { src, dest, series } = require('gulp');
const zip = require('gulp-zip');
const { execSync } = require('child_process');

// Build Tailwind CSS
function buildCSS(done) {
    console.log('Building Tailwind CSS...');
    try {
        execSync('./node_modules/.bin/tailwindcss -i ./assets/css/tailwind.css -o ./assets/css/app.min.css --minify', {
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
    execSync('./node_modules/.bin/tailwindcss -i ./assets/css/tailwind.css -o ./assets/css/app.min.css --minify --watch', {
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
        .pipe(zip(filename))
        .pipe(dest('./'));
}

exports.default = buildCSS;
exports.build = buildCSS;
exports.watch = watch;
exports.zip = series(buildCSS, zipTheme);
