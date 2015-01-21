import sys, json
import RPi.GPIO as GPIO
import time

# simple JSON echo script
for line in sys.stdin:
  if line =='right':
  	print line[:-1]
  else:
  	print 'left'


GPIO.setmode(GPIO.BCM)
GPIO.setup(22, GPIO.OUT)
p=GPIO.PWM(22,100)
p.start(5)
try:
    while True:
        p.ChangeDutyCycle(2.5)
        time.sleep(1)
        p.ChangeDutyCycle(11.5)
        time.sleep(1)
        p.ChangeDutyCycle(2.5)
        time.sleep(1)
        p.ChangeDutyCycle(20.5)
        time.sleep(1)
        p.ChangeDutyCycle(2.5)
        time.sleep(1)
        print("the tea is soooo hot!")
except KeyboardInterrupt:
    p.ChangeDutyCycle(0.0)
    GPIO.cleanup()

GPIO.cleanup()
