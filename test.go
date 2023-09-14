package main

import (
    "fmt"
    "io/ioutil"
    "math/rand"
    "net/http"
    "os"
    "time"
)

func main() {
    http.HandleFunc("/js", generateJS)
    http.ListenAndServe(":8080", nil)
}

func generateJS(w http.ResponseWriter, r *http.Request) {
    // Generate a random file name
    rand.Seed(time.Now().UnixNano())
    randStr := fmt.Sprintf("%d.js", rand.Intn(10000))

    // Create a new JavaScript file
    jsContent := []byte(`console.log("This is a dynamically generated JavaScript file.");`)
    err := ioutil.WriteFile(randStr, jsContent, 0644)
    if err != nil {
        http.Error(w, "Failed to create JavaScript file", http.StatusInternalServerError)
        return
    }
    defer os.Remove(randStr) // Clean up the file when done

    // Serve the generated JavaScript file
    http.ServeFile(w, r, randStr)

    // Optionally, set response headers to indicate that it's a JavaScript file
    w.Header().Set("Content-Type", "application/javascript")
}
