import time
from flask import Flask, jsonify, request, session
from database import Database
from dotenv import load_dotenv
import os
import json
import bcrypt
from Models.Mentee import Mentee
from Models.Mentor import Mentor
from bson.objectid import ObjectId
from bson import json_util

app = Flask(__name__)


@app.route("/admin", methods=['get'])
def admin():
    return {'time': "Hello from admin panel"}


@ app.route('/time')
def get_current_time():
    return {'time': time.time()}


@ app.route("/profile/<typeOfUser>/<userId>", methods=['get'])
def get_user_data(typeOfUser, userId):

    print(f'fetching profile for {typeOfUser} : {userId}')

    userFound = ''

    if typeOfUser == 'Mentee':

        menteeCollection = Database.get_collection('mentee')

        userFound = menteeCollection.find_one(
            {"_id": ObjectId(userId)})

    else:

        mentorCollection = Database.get_collection('mentor')

        userFound = mentorCollection.find_one(
            {"_id": ObjectId(userId)})

    print(userFound)

    if userFound:
        print(f"Mentee found {userFound}")
        print(type(userFound))
        return json.dumps({"data": userFound}, default=json_util.default)

    else:
        return json.dumps({'userFound': False, "message": f"{typeOfUser} not found"})


@ app.route("/api/search", methods=['get'])
def search():
    degree = request.args.get("degree")
    mentors = list(Database.get_collection(
        'mentor').find({"education.degree": degree}))
    return json.dumps({"data": mentors}, default=json_util.default)


@ app.route("/api/get_mentors", methods=['get'])
def get_mentors():
    mentors = list(Database.get_collection('mentor').find({}))
    return json.dumps({"data": mentors}, default=json_util.default)


@ app.route("/api/get_mentees", methods=['get'])
def get_mentees():
    mentees = list(Database.get_collection('mentee').find({}))
    return json.dumps({"data": mentees}, default=json_util.default)


@ app.route("/api/build_profile", methods=['post'])
def build_profile():
    user_type = request.json.get('userType')
    _id = request.json.get('_id')

    print(request.json)

    # print(f'updating records for {email}')

    query = {"_id": ObjectId(_id)}

    if user_type == "Mentor":

        mentorCollection = Database.get_collection('mentor')

        newvalues = {"$set":
                     {"name": request.json.get('name'),
                      "username": request.json.get('username'),
                      "profilePic": request.json.get('profilepic'),
                      "dob": request.json.get('dob'),
                      "occupation": request.json.get('occupation'),
                      "education": request.json.get('education'),
                      "areasOfInterests": request.json.get('area_of_interest'),
                      "bio": request.json.get('bio'),
                      "experience": request.json.get('experience'),
                      "maxCapacityNum": request.json.get('max_mentees'),
                      }}

        updationResult = mentorCollection.update_one(query, newvalues)
        print(f"updation count: {updationResult.modified_count}")
        if updationResult.modified_count > 0:
            return jsonify({"updated": True, "objectId": str(_id), "message": "mentor profile built successfully"})
        else:
            return jsonify({"updated": True, "objectId": str(_id), "message": "mentor profile completion unsuccessful"})

    else:

        menteeCollection = Database.get_collection('mentee')

        newvalues = {"$set":
                     {"name": request.json.get('name'),
                      "username": request.json.get('username'),
                      "profilePic": request.json.get('profilepic'),
                      "dob": request.json.get('dob'),
                      "occupation": request.json.get('occupation'),
                      "education": request.json.get('education'),
                      "areasOfInterests": request.json.get('area_of_interest'),
                      "bio": request.json.get('bio'),
                      "experience": request.json.get('experience'),
                      "maxCapacityNum": request.json.get('max_mentees'),
                      }}

        updationResult = menteeCollection.update_one(query, newvalues)
        print(f"updation count: {updationResult.modified_count}")
        if updationResult.modified_count > 0:
            return jsonify({"updated": True, "objectId": str(_id), "message": "mentee profile built successfully"})
        else:
            return jsonify({"updated": True, "objectId": str(_id), "message": "mentee profile completion unsuccessful"})


@ app.route("/api/login", methods=['post'])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
    user_type = request.json.get("userType")

    if user_type == "Mentee":

        menteeCollection = Database.get_collection('mentee')

        menteeFound = menteeCollection.find_one(
            {"email": email})

        if menteeFound:

            print(f"Mentee found {menteeFound}")

            passwordcheck = menteeFound['password']
            obj_id = menteeFound['_id']

            # check password
            if bcrypt.checkpw(password.encode('utf8'), passwordcheck):

                session["email"] = menteeFound['email']

                return jsonify({"loggedIn": True, "objectId": str(obj_id)})

            else:

                return jsonify({"loggedIn": False, "message": "incorrect password"})

        else:

            return jsonify({"loggedIn": False, "message": "incorrect username"})

    else:

        mentorCollection = Database.get_collection('mentor')

        mentorFound = mentorCollection.find_one(
            {"email": email})

        if mentorFound:
            obj_id = mentorFound['_id']
            print(f"Mentor found {mentorFound}")
            passwordcheck = mentorFound['password']
            if bcrypt.checkpw(password.encode('utf8'), passwordcheck):
                session["email"] = mentorFound['email']

                return jsonify({"loggedIn": True, "objectId": str(obj_id)})

            else:
                print(f"Mentor not found {mentorFound}")
                return jsonify({"loggedIn": False, "message": "incorrect password"})

        else:

            return jsonify({"loggedIn": False, "message": "incorrect username"})


@ app.route("/api/register", methods=['post'])
def register():

    f_name = request.json.get("firstName")
    l_name = request.json.get("lastName")
    email = request.json.get("email")
    password = request.json.get("password")
    user_type = request.json.get("userType")

    print(email, password, request.json.get("userType"))

    hashed_password = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())

    if user_type == "Mentee":

        mentee = Mentee(f_name, l_name, email, hashed_password)

        print(f'Registering Mentee {mentee.email}')

        serialized_mentee = vars(mentee)

        menteeCollection = Database.get_collection('mentee')

        search_result = menteeCollection.find_one({"email": email})

        if search_result is None:

            obj_id = menteeCollection.insert_one(serialized_mentee).inserted_id

            print("mentee registered")

            return jsonify({"registered": True, "objectId": str(obj_id)})

        else:

            return jsonify({"registered": False})

    else:

        mentor = Mentor(f_name, l_name, email, hashed_password)

        print(f'Registering Mentor {mentor.fname}')

        serialized_mentor = vars(mentor)

        mentorCollection = Database.get_collection('mentor')

        search_result = mentorCollection.find_one({"email": email})

        if search_result is None:

            obj_id = mentorCollection.insert_one(
                serialized_mentor).inserted_id

            return jsonify({"registered": True, "objectId": str(obj_id)})

        else:
            print(search_result)

            return jsonify({"registered": False})


if __name__ == "__main__":
    load_dotenv()
    app.secret_key = os.environ.get("app_secret_key")
    app.config['SESSION_TYPE'] = 'filesystem'
    Database.initialize()
    app.run(debug=True)
