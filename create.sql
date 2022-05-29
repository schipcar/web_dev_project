/* Make tables */
CREATE TABLE grades (email TEXT, name TEXT, user INTEGER, punctuation INTEGER, possible INTEGER, course_name TEXT, PRIMARY KEY (name, user));
CREATE TABLE users (name TEXT, email TEXT, user INTEGER, role TEXT check(role='student' or role='teacher' or role='admin'), status TEXT check(status='active' or status='inactive'), password TEXT, sec_q1 TEXT, sec_q2 TEXT, sec_q3 TEXT, sec_a1 TEXT, sec_a2 TEXT, sec_a3 TEXT, PRIMARY KEY (user));
CREATE TABLE courses (name TEXT, teacher TEXT, description TEXT, enrolled INTEGER, capacity INTEGER, PRIMARY KEY (name));
CREATE TABLE courses_students (course_name TEXT, user TEXT);
CREATE TABLE assignments (assignment_name TEXT, course_name TEXT, due_date TEXT, points INTEGER, description TEXT, PRIMARY KEY (assignment_name, course_name));
CREATE TABLE courses_announcements (course_name TEXT, announcement_subject TEXT);
CREATE TABLE announcements (subject TEXT, body TEXT, PRIMARY KEY (subject, body));


/* Populate the tables with dummy data for testing */
INSERT INTO grades VALUES ("anasof@uchicago.edu", "Homework 1", "12345678", 100, 100, "Web Development");
/*INSERT INTO grades VALUES ("alex@uchicago.edu", "Homework 1", "12131981", 100, 100, "Web Development");*/
/*INSERT INTO grades VALUES ("carly@uchicago.edu", "Homework 1", "34567890", 85, 100, "Web Development");*/
/*INSERT INTO grades VALUES ("anasof@uchicago.edu", "Homework 2", "12345678", 80, 80, "Web Development");*/

INSERT INTO users VALUES ("Ana Sofia", "anasof@uchicago.edu", "12345678", "student", "active", "mynameisanasof", "", "", "", "", "", "");
INSERT INTO users VALUES ("Alex", "alex@uchicago.edu", "12131981", "student", "active", "mynameisalex", "", "", "", "", "", "");
INSERT INTO users VALUES ("Carly", "carly@uchicago.edu", "34567890", "student", "active", "mynameiscarly", "", "", "", "", "", "");
INSERT INTO users VALUES ("Rafi", "rafi@uchicago.edu", "00112233", "teacher", "active", "mynameisrafi", "", "", "", "", "", "");

INSERT INTO courses VALUES ("Web Development", "Rafi", "This is the course description for Web Development", 40, 50);
INSERT INTO courses VALUES ("Machine Learning", "Chenhao", "This is the course description for Machine Learning", 30, 30);
INSERT INTO courses VALUES ("Algorithms", "Gerry", "This is the course description for Algorithms", 35, 40);
INSERT INTO courses VALUES ("Web Development 2", "Rafi", "This is the course description for Web Development 2", 8, 10);

INSERT INTO courses_students VALUES ("Web Development", "12345678");
INSERT INTO courses_students VALUES ("Web Development", "12131981");
INSERT INTO courses_students VALUES ("Web Development", "34567890");
INSERT INTO courses_students VALUES ("Machine Learning", "12345678");
INSERT INTO courses_Students VALUES ("Machine Learning", "12131981");
INSERT INTO courses_students VALUES ("Algorithms", "12345678");

INSERT INTO assignments VALUES ("Homework 1", "Web Development", "04/20/2022", 100, "This is the description for HW1");
INSERT INTO assignments VALUES ("Homework 2", "Web Development", "05/17/2022", 100, "This is the description for HW2");
INSERT INTO assignments VALUES ("Homework 3", "Web Development", "06/02/2022", 100, "This is the description for HW3");
INSERT INTO assignments VALUES ("Homework 4", "Web Development", "06/10/2022", 100, "This is the description for HW4");
INSERT INTO assignments VALUES ("Project 1", "Machine Learning", "06/01/2022", 100, "This is the description for Project 1");

INSERT INTO announcements VALUES ("HW deadline pushed back", "HW3 will now be due on Friday. Good luck!");
INSERT INTO announcements VALUES ("Pop quiz", "There will be a pop quiz in class tomorrow. Good luck!");

INSERT INTO courses_announcements VALUES ("Web Development", "HW deadline pushed back");
INSERT INTO courses_announcements VALUES ("Web Development", "Pop quiz");
