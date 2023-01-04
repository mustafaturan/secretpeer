package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"regexp"
	"strings"
	"sync"
	"time"
)

type signalRequest struct {
	Room   string `json:"room"`   // 16 bytes (32 chars as hex string): room identifier
	Intent string `json:"intent"` // enum as string: offer, answer
	Desc   string `json:"desc"`   // < 8KB as uint8 array string: sdp desc
	Nonce  string `json:"nonce"`  // 16 bytes as uint8 array string: nonce for the desc
}

type channel struct {
	signal    []byte
	createdAt int64
}

const (
	httpDefaultPort = "8080"
	httpMaxBodySize = 8 * 1024

	httpErrMsgNotAllowed     = "{\"err\": \"method not allowed\"}"
	httpErrMsgNotFound       = "{\"err\": \"404\"}"
	httpErrMsgInvalidJSON    = "{\"err\": \"invalid json\"}"
	httpErrMsgInvalidRequest = "{\"err\": \"{error}\"}"

	intentOffer  = "offer"
	intentAnswer = "answer"

	maxDurationInSeconds = 10 * 60 // 10 mins
)

var (
	_channels    sync.Map
	_signalsPath = "/signals"
	_rootPath    = "/"

	errInvalidRoom   = errors.New("invalid room")
	errInvalidNonce  = errors.New("invalid nonce")
	errInvalidIntent = errors.New("invalid intent")
	errInvalidDesc   = errors.New("invalid sdp")

	rePatternHex = regexp.MustCompile("^[A-Fa-f0-9]{32}$")

	httpMsgCreated = []byte("{\"status\": \"created\"}")
)

func main() {
	go sweep()

	http.HandleFunc(_signalsPath, handleSignals)
	http.Handle(_rootPath, http.FileServer(http.Dir("./public")))

	port := os.Getenv("PORT")
	if port == "" {
		port = httpDefaultPort
	}
	http.ListenAndServe(":"+port, nil)
	select {}
}

func handleSignals(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "POST,GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Cache-Control")
	r.Body = http.MaxBytesReader(w, r.Body, httpMaxBodySize)

	if r.Method == http.MethodGet {
		handleGetSignal(w, r)
	} else if r.Method == http.MethodPost {
		handleCreateSignal(w, r)
	} else {
		http.Error(w, httpErrMsgNotAllowed, http.StatusMethodNotAllowed)
		return
	}
}

func handleCreateSignal(w http.ResponseWriter, r *http.Request) {
	var err error
	var req signalRequest

	defer func() {
		if err != nil {
			log.Println(req, err)
		} else {
			log.Println(req)
		}
	}()
	if r.Method != http.MethodPost {
		http.Error(w, httpErrMsgNotAllowed, http.StatusMethodNotAllowed)
		return
	}

	content, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, httpErrMsgInvalidJSON, http.StatusUnprocessableEntity)
	}

	err = json.Unmarshal(content, &req)
	if err != nil {
		http.Error(w, httpErrMsgInvalidJSON, http.StatusUnprocessableEntity)
		return
	}

	err = validateSignalReq(req)
	if err != nil {
		http.Error(w, buildErr(err), http.StatusUnprocessableEntity)
		return
	}

	signal, _ := json.Marshal(map[string]string{
		"nonce": req.Nonce,
		"desc":  req.Desc,
	})

	_channels.Store(req.Room+req.Intent, channel{signal: signal, createdAt: time.Now().Unix()})
	w.Write(httpMsgCreated)
}

func handleGetSignal(w http.ResponseWriter, r *http.Request) {
	var err error
	defer func() {
		if err != nil {
			log.Println(err)
		}
	}()

	room := r.URL.Query().Get("room")
	intent := r.URL.Query().Get("intent")
	err = validateSignalQuery(room, intent)
	if err != nil {
		http.Error(w, buildErr(err), http.StatusUnprocessableEntity)
		return
	}

	key := room + intent
	val, ok := _channels.Load(key)
	if !ok {
		err = fmt.Errorf("%s for room(%s) not found", intent, room)
		http.Error(w, httpErrMsgNotFound, http.StatusNotFound)
		return
	}

	_channels.Delete(key)
	w.Write(val.(channel).signal)
}

func validateSignalReq(req signalRequest) error {
	if !rePatternHex.Match([]byte(req.Room)) {
		return errInvalidRoom
	}

	if req.Intent != intentOffer && req.Intent != intentAnswer {
		return errInvalidIntent
	}

	if req.Desc == "" {
		return errInvalidDesc
	}

	if len(req.Nonce) > 64 {
		return errInvalidNonce
	}

	return nil
}

func validateSignalQuery(room, intent string) error {
	if !rePatternHex.Match([]byte(room)) {
		return errInvalidRoom
	}

	if intent != intentOffer && intent != intentAnswer {
		return errInvalidIntent
	}

	return nil
}

func buildErr(err error) string {
	return strings.Replace(httpErrMsgInvalidRequest, "{error}", err.Error(), 1)
}

func sweep() {
	for {
		cleanBefore := time.Now().Unix() - maxDurationInSeconds
		_channels.Range(func(key, value any) bool {
			if value.(channel).createdAt <= cleanBefore {
				_channels.Delete(key)
			}
			return true
		})
		time.Sleep(time.Minute)
	}
}
