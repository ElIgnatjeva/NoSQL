from faker import Faker
from db import learners

fake = Faker()

def generate_students(n=10000):

    for i in range(n):

        learners.insert_one({
            "learner_id": f"S0{i}",
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "enrollment_year": 2024
        })

        if i % 1000 == 0:
            print("Inserted", i)

generate_students()