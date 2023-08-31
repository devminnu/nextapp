package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"regexp"
	"strings"
)

func main() {
	logFilePath := "/var/log/nginx/access.log"
	err := readUserAgentsFromLogs(logFilePath)
	if err != nil {
		log.Fatal("Error:", err)
	}
}

func readUserAgentsFromLogs(logPath string) error {
	file, err := os.Open(logPath)
	if err != nil {
		return err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	userAgentRegex := regexp.MustCompile(`"([^"]*)"`)
	for scanner.Scan() {
		line := scanner.Text()
		fields := strings.Fields(line)
		if len(fields) > 11 {
			userAgentField := fields[11]
			userAgentMatches := userAgentRegex.FindStringSubmatch(userAgentField)
			if len(userAgentMatches) > 1 {
				userAgent := userAgentMatches[1]
				fmt.Println("User Agent:", userAgent)
			}
		}
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	return nil
}
