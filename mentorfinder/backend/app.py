import time
from flask import Flask, jsonify, request, session
from database import Database
from dotenv import load_dotenv
import os
import json
import bcrypt
from Models.Mentee import Mentee
from Models.Mentor import Mentor

app = Flask(__name__)


@app.route("/admin", methods=['get'])
def admin():
    return {'time': "Hello from admin panel"}


@ app.route('/time')
def get_current_time():
    return {'time': time.time()}


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

            print(f"Mentor found {menteeFound}")

            passwordcheck = menteeFound['password']
            obj_id = menteeFound['_id']

            if bcrypt.checkpw(password.encode('utf8'), passwordcheck):

                session["email"] = menteeFound['email']

                return jsonify({"loggedIn": True, "objectId": str(obj_id)})

            else:

                return jsonify({"loggedIn": False})

    else:


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
