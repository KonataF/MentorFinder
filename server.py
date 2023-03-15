from Mentee import *
from Mentor import *
from User import *
from flask import Flask, jsonify, render_template, request, url_for, redirect, session
import pymongo
import bcrypt
from database import Database


app = Flask(__name__)


@app.route("/", methods=['post', 'get'])
def index():
    return render_template('index.html')


@app.route("/login", methods=['post', 'get'])
def loginAsMentor():
    return render_template('login.html')


@app.route("/signupAsMentor", methods=['post', 'get'])
def signupAsMentor():
    return render_template('signupAsMentor.html')


@app.route("/signupAsMentee", methods=['post', 'get'])
def signupAsMentee():
    return render_template('signupAsMentee.html')


@app.route("/signupMentor", methods=['post', 'get'])
def signupMentor():

    name = request.form.get("name")
    email = request.form.get("email")
    username = request.form.get("username")
    password = request.form.get("password")
    profilePic = request.form.get("profilePic")
    dob = request.form.get("dob")
    occupation = request.form.get("occupation")
    education = request.form.get("education")
    experience = request.form.get("experience")
    bio = request.form.get("bio")
    maxCapacityNum = request.form.get("maxNumOfMentees")

    u1 = Mentor(23, name, email, username, password, dob, occupation,
                education, experience, bio, profilePic, maxCapacityNum)

    print("Sign up page triggered")
    return jsonify(
        message="Sign up page here"
    )


@app.route("/signupMentee", methods=['post', 'get'])
def signupMentee():

    name = request.form.get("name")
    email = request.form.get("email")
    username = request.form.get("username")
    password = request.form.get("password")
    profilePic = request.form.get("profilePic")
    dob = request.form.get("dob")
    occupation = request.form.get("occupation")
    education = request.form.get("education")
    experience = request.form.get("experience")
    bio = request.form.get("bio")

    u1 = Mentee(32, name, email, username, password, dob, occupation, education, experience,
                bio, profilePic)

    print("Sign up page triggered")
    return jsonify(
        message="Sign up for mentees page here"
    )


@app.route("/login", methods=['post', 'get'])
def login():

    email = request.form.get("email")
    password = request.form.get("password")

    user_records = {}
    user_password = ''

    if email in user_records:
        if password is user_password:
            return render_template('home.html')

    else:
        return jsonify(
            message="User email is incorrect or user does not exist, please sign up"
        )


# logging in as mentor
@app.route("/mentorAuth", methods=['post', 'get'])
def mentorAuth():
    print("Login")
    # return html for login page
    return jsonify(
        message="hello  world"
    )


@app.route("/menteeAuth", methods=['post', 'get'])
def menteeAuth():
    print("Register")

    return jsonify(
        message="hello  world"
    )


if __name__ == "__main__":
    Database.initialize()
    app.run(debug=True)
