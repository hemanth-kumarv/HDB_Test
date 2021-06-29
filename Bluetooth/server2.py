from bluedot.btcomm import BluetoothServer, BluetoothClient
from signal import pause
import subprocess
import time
import os
import pymongo
import json
import gdown

global available, rewardsDB

def data_received(data):
    print(data)
    if data.startswith("_init;TID"):
        availableList = (subprocess.check_output(["sudo", "/home/pi//Receiver/433Utils/RPi_utils/RFSniffer"])).decode('utf-8').split('\n')
        available = ""
        for x in availableList:
            #print(x.strip())
            #print(available.find(x))
            if x.strip() and (available.find(x) == -1):
                available += x.strip() + ","
        print("Init TID - "+available[:-1])
        #s.send("_init;TID:"+available[:-1]+"\n")
        s.send("_init;TID:12484292\n")
    else:
        url, email = data.split('?')
        print(url, email)
        downloadUrl = "https://drive.google.com/uc?id="+url
        fileLocation = '/tmp/' + url + '.mp4'
        try:
            if not os.path.exists(fileLocation):
                #print(subprocess.check_output(["gdown", downloadUrl, "-O", "/tmp/"+url+".mp4"]))
                gdown.download(downloadUrl, fileLocation)
            s.send(str(data)+" starting...\n")
            print(subprocess.check_output(["sudo", "/home/pi/rpi-rgb-led-matrix/utils/video-viewer", "-F", fileLocation, "--led-gpio-mapping=regular-pi1", "--led-cols=64", "--led-slowdown-gpio=2"]))
            rewardsDB.update_one({"Email": email}, {"$push": {"NewRewards": {"Time": time.asctime(time.localtime(time.time())), "Ad": url}}})
            s.send(str(data)+" displayed!\n")
        except Exception as e:
            print(e)
            s.send(str(data)+" failed!\n")


if __name__ == "__main__":
    subprocess.run(["sudo", "hciconfig", "noauth"])
    subprocess.run(["sudo", "hciconfig", "nosecmgr"])
    subprocess.run(["sudo", "hciconfig", "hci0", "sspmode", "1"])
    subprocess.run(["sudo", "hciconfig", "hci0", "piscan"])

    try:
        f = open("config.json", "r")
        config = json.loads(f.read())
        mongoCredentials = config['MONGO_CREDENTIALS']
        client = pymongo.MongoClient("mongodb+srv://" + mongoCredentials + "@cluster0.ckaqz.mongodb.net/")
        rewardsDB = client["Customer"]["CustomerRewardsDBTest"]
        print("Connected to database successfully!")

    except Exception as e:
        print(e)

    #available = "KML8-560095"

    s = BluetoothServer(data_received, power_up_device=True)
    s.start()
    pause()
