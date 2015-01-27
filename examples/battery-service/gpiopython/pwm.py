import sys, json
import RPi.GPIO as GPIO
import time

direction = 'none'
# simple JSON echo script
for line in sys.stdin:
  #print line
  if line.strip() =='left':
  	direction = 'left'
  else:
  	direction = 'right'


GPIO.setmode(GPIO.BCM)
GPIO.setup(22, GPIO.OUT)
p=GPIO.PWM(22,100)
p.start(5)

if direction == 'right':
  p.ChangeDutyCycle(20.5)
  time.sleep(1)
  #p.ChangeDutyCycle(2.5)
  #time.sleep(1)
  print("left end")

if direction == 'left':
  p.ChangeDutyCycle(11.5)
  time.sleep(1)
  #p.ChangeDutyCycle(2.5)
  #time.sleep(1)
  # p.ChangeDutyCycle(2.5)
  # time.sleep(1)
  # p.ChangeDutyCycle(20.5)
  # time.sleep(1)
  # p.ChangeDutyCycle(2.5)
  # time.sleep(1)
  print("right end")

GPIO.cleanup()
time.sleep(1)
