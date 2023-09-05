// Include the DOMPurify library (if you haven't already)
// <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.3.0/purify.min.js"></script>

// Fetch the ad content from your API
fetch('/api/getAdContent')
   .then(response => response.text())
   .then(adHTML => {
       // Sanitize the ad HTML with DOMPurify
       const sanitizedAdHTML = DOMPurify.sanitize(adHTML);

       // Insert the sanitized ad HTML into a DOM element on the webpage
       document.getElementById('ad-container').innerHTML = sanitizedAdHTML;
   });
