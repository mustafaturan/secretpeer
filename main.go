package main

import (
	"os"
	"net/http"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("./public")))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	http.ListenAndServe(":"+port, nil)
	select {}
}
