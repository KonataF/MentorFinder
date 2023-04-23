class CommunityHub:
    def __init__(self, id, hubName, postCollection, bannerPhoto, profilePic, memberList, owner, description) -> None:
        self.id = id
        self.hubName = hubName
        self.postCollection = postCollection
        self.bannerPhoto = bannerPhoto
        self.profilePic = profilePic
        self.memberList = memberList
        self.owner = owner
        self.description = description
        self.tags = []
