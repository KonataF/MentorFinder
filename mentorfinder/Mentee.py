from User import User


class Mentee(User):
    def __init__(self, id, name, email, username, password, dob, occupation, education,
                 experience, bio,  profilePic='', mentorList=[]) -> None:
        super().__init__(id, name, email, username, password, dob, occupation, education,
                         experience, bio, profilePic, type="mentee")
        self.mentorList = mentorList
