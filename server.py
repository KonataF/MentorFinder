from flask import Flask, jsonify, render_template, request, url_for, redirect, session
import pymongo
import bcrypt

app = Flask(__name__)


@app.route("/", methods=['post', 'get'])
def index():
    print("Server up")
    return jsonify(
        message="Homepage"
    )
# TODO: signup page - route to return signuppage
# TODO: signup mentor - sign up mentor func
# TODO: signup mentee - sign up mentee func
# TODO: login page - route to return login


# load login page when at this route
@app.route("/login", methods=['post', 'get'])
def login():
    return render_template('login.html')

# TODO: login mentor - login mentor func
# TODO: login mentee - login mentee func


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
    app.run(debug=True)
