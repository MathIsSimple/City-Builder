import urllib.request
import os

dir    = "../../../client/"
files  = os.listdir(dir);
for a in os.listdir(dir+"javascript/files/"):
    files.append(dir+"javascript/files/"+a)
for a in os.listdir(dir+"javascript/libraries/"):
    files.append(dir+"javascript/libraries/"+a)
for a in os.listdir(dir+"sounds/"):
    files.append(dir+"sounds/"+a)
for a in os.listdir(dir+"Previews/"):
    files.append(dir+"Previews/"+a)
for a in os.listdir(dir+"images/avatars/"):
    files.append(dir+"images/avatars/"+a)
for a in os.listdir(dir+"images/creatures/"):
    files.append(dir+"images/creatures/"+a)
for a in os.listdir(dir+"images/tiles/"):
    files.append(dir+"images/tiles/"+a)
for a in os.listdir(dir+"images/backgrounds/"):
    files.append(dir+"images/backgrounds/"+a)
for a in os.listdir(dir+"images/gui/"):
    files.append(dir+"images/gui/"+a)
for a in os.listdir(dir+"css/libs/"):
    files.append(dir+"css/libs/"+a)
for a in os.listdir(dir+"css/files/"):
    files.append(dir+"css/files/"+a)

def loop():
    for i in range(len(files)):
        if '.' not in files[i]:
            files.remove(files[i])
            loop()
            break

loop()

for file in files:
    url = "http://localhost/"+str(file.replace(dir, ''))
    contents = urllib.request.urlopen(url).read()
