CREATE TABLE grades (id INTEGER PRIMARY KEY, student TEXT, name TEXT, status TEXT, punctuation INTEGER, possible INTEGER);
CREATE TABLE users (name TEXT, email TEXT, id INTEGER, role TEXT check(role='student' or role='teacher' or role='admin'), status TEXT check(status='active' or status='inactive'), password TEXT, sec_q1 TEXT, sec_q2 TEXT, sec_q3 TEXT);
CREATE TABLE courses (name TEXT, teacher TEXT, description TEXT, capacity INTEGER);
CREATE TABLE courses_students (course_name TEXT, user_id INTEGER);
CREATE TABLE courses_assignments (course_name TEXT, assignment_name TEXT);
CREATE TABLE assignments (name TEXT, due_date TEXT, points INTEGER, description TEXT);
CREATE TABLE courses_announcements (course_name TEXT, announcement_subject TEXT);
CREATE TABLE announcements (subject TEXT, body TEXT);

