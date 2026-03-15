    // ========================================
    // 1. Создание базы данных
    // ========================================
    db.dropDatabase();

    use edu;

    // ========================================
    // 2. Создание коллекций
    // ========================================
    db.createCollection("learners");
    db.createCollection("tutors");
    db.createCollection("groups");
    db.createCollection("subjects");
    db.createCollection("transcript");
    db.createCollection("semesters");

    // ========================================
    // 3. Создание индексов
    // ========================================

    // ---- learners ----
    db.learners.createIndex({ learner_id: 1 }, { unique: true });
    db.learners.createIndex({ group_id: 1 });

    // ---- tutors ----
    db.tutors.createIndex({ tutor_id: 1 }, { unique: true });

    // ---- groups ----
    db.groups.createIndex({ group_code: 1 }, { unique: true });

    // ---- subjects ----
    db.subjects.createIndex({ subject_code: 1 }, { unique: true });
    db.subjects.createIndex({ tutor_id: 1 });
    db.subjects.createIndex({ semester: 1 });

    // ---- transcript ----
    db.transcript.createIndex({ learner_id: 1, subject_id: 1 });
    db.transcript.createIndex({ subject_id: 1 });
    db.transcript.createIndex({ semester: 1 });

    // ========================================
    // 4. Тестовые данные
    // ========================================

    // ---- Groups ----
    const group1 = db.groups.insertOne({
        group_code: "B22-IS-01",
        faculty: "Институт информатики",
        year: 2022
        }).insertedId;

    const group2 = db.groups.insertOne({
        group_code: "B22-CS-02",
        faculty: "Институт информатики",
        year: 2022
        }).insertedId;

    // ---- tutors ----
    const tutor1 = db.tutors.insertOne({
        tutor_id: "T101",
        first_name: "Пётр",
        last_name: "Петров",
        department: "Кафедра программирования"
        }).insertedId;

    const tutor2 = db.tutors.insertOne({
        tutor_id: "T102",
        first_name: "Светлана",
        last_name: "Иванова",
        department: "Кафедра математики"
        }).insertedId;

    // ---- learners ----
    const learner1 = db.learners.insertOne({
        learner_id: "S1001",
        first_name: "Иван",
        last_name: "Иванов",
        group_id: group1,
        enrollment_year: 2022
        }).insertedId;

    const learner2 = db.learners.insertOne({
        learner_id: "S1002",
        first_name: "Мария",
        last_name: "Соколова",
        group_id: group1,
        enrollment_year: 2022
        }).insertedId;

    const learner3 = db.learners.insertOne({
        learner_id: "S1003",
        first_name: "Антон",
        last_name: "Смирнов",
        group_id: group2,
        enrollment_year: 2022
        }).insertedId;

    // ---- Semesters ----
    db.semesters.insertMany([
        {
            code: "2024-Fall",
            start: ISODate("2024-09-01"),
            end: ISODate("2024-12-30")
            },
        {
            code: "2025-Spring",
            start: ISODate("2025-02-05"),
            end: ISODate("2025-06-15")
            },
        {
            code: "2025-Fall",
            start: ISODate("2025-09-01"),
            end: ISODate("2025-12-30")
            }
        ]);

    // ---- subjects ----
    const subject1 = db.subjects.insertOne({
        subject_code: "CS101",
        name: "Программирование",
        tutor_id: tutor1,
        semester: "2024-Fall"
        }).insertedId;

    const subject2 = db.subjects.insertOne({
        subject_code: "MATH201",
        name: "Высшая математика",
        tutor_id: tutor2,
        semester: "2024-Fall"
        }).insertedId;

    // ---- transcript ----
    db.transcript.insertMany([
        {
            learner_id: learner1,
            subject_id: subject1,
            grade: 95,
            grade_type: "exam",
            date: ISODate("2024-12-15"),
            semester: "2024-Fall"
            },
        {
            learner_id: learner2,
            subject_id: subject2,
            grade: 88,
            grade_type: "exam",
            date: ISODate("2024-12-18"),
            semester: "2024-Fall"
            },
        {
            learner_id: learner2,
            subject_id: subject1,
            grade: 76,
            grade_type: "test",
            date: ISODate("2024-12-10"),
            semester: "2024-Fall"
            },
        {
            learner_id: learner3,
            subject_id: subject2,
            grade: 82,
            grade_type: "exam",
            date: ISODate("2024-12-19"),
            semester: "2024-Fall"
            }
        ]);