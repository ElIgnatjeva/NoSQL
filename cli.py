from db import learners, transcript
from bson import ObjectId

def menu():
    print("\n=== Student DB ===")
    print("1. Добавить студента")
    print("2. Показать студентов")
    print("3. Добавить оценку")
    print("4. Показать оценки студента")
    print("5. Выход")


def add_student():
    learner_id = input("ID студента: ")
    first = input("Имя: ")
    last = input("Фамилия: ")
    group = input("ID группы: ")

    learners.insert_one({
        "learner_id": learner_id,
        "first_name": first,
        "last_name": last,
        "group_id": ObjectId(group)
    })

    print("Студент добавлен")


def show_students():
    for s in learners.find():
        print(
            s["learner_id"],
            s["first_name"],
            s["last_name"]
        )


def add_grade():
    learner = input("ID студента: ")
    subject = input("ID предмета: ")
    grade = int(input("Оценка: "))

    transcript.insert_one({
        "learner_id": ObjectId(learner),
        "subject_id": ObjectId(subject),
        "grade": grade
    })

    print("Оценка добавлена")


def show_grades():
    learner = input("ID студента: ")

    results = transcript.find({
        "learner_id": ObjectId(learner)
    })

    for r in results:
        print(r)


def main():
    while True:
        menu()
        choice = input("Выберите: ")

        if choice == "1":
            add_student()

        elif choice == "2":
            show_students()

        elif choice == "3":
            add_grade()

        elif choice == "4":
            show_grades()

        elif choice == "5":
            break


if __name__ == "__main__":
    main()