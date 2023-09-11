function loadContent() {
    // Get the container element
    const container = document.getElementById('custom-iframe-container');

    // Create an iframe-like element
    const customIframe = document.createElement('div');
    customIframe.classList.add('custom-iframe');

    // Sample content with nested script tags
    const contentHtml = `
        <h1>Custom Iframe Content</h1>
        <p>This is custom iframe content loaded using JavaScript.</p>
        <script>
            console.log("This script should not run when content is added.");
        </script>
    `;

    // Use DOMParser to safely parse and append content
    const parser = new DOMParser();
    const parsedContent = parser.parseFromString(contentHtml, 'text/html');

    // Append the parsed content to the custom iframe
    customIframe.appendChild(parsedContent.body);

    // Append the custom iframe to the container
    container.appendChild(customIframe);
}
