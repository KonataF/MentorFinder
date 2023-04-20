class MentorObject:
    def __init__(self,  email, password,  bio, username='', dob='', occupation='', education='', experience='',  profilePic='', userType='',  name=''):
        self.name = name
        self.email = email
        self.username = username
        self.password = password
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
        self.maxCapacityNum = 0
        self.menteeList = []
        self.ifMaxCapacity = False
