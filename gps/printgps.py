#https://learn.adafruit.com/adafruit-ultimate-gps-on-the-raspberry-pi/using-your-gps

import gps
 
# Listen on port 2947 (gpsd) of localhost
session = gps.gps("localhost", "2947")
session.stream(gps.WATCH_ENABLE | gps.WATCH_NEWSTYLE)
 
while True:
    try:
    	report = session.next()
        print report
		# Wait for a 'TPV' report and display the current time
		# To see all report data, uncomment the line below
		# print report
        if report['class'] == 'TPV':
            if hasattr(report, 'time'):
                print ' '
                print report.time
                print report.lat 
                print report.lon
            else:
                print ' no tpv?'
                print report
    except KeyError:
		pass
    except KeyboardInterrupt:
		quit()
    except StopIteration:
		session = None
		print "GPSD has terminated"


        #pull off other data like this...

                #if report['class'] == 'TPV':
            #if hasattr(report, 'speed'):
                #print report.speed * gps.MPS_TO_KPH