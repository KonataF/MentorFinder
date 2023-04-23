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
import pymongo

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


@ app.route("/profile/<typeOfUser>/<username>", methods=['post', 'get'])
def profile(typeOfUser, username):
    print(f'fetching profile for {typeOfUser} : {username}')
    # return render_template('myProfile.html')

    userFound = ''

    if typeOfUser == 'mentee':

        menteeCollection = Database.get_collection('mentee')

        userFound = menteeCollection.find_one(
            {"username": username})

    else:

        mentorCollection = Database.get_collection('mentor')

        userFound = mentorCollection.find_one(
            {"username": username})

    if userFound:
        print(f"Mentee found {userFound}")
        return render_template('myProfile.html', profile=userFound)

    else:
        return render_template('404.html')


@app.route("/admin", methods=['post', 'get'])
def admin():

    mentees = list(Database.get_collection('mentee').find({}))

    mentors = list(Database.get_collection('mentor').find({}))

    print(mentees, mentors)

    return render_template('adminView.html', mentees=mentees, mentors=mentors)


@ app.route("/registerMentee", methods=['post', 'get'])
def registerMentee():

    message = ""

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

        message = "you are registered now"

        return render_template('buildProfileMentee.html', message=message, menteeObj=mentee)

    else:

        return jsonify(
            message="Someone with similar email exists, please log in"
        )


# logging in as mentor
@ app.route("/menteeAuth", methods=['post', 'get'])
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


@ app.route("/buildMenteeProfile", methods=['post', 'get'])
def buildMenteeProfile():
    print(request.form)
    email = request.form.get("email")

    formData = request.form

    menteeCollection = Database.get_collection('mentee')

    print(f'updating records for {email}')

    query = {"email": email}

    newvalues = {"$set":
                 {"name": request.form.get('name'),
                  "username": request.form.get('username'),
                  "profilePic": request.form.get('profilepic'),
                  "dob": request.form.get('dob'),
                  "occupation": request.form.get('occupation'),
                  "education": request.form.get('education'),
                  "areasOfInterests": request.form.get('area_of_interest'),
                  "bio": request.form.get('bio'),
                  "experience": request.form.get('experience'),
                  "maxCapacityNum": request.form.get('max_mentees'),
                  }}

    updationResult = menteeCollection.update_one(query, newvalues)
    print(f"updation count: {updationResult.modified_count}")
    if updationResult.modified_count > 0:
        return render_template('myProfile.html', profile=formData)
        # return jsonify(
        #     message="Your profile building is complete"
        # )
    else:
        return jsonify(
            message="Error while building a profi"
        )


@ app.route("/buildMentorProfile", methods=['post', 'get'])
def buildMentorProfile():
    print(request.form)
    email = request.form.get("email")

    mentorCollection = Database.get_collection('mentor')

    print(f'updating records for {email}')

    query = {"email": email}

    newvalues = {"$set":
                 {"name": request.form.get('name'),
                  "username": request.form.get('username'),
                  "profilePic": request.form.get('profilepic'),
                  "dob": request.form.get('dob'),
                  "occupation": request.form.get('occupation'),
                  "education": request.form.get('education'),
                  "areasOfInterests": request.form.get('area_of_interest'),
                  "bio": request.form.get('bio'),
                  "experience": request.form.get('experience'),
                  "maxCapacityNum": request.form.get('max_mentees'),
                  }}

    updationResult = mentorCollection.update_one(query, newvalues)

    if updationResult.modified_count > 0:
        return jsonify(
            message="Your profile building as a mentor is complete"
        )
    else:
        return jsonify(
            message="Error while building a profi"
        )


@ app.route("/registerMentor", methods=['post', 'get'])
def registerMentor():
    message = ''
    email = request.form.get("email")
    password = request.form.get("password")
    bio = request.form.get("bio")

    hashed_password = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())

    mentor = MentorObject(email, hashed_password, bio)

    print(f'Registering {mentor.email}')

    serialized_mentor = vars(mentor)

    mentorCollection = Database.get_collection('mentor')

    search_result = mentorCollection.find_one({"email": email})

    if search_result is None:

        mentorCollection.insert_one(serialized_mentor)
        message = "You are Registered as a mentor"
        return render_template('buildProfileMentor.html', message=message, mentorObj=mentor)

    else:
        print(search_result)
        return jsonify(
            message="Someone with similar email exists, please log in"
        )


# logging in as mentor
@ app.route("/mentorAuth", methods=['post', 'get'])
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


# searching for mentors
@ app.route("/mentorSearch", methods=['post', 'get'])
def mentorSearch():
    return render_template('mentorSearch.html')

@ app.route("/searchForMentors", methods=['post', 'get'])
def searchForMentors():
    name = request.args.get("name")
    company = request.args.get("company")
    position = request.args.get("position")
    college = request.args.get("college")
    educationLvl = request.args.get("educationLvl")
    areaOfInterest = request.args.get("areaOfInterest")

    # splitting up input and creating long query to search for
    mentorCollection = Database.get_collection('mentor')
    query = {}

    if name:
        nameSplit = name.split()
        if len(nameSplit) == 1:
            # check for if single name given is either someone's first or last name
            query["$or"] = [{"fname": nameSplit[0]}, {"lname": nameSplit[0]}] 
        if len(nameSplit) == 2:
            fname = nameSplit[0]
            lname = nameSplit[1]
            query["fname"] = fname
            query["lname"] = lname
    if company:
        #company = company.lower() - account for case?
        query["occupation.company"] = company
    if position:
        query["occupation.position"] = position
    if college:
        query["education.college"] = college
    if educationLvl: # if user has one of the two shown education lvls
        query["education.degree"] = educationLvl

    if areaOfInterest: # if user has one of the two shown education lvls
        query["areasOfInterests"] =  {'$in' : [str(areaOfInterest)] }
        extraInfo = "area of interest given"
    else:
        extraInfo = "no area of interest given"


    # search for mentor with given query and show certain fields in results
    mentorsFound = list(mentorCollection.find(query, { "_id": 0, "fname": 1, "lname": 1, "education": 1, "occupation": 1, "bio": 1, "areasOfInterests": 1 }))
    
    if len(mentorsFound) == 0:
        return render_template("mentorSearch.html",results = mentorsFound, queryGenerated=str(query), errorMessage ="No mentors found using search given.")
    else:
        return render_template("mentorSearch.html",results = mentorsFound, queryGenerated=str(query)) 

    
# searching for mentees
@ app.route("/menteeSearch", methods=['post', 'get'])
def menteeSearch():
    return render_template('menteeSearch.html')

@ app.route("/searchForMentees", methods=['post', 'get'])
def searchForMentees():
    name = request.args.get("name")
    company = request.args.get("company")
    position = request.args.get("position")
    college = request.args.get("college")
    areaOfInterest = request.args.get("areaOfInterest")

    # splitting up input and creating long query to search for
    menteeCollection = Database.get_collection('mentee')
    query = {}

    if name:
        nameSplit = name.split()
        if len(nameSplit) == 1:
            # check for if single name given is either someone's first or last name
            query["$or"] = [{"fname": nameSplit[0]}, {"lname": nameSplit[0]}] 
        if len(nameSplit) == 2:
            fname = nameSplit[0]
            lname = nameSplit[1]
            query["fname"] = fname
            query["lname"] = lname
    if company:
        #company = company.lower() - account for case?
        query["occupation.company"] = company
    if position:
        query["occupation.position"] = position
    if college:
        query["education.college"] = college

    if areaOfInterest: # if user has one of the two shown education lvls
        query["areasOfInterests"] =  {'$in' : [str(areaOfInterest)] }
        extraInfo = "area of interest given"
    else:
        extraInfo = "no area of interest given"


    # search for mentor with given query and show certain fields in results
    menteesFound = list(menteeCollection.find(query, { "_id": 0, "fname": 1, "lname": 1, "education": 1, "occupation": 1, "bio": 1, "areasOfInterests": 1 }))
    
    if len(menteesFound) == 0:
        #return render_template("mentorSearch.html",results = menteesFound, queryGenerated=str(query), errorMessage ="No mentees found using search given.") - for testing
        return render_template("menteeSearch.html",results = menteesFound, errorMessage ="No mentees found using search given.")
    else:
        #return render_template("mentorSearch.html",results = menteesFound, queryGenerated=str(query))  - for testing
        return render_template("menteeSearch.html",results = menteesFound) 

# creating community hubs
@ app.route("/communityHubCreation", methods=['post', 'get'])
def communityHubCreation():
    return render_template('communityHubCreation.html')

@ app.route("/createCommunityHub", methods=['post', 'get'])
def createCommunityHub():
    return render_template('createCommunityHub.html')

# searching for community hubs
@ app.route("/communityHubSearch", methods=['post', 'get'])
def communityHubSearch():
    return render_template('communityHubSearch.html')

@ app.route("/searchForCommunityHubs", methods=['post', 'get'])
def searchForCommunityHubs():
    searchName = request.args.get("searchName")
    searchKeyword = request.args.get("searchKeyword")

    # splitting up input and creating long query to search for
    hubCollection = Database.get_collection('communityHub')
    query = {}

    # search by checking if search name given is found in title of hub (also accounts for if user begins to type a hub name)
    if searchName:
        query["hubName"] =  {'$regex': str(searchName)}
    # search keyword in tags - checks each keyword and sees if it is part of any tags
    if searchKeyword:
        searchKeywords = searchKeyword.split(",")
        query["tags"] =  {'$in': searchKeywords}
        #for keyword in searchKeywords:
        #    query["tags"] =  {'$in': str(keyword)}

    # search for mentor with given query and show certain fields in results
    hubsFound = list(hubCollection.find(query, { "_id": 0, "hubName": 1, "memberList": 1, "owner": 1, "description": 1, "tags": 1 }))
    

    if len(hubsFound) == 0:
        return render_template("communityHubSearch.html",results = hubsFound, queryGenerated=str(query), errorMessage ="No mentees found using search given.")
        #return render_template("communityHubSearch.html",results = hubsFound, errorMessage ="No hubs found using search given.")
    else:
        return render_template("communityHubSearch.html",results = hubsFound, queryGenerated=str(query)) 
        #return render_template("communityHubSearch.html",results = hubsFound) 


# logging in as mentor
@ app.route("/logout", methods=['post', 'get'])
def logout():
    if "email" in session:
        session.pop("email", None)
    return jsonify(
        message="Logging out.."
    )


if __name__ == "__main__":
    load_dotenv()
    app.secret_key = os.environ.get("app_secret_key")
    app.config['SESSION_TYPE'] = 'filesystem'
    Database.initialize()
    app.run(debug=True)

