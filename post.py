from Comment import Comment


class Post:
    def __init__(self, id, userId, name, date, time, content) -> None:
        self.id = id
        self.userId = userId
        self.name = name
        self.date = date
        self.time = time
        self.numUpvotes = 0
        self.numDownvotes = 0
        self.content = content
        self.comments = []
