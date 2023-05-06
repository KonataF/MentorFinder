import pymongo
from dotenv import load_dotenv
import os
import certifi


class Database:
    @classmethod
    def initialize(cls):
        load_dotenv()
        uname = os.environ.get("uname")
        db_key = os.environ.get("key")
        connectionURL = f"mongodb+srv://{uname}:{db_key}@mentorfinder.kjb2und.mongodb.net/?retryWrites=true&w=majority"
        print(connectionURL)
        client = pymongo.MongoClient(connectionURL, tlsCAFile=certifi.where())
        print(client.server_info())
        cls.database = client.get_database("MentorFinderDB")

    @classmethod
    def get_collections(cls):
        return cls.database.list_collection_names()

    @classmethod
    def get_collection(cls, collection):
        return cls.database[collection]
