#!/usr/bin/python

#This script will restart the server when it crashes
import subprocess
while 1:
	subprocess.Popen("node app.js >> log.txt", shell=True).wait()
