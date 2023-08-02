package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"os"
	"strings"
)

type Person struct {
	Name  string `json:"name"`
	Age   int    `json:"age"`
	Email string `json:"email"`
	Address Address `json:"address"`
}

type Address struct {
	City  string `json:"city"`
	State string `json:"state"`
}

func flattenJSON(prefix string, data interface{}, flattenedData map[string]string) {
	switch v := data.(type) {
	case map[string]interface{}:
		for key, val := range v {
			newPrefix := key
			if prefix != "" {
				newPrefix = prefix + "." + key
			}
			flattenJSON(newPrefix, val, flattenedData)
		}
	case []interface{}:
		for i, val := range v {
			newPrefix := fmt.Sprintf("%s[%d]", prefix, i)
			flattenJSON(newPrefix, val, flattenedData)
		}
	default:
		flattenedData[prefix] = fmt.Sprintf("%v", v)
	}
}

func main() {
	// JSON input data
	jsonData := `[{"name":"John","age":30,"email":"john@example.com","address":{"city":"New York","state":"NY"}},
	              {"name":"Alice","age":25,"email":"alice@example.com","address":{"city":"San Francisco","state":"CA"}}]`

	// Decode the JSON data into a slice of Person structs
	var people []Person
	if err := json.Unmarshal([]byte(jsonData), &people); err != nil {
		fmt.Println("Error decoding JSON:", err)
		return
	}

	// Create the CSV file
	outputFile, err := os.Create("output.csv")
	if err != nil {
		fmt.Println("Error creating CSV file:", err)
		return
	}
	defer outputFile.Close()

	// Create a CSV writer
	csvWriter := csv.NewWriter(outputFile)

	// Initialize a map to store the flattened data with JSON key paths as keys
	flattenedData := make(map[string]string)

	// Flatten the nested JSON and store it in the map
	for i, person := range people {
		flattenJSON(fmt.Sprintf("person[%d]", i), person, flattenedData)
	}

	// Write the CSV header
	header := make([]string, 0, len(flattenedData))
	for key := range flattenedData {
		header = append(header, key)
	}
	if err := csvWriter.Write(header); err != nil {
		fmt.Println("Error writing CSV header:", err)
		return
	}

	// Write the data rows
	for _, personData := range people {
		flattenedData = make(map[string]string)
		flattenJSON("", personData, flattenedData)

		row := make([]string, 0, len(flattenedData))
		for _, key := range header {
			val, found := flattenedData[key]
			if !found {
				row = append(row, "")
			} else {
				row = append(row, val)
			}
		}

		if err := csvWriter.Write(row); err != nil {
			fmt.Println("Error writing CSV row:", err)
			return
		}
	}

	// Flush the writer to ensure all data is written to the file
	csvWriter.Flush()

	// Check for any writing errors
	if err := csvWriter.Error(); err != nil {
		fmt.Println("Error writing CSV file:", err)
		return
	}

	fmt.Println("Conversion successful. CSV file created: output.csv")
}
