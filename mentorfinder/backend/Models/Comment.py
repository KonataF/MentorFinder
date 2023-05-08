from datetime import datetime


class Comment:
    def __init__(self, hubBelongingTo, postId, authorId, authorFullName, content) -> None:
        self.hubBelongingTo = hubBelongingTo
        self.postId = postId
        self.authorId = authorId
        self.authorFullName = authorFullName
        self.date = datetime.now().strftime("%Y-%m-%d")
        self.time = datetime.now().strftime("%H:%M")
        self.numUpvotes = 0
        self.upvoters = [] # list of user id's
        self.numDownvotes = 0
        self.downvoters = [] # list of user id's
        self.content = content
