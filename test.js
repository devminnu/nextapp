const { JSDOM } = require('jsdom');

// Fetch the ad content from your API
fetch('/api/getAdContent')
    .then(response => response.text())
    .then(adHTML => {
        // Create a virtual DOM with jsdom
        const dom = new JSDOM(adHTML);

        // Extract and execute scripts
        const scripts = Array.from(dom.window.document.querySelectorAll('script'));
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            document.head.appendChild(newScript);
        });

        // Insert the sanitized ad HTML (without scripts) into a DOM element on the webpage
        document.getElementById('ad-container').appendChild(dom.window.document.body);
    });
