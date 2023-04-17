class Comment:
    def __init__(self, id, postId, userId, name, date, time, content) -> None:
        self.id = id
        self.postId = postId
        self.userId = userId
        self.name = name
        self.date = date
        self.time = time
        self.numUpvotes = 0
        self.numDownvotes = 0
        self.content = content