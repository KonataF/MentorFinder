from Comment import Comment
from datetime import datetime


class Post:
    def __init__(self, authorId, title, content) -> None:
        self.authorId = authorId
        self.name = title
        self.date = datetime.today()
        self.time = datetime.now().strftime("%H:%M")
        self.numUpvotes = 0
        self.numDownvotes = 0
        self.content = content
        self.comments = []
