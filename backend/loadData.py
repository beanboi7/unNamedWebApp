import csv
f = "urls.csv"

dataList = []
with open(f,'r') as data:
    for line in csv.reader(data):
        dataList.append(line[0])

print(type(dataList[0]))


