class Event:
    def __init__(self, id, time, date, location, guestList=[], description=""):
        self.id = id
        self.time = time
        self.date = date
        self.location = location
        self.guestList = guestList
        self.description = description
