package main

import (
	"fmt"
	"log"
	"time"

	"github.com/robfig/cron"
	"github.com/hpcloud/tail"
)

func main() {
	c := cron.New()

	// Schedule the job to run every hour
	_, err := c.AddFunc("0 * * * *", func() {
		fmt.Println("Running job at:", time.Now())
		readUserAgentsFromLogs("/var/log/nginx/access.log")
	})
	if err != nil {
		log.Fatal("Error adding cron job:", err)
	}

	c.Start()

	// Keep the program running
	select {}
}

func readUserAgentsFromLogs(logPath string) {
	t, err := tail.TailFile(logPath, tail.Config{Follow: true})
	if err != nil {
		log.Println("Error opening log file:", err)
		return
	}

	for line := range t.Lines {
		// Assuming the user agent is present as the last field in the log line
		fields := splitLogLine(line.Text)
		if len(fields) > 0 {
			userAgent := fields[len(fields)-1]
			fmt.Println("User Agent:", userAgent)
		}
	}
}

func splitLogLine(line string) []string {
	// Customize this function according to the log format of your Nginx logs
	// Here, we're assuming fields are separated by spaces
	return strings.Fields(line)
}
