// client.go
package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
	"strings"

	"github.com/go-vgo/robotgo"
)

func main() {
	conn, err := net.Dial("tcp", "server-ip:8080")
	if err != nil {
		fmt.Println("Error connecting to the server:", err.Error())
		return
	}
	defer conn.Close()

	fmt.Println("Connected to the server.")

	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		input := scanner.Text()
		input = strings.TrimSpace(input)

		if input == "exit" {
			break
		}

		_, err := conn.Write([]byte(input))
		if err != nil {
			fmt.Println("Error sending data:", err.Error())
			break
		}
	}
}
