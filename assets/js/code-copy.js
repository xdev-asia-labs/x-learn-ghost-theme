document.addEventListener('DOMContentLoaded', function () {
    const codeBlocks = document.querySelectorAll('pre');

    const langConfig = {
        'javascript': { name: 'JavaScript', icon: '<svg viewBox="0 0 24 24" fill="#F7DF1E"><path d="M3 3h18v18H3V3zm13.63 11.16c-.64-.22-1.06-.33-1.06-.33v-2.1s.44.11 1.11.33c.67.22.94.56.94 1.06 0 .56-.44.94-1.22.94-.67 0-1.17-.22-1.17-.22v1.67s.56.28 1.44.28c1.67 0 2.5-1 2.5-2.39 0-1.5-1.11-2.17-2.5-2.61-.89-.28-1.17-.5-1.17-.89 0-.39.33-.61.89-.61.56 0 1 .17 1 .17v-1.61s-.44-.17-1.06-.17c-1.44 0-2.39.89-2.39 2.22 0 1.39 1.06 2.06 2.39 2.5.89.28 1.17.56 1.17.94 0 .5-.44.78-1.06.78zM8.36 16.5h2.17v-6.94H8.36v6.94zm1.08-8.28c-.72 0-1.22.5-1.22 1.17 0 .67.5 1.17 1.22 1.17.72 0 1.22-.5 1.22-1.17 0-.67-.5-1.17-1.22-1.17z"/></svg>' },
        'js': { name: 'JavaScript', icon: '<svg viewBox="0 0 24 24" fill="#F7DF1E"><path d="M3 3h18v18H3V3zm13.63 11.16c-.64-.22-1.06-.33-1.06-.33v-2.1s.44.11 1.11.33c.67.22.94.56.94 1.06 0 .56-.44.94-1.22.94-.67 0-1.17-.22-1.17-.22v1.67s.56.28 1.44.28c1.67 0 2.5-1 2.5-2.39 0-1.5-1.11-2.17-2.5-2.61-.89-.28-1.17-.5-1.17-.89 0-.39.33-.61.89-.61.56 0 1 .17 1 .17v-1.61s-.44-.17-1.06-.17c-1.44 0-2.39.89-2.39 2.22 0 1.39 1.06 2.06 2.39 2.5.89.28 1.17.56 1.17.94 0 .5-.44.78-1.06.78zM8.36 16.5h2.17v-6.94H8.36v6.94zm1.08-8.28c-.72 0-1.22.5-1.22 1.17 0 .67.5 1.17 1.22 1.17.72 0 1.22-.5 1.22-1.17 0-.67-.5-1.17-1.22-1.17z"/></svg>' },
        'typescript': { name: 'TypeScript', icon: '<svg viewBox="0 0 24 24" fill="#3178C6"><path d="M2 3h20v18H2V3zm15.3 12.5c-.7-.2-1.1-.3-1.1-.3v-1.8s.4.1 1 .3c.6.2.9.5.9 1 0 .5-.4.9-1.1.9-.6 0-1.1-.2-1.1-.2v1.5s.5.2 1.3.2c1.5 0 2.3-.9 2.3-2.2 0-1.3-1-2-2.3-2.4-.8-.2-1.1-.4-1.1-.8 0-.3.3-.5.8-.5.5 0 .9.1.9.1v-1.4s-.4-.1-.9-.1c-1.3 0-2.2.8-2.2 2 0 1.2.9 1.9 2.2 2.3.8.2 1.1.5 1.1.8 0 .4-.4.7-1 .7zm-5.8 1.5h1.9v-6.3h-1.9v6.3zm-2.5-6.3H7.1v6.3h1.9v-6.3z"/></svg>' },
        'ts': { name: 'TypeScript', icon: '<svg viewBox="0 0 24 24" fill="#3178C6"><path d="M2 3h20v18H2V3zm15.3 12.5c-.7-.2-1.1-.3-1.1-.3v-1.8s.4.1 1 .3c.6.2.9.5.9 1 0 .5-.4.9-1.1.9-.6 0-1.1-.2-1.1-.2v1.5s.5.2 1.3.2c1.5 0 2.3-.9 2.3-2.2 0-1.3-1-2-2.3-2.4-.8-.2-1.1-.4-1.1-.8 0-.3.3-.5.8-.5.5 0 .9.1.9.1v-1.4s-.4-.1-.9-.1c-1.3 0-2.2.8-2.2 2 0 1.2.9 1.9 2.2 2.3.8.2 1.1.5 1.1.8 0 .4-.4.7-1 .7zm-5.8 1.5h1.9v-6.3h-1.9v6.3zm-2.5-6.3H7.1v6.3h1.9v-6.3z"/></svg>' },
        'html': { name: 'HTML', icon: '<svg viewBox="0 0 24 24" fill="#E34F26"><path d="M12 2L2.5 5.5v13L12 22l9.5-3.5v-13L12 2zm0 17.9l-7.5-2.8V6.6l7.5-2.8 7.5 2.8v10.5L12 19.9z"/></svg>' },
        'css': { name: 'CSS', icon: '<svg viewBox="0 0 24 24" fill="#1572B6"><path d="M12 2L2.5 5.5v13L12 22l9.5-3.5v-13L12 2zm0 17.9l-7.5-2.8V6.6l7.5-2.8 7.5 2.8v10.5L12 19.9z"/></svg>' },
        'python': { name: 'Python', icon: '<svg viewBox="0 0 24 24" fill="#3776AB"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"/><path d="M12 7a2 2 0 100 4 2 2 0 000-4zm0 6a2 2 0 100 4 2 2 0 000-4z"/></svg>' },
        'py': { name: 'Python', icon: '<svg viewBox="0 0 24 24" fill="#3776AB"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"/><path d="M12 7a2 2 0 100 4 2 2 0 000-4zm0 6a2 2 0 100 4 2 2 0 000-4z"/></svg>' },
        'bash': { name: 'Terminal', icon: '<svg viewBox="0 0 24 24" fill="#4EAA25"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 18V6h16v12H4z"/><path d="M7.5 15l4.5-3-4.5-3v6zM13 14v1h4v-1h-4z"/></svg>' },
        'sh': { name: 'Terminal', icon: '<svg viewBox="0 0 24 24" fill="#4EAA25"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 18V6h16v12H4z"/><path d="M7.5 15l4.5-3-4.5-3v6zM13 14v1h4v-1h-4z"/></svg>' },
        'shell': { name: 'Terminal', icon: '<svg viewBox="0 0 24 24" fill="#4EAA25"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 18V6h16v12H4z"/><path d="M7.5 15l4.5-3-4.5-3v6zM13 14v1h4v-1h-4z"/></svg>' },
        'zsh': { name: 'Terminal', icon: '<svg viewBox="0 0 24 24" fill="#4EAA25"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 18V6h16v12H4z"/><path d="M7.5 15l4.5-3-4.5-3v6zM13 14v1h4v-1h-4z"/></svg>' },
        'json': { name: 'JSON', icon: '<svg viewBox="0 0 24 24" fill="#F9A825"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>' },
        'default': { name: 'Code', icon: '<svg viewBox="0 0 24 24" fill="#607D8B"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>' }
    };

    codeBlocks.forEach(function (pre) {
        // Prevent double wrapping
        if (pre.parentNode.classList.contains('code-block-wrapper')) return;

        // 1. Identify Language
        const code = pre.querySelector('code');
        let language = '';
        if (code) {
            code.className.split(' ').forEach(c => {
                if (c.startsWith('language-')) language = c.replace('language-', '');
            });
        }
        if (!language && pre.className.includes('language-')) {
            pre.className.split(' ').forEach(c => {
                if (c.startsWith('language-')) language = c.replace('language-', '');
            });
        }

        const config = langConfig[language.toLowerCase()] || langConfig['default'];
        const displayName = language ? (config.name !== 'Code' ? config.name : language.toUpperCase()) : 'Code';
        const displayIcon = config.icon;

        // 2. Create Wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';

        // Insert wrapper before pre
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        // 3. Create Header
        const header = document.createElement('div');
        header.className = 'code-block-header';

        // Window Controls (Dots)
        const controls = document.createElement('div');
        controls.className = 'window-controls';
        controls.innerHTML = '<span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>';
        header.appendChild(controls);

        // Language Label (Icon + Text)
        const label = document.createElement('div');
        label.className = 'language-label';
        label.innerHTML = `${displayIcon} <span>${displayName}</span>`;
        header.appendChild(label);

        // Copy Button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-to-clipboard-button';
        copyBtn.textContent = 'Copy';
        copyBtn.setAttribute('aria-label', 'Copy to clipboard');
        header.appendChild(copyBtn);

        // Add Header to Wrapper
        wrapper.insertBefore(header, pre);

        // 4. Copy Functionality
        copyBtn.addEventListener('click', function () {
            const codeText = code ? code.innerText : pre.innerText;
            navigator.clipboard.writeText(codeText).then(function () {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                copyBtn.textContent = 'Error';
            });
        });
    });
});
