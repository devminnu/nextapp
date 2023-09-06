const apiUrl = 'https://example.com/api/get-ad';

// Function to fetch and insert the ad content
async function loadAd() {
    try {
        // Make an API request to get the ad HTML content
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        // Parse the response as text
        const adHtml = await response.text();

        // Create a div element to hold the ad content
        const adContainer = document.getElementById('ad-container');
        const adWrapper = document.createElement('div');

        // Set the HTML content of the wrapper div with the ad HTML
        adWrapper.innerHTML = adHtml;

        // Append the wrapper div to the ad container
        adContainer.appendChild(adWrapper);

        // Add an event listener for the DOMContentLoaded event to execute scripts
        adWrapper.addEventListener('DOMContentLoaded', () => {
            // Execute scripts within the inserted content
            function executeScripts() {
                const scripts = adWrapper.querySelectorAll('script');
                scripts.forEach((script) => {
                    const newScript = document.createElement('script');
                    newScript.text = script.textContent;
                    script.parentNode.replaceChild(newScript, script);
                });
            }
            executeScripts();
        });
    } catch (error) {
        console.error('Error loading ad:', error);
    }
}

// Call the loadAd function to fetch and insert the ad content
loadAd();
