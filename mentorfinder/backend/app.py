import time
from flask import Flask, jsonify, request
from database import Database
from dotenv import load_dotenv
import os
import json
import bcrypt
from Models import Mentee, Mentor

app = Flask(__name__)


@app.route("/admin", methods=['get'])
def admin():
    return {'time': "Hello from admin panel"}


@ app.route('/time')
def get_current_time():
    return {'time': time.time()}


@ app.route("/api/register", methods=['post', 'get'])
def register():

    message = ""

    email = request.json.get("email")
    password = request.json.get("password")
    user_type = request.json.get("userType")

    print(email, password, request.json.get("userType"))

    hashed_password = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())

    if user_type is "Mentee":

        mentee = Mentee(email, hashed_password, bio)

        serialized_mentee = vars(mentee)

        menteeCollection = Database.get_collection('mentee')

        search_result = menteeCollection.find_one({"email": email})

        if search_result is None:

            menteeCollection.insert_one(serialized_mentee)

            message = "you are registered now"

            return render_template('buildProfileMentee.html', message=message, menteeObj=mentee)

        # else:

        #     return jsonify(
        #         message="Someone with similar email exists, please log in"
        #     )

    return {"data": "ahhshhashsa"}


if __name__ == "__main__":
    load_dotenv()
    app.secret_key = os.environ.get("app_secret_key")
    app.config['SESSION_TYPE'] = 'filesystem'
    Database.initialize()
    app.run(debug=True)
