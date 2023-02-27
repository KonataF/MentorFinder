class User:
    def __init__(self, id, name, username, password, profilePic, age, occupation, education,
                 experience, bio):
        self.id = id
        self.name = name
        self.username = username
        self.password = password
        self.profilePic = profilePic
        self.age = age
        self.occupation = occupation
        self.education = education
        self.areasOfInterests = []
        self.status = "offline"
        self.materialsCatalog = []
        self.upvotedPosts = []
        self.downvotedPosts = []
        self.hubsList = []
        self.type = ""
        self.experience = experience
        self.bio = bio
