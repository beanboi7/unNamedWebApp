import instaloader
from instaloader.structures import Profile
import csv



def extractCSV(s):
    dataList = []
    data = open(s,'r')
    for line in csv.reader(data):
        dataList.append(line[0])
    return dataList

def getUserInfo(dataList):
    count =0
    L = instaloader.Instaloader()

    userName = "killerbean7_"

    L.load_session_from_file(userName)

    finalData = []

    for url in dataList:
        _id = url.strip("https://www.instagram.com/")
        _id = _id.rstrip("/")
        profile = Profile.from_username(L.context, _id)

        following = []
        following_count = 0
        followers = []
        followers_count = 0

        print("Getting from: " ,profile.username)

        for f in profile.get_followees():
            following.append(f.username)
        following_count = len(following)

        for f in profile.get_followers():
            followers.append(f.username)
        followers_count = len(followers)
        bio = profile.biography
        #print("bio:", bio)

        name = profile.full_name
        #print("name:", name)

        catergory = profile.business_category_name
        #print("genre: ", catergory)

        finalData += [followers_count, following_count, bio, name, catergory]
        print("Adding user no:", count)
        count+=1
    return finalData

def makeCSV(data):
    try:
        f = open('data.csv', 'rw', newline='')
        writer = csv.writer(f)
        writer.writerows(data)
        print("done converting to csv")
    except:
        print("error caught")

    

f = "urls.csv"
urls = []
urls = extractCSV(f)

data = getUserInfo(urls)
makeCSV(data)