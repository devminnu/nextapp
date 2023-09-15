function loadContent(url, targetSelector) {
  // Fetch the content from the specified URL
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((html) => {
      // Insert the fetched HTML into the specified DOM element
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        targetElement.innerHTML = html;
      } else {
        throw new Error(`Target element "${targetSelector}" not found`);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Example usage:
loadContent('example.html', '#target-div');
