package main

import (
	"context"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/chromedp/cdproto/network"
	"github.com/chromedp/chromedp"
)

func main() {
	http.HandleFunc("/", handleIndex)
	http.ListenAndServe(":8080", nil)
}

func handleIndex(w http.ResponseWriter, r *http.Request) {
	// Define the HTML template with script tags
	tmpl := `
		<!DOCTYPE html>
		<html>
		<head>
			<title>Prerendered HTML Template</title>
			<script src="external-script.js"></script>
		</head>
		<body>
			<div id="content"></div>
		</body>
		</html>
	`

	// Create a new Chrome context
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	// Navigate to a blank page with the HTML template
	var content string
	if err := chromedp.Run(ctx,
		chromedp.Navigate("about:blank"),
		chromedp.OuterHTML("html", &content),
	); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Extract the initial HTML content without the prerendered script
	initialHTML := strings.Replace(content, "<script src=\"external-script.js\"></script>", "", 1)

	// Render the template and include the initial HTML content
	html := strings.Replace(tmpl, "<div id=\"content\"></div>", initialHTML, 1)

	// Write the prerendered HTML to the response
	w.Header().Set("Content-Type", "text/html")
	_, _ = w.Write([]byte(html))
}
