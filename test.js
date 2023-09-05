const express = require('express');
const { JSDOM } = require('jsdom');

const app = express();
app.use(express.json());

app.post('/render', (req, res) => {
    const html = req.body.html; // HTML content with nested script tags
    const dom = new JSDOM(html, { runScripts: 'dangerously' });

    // Extract and evaluate script tags
    const scriptElements = dom.window.document.querySelectorAll('script');
    scriptElements.forEach((scriptElement) => {
        if (scriptElement.textContent) {
            // Evaluate the script content
            try {
                dom.window.eval(scriptElement.textContent);
            } catch (error) {
                console.error('Error evaluating script:', error);
            }
        }
    });

    res.send(dom.serialize());
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Node.js service is listening on port ${PORT}`);
});
