import sys, json
import RPi.GPIO as GPIO
import time

direction = 'none'
# simple JSON echo script
for line in sys.stdin:
  print line
  if line.strip() =='left':
  	direction = 'left'
  else:
  	direction = 'right'


GPIO.setmode(GPIO.BCM)
GPIO.setup(22, GPIO.OUT)
p=GPIO.PWM(22,100)
p.start(5)

if direction == 'left':
	p.ChangeDutyCycle(2.5)
	print("dutycycle = 2.5")

if direction == 'right':
	p.ChangeDutyCycle(20.5)
	print("dutycycle = 20.5")

GPIO.cleanup()
