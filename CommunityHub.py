class CommunityHub:
    def __init__(self, hubName, owner, description, tags, bannerPhoto="", profilePic="") -> None:
        self.hubName = hubName
        self.postCollection = []
        self.bannerPhoto = bannerPhoto
        self.profilePic = profilePic
        self.memberList = [owner]
        self.owner = owner
        self.description = description
        self.tags = tags
