from http.server import BaseHTTPRequestHandler, HTTPServer
import subprocess
import time
import docker

serverPort = 8210

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        delim = ";"
        ip_output = subprocess.check_output(["hostname", "-I"])
        self.wfile.write(bytes(ip_output.decode("utf-8"), "utf-8"))
        self.wfile.write(bytes(delim, "utf-8"))
        processes_output = subprocess.check_output(["ps", "-ax"])
        self.wfile.write(bytes(processes_output.decode("utf-8"), "utf-8"))
        self.wfile.write(bytes(delim, "utf-8"))
        disk_output = subprocess.check_output(["df"])
        self.wfile.write(bytes(disk_output.decode("utf-8"), "utf-8"))
        self.wfile.write(bytes(delim, "utf-8"))
        boot_output = subprocess.check_output(["last", "reboot", "|" , "head", "-1"])
        self.wfile.write(bytes(boot_output.decode("utf-8"), "utf-8"))

if __name__ == "__main__":        
    webServer = HTTPServer(("", serverPort), MyServer)
    print("Server started http://%s:%s" % ("", serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")