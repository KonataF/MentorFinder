class MessageChannel:
    def __init__(self, id, textCollection, userSender, userReceiver) -> None:
        self.id = id
        self.textCollection = textCollection
        self.userSender = userSender
        self.userReciever = userReceiver
