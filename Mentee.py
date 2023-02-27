from User import User


class Mentee(User):
    def __init__(self, id, mentorsNum, mentorsList) -> None:
        super().__init__(id)
        self.mentorsNum = mentorsNum
        self.mentorList = mentorsList
