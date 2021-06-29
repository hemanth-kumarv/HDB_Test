from bluedot.btcomm import BluetoothClient
from signal import pause
import os

def data_received(data):
    print(data)

os.system("sudo hciconfig noauth")
os.system("sudo hciconfig nosecmgr")
os.system("sudo hciconfig hci0 sspmode 1")
os.system("sudo hciconfig hci0 piscan")

c = BluetoothClient("HemanthKumar", data_received)
c.send("helloworld")

pause()
