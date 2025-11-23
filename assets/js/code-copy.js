document.addEventListener('DOMContentLoaded', function () {
    // Find all pre tags that contain code tags
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach(function (pre) {
        // Create the copy button
        const button = document.createElement('button');
        button.className = 'copy-to-clipboard-button';
        button.textContent = 'Copy';
        button.setAttribute('aria-label', 'Copy to clipboard');

        // Add the button to the pre tag
        // Ensure pre has relative positioning for absolute button placement
        if (getComputedStyle(pre).position === 'static') {
            pre.style.position = 'relative';
        }
        pre.appendChild(button);

        // Handle click event
        button.addEventListener('click', function () {
            const code = pre.querySelector('code');
            const text = code ? code.innerText : pre.innerText;

            navigator.clipboard.writeText(text).then(function () {
                // Success feedback
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.classList.add('copied');

                setTimeout(function () {
                    button.textContent = originalText;
                    button.classList.remove('copied');
                }, 2000);
            }).catch(function (err) {
                console.error('Failed to copy text: ', err);
                button.textContent = 'Error';
            });
        });
    });
});
