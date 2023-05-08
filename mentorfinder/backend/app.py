import time
from flask import Flask, jsonify, request, session, render_template
from database import Database
from dotenv import load_dotenv
import os
import json
import bcrypt
from Models.Mentee import Mentee
from Models.Mentor import Mentor
from Models.Notification import Notification
from Models.CommunityHub import CommunityHub
from Models.post import Post
from Models.Comment import Comment
from bson.objectid import ObjectId
from bson import json_util

app = Flask(__name__)


@app.route("/admin", methods=['get'])
def admin():
    return {'time': "Hello from admin panel"}


@ app.route('/time')
def get_current_time():
    return {'time': time.time()}


@ app.route("/notifications/<action>/<userId>/<notification_from>", methods=['get'])
def process_notification_action(action, userId, notification_from):
    print(action, userId, notification_from)

    user_notifications = get_user_notifications('Mentor', userId)
    user_notifications_dict = json.loads(user_notifications)['data']

    menteeList = json.loads(get_user_connections("Mentor", userId))['data']

    if action == 'accept':

        print(menteeList)
        menteeList.append(notification_from)
        newvalues = {"$set": {"menteeList": menteeList}}

        print(user_notifications_dict)
        # for notification in user_notifications_dict:
        #     print(notification)
        #     if notification['notification_id']['$oid'] == notification_from:
        #         print(notification['notification_id']['$oid'])

        updationResult = Database.get_collection(
            'mentor').update_one({"_id": ObjectId(userId)}, newvalues)
        print(f"updation count: {updationResult.modified_count}")
        if updationResult.modified_count > 0:
            return jsonify({"notificationAccepted": True, "message": "mentor added to the list"})
        else:
            return jsonify({"notificationSent": False, "message": "mentor can't be added to the list"})

    else:
        for notification in user_notifications_dict:
            print(notification)
            if notification['notification_id']['$oid'] == notification_from:
                print(notification['notification_id']['$oid'])

        return {"data": "gello"}

    # return jsonify({"data": [action, userId, notification_from]})


@ app.route("/notifications/<typeOfUser>/<userId>", methods=['get'])
def get_user_notifications(typeOfUser, userId):
    print(f'fetching profile for {typeOfUser} : {userId}')

    userFound = ''

    if typeOfUser == 'Mentee':

        userFound = get_user_by_id('mentee', userId)

    else:

        userFound = get_user_by_id('mentor', userId)

    return json.dumps({"data": userFound['notifications']}, default=json_util.default)


@ app.route("/menteeList/<typeOfUser>/<userId>", methods=['get'])
@ app.route("/mentorList/<typeOfUser>/<userId>", methods=['get'])
def get_user_connections(typeOfUser, userId):
    print(f'fetching mentees/mentors for {typeOfUser} : {userId}')

    userFound = ''

    if typeOfUser == 'Mentee':

        userFound = get_user_by_id('mentee', userId)

        return json.dumps({"data": userFound['mentorList']}, default=json_util.default)

    else:

        userFound = get_user_by_id('mentor', userId)

    return json.dumps({"data": userFound['menteeList']}, default=json_util.default)


def get_user_by_id(collection_name, userId):

    collection = Database.get_collection(collection_name)

    userFound = collection.find_one(
        {"_id": ObjectId(userId)})

    return userFound


@ app.route("/profile/<typeOfUser>/<userId>", methods=['get'])
def get_user_data(typeOfUser, userId):

    print(f'fetching profile for {typeOfUser} : {userId}')

    userFound = ''

    if typeOfUser == 'Mentee':

        userFound = get_user_by_id('mentee', userId)

    else:

        userFound = get_user_by_id('mentor', userId)

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
    print(degree)
    mentors = list(Database.get_collection(
        'mentor').find({"education.degree": degree}))
    return json.dumps({"data": mentors}, default=json_util.default)


@ app.route("/api/push_notification", methods=['post'])
def push_notification():

    toId = request.json.get('mentorId')

    fromId = request.json.get('currentUserId')

    mentorCollection = Database.get_collection('mentor')

    userFound = mentorCollection.find_one(
        {"_id": ObjectId(toId)})

    print(userFound)

    query = {"_id": ObjectId(toId)}

    notification = Notification(ObjectId(), fromId, toId, "networking")

    user_notifications = userFound["notifications"]

    if user_notifications is None:
        user_notifications = []

    user_notifications.append(vars(notification))

    newvalues = {"$set": {"notifications": user_notifications}}

    updationResult = mentorCollection.update_one(query, newvalues)
    print(f"updation count: {updationResult.modified_count}")
    if updationResult.modified_count > 0:
        return jsonify({"notificationSent": True, "requestorsId": fromId, "requesteeId": toId, "message": "request sent to the mentor successfully"})
    else:
        return jsonify({"notificationSent": False, "requestorsId": fromId, "requesteeId": toId, "message": "notification failed"})

# helper route to get all the mentors from the db


@ app.route("/api/get_mentors", methods=['get'])
def get_mentors():
    mentors = list(Database.get_collection('mentor').find({}))
    return json.dumps({"data": mentors}, default=json_util.default)

# helper routes to get all the mentees from the db


@ app.route("/api/get_mentees", methods=['get'])
def get_mentees():
    mentees = list(Database.get_collection('mentee').find({}))
    return json.dumps({"data": mentees}, default=json_util.default)


@ app.route("/api/build_profile", methods=['post'])
def build_profile():
    user_type = request.json.get('userType')
    _id = request.json.get('userId')

    print(request.json)
    print(f'type of id is {type(_id)}')
    # print(f'updating records for {email}')

    query = {"_id": ObjectId(_id)}

    searchResultTemp = Database.get_collection('mentor').find_one(query)
    print(f'HERER FOUNF SOMETHING {searchResultTemp}')

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
                      "isProfileComplete": request.json.get('isProfileComplete')
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
                      "isProfileComplete": request.json.get('isProfileComplete')
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
                session["_id"] = menteeFound['_id']  # ADDED FOR MY USE
                session["type"] = "mentee"  # ADDED FOR MY USE
                session["fullName"] = menteeFound['fname'] + \
                    " " + menteeFound['lname']  # ADDED FOR MY USE

                return jsonify({"loggedIn": True, "objectId": str(obj_id)})
                # return json.dumps({"loggedIn": True, "objectId": str(obj_id)}, default=json_util.default)

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
                # session["email"] = mentorFound['email']
                # session["_id"] = mentorFound['_id']  # ADDED FOR MY USE
                # session["type"] = "mentee"  # ADDED FOR MY USE
                # session["fullName"] = mentorFound['fname'] + \
                #     " " + mentorFound['lname']  # ADDED FOR MY USE
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

    # searching for mentors


# @ app.route("/mentorSearch", methods=['post', 'get'])
# def mentorSearch():
#     # TODO: get rid of? not needed?
#     return render_template('mentorSearch.html')


@ app.route("/searchForMentors", methods=['post', 'get'])
def searchForMentors():
    name = request.args.get("name")
    company = request.args.get("company")
    position = request.args.get("position")
    college = request.args.get("college")
    educationLvl = request.args.get("educationLvl")
    areaOfInterest = request.args.get("areaOfInterest")

    #print(name, company, position)

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
        # company = company.lower() - account for case?
        query["occupation.company"] = company
    if position:
        query["occupation.position"] = position
    if college:
        query["education.college"] = college
    if educationLvl:  # if user has one of the two shown education lvls
        query["education.degree"] = educationLvl

    if areaOfInterest:  # if user has one of the two shown education lvls
        query["areasOfInterests"] = {'$in': [str(areaOfInterest)]}
        extraInfo = "area of interest given"
    else:
        extraInfo = "no area of interest given"

    print(f'query = {query}')
    # search for mentor with given query and show certain fields in results
    mentorsFound = list(mentorCollection.find(query, {
                        "_id": 0, "fname": 1, "lname": 1, "education": 1, "occupation": 1, "bio": 1, "areasOfInterests": 1}))
    print("SEARCH CURSOR HERRE")
    print(mentorsFound)
    if len(mentorsFound) == 0:
        # return render_template("mentorSearch.html", results=mentorsFound, queryGenerated=str(query), errorMessage="No mentors found using search given.") # OLD - FOR REF
        # return jsonify({"data": "hello world"})
        return jsonify({"results": mentorsFound, "errorMessage": "No mentors found using search given."})
    else:
        # return render_template("mentorSearch.html", results=mentorsFound, queryGenerated=str(query)) # OLD - FOR REF
        return jsonify({"results": mentorsFound})


# searching for mentees
# @ app.route("/menteeSearch", methods=['post', 'get'])
# def menteeSearch():
#     # TODO: get rid of? not needed?
#     return render_template('menteeSearch.html')


@ app.route("/searchForMentees", methods=['post', 'get'])
def searchForMentees():
    name = request.args.get("name")
    company = request.args.get("company")
    position = request.args.get("position")
    college = request.args.get("college")
    areaOfInterest = request.args.get("areaOfInterest")

    print(name, company, position)

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
        # company = company.lower() - account for case?
        query["occupation.company"] = company
    if position:
        query["occupation.position"] = position
    if college:
        query["education.college"] = college

    if areaOfInterest:  # if user has one of the two shown education lvls
        query["areasOfInterests"] = {'$in': [str(areaOfInterest)]}
        extraInfo = "area of interest given"
    else:
        extraInfo = "no area of interest given"

    # search for mentor with given query and show certain fields in results
    menteesFound = list(menteeCollection.find(query, {
                        "_id": 0, "fname": 1, "lname": 1, "education": 1, "occupation": 1, "bio": 1, "areasOfInterests": 1}))
    # print(query, menteesFound)
    if len(menteesFound) == 0:
        # return render_template("menteeSearch.html", results=menteesFound, errorMessage="No mentees found using search given.") - OLD - FOR REF
        return jsonify({"results": menteesFound, "errorMessage": "No mentees found using search given."})
    else:
        # return render_template("menteeSearch.html", results=menteesFound) - OLD - FOR REF
        return jsonify({"results": menteesFound})

# creating community hubs


@ app.route("/communityHubCreation", methods=['post', 'get'])
def communityHubCreation():
    # TODO: get rid of? not needed?
    return render_template('communityHubCreation.html')


@ app.route("/createCommunityHub", methods=['post', 'get'])
def createCommunityHub():
    # temp
    ''' 
    session["email"] = mentorFound['email']
    session["_id"] = mentorFound['_id'] # ADDED FOR MY USE
    session["type"]= "mentor"
    # testing
    session["email"] = "hi@hi.com"
    session["_id"] = '64500f395a232e2e59ed1990'
    session["type"]= "mentor"
    '''

    name = request.args.get("hubName")
    description = request.args.get("description")
    tags = request.args.get("tags")
    tags = tags.split(',')
    banner = request.args.get("banner")
    pfp = request.args.get("pfp")

    newHub = CommunityHub(name, session["_id"], description, tags, banner, pfp)

    serialized_hub = vars(newHub)

    hubCollection = Database.get_collection('communityHub')

    search_result = hubCollection.find_one({"hubName": name})

    # check if hub with same name already exists
    if search_result is None:
        hubCollection.insert_one(serialized_hub)
        userCollection = Database.get_collection(session["type"])
        # add to owner's list of hubs they're part of
        '''
        # #TODO: NOT WORKING
        curr_hub = list(hubCollection.find({"hubName": name}))[0]
        curr_hub_id = curr_hub["_id"]  # get id of current hub
        userCollection.update_one({"_id": session["_id"]}, {
                                  "$push": {"hubsList": curr_hub_id}})
        '''
        # ALTERNATIVE:
        # add hub name to list of hubs current user is part of
        userCollection.update_one({"_id": session["_id"]}, {
                                  "$push": {"hubsList": name}})

        # return render_template('communityHubCreation.html', message="Your hub was successfully created", curr_hub_id=curr_hub_id) - OLD - FOR REF
        # return jsonify({"message": "Your hub was successfully created", "curr_hub_id": curr_hub_id})
        return jsonify({"message": "Your hub was successfully created", "hubName": name})
    else:
        # return render_template('communityHubCreation.html', message="A hub with this name already exists. Please try a different name") - OLD - FOR REF
        return jsonify({"message": "A hub with this name already exists. Please try a different name"})

# searching for community hubs


@ app.route("/communityHubSearch", methods=['post', 'get'])
def communityHubSearch():
    # TODO: get rid of ? not needed?
    return render_template('communityHubSearch.html')

# searching for community hubs


@ app.route("/searchForCommunityHubs", methods=['post', 'get'])
def searchForCommunityHubs():
    searchName = request.args.get("name")
    searchKeyword = request.args.get("keywords")

    print(searchName, searchKeyword)

    # splitting up input and creating long query to search for
    hubCollection = Database.get_collection('communityHub')
    query = {}

    # search by checking if search name given is found in title of hub (also accounts for if user begins to type a hub name)
    if searchName:
        query["hubName"] = {'$regex': str(searchName)}
    # search keyword in tags - checks each keyword and sees if it is part of any tags
    if searchKeyword:
        searchKeywords = searchKeyword.split(",")
        query["tags"] = {'$in': searchKeywords}

    # search for mentor with given query and show certain fields in results
    hubsFound = list(hubCollection.find(query, {
                     "_id": 0, "hubName": 1, "memberList": 1, "owner": 1, "description": 1, "tags": 1}))
    print(f'Query for communuty hubs is {query}')
    print(hubsFound)
    if len(hubsFound) == 0:
        # return render_template("communityHubSearch.html", results=hubsFound, queryGenerated=str(query), errorMessage="No hubs found using search given.") - OLD - FOR REF
        return jsonify({"results": hubsFound, "errorMessage": "No hubs found using search given."})
    else:
        # return render_template("communityHubSearch.html", results=hubsFound, queryGenerated=str(query)) - OLD - FOR REF
        return jsonify({"results": hubsFound})


@ app.route('/communityHubs')
def getAllCommunityHubs():
    communityHubs = list(Database.get_collection('communityHub').find({}))
    return json.dumps({"data": communityHubs}, default=json_util.default)


# displaying individual hub info display and feed
@ app.route("/communityHubSpace/<hubId>", methods=['post', 'get'])
def communityHubSpace(hubId):
    temp_id = '64503200584ff630f60bac3e'  # for testing
    hubCollection = Database.get_collection('communityHub')
    hubInfo = hubCollection.find_one({"_id": temp_id}, {
                                     "hubName": 1, "bannerPhoto": 1, "profilePic": 1, "owner": 1, "description": 1, "tags": 1})

    print(hubId)
    # getting feed to display
    postCollection = Database.get_collection('post')
    feedPosts = postCollection.find({"hubBelongingTo": hubId}).sort("_id", -1)
    # sort posts in chronological order from most recent to least
    # feedPosts.sort({"date": -1, "time": -1})
    # feedPosts.sort("date": -1)

    # return jsonify({"hubInfo": hubInfo, "feedPosts": list(feedPosts)})
    # return jsonify({"hubDataFetched": True, "hubInfo": hubInfo, "objectId": str(_id), "message": "mentee profile built successfully"})
    # print(list(feedPosts))
    # return json.dumps({"hubInfo": hubInfo, "feedPosts": list(feedPosts)}, default=json_util.default)
    # return jsonify({"data": list(feedPosts)})
    return json.dumps({"data": list(feedPosts)}, default=json_util.default)

# joining a hub - DONE CODING - NEEDS TO BE TESTED


@ app.route("/joinHub/<hubName>", methods=['post', 'get'])
def joinHub(hubName):
    # add to list of hubs user is part of
    userCollection = Database.get_collection(session["type"])
    userCollection.update_one({"_id": session["_id"]}, {
                              "$push": {"hubsList": hubName}})

    # add user to member list of hub
    hubCollection = Database.get_collection('communityHub')
    hubCollection.update_one({"hubName": hubName}, {
                             "$push": {"memberList": session["_id"]}})

    # don't need to return anything (?)

# please don't use the session variables for id, it has to come from frontend - Ali
# display following list  - DONE CODING - NEEDS TO BE TESTED


@ app.route("/showHubsMemberOf", methods=['post', 'get'])
def showHubsMemberOf():
    userCollection = Database.get_collection(session["type"])
    currentUserInfo = list(userCollection.find({"_id": session["_id"]}))[
        0]  # list of one dict -> just dict of user info
    # list of hub names user is part of
    followingHubsList = currentUserInfo["hubsList"]

    hubCollection = Database.get_collection("communityHub")
    hubsFollowingInfo = list(hubCollection.find(
        {"hubName": {'$in': followingHubsList}}))

    if len(hubsFollowingInfo) == 0:  # if the user isn't a member of any hub
        return jsonify({"results": hubsFollowingInfo, "message": "Expand your network and find a hub to join!"})
    else:
        return jsonify({"results": hubsFollowingInfo})


# create a post in hub
@app.route("/createPost", methods=['post', 'get'])
def createPost():
    session["hub"] = '64503200584ff630f60bac3e'  # temp
    session["_id"] = '64500f395a232e2e59ed1990'  # temp
    session["fullName"] = "Rob Lee"  # temp
    title = request.args.get("post_title")
    content = request.args.get("post_content")

    newPost = Post(session["hub"], session["_id"],
                   session["fullName"], title, content)

    serialized_post = vars(newPost)

    postCollection = Database.get_collection('post')

    postCollection.insert_one(serialized_post)

    # refresh with post on feed
    # return render_template('communityHubSpace.html', message="Your post was successfully created", extraInfo=str(serialized_post)) - OLD - FOR REF
    return jsonify({"message": "Your post was successfully created", "extraInfo": str(serialized_post)})

# upvote a post - DONE CODING - NEEDS TO BE TESTED


@app.route("/upvotePost/<postId>", methods=['post', 'get'])
def upvotePost(postId):
    # add current user to list of upvoter id's
    postCollection = Database.get_collection('post')
    postCollection.update_one(
        {"_id": postId}, {"$push": {"upvoters": session["_id"]}})

    # increment number of upvotes by 1
    postCollection.update_one({"_id": postId}, {"$inc": {"numUpvotes": 1}})

# remove upvote from a post - DONE CODING - NEEDS TO BE TESTED


@app.route("/removeUpvotePost/<postId>", methods=['post', 'get'])
def removeUpvotePost(postId):
    # remove current user from list of upvoter id's
    postCollection = Database.get_collection('post')
    postCollection.update_one(
        {"_id": postId}, {"$pull": {"upvoters": session["_id"]}})

    # decrement number of upvotes by 1
    postCollection.update_one({"_id": postId}, {"$inc": {"numUpvotes": -1}})

# downvote a post - DONE CODING - NEEDS TO BE TESTED


@app.route("/downvotePost/<postId>", methods=['post', 'get'])
def downvotePost(postId):
    # add current user to list of upvoter id's
    postCollection = Database.get_collection('post')
    postCollection.update_one(
        {"_id": postId}, {"$push": {"downvoters": session["_id"]}})

    # increment number of upvotes by 1
    postCollection.update_one({"_id": postId}, {"$inc": {"numDownvotes": 1}})

# remove downvote from a post - DONE CODING - NEEDS TO BE TESTED


@app.route("/removeDownvotePost/<postId>", methods=['post', 'get'])
def removeDownvotePost(postId):
    # remove current user from list of upvoter id's
    postCollection = Database.get_collection('post')
    postCollection.update_one(
        {"_id": postId}, {"$pull": {"downvoters": session["_id"]}})

    # decrement number of upvotes by 1
    postCollection.update_one({"_id": postId}, {"$inc": {"numDownvotes": -1}})


# create a comment on a post in hub
@app.route("/createComment", methods=['post', 'get'])
def createComment():
    session["hub"] = '64503200584ff630f60bac3e'  # temp
    session["postId"] = '6450b199c4794601feb562fa'  # temp
    session["_id"] = '64500f395a232e2e59ed1990'  # temp
    session["fullName"] = "Rob Lee"  # temp

    content = request.args.get("comment_content")

    newComment = Comment(
        session["hub"], session["postId"], session["_id"], session["fullName"], content)

    serialized_comment = vars(newComment)

    commentCollection = Database.get_collection('comment')

    commentCollection.insert_one(serialized_comment)

    # refresh with post on feed
    # return render_template('communityHubSpace.html', message="Your comment was successfully created", extraInfo=str(serialized_comment)) - OLD - FOR REF
    return jsonify({"message": "Your post was successfully created", "extraInfo": str(serialized_comment)})

# hi
# upvote a comment - DONE CODING - NEEDS TO BE TESTED


@app.route("/upvoteComment/<commentId>", methods=['post', 'get'])
def upvoteComment(commentId):
    # add current user to list of upvoter id's
    commentCollection = Database.get_collection('comment')
    commentCollection.update_one(
        {"_id": commentId}, {"$push": {"upvoters": session["_id"]}})

    # increment number of upvotes by 1
    commentCollection.update_one(
        {"_id": commentId}, {"$inc": {"numUpvotes": 1}})

# remove upvote from a comment - DONE CODING - NEEDS TO BE TESTED


@app.route("/removeUpvoteComment/<commentId>", methods=['post', 'get'])
def removeUpvoteComment(commentId):
    # remove current user from list of upvoter id's
    commentCollection = Database.get_collection('comment')
    commentCollection.update_one(
        {"_id": commentId}, {"$pull": {"upvoters": session["_id"]}})

    # decrement number of upvotes by 1
    commentCollection.update_one(
        {"_id": commentId}, {"$inc": {"numUpvotes": -1}})

# downvote a comment - DONE CODING - NEEDS TO BE TESTED


@app.route("/downvoteComment/<commentId>", methods=['post', 'get'])
def downvoteComment(commentId):
    # add current user to list of upvoter id's
    commentCollection = Database.get_collection('comment')
    commentCollection.update_one(
        {"_id": commentId}, {"$push": {"downvoters": session["_id"]}})

    # increment number of upvotes by 1
    commentCollection.update_one(
        {"_id": commentId}, {"$inc": {"numDownvotes": 1}})

# remove downvote from a comment - DONE CODING - NEEDS TO BE TESTED


@app.route("/removeDownvoteComment/<postId>", methods=['post', 'get'])
def removeDownvoteComment(commentId):
    # remove current user from list of upvoter id's
    commentCollection = Database.get_collection('comment')
    commentCollection.update_one(
        {"_id": commentId}, {"$pull": {"downvoters": session["_id"]}})

    # decrement number of upvotes by 1
    commentCollection.update_one(
        {"_id": commentId}, {"$inc": {"numDownvotes": -1}})


# logging out
@ app.route("/logout", methods=['post', 'get'])
def logout():
    if "email" in session:
        session.pop("email", None)
        # session["email"] = mentorFound['email'] # i added
        session["_id"] = None  # ADDED FOR MY USE
        session["type"] = None  # ADDED FOR MY USE
    return jsonify(
        message="Logging out.."
    )


if __name__ == "__main__":
    load_dotenv()
    app.secret_key = os.environ.get("app_secret_key")
    app.config['SESSION_TYPE'] = 'filesystem'
    Database.initialize()
    app.run(debug=True)
