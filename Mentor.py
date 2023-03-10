from User import User


class Mentor(User):
    def __init__(self, id, maxCapacityNum=1) -> None:
        super().__init__(id)
        super().type = "mentor"
        self.menteesNum = 0
        self.menteeList = []
        self.maxCapacityNum = maxCapacityNum
        self.ifMaxCapacity = False
