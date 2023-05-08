from datetime import datetime


class Post:
    def __init__(self, hubBelongingTo, authorId, authorFullName, title, content) -> None:
        self.hubBelongingTo = hubBelongingTo
        self.authorId = authorId
        self.authorFullName = authorFullName
        self.date = datetime.now().strftime("%Y-%m-%d")
        self.time = datetime.now().strftime("%H:%M")
        self.title = title
        self.numUpvotes = 0
        self.upvoters = [] # list of user id's
        self.numDownvotes = 0
        self.downvoters = [] # list of user id's
        self.content = content
        #self.comments = []
