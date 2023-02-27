import pymongo
# import os

connectionURL = f"mongodb+srv://alishehbaz:lctVRFW5Khz2a0NS@mentorfinder.kjb2und.mongodb.net/?retryWrites=true&w=majority"

# myclient = pymongo.MongoClient(connectionURL)

# print(myclient)

# db = myclient["mydatabase"]

# collection = db["users"]
# print(db.list_collection_names())

# db.createCollection("user", {})

# print("collection created")


class Database:
    @classmethod
    def initialize(cls):
        connectionURL = f"mongodb+srv://{username}:{password}@mentorfinder.kjb2und.mongodb.net/?retryWrites=true&w=majority"
        client = pymongo.MongoClient(connectionURL)
        cls.database = client.get_database("MentorFinderDB")

    @classmethod
    def save_to_db(cls, data):
        cls.database.stores.insert_one(data)

    @classmethod
    def load_from_db(cls, query):
        return cls.database.stores.find(query)

    @classmethod
    def get_collections(cls):
        return cls.database.list_collection_names()


Database.initialize()
Database.save_to_db({"name": "Walmart", "location": "Venice, CA"})

loaded_objects = Database.load_from_db({"name": "Walmart"})
print(loaded_objects)

print(Database.get_collections())
