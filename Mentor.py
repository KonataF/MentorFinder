from User import User
from marshmallow import Schema, fields


class Mentor(User):
    def __init__(self, id, name, email, username, password, dob, occupation, education,
                 experience, bio,  profilePic='', maxCapacityNum=1, menteeList=[], ifMaxCapacity=False) -> None:
        super().__init__(id, name, email, username, password, dob, occupation, education,
                         experience, bio, profilePic, type="mentor")
        self.maxCapacityNum = maxCapacityNum
        self.menteeList = menteeList
        self.ifMaxCapacity = ifMaxCapacity

    def get_number_of_mentees(self):
        return len(self.menteeList)


class StoreSchema(Schema):
    name = fields.Str()
    location = fields.Str()
