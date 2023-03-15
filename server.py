from Mentee import *
from Mentor import *
from User import *
from flask import Flask, jsonify, render_template, request, url_for, redirect, session
import pymongo
import bcrypt
from database import Database
from MenteeObject import *
from MentorObject import *
import pprint

app = Flask(__name__)


@app.route("/", methods=['post', 'get'])
def index():
    return render_template('index.html')


@app.route("/loginAsMentor", methods=['post', 'get'])
def loginAsMentor():
    return render_template('loginAsMentor.html')


@app.route("/loginAsMentee", methods=['post', 'get'])
def loginAsMentee():
    return render_template('loginAsMentee.html')


@app.route("/signupAsMentor", methods=['post', 'get'])
def signupAsMentor():
    return render_template('signupAsMentor.html')


@app.route("/signupAsMentee", methods=['post', 'get'])
def signupAsMentee():
    return render_template('signupAsMentee.html')


@app.route("/registerMentee", methods=['post', 'get'])
def registerMentee():
    email = request.form.get("email")
    password = request.form.get("password")
    bio = request.form.get("bio")

    mentee = MenteeObject(email, password, bio)

    serialized_mentee = vars(mentee)

    # don't store the passwords in plaintext
    menteeCollection = Database.get_collection('mentee')

    search_result = menteeCollection.find_one({"email": email})

    if search_result is None:

        menteeCollection.insert_one(serialized_mentee)

        return jsonify(
            message="You are Registered"
        )

    else:

        return jsonify(
            message="Someone with similar email exists, please log in"
        )


# logging in as mentor
@app.route("/menteeAuth", methods=['post', 'get'])
def menteeAuth():

    email = request.form.get("email")
    password = request.form.get("password")

    print(f'email {email} : password {password}')

    menteeCollection = Database.get_collection('mentee')

    menteeFound = menteeCollection.find_one(
        {"email": email})

    if menteeFound is not None:
        print(f"Mentor found {menteeFound}")
        if password == menteeFound['password']:

            return jsonify(
                message="Welcome"
            )

        else:

            return jsonify(
                message="Incorrect Password"
            )

    else:
        print(f"Mentor not found {menteeFound}")
        return jsonify(
            message="User not found, please register"
        )


@app.route("/registerMentor", methods=['post', 'get'])
def registerMentor():
    email = request.form.get("email")
    password = request.form.get("password")
    bio = request.form.get("bio")

    mentor = MentorObject(email, password, bio)

    serialized_mentor = vars(mentor)

    # don't store the passwords in plaintext
    mentorCollection = Database.get_collection('mentor')

    search_result = mentorCollection.find_one({"email": email})

    if search_result is None:

        mentorCollection.insert_one(serialized_mentor)

        return jsonify(
            message="You are Registered as a mentor"
        )

    else:
        print(search_result)
        return jsonify(
            message="Someone with similar email exists, please log in"
        )


# logging in as mentor
@app.route("/mentorAuth", methods=['post', 'get'])
def mentorAuth():

    email = request.form.get("email")
    password = request.form.get("password")

    print(f'email {email} : password {password}')

    mentorCollection = Database.get_collection('mentor')

    mentorFound = mentorCollection.find_one(
        {"email": email})

    if mentorFound is not None:
        print(f"Mentor found {mentorFound}")
        if password == mentorFound['password']:

            return jsonify(
                message="Welcome"
            )

        else:

            return jsonify(
                message="Incorrect Password"
            )

    else:
        print(f"Mentor not found {mentorFound}")
        return jsonify(
            message="User not found, please register"
        )

# @ app.route("/signupMentor", methods=['post', 'get'])
# def signupMentor():

#     name = request.form.get("name")

#     username = request.form.get("username")
#     password = request.form.get("password")
#     profilePic = request.form.get("profilePic")
#     dob = request.form.get("dob")
#     occupation = request.form.get("occupation")
#     education = request.form.get("education")
#     experience = request.form.get("experience")
#     bio = request.form.get("bio")
#     maxCapacityNum = request.form.get("maxNumOfMentees")

#     u1 = Mentor(23, name, email, username, password, dob, occupation,
#                 education, experience, bio, profilePic, maxCapacityNum)

#     print("Sign up page triggered")
#     return jsonify(
#         message="Sign up page here"
#     )


# @ app.route("/signupMentee", methods=['post', 'get'])
# def signupMentee():

#     name = request.form.get("name")
#     email = request.form.get("email")
#     username = request.form.get("username")
#     password = request.form.get("password")
#     profilePic = request.form.get("profilePic")
#     dob = request.form.get("dob")
#     occupation = request.form.get("occupation")
#     education = request.form.get("education")
#     experience = request.form.get("experience")
#     bio = request.form.get("bio")

#     u1 = Mentee(32, name, email, username, password, dob, occupation, education, experience,
#                 bio, profilePic)

#     print("Sign up page triggered")
#     return jsonify(
#         message="Sign up for mentees page here"
#     )


if __name__ == "__main__":
    Database.initialize()
    app.run(debug=True)
