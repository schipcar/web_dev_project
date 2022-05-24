function add_announcement_form() {

    div = document.createElement("div");
    div.className = 'announcement_form';
    div.id = 'announcement_form_div';

    subject_prompt = document.createElement("p");
    text_prompt = document.createElement("p");

    subject_prompt.innerHTML = 'Announcement Subject:';
    text_prompt.innerHTML = 'Announcement Text:';

    subject_box = document.createElement("input");
    text_box = document.createElement("textarea");

    subject_box.className = 'announcement_form';
    text_box.className = 'announcement_form';

    subject_box.setAttribute("type", "text");
    text_box.rows = '4';

    submit_button = document.createElement("button");
    submit_button.innerHTML = 'Submit';
    submit_button.addEventListener("click", function() {
        document.getElementById('announcement_form_div').remove();
    })

    linebreak = document.createElement("br");

    div.appendChild(subject_prompt);
    div.appendChild(subject_box);
    div.appendChild(linebreak);
    div.appendChild(text_prompt);
    div.appendChild(text_box);
    div.appendChild(linebreak);
    div.appendChild(submit_button);
    document.getElementById('main_panel').appendChild(div);

}


function add_assignment_form() {

    div = document.createElement("div");
    div.className = 'assignment_form';
    div.id = 'assignment_form_div';

    name_prompt = document.createElement("p");
    duedate_prompt = document.createElement("p");
    points_prompt = document.createElement("p");
    description_prompt = document.createElement("p");

    name_prompt.innerHTML = 'Assignment Name:';
    duedate_prompt.innerHTML = 'Due Date:';
    points_prompt.innerHTML = 'Point Total:';
    description_prompt.innerHTML = 'Description:';

    name_box = document.createElement("input");
    duedate_box = document.createElement("input");
    points_box = document.createElement("input");
    description_box = document.createElement("textarea");

    name_box.className = 'announcement_form';
    duedate_box.className = 'announcement_form';
    points_box.className = 'announcement_form';
    description_box.className = 'announcement_form';

    name_box.setAttribute("type", "text");
    duedate_box.setAttribute("type", "text");
    points_box.setAttribute("type", "text");
    description_box.rows = '4';

    submit_button = document.createElement("button");
    submit_button.innerHTML = 'Submit';
    submit_button.addEventListener("click", function() {
        document.getElementById('assignment_form_div').remove();
    })

    linebreak = document.createElement("br");

    div.appendChild(name_prompt);
    div.appendChild(name_box);
    div.appendChild(linebreak);
    div.appendChild(duedate_prompt);
    div.appendChild(duedate_box);
    div.appendChild(linebreak);
    div.appendChild(points_prompt);
    div.appendChild(points_box);
    div.appendChild(linebreak);
    div.appendChild(description_prompt);
    div.appendChild(description_box);
    div.appendChild(linebreak);
    div.appendChild(submit_button);
    document.getElementById('main_panel').appendChild(div);

}


function add_submission_form() {

    div = document.createElement("div");
    div.className = 'assignment_form';
    div.id = 'assignment_form_div';

    text_box = document.createElement("textarea");
    text_box.className = 'assignment_form';
    text_box.rows = '4';

    submit_button = document.createElement("button");
    submit_button.innerHTML = 'Submit';
    submit_button.addEventListener("click", function() {
        document.getElementById('assignment_form_div').remove();
    })

    linebreak = document.createElement("br");

    div.appendChild(text_box);
    div.appendChild(linebreak);
    div.appendChild(submit_button);
    document.getElementById('main_panel').appendChild(div);

}

function searchUsers() {
    let searchVal = document.getElementById("name_email_search").value.toLowerCase();
    let usersList = document.getElementById("users_list");
    for (i = 0; i < usersList.children.length; i++) {
        let user = usersList.children[i];
        let name = user.children[0].innerHTML.toLowerCase();
        let email = user.children[2].innerHTML.toLowerCase().split("@", 1)[0];
        if (name.includes(searchVal) || email.includes(searchVal)) {
            if (user.style.display == "none") {
                let activityState = user.children[7].innerHTML;
                if (activityState == "Active") {
                    let activeCheckbox = document.getElementById("active_users_checkbox");
                    if (activeCheckbox.checked) {
                        user.style.display = "block";
                    }
                }
                else {
                    let inactiveCheckbox = document.getElementById("inactive_users_checkbox");
                    if (inactiveCheckbox.checked) {
                        user.style.display = "block";
                    }
                }
            }
        }
        else {
            if (user.style.display != "none") {
                user.style.display = "none";
            }
        }
    }
}

function toggleUserDisplay(activityState) {
    let checkbox;
    if (activityState == "Active") {
        checkbox = document.getElementById("active_users_checkbox");
    }
    else {
        checkbox = document.getElementById("inactive_users_checkbox");
    }

    let usersList = document.getElementById("users_list");
    for (i = 0; i < usersList.children.length; i++) {
        let user = usersList.children[i];
        if (user.children[10].innerHTML == activityState + " |") {
            if (checkbox.checked) {
                let searchVal = document.getElementById("name_email_search").value.toLowerCase();
                let name = user.children[0].innerHTML.toLowerCase();
                let email = user.children[2].innerHTML.toLowerCase();
                if (name.includes(searchVal) || email.includes(searchVal)) {
                    user.style.display = "block";
                }
            }
            else {
                user.style.display = "none";
            }
        }
    }
}



var sqlite3 = require('sqlite3').verbose();
var http = require('http');
    fs = require('fs');
    url = require('url');
    request = require('request');
    myParser = require("body-parser");
    express = require("express");
    pag = require('https');
    db = 0
var grades_row = 2;
var courses_row_student;
var courses_row_teacher;
var announcements_row;
var all_assignments_row_student;
var all_assignments_row_teacher
var course_assignments_row;
var all_courses;
var all_users;

var db = new sqlite3.Database('./canvas.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    db.all("SELECT * FROM grades", function(err, row) {
      grades_row=row
    });
});



var app = express();
app.use(myParser.urlencoded({ extended: true }));

http.createServer(function(request, response){
  var path = url.parse(request.url).pathname;
  if(path=="/getdictionary"){
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');
      const jsonContent = JSON.stringify(grades_row);
      response.end(jsonContent);
      console.log(jsonContent);
  }
}).listen(8080);
console.log("server initialized");

app.get("/getcourses_student", function(req, response){
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');
      db.all("SELECT * FROM courses WHERE name IN (SELECT course_name FROM courses_students WHERE user = ?)", [req.query.user], function(err, row) {
        courses_row_student=row
        const jsonContent = JSON.stringify(courses_row_student);
        response.send(jsonContent);
        console.log(jsonContent);
      });
})
app.listen(8090, function() {
  console.log("server initialized");
})

app.get("/getcourses_teacher", function(req, response){
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');
      db.all("SELECT * FROM courses WHERE teacher = (SELECT name FROM users WHERE user = ?)", [req.query.user], function(err, row) {
        courses_row_teacher=row
        const jsonContent = JSON.stringify(courses_row_teacher);
        response.send(jsonContent);
        console.log(jsonContent);
      });
})
app.listen(8095, function() {
  console.log("server initialized");
})

app.get("/getannouncements", function(req, response) {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');
      db.all("SELECT * FROM announcements WHERE subject IN (SELECT announcement_subject FROM courses_announcements WHERE course_name = ?)", [req.query.course_name], function(err, row) {
        announcements_row=row
        const jsonContent = JSON.stringify(announcements_row);
        response.send(jsonContent);
        console.log(jsonContent);
      });
})
app.listen(8070, function() {
  console.log("server initialized");
})

app.get("/getallassignments_student", function(req, response){
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');
      db.all("SELECT * FROM assignments WHERE course_name IN (SELECT course_name FROM courses_students WHERE user = ?)", [req.query.user], function(err, row) {
        all_assignments_row_student=row
        const jsonContent = JSON.stringify(all_assignments_row_student);
        response.send(jsonContent);
        console.log(jsonContent);
      });
})
app.listen(8060, function() {
  console.log("server initialized");
})

app.get("/getallassignments_teacher", function(req, response){
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');
      db.all("SELECT * FROM assignments WHERE course_name IN (SELECT name FROM courses WHERE teacher = (SELECT name FROM users WHERE user = ?))", [req.query.user], function(err, row) {
        all_assignments_row_teacher=row
        const jsonContent = JSON.stringify(all_assignments_row_teacher);
        response.send(jsonContent);
        console.log(jsonContent);
     });
})
app.listen(8063, function() {
  console.log("server initialized");
})

app.get("/getcourseassignments", function(req, response) {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');
      db.all("SELECT * FROM assignments WHERE course_name = ?", [req.query.course_name], function(err, row) {
        course_assignments_row=row
        const jsonContent = JSON.stringify(course_assignments_row);
        response.send(jsonContent);
        console.log(jsonContent);
      });
})
app.listen(8067, function() {
  console.log("server initialized");
})

app.get("/getassignment", function(req, response){
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');
      db.all("SELECT * FROM assignments WHERE assignment_name = ?", [req.query.assignment_name], function(err, row) {
        assignment_row=row
        const jsonContent = JSON.stringify(assignment_row);
        response.send(jsonContent);
        console.log(jsonContent);
      });
})
app.listen(8050, function() {
  console.log("server initialized");
})

app.get("/getallcourses", function(req, response) {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');

      db.all("SELECT * FROM courses", function(err, row) {
        all_courses=row;
        const jsonContent = JSON.stringify(all_courses);
        response.end(jsonContent);
        console.log(jsonContent);
      });
})
app.listen(8040, function () {
    console.log("server initialized");
})

app.get("/getallusers", function(req, response) {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');

      db.all("SELECT * FROM users", function(err, row) {
        all_users=row;
        const jsonContent = JSON.stringify(all_users);
        response.end(jsonContent);
        console.log(jsonContent);
      });
})
app.listen(8041, function () {
    console.log("server initialized");
})

app.post("/addcourseforuser", function(req, response){
    db.run('INSERT INTO courses_students(course_name, user) VALUES(?, ?)', [req.query.coursename, req.query.username]);
    db.run('UPDATE courses SET enrolled = enrolled + 1 WHERE name = ?', [req.query.coursename]);
})
app.listen(8042, function() {
  console.log("server initialized");
})

app.post("/deactivateuser", function(req, response){
    db.run('UPDATE users SET status = "inactive" WHERE user = ?', [req.query.username]);
})
app.listen(8043, function() {
  console.log("server initialized");
})

app.post("/activateuser", function(req, response){
    db.run('UPDATE users SET status = "active" WHERE user = ?', [req.query.username]);
})
app.listen(8044, function() {
  console.log("server initialized");
})

app.post("/rejectuser", function(req, response){
    db.run('DELETE FROM users WHERE user = ?', [req.query.username]);
})
app.listen(8045, function() {
  console.log("server initialized");
})

app.post("/addcourse", function(req, response){
    db.run('INSERT INTO courses VALUES(?, ?, ?, ?, ?)', [req.query.name, req.query.teacher, req.query.desc, 0, req.query.capacity]);
})
app.listen(8046, function() {
  console.log("server initialized");
})

function LoadCoursesStudent() {
  var url = document.location.href,
  params = url.split('?')

  var xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType("application/json");
  xhttp.open("GET", "http://localhost:8090/getcourses_student?" + params[1], true);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
           let courses = JSON.parse(this.responseText);
           for (let i=0; i<courses.length; i++) {
             AddCourse(courses[i]['name'], "student")
           }
       }
   }
   xhttp.send();
}

function LoadCoursesTeacher() {
  var url = document.location.href,
  params = url.split('?')

  var xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType("application/json");
  xhttp.open("GET", "http://localhost:8095/getcourses_teacher?" + params[1], true);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
           let courses = JSON.parse(this.responseText);
           for (let i=0; i<courses.length; i++) {
             AddCourse(courses[i]['name'], "teacher")
           }
       }
   }
   xhttp.send();
}

function AddCourse(course_name, role) {
    data = get_url_params()

    new_div = document.createElement("div")
    new_div.className = "course"

    new_heading = document.createElement("H4")
    new_heading.className = "course_title"

    new_link = document.createElement("a")
    new_link.href = "course_homepage_" + role + ".html?user=" + data.user + "&course_name=" + course_name
    new_link.innerHTML += course_name
    new_link.className = "course_title"

    new_heading.appendChild(new_link)
    new_div.appendChild(new_heading)
    document.getElementById("courses_panel").appendChild(new_div)
}


function LoadAnnouncements() {
  var url = document.location.href,
  params = url.split('?')

  var xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType("application/json");
  xhttp.open("GET", "http://localhost:8070/getannouncements?" + params[1], true);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          let announcements = JSON.parse(this.responseText);
          for (let i=0; i<announcements.length; i++) {
              let announcement = announcements[i]

              new_div = document.createElement("div")
              new_div.className = "announcement"

              new_heading = document.createElement("H4")
              new_heading.className = "announcement_title"
              new_heading.appendChild(document.createTextNode(announcement["subject"]))

              new_text = document.createElement("p")
              new_text.appendChild(document.createTextNode(announcement["body"]))

              new_div.appendChild(new_heading)
              new_div.appendChild(new_text)
              prev_child = document.querySelector("#main_panel :nth-child(" + String(i + 1) + ")")
              prev_child.parentNode.insertBefore(new_div, prev_child.nextSibling)
          }
          if (document.getElementById("main_panel").childElementCount==1) {
              document.getElementById("main_panel").innerHTML += "There are no announcements yet."
          }
      }
  }
  xhttp.send();
}


function LoadAllAssignmentsStudent(main_div_id) {
  var url = document.location.href,
  params = url.split('?')

  var xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType("application/json");
  xhttp.open("GET", "http://localhost:8060/getallassignments_student?" + params[1], true);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
           let assignments = JSON.parse(this.responseText);
           AddAssignmentsStudent(assignments, main_div_id)
       }
   }
   xhttp.send();
}

function LoadAllAssignmentsTeacher(main_div_id) {
  var url = document.location.href,
  params = url.split('?')

  var xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType("application/json");
  xhttp.open("GET", "http://localhost:8063/getallassignments_teacher?" + params[1], true);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
           let assignments = JSON.parse(this.responseText);
           AddAssignmentsTeacher(assignments, main_div_id)
       }
   }
   xhttp.send();
}

function LoadCourseAssignmentsStudent(main_div_id) {
  var url = document.location.href,
  params = url.split('?')

  let xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType("application/json");
  xhttp.open("GET", "http://localhost:8067/getcourseassignments?" + params[1], true);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
           let assignments = JSON.parse(this.responseText);
           AddAssignmentsStudent(assignments, main_div_id)
       }
   }
   xhttp.send();
}

function LoadCourseAssignmentsTeacher(main_div_id) {
  var url = document.location.href,
  params = url.split('?')

  let xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType("application/json");
  xhttp.open("GET", "http://localhost:8067/getcourseassignments?" + params[1], true);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
           let assignments = JSON.parse(this.responseText);
           AddAssignmentsTeacher(assignments, main_div_id)
       }
   }
   xhttp.send();
}

function LoadAllCourseAssignmentsTeacher(main_div_id) {
  var url = document.location.href,
  params = url.split('?')

  let xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType("application/json");
  xhttp.open("GET", "http://localhost:8067/getcourseassignments?" + params[1], true);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
           let assignments = JSON.parse(this.responseText);
           AddAllAssignmentsTeacher(assignments, main_div_id)
       }
   }
   xhttp.send();
}

function AddAssignmentsStudent(assignments, main_div_id) {
    AddDiv("todo", "To Do", main_div_id, "1")
    AddDiv("upcoming", "Upcoming Assignments", main_div_id, "2")
    AddDiv("past", "Past Assignments", main_div_id, "3")

    for (let i=0; i<assignments.length; i++) {
        AddAssignment(assignments[i], "student")
    }

    if (document.getElementById("todo").childElementCount==1) {
        document.getElementById("todo").innerHTML += "All done!"
    }
    if (document.getElementById("upcoming").childElementCount==1) {
        document.getElementById("upcoming").innerHTML += "You have no upcoming assignments."
    }
    if (document.getElementById("past").childElementCount==1) {
        document.getElementById("past").innerHTML += "You have no past assignments."
    }
}

function AddAssignmentsTeacher(assignments, main_div_id) {
     AddDiv("past", "To Do", main_div_id, "1")  /* for teachers, past assignments go in 'To Do' section*/

     for (let i=0; i<assignments.length; i++) {
         AddAssignment(assignments[i], "teacher")
     }

     if (document.getElementById("past").childElementCount==1) {
          document.getElementById("past").innerHTML += "All done!"
     }
}

function AddAllAssignmentsTeacher(assignments, main_div_id) {
     AddDiv("past", "To Do", main_div_id, "1")  /* for teachers, past assignments go in 'To Do' section*/
     AddDiv("upcoming", "Upcoming Assignments", main_div_id, "2")

     for (let i=0; i<assignments.length; i++) {
         assignment = assignments[i]

         new_div = document.createElement("div")
         new_div.className = "assignment"

         new_heading = document.createElement("H4")
         new_heading.className = "assignment_title"

         new_link = document.createElement("a")
         new_link.href = "assignment_teacher.html?user=" + data.user + "&course_name=" + assignment["course_name"] + "&assignment_name=" + assignment["assignment_name"]
         new_link.innerHTML += assignment["assignment_name"]
         new_link.className = "assignment_title"

         new_text = document.createElement("p")
         new_text.appendChild(document.createTextNode("Course: " + assignment["course_name"]))
         new_text.appendChild(document.createElement("br"))
         new_text.appendChild(document.createTextNode("Due: " + assignment["due_date"]))
         new_text.appendChild(document.createElement("br"))
         new_text.appendChild(document.createTextNode("Points: " + String(assignment["points"])))

         new_heading.appendChild(new_link)
         new_div.appendChild(new_heading)
         new_div.appendChild(new_text)

         let curr_date = Date.parse(new Date())
         let due_date = Date.parse(assignment["due_date"])

         if (due_date < curr_date) {
             document.getElementById("past").appendChild(new_div)
         } else {
             document.getElementById("upcoming").appendChild(new_div)
         }
     }

     if (document.getElementById("past").childElementCount==1) {
          document.getElementById("past").innerHTML += "All done!"
     }
     if (document.getElementById("upcoming").childElementCount==1) {
        document.getElementById("upcoming").innerHTML += "You have no upcoming assignments."
    }
}

function AddAssignment(assignment, role) {
    data = get_url_params()

    new_div = document.createElement("div")
    new_div.className = "assignment"

    new_heading = document.createElement("H4")
    new_heading.className = "assignment_title"

    new_link = document.createElement("a")
    new_link.href = "assignment_" + role + ".html?user=" + data.user + "&course_name=" + assignment["course_name"] + "&assignment_name=" + assignment["assignment_name"]
    new_link.innerHTML += assignment["assignment_name"]
    new_link.className = "assignment_title"

    new_text = document.createElement("p")
    new_text.appendChild(document.createTextNode("Course: " + assignment["course_name"]))
    new_text.appendChild(document.createElement("br"))
    new_text.appendChild(document.createTextNode("Due: " + assignment["due_date"]))
    new_text.appendChild(document.createElement("br"))
    new_text.appendChild(document.createTextNode("Points: " + String(assignment["points"])))

    new_heading.appendChild(new_link)
    new_div.appendChild(new_heading)
    new_div.appendChild(new_text)

    let curr_date = Date.parse(new Date())
    let due_date = Date.parse(assignment["due_date"])

    if (due_date < curr_date) {
        document.getElementById("past").appendChild(new_div)
    } else if ((due_date > curr_date) && (due_date < curr_date + 3 * 24 * 60 * 60 * 1000) && (role=="student")) {
        document.getElementById("todo").appendChild(new_div)
    } else if ((due_date > curr_date + 3 * 24 * 60 * 60 * 1000) && (role=='student')) {
        document.getElementById("upcoming").appendChild(new_div)
    }
}

function AddDiv(id, title, main_div_id, j) {
    new_div = document.createElement("div")
    new_div.className = "assignment_section"
    new_div.id = id
    new_heading = document.createElement("H4")
    new_heading.className = "assignment_title"
    new_heading.appendChild(document.createTextNode(title))
    new_div.appendChild(new_heading)
    prev_child = document.querySelector("#" + main_div_id + " :nth-child(" + j + ")")
    prev_child.parentNode.insertBefore(new_div, prev_child.nextSibling)
}

function LoadAssignment() {
  var url = document.location.href,
  params = url.split('?')

  var xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType("application/json");
  xhttp.open("GET", "http://localhost:8050/getassignment?" + params[1], true);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          let assignment = JSON.parse(this.responseText)[0];

          document.title = assignment["assignment_name"]

          heading = document.querySelector("#main_panel div:nth-child(1) h3:nth-child(1)")
          text = document.querySelector("#main_panel div:nth-child(1) p:nth-child(2)")

          heading.appendChild(document.createTextNode(assignment["assignment_name"]))

          text.appendChild(document.createTextNode("Description: " + assignment["description"]))
          text.appendChild(document.createElement("br"))
          text.appendChild(document.createElement("br"))
          text.appendChild(document.createTextNode("Due Date: " + assignment["due_date"]))
          text.appendChild(document.createElement("br"))
          text.appendChild(document.createTextNode("Points: " + assignment["points"]))
       }
   }
   xhttp.send();
}

function addCourseAdminHelper(row, item) {
    let cell = document.createElement("td");
        cell.innerHTML = item;
        row.appendChild(cell);
}

function addCourseAdmin(course) {
    let courseTable = document.getElementById("all_courses_list");
    let ctBody = courseTable.children[1];
    let newRow = document.createElement("tr");
    ctBody.appendChild(newRow);

    addCourseAdminHelper(newRow, course.name);
    addCourseAdminHelper(newRow, course.description);
    addCourseAdminHelper(newRow, course.enrolled);
    addCourseAdminHelper(newRow, course.capacity);
    addCourseAdminHelper(newRow, course.teacher);
}

function LoadCoursesAdmin() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8040/getallcourses", true);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
           let courses = JSON.parse(this.responseText);
           for (let i=0; i<courses.length; i++) {
               addCourseAdmin(courses[i]);
           }
       }
   }
   xhttp.send();
}

function revealForm() {
    let addCourseButton = document.getElementById("add_course_button");
    let form = document.getElementById("add_course_form");
    let formButton = document.getElementById("submit_course");
    addCourseButton.style.display = "none";
    form.style.display = "block";
    formButton.style.display = "inline";
}

function addCourse() {
    let nameInp = document.getElementById("course_name_input");
        let name = nameInp.value;
        nameInp.value = "";
    let descInp = document.getElementById("course_desc_input");
        let desc = descInp.value;
        descInp.value = "";
    let capacityInp = document.getElementById("course_capacity_input");
        let capacity = capacityInp.value;
        capacityInp.value = "";
    let teacherInp = document.getElementById("course_teacher_input");
        let teacher = teacherInp.value;
        teacherInp.value = "";

    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8046/addcourse?name=" + name + "&teacher=" + teacher + "&desc=" + desc + "&capacity=" + capacity, true);
    xhttp.send();

    let courseTable = document.getElementById("all_courses_list");
    let ctBody = courseTable.children[1];
    let newRow = document.createElement("tr");
    ctBody.appendChild(newRow);

    let tableValues = [name, desc, 0, capacity, teacher];
    for (i = 0; i < tableValues.length; i++) {
        let newCell = document.createElement("td");
        newCell.innerHTML = tableValues[i];
        newRow.appendChild(newCell);
    }

    let addCourseButton = document.getElementById("add_course_button");
    let form = document.getElementById("add_course_form");
    let formButton = document.getElementById("submit_course");
    addCourseButton.style.display = "inline";
    form.style.display = "none";
    formButton.style.display = "none";
}

function addSpecificClass(username, coursename, oldCoursesUl) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8042/addcourseforuser?username=" + username + "&coursename=" + coursename, true);
    xhttp.send();

    let newCourseLi = document.createElement("li");
    newCourseLi.classList.add("class_li");
    newCourseLi.innerHTML = coursename;
    oldCoursesUl.prepend(newCourseLi);
}

function addClassForUser(user, newCoursesUl, oldCoursesUl) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8040/getallcourses", true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            newCoursesUl.style.display = "block";
            let courses = JSON.parse(this.responseText);
            for (let i=0; i<courses.length; i++) {
                let newCourse = document.createElement("li");
                newCourse.innerHTML = courses[i].name;
                newCoursesUl.appendChild(newCourse);

                let addClassButton = document.createElement("button");
                addClassButton.classList.add("add_specific_class_button");
                addClassButton.innerHTML = "Add";
                addClassButton.addEventListener("click", function() {addSpecificClass(user.user, courses[i].name, oldCoursesUl);});
                newCourse.appendChild(addClassButton);
            }
         }
     }
     xhttp.send();
}

function addUsersClasses(ul, username) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8090/getcourses_student?user=" + username, true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let courses = JSON.parse(this.responseText);
            for (i = 0; i < courses.length; i++) {
                let newCourseLi = document.createElement("li");
                newCourseLi.classList.add("class_li");
                newCourseLi.innerHTML = courses[i].name;
                ul.prepend(newCourseLi);
            }
        }
    }
    xhttp.send();
}

function addUserToListAdminHelper(li, item, br = true) {
    let span = document.createElement("span");
        span.classList.add("user_span");
        span.innerHTML = item;
        li.appendChild(span);
    if (br) {li.appendChild(document.createElement("br"));}
    return span;
}

function deactivateUser(user, li, activeSpan, deactivateButton) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8043/deactivateuser?username=" + user.user, true);
    xhttp.send();

    activeSpan.remove();
    deactivateButton.remove();
    loadInactiveSpan(li, user);
}

function loadActiveSpan(li, user) {
    let activeSpan = addUserToListAdminHelper(li, "Active |", false);
    let deactivateButton = document.createElement("button");
        deactivateButton.classList.add("inline_button");
        deactivateButton.innerHTML = "Deactivate";
        deactivateButton.addEventListener("click", function() {deactivateUser(user, li, activeSpan, deactivateButton)})
        li.appendChild(deactivateButton);
}

function activateUser(user, li, inactiveSpan, approveButton, rejectButton) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8044/activateuser?username=" + user.user, true);
    xhttp.send();

    inactiveSpan.remove();
    approveButton.remove();
    rejectButton.remove();
    loadActiveSpan(li, user);
}

function rejectUser(user, li) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8045/rejectuser?username=" + user.user, true);
    xhttp.send();

    li.remove();
}

function loadInactiveSpan(li, user) {
    let inactiveSpan = addUserToListAdminHelper(li, "Inactive |", false);
    let approveButton = document.createElement("button");
        approveButton.classList.add("inline_button");
        approveButton.innerHTML = "Approve";
        li.appendChild(approveButton);
    let rejectButton = document.createElement("button");
        rejectButton.classList.add("inline_button");
        rejectButton.innerHTML = "Reject";
        approveButton.addEventListener("click", function() {activateUser(user, li, inactiveSpan, approveButton, rejectButton)})
        rejectButton.addEventListener("click", function() {rejectUser(user, li)})
        li.appendChild(rejectButton);
}

function addUserToListAdmin(user) {
    let userList = document.getElementById("users_list");
    let newLi = document.createElement("li");
    newLi.classList.add("user_li");
    userList.appendChild(newLi);

    addUserToListAdminHelper(newLi, user.name);
    addUserToListAdminHelper(newLi, user.email);
    if (user.role == "student") {
        addUserToListAdminHelper(newLi, "Student");
    }
    else if (user.role == "teacher") {
        addUserToListAdminHelper(newLi, "Teacher");
    }
    else {
        addUserToListAdminHelper(newLi, "Admin");
    }
    addUserToListAdminHelper(newLi, "Classes:", false);
    let currCoursesUl = document.createElement("ul");
        currCoursesUl.classList.add("class_list");
        newLi.appendChild(currCoursesUl);
    addUsersClasses(currCoursesUl, user.user);
    let addClassUl = document.createElement("ul");
        addClassUl.classList.add("add_class_ul");
        addClassUl.style.display = "none";
        newLi.appendChild(addClassUl);
    let addClassesButton = document.createElement("button");
        addClassesButton.classList.add("inline_button");
        addClassesButton.innerHTML = "Add Class";
        addClassesButton.addEventListener("click", function() {addClassForUser(user, addClassUl, currCoursesUl);});
        currCoursesUl.appendChild(addClassesButton);
    newLi.appendChild(document.createElement("br"));
    if (user.status == "active") {
        loadActiveSpan(newLi, user);
    }
    else {
        loadInactiveSpan(newLi, user);
    }
}

function LoadUsersAdmin() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8041/getallusers", true);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          let users = JSON.parse(this.responseText);
          for (let i=0; i<users.length; i++) {
              addUserToListAdmin(users[i]);
          }
       }
   }
   xhttp.send();
}


function get_url_params() {
  var url = document.location.href,
  params = url.split('?')[1].split('&')
  var data = {}
  for (let i=0; i<params.length; i++) {
      tmp = params[i].split('=');
      data[tmp[0]] = decodeURI(tmp[1]);
  }
  return data
}

function LoadCourseName() {
  data = get_url_params()
  document.title = data.course_name
  document.getElementById("course_header").appendChild(document.createTextNode(data.course_name))
}

function LoadCourseName_notitle() {
  data = get_url_params()
  document.getElementById("course_header").appendChild(document.createTextNode(data.course_name))
}

function LoadMainMenuLinksStudent() {
  data = get_url_params()
  document.getElementById("myaccount_link").href = ".html?user=" + data.user // NEED TO ADD LINK LATER
  document.getElementById("dashboard_link").href = "dashboard_student.html?user=" + data.user
  document.getElementById("courses_link").href = "dashboard_student.html?user=" + data.user
  document.getElementById("logout_link").href = "login_page.html?user=" + data.user
}

function LoadMainMenuLinksTeacher() {
  data = get_url_params()
  document.getElementById("myaccount_link").href = ".html?user=" + data.user // NEED TO ADD LINK LATER
  document.getElementById("dashboard_link").href = "dashboard_teacher.html?user=" + data.user
  document.getElementById("courses_link").href = "dashboard_teacher.html?user=" + data.user
  document.getElementById("logout_link").href = "login_page.html?user=" + data.user
}

function LoadCourseMenuLinksStudent() {
  data = get_url_params()
  document.getElementById("course_homepage_link").href = "course_homepage_student.html?user=" + data.user + "&course_name=" + data.course_name
  document.getElementById("announcements_link").href = "announcements_student.html?user=" + data.user + "&course_name=" + data.course_name
  document.getElementById("assignments_link").href = "assignments_student.html?user=" + data.user + "&course_name=" + data.course_name
  document.getElementById("grades_link").href = "grades.html?user=" + data.user + "&course_name=" + data.course_name
}

function LoadCourseMenuLinksTeacher() {
  data = get_url_params()
  document.getElementById("course_homepage_link").href = "course_homepage_teacher.html?user=" + data.user + "&course_name=" + data.course_name
  document.getElementById("announcements_link").href = "announcements_teacher.html?user=" + data.user + "&course_name=" + data.course_name
  document.getElementById("assignments_link").href = "assignments_teacher.html?user=" + data.user + "&course_name=" + data.course_name
  document.getElementById("grades_link").href = "grades.html?user=" + data.user + "&course_name=" + data.course_name
}
