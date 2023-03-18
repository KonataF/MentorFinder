from Mentee import *
from Mentor import *
from User import *
import os
from flask import Flask, jsonify, render_template, request, url_for, redirect, session
import pymongo
import bcrypt
from database import Database
from MenteeObject import *
from MentorObject import *
import pprint
from dotenv import load_dotenv
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

    hashed_password = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())

    mentee = MenteeObject(email, hashed_password, bio)

    serialized_mentee = vars(mentee)

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

    if menteeFound:
        print(f"Mentor found {menteeFound}")
        passwordcheck = menteeFound['password']
        if bcrypt.checkpw(password.encode('utf8'), passwordcheck):
            session["email"] = menteeFound['email']
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

    hashed_password = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())

    mentor = MentorObject(email, hashed_password, bio)

    serialized_mentor = vars(mentor)

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

    if mentorFound:
        print(f"Mentor found {mentorFound}")
        passwordcheck = mentorFound['password']
        if bcrypt.checkpw(password.encode('utf8'), passwordcheck):
            session["email"] = mentorFound['email']
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


# logging in as mentor
@app.route("/logout", methods=['post', 'get'])
def logout():
    return jsonify(
        message="Logging out.."
    )


if __name__ == "__main__":
    load_dotenv()
    app.secret_key = os.environ.get("app_secret_key")
    app.config['SESSION_TYPE'] = 'filesystem'
    Database.initialize()
    app.run(debug=True)
