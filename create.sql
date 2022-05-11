/* Make tables */
CREATE TABLE grades (id INTEGER PRIMARY KEY, student TEXT, name TEXT, status TEXT, punctuation INTEGER, possible INTEGER);
CREATE TABLE users (name TEXT, email TEXT, id INTEGER, role TEXT check(role='student' or role='teacher' or role='admin'), status TEXT check(status='active' or status='inactive'), password TEXT, sec_q1 TEXT, sec_q2 TEXT, sec_q3 TEXT);
CREATE TABLE courses (name TEXT, teacher TEXT, description TEXT, capacity INTEGER);
CREATE TABLE courses_students (course_name TEXT, user_id INTEGER);
CREATE TABLE courses_assignments (course_name TEXT, assignment_name TEXT);
CREATE TABLE assignments (name TEXT, due_date TEXT, points INTEGER, description TEXT);
CREATE TABLE courses_announcements (course_name TEXT, announcement_subject TEXT);
CREATE TABLE announcements (subject TEXT, body TEXT);


/* Populate the tables with dummy data for testing */
INSERT INTO users VALUES ("Ana Sofia", "anasof@uchicago.edu", 0001, "student", "active", "mynameisanasof", "", "", "");
INSERT INTO users VALUES ("Alex", "alex@uchicago.edu", 0002, "student", "active", "mynameisalex", "", "", "");
INSERT INTO users VALUES ("Carly", "carly@uchicago.edu", 0003, "student", "active", "mynameiscarly", "", "", "");
INSERT INTO users VALUES ("Rafi", "rafi@uchicago.edu", 0004, "teacher", "active", "mynameisrafi", "", "", "");

INSERT INTO courses VALUES ("Web Development", "Rafi", "This is the course description for Web Development", 50);
INSERT INTO courses VALUES ("Machine Learning", "Chenhao", "This is the course description for Machine Learning", 30);
INSERT INTO courses VALUES ("Algorithms", "Gerry", "This is the course description for Algorithms", 40);

INSERT INTO courses_students VALUES ("Web Development", 0001);
INSERT INTO courses_students VALUES ("Web Development", 0002);
INSERT INTO courses_students VALUES ("Web Development", 0003);
INSERT INTO courses_students VALUES ("Machine Learning", 0001);
INSERT INTO courses_Students VALUES ("Machine Learning", 0002);
INSERT INTO courses_students VALUES ("Algorithms", 0001);

INSERT INTO courses_assignments VALUES ("Web Development", "Homework 1");
INSERT INTO courses_assignments VALUES ("Web Development", "Homework 2");
INSERT INTO courses_assignments VALUES ("Web Development", "Homework 3");
INSERT INTO courses_assignments VALUES ("Web Development", "Homework 4");

INSERT INTO assignments VALUES ("Homework 1", "04/20/2022", 100, "This is the description for HW1");
INSERT INTO assignments VALUES ("Homework 2", "04/27/2022", 100, "This is the description for HW2");
INSERT INTO assignments VALUES ("Homework 3", "05/13/2022", 100, "This is the description for HW3");
INSERT INTO assignments VALUES ("Homework 4", "05/31/2022", 100, "This is the description for HW3");

INSERT INTO announcements VALUES ("HW deadline pushed back", "HW3 will now be due on Friday. Good luck!");
INSERT INTO announcements VALUES ("Pop quiz", "There will be a pop quiz in class tomorrow. Good luck!");

INSERT INTO courses_announcements VALUES ("Web Development", "HW deadline pushed back");
INSERT INTO courses_announcements VALUES ("Web Development", "Pop quiz");
