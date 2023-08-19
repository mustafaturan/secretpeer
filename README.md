# secretpeer

Peer-to-peer, end-to-end encrypted chat and file transfer web app with WebRTC.
This is just a weekend hobby project, please don't expect any further improvements or bug fixes.

Visit [secretpeer](https://secretpeer.com/) for a demo.

## Run locally

```
chmod +x ./bundle.sh

# bundle js files into 1 under public/assets/javascripts/dist
./bundle.sh

# Spin up go server
PORT=8080 go run main.go

open http://localhost:8080
```
