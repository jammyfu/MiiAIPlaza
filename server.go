package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
)

func main() {
	rendererURL := os.Getenv("MII_RENDERER_URL")
	if rendererURL == "" {
		rendererURL = "http://127.0.0.1:5000"
	}

	upstream, err := url.Parse(rendererURL)
	if err != nil {
		log.Fatalf("invalid MII_RENDERER_URL %q: %v", rendererURL, err)
	}

	fs := http.FileServer(http.Dir("./public"))
	rendererProxy := httputil.NewSingleHostReverseProxy(upstream)

	http.Handle("/miis/", rendererProxy)
	http.Handle("/", fs)

	log.Printf("Listening on :3000 (proxying /miis/* to %s)", upstream)
	err = http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}
}
