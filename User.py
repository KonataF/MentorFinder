class User:
    def __init__(self, id, name, email, username, password, dob, occupation, education,
                 experience, bio,  profilePic='', type=""):
        self.id = id
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
        self.type = type
        self.experience = experience
        self.bio = bio
