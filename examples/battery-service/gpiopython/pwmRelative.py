import sys, json
import RPi.GPIO as GPIO
import time

# simple JSON echo script
for line in sys.stdin:
  print line



GPIO.setmode(GPIO.BCM)
GPIO.setup(22, GPIO.OUT)
p=GPIO.PWM(22,100)
p.start(0)

p.ChangeDutyCycle(int(line)
time.sleep(1)
print(line)


GPIO.cleanup(22)
time.sleep(1)

