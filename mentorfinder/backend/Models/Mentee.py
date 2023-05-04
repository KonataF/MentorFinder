class Mentee:
    def __init__(self, fname, lname, email, password, bio='', username='', dob='', occupation='', education='', experience='',  profilePic=''):
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
        self.mentorList = []
        self.isProfileComplete = False


'''
from User import User


class Mentee(User):
    def __init__(self, id, name, email, username, password, dob, occupation, education,
                 experience, bio,  profilePic='', mentorList=[]) -> None:
        super().__init__(id, name, email, username, password, dob, occupation, education,
                         experience, bio, profilePic, type="mentee")
        self.mentorList = mentorList
'''