// Highlight.js initialization for Ghost theme

document.addEventListener('DOMContentLoaded', function () {
    // Switch highlight.js theme based on dark mode
    function updateHljsTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        const lightTheme = document.getElementById('hljs-light');
        const darkTheme = document.getElementById('hljs-dark');

        if (lightTheme && darkTheme) {
            lightTheme.disabled = isDark;
            darkTheme.disabled = !isDark;
        }
    }

    // Initial theme switch
    updateHljsTheme();

    // Watch for dark mode changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                updateHljsTheme();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });

    // Apply highlighting to all code blocks
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
    });

    // Re-run if new content is loaded dynamically
    const contentObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    const codeBlocks = node.querySelectorAll('pre code');
                    codeBlocks.forEach((block) => {
                        if (!block.classList.contains('hljs')) {
                            hljs.highlightElement(block);
                        }
                    });
                }
            });
        });
    });

    contentObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
});
