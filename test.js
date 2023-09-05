const express = require('express');
const { JSDOM } = require('jsdom');

const app = express();
app.use(express.json());

app.post('/render', (req, res) => {
    const html = req.body.html; // HTML content with nested script tags
    const dom = new JSDOM(html);

    // Execute JavaScript within the DOM
    dom.window.evalScripts();

    res.send(dom.serialize());
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Node.js service is listening on port ${PORT}`);
});
