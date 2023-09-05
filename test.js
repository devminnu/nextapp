// Fetch the ad content from your API
fetch('/api/getAdContent')
   .then(response => response.text())
   .then(adHTML => {
       // Create a DOMParser to parse the ad HTML
       const parser = new DOMParser();
       const parsedHTML = parser.parseFromString(adHTML, 'text/html');

       // Extract the scripts from the parsed HTML
       const scripts = parsedHTML.querySelectorAll('script');

       // Iterate through the extracted scripts and execute them
       scripts.forEach(script => {
           const newScript = document.createElement('script');
           newScript.textContent = script.textContent;
           document.head.appendChild(newScript);
       });

       // Insert the sanitized ad HTML (without scripts) into a DOM element on the webpage
       document.getElementById('ad-container').appendChild(parsedHTML.body);
   });
