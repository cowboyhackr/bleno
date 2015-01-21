import sys, json
import RPi.GPIO as GPIO
import time

direction = 'none'
# simple JSON echo script
for line in sys.stdin:
  print line
  if line.strip() =='left':
  	# print line[:-1]
  	print 'left'
  	direction = 'left'
  else:
  	print 'right'
  	direction = 'right'

import fileinput
for line in fileinput.input():
	print line
print 'read done'



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

# try:
#     while True:
#         p.ChangeDutyCycle(2.5)
#         time.sleep(1)
#         p.ChangeDutyCycle(11.5)
#         time.sleep(1)
#         p.ChangeDutyCycle(2.5)
#         time.sleep(1)
#         p.ChangeDutyCycle(20.5)
#         time.sleep(1)
#         p.ChangeDutyCycle(2.5)
#         time.sleep(1)
#         print("the tea is soooo hot!")
# except KeyboardInterrupt:
#     p.ChangeDutyCycle(0.0)
#     GPIO.cleanup()

GPIO.cleanup()
