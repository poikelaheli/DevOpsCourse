from http.server import BaseHTTPRequestHandler, HTTPServer
import subprocess
import time

serverPort = 8210

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        returned_output = subprocess.check_output(["ps", "-ax"])
        self.wfile.write(bytes(returned_output.decode("utf-8"), "utf-8"))

if __name__ == "__main__":        
    webServer = HTTPServer(("", serverPort), MyServer)
    print("Server started http://%s:%s" % ("", serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")