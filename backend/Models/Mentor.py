class Mentor:
    def __init__(self,  fname, lname, email, password,  bio='', username='', dob='', occupation='', education='', experience='',  profilePic=''):
        self.fname = fname
        self.lname = lname
        self.email = email
        self.password = password
        self.username = username
        self.profilePic = profilePic
        self.dob = dob
        self.occupation = occupation
        self.education = education
        self.areasOfInterests = []
        self.status = "offline"
        self.materialsCatalog = []
        self.upvotedPosts = []
        self.downvotedPosts = []
        self.hubsList = []
        self.experience = experience
        self.bio = bio
        self.maxCapacityNum = 0
        self.menteeList = []
        self.ifMaxCapacity = False
        self.isProfileComplete = False




'''

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


# class StoreSchema(Schema):
#     name = fields.Str()
#     location = fields.Str()
'''