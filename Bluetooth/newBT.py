from bluetooth import *
import time
bd_addr = "B4:31:61:E4:1E:D2"
port = 1
sock = BluetoothSocket (RFCOMM)
sock.connect((bd_addr,port))
print ('waiting')
while 1:
        data = sock.recv(10)
        print (data)
        time.sleep(2.0)
        #tosend = raw_input()
        #if tosend != 'q':
        #        sock.send(tosend)
        #else:
        #        break

sock.close()
