function loadjQuery(callback) {
  // Check if jQuery is already loaded
  if (typeof jQuery === 'undefined') {
    // jQuery is not loaded, so load it dynamically
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js'; // Replace with the URL to the jQuery version you want to load
    script.onload = callback; // Callback function to execute after jQuery is loaded
    document.head.appendChild(script);
  } else {
    // jQuery is already loaded, so just call the callback function
    callback();
  }
}

// Example usage:
loadjQuery(function() {
  // Now you can use jQuery in your JavaScript code
  $(document).ready(function() {
    // Your jQuery code here
  });
});
