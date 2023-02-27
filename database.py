import pymongo
import os
from dotenv import load_dotenv

load_dotenv()

connectionURL = f"mongodb+srv://username:password@mentorfinder.kjb2und.mongodb.net/?retryWrites=true&w=majority"

myclient = pymongo.MongoClient(connectionURL)

print(myclient)

db = myclient["mydatabase"]

db.createCollection("user", {})

print("collection created")
