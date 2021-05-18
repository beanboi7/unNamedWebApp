from instaloader import Profile
import instaloader
import csv
import io
import time
import json

followers = []
following = []
usernames = []
following_count = 0
follower_count = 0
count = 0

L = instaloader.Instaloader()
L.load_session_from_file("bumsbalakewk")

model = {}
unames = open("urls.csv", "r") 
for line in csv.reader(unames):
    usernames.append(line[0])




for u in usernames:
    profile = Profile.from_username(L.context, u)
        
    following_count = profile.followees
    print(following_count)
    follower_count = profile.followers
    print(follower_count)

    genre = profile.business_category_name
    bio = profile.biography
    name = profile.full_name

    final = [following_count, follower_count, bio, name, genre]

    model["following_count"] = following_count
    model["follower_count"] = follower_count
    model["bio"] = bio
    model["name"] = name
    model["genre"] = genre

    
    f = io.open("data.csv","a", encoding="utf-8")
    writer = csv.writer(f)
    writer.writerow(final)
    count+=1
    print("writing to csv: ", count)

    with open("data.json", 'a',newline="\n") as j:
        json.dump(model,j)


    print("writing to json: ", count)

    if count == 30:
        time.sleep(60.0)