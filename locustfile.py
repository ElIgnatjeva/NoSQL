from locust import User, task, events
from pymongo import MongoClient
import random
import time
import uuid



class MongoUser(User):

    def on_start(self):
        self.client = MongoClient("mongodb://localhost:27020")
        self.db = self.client.edu
        self.learners = self.db.learners


    @task(3)
    def read_student(self):

        sid = f"S0{random.randint(1,10000)}"

        start = time.time()

        try:

            list(self.learners.find({"learner_id": sid}))

            response_time = (time.time() - start) * 1000

            events.request.fire(
                request_type="MongoDB",
                name="find_student",
                response_time=response_time,
                response_length=1,
                exception=None
            )

        except Exception as e:

            response_time = (time.time() - start) * 1000

            events.request.fire(
                request_type="MongoDB",
                name="find_student",
                response_time=response_time,
                response_length=0,
                exception=e
            )


    @task(1)
    def insert_student(self):

        sid = str(uuid.uuid4())

        start = time.time()

        try:

            self.learners.insert_one({
                "learner_id": sid,
                "first_name": "Load",
                "last_name": "Test"
            })

            response_time = (time.time() - start) * 1000

            events.request.fire(
                request_type="MongoDB",
                name="insert_student",
                response_time=response_time,
                response_length=1,
                exception=None
            )

        except Exception as e:

            response_time = (time.time() - start) * 1000

            events.request.fire(
                request_type="MongoDB",
                name="insert_student",
                response_time=response_time,
                response_length=0,
                exception=e
            )