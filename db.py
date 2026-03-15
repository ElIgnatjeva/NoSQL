from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27020")

db = client["edu"]

learners = db["learners"]
tutors = db["tutors"]
groups = db["groups"]
subjects = db["subjects"]
transcript = db["transcript"]