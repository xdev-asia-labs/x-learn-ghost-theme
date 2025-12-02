// Highlight.js initialization for Ghost theme
// Load from CDN for simplicity

document.addEventListener('DOMContentLoaded', function () {
    // Apply highlighting to all code blocks
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
    });

    // Re-run if new content is loaded dynamically
    const observer = new MutationObserver((mutations) => {
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

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
