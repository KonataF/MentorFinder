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
        self.materialsCatalog = [] # NOT NEEDED?
        self.upvotedPosts = [] # NOT NEEDED?
        self.downvotedPosts = [] # NOT NEEDED?
        self.hubsList = [] # names of hubs part of
        self.experience = experience
        self.bio = bio
        self.notifications = []
        self.mentorList = []
        self.isProfileComplete = False
