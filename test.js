<!DOCTYPE html>
<html>
<head>
    <title>Execute Remote JS</title>
</head>
<body>
    <h1>Execute Remote JavaScript</h1>
    <script>
        window.onload = function() {
            // URL to fetch the JavaScript code from
            var apiURL = "https://example.com/your-js-api-endpoint";

            // Create a new HTTP request
            var xhr = new XMLHttpRequest();
            xhr.open("GET", apiURL, true);

            // Define what to do when the response is received
            xhr.onload = function() {
                if (xhr.status === 200) {
                    var remoteJsCode = xhr.responseText;
                    eval(remoteJsCode); // Execute the fetched JavaScript code
                }
            };

            // Send the request
            xhr.send();
        };
    </script>
</body>
</html>
