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

function revealForm() {
    let addCourseButton = document.getElementById("add_course_button");
    let form = document.getElementById("add_course_form");
    let formButton = document.getElementById("submit_course");
    addCourseButton.style.display = "none";
    form.style.display = "block";
    formButton.style.display = "inline";
}

function addCourse() {
    let idInp = document.getElementById("course_id_input");
        let id = idInp.value;
        idInp.value = "";
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
    let tableValues = [id, name, desc, 0, capacity, teacher];

    let courseTable = document.getElementById("all_courses_list");
    let ctBody = courseTable.children[1];
    let newRow = document.createElement("tr");
    ctBody.appendChild(newRow);
    for (i = 0; i < 6; i++) {
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
        if (user.children[7].innerHTML == activityState + " |") {
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
var grades_row = 2;
var courses_row_student = 2;
var courses_row_teacher = 2;
var announcements_row = 2;
var all_assignments_row_student = 2;
var all_assignments_row_teacher
var course_assignments_row = 2;

let db = new sqlite3.Database('./canvas.db', (err) => {
  if (err) {
    console.error(err.message);
  } 
  db.all("SELECT * FROM grades", function(err, row) {
    grades_row=row
  });
  var user = 0001; /* REMOVE LATER */
  db.all("SELECT * FROM courses WHERE name IN (SELECT course_name FROM courses_students WHERE user_id = ?)", [user], function(err, row) {
    courses_row_student=row
  });
  user = 0004; /* REMOVE LATER */
  db.all("SELECT * FROM courses WHERE teacher = (SELECT name FROM users WHERE id = ?)", [user], function(err, row) {
    courses_row_teacher=row
  });
  var course_name = "Web Development"; /* REMOVE LATER */
  db.all("SELECT * FROM announcements WHERE subject IN (SELECT announcement_subject FROM courses_announcements WHERE course_name = ?)", [course_name], function(err, row) {
    announcements_row=row
  });
  user = 0001; /* REMOVE LATER */
  db.all("SELECT * FROM assignments WHERE name IN (SELECT assignment_name FROM courses_assignments WHERE course_name IN (SELECT course_name FROM courses_students WHERE user_id = ?))", [user], function(err, row) {
    all_assignments_row_student=row
  });
  user = 0004; /* REMOVE LATER */
  db.all("SELECT * FROM assignments WHERE name IN (SELECT assignment_name FROM courses_assignments WHERE course_name IN (SELECT name FROM courses WHERE teacher = (SELECT name FROM users WHERE id = ?)))", [user], function(err, row) {
    all_assignments_row_teacher=row
  });
  course_name = "Web Development"; /* REMOVE LATER */
  db.all("SELECT * FROM assignments WHERE name IN (SELECT assignment_name FROM courses_assignments WHERE course_name = ?)", [course_name], function(err, row) {
    course_assignments_row=row
  });
});



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

http.createServer(function(request, response){
  var path = url.parse(request.url).pathname;
  if(path=="/getcourses_student"){
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');
      const jsonContent = JSON.stringify(courses_row_student);
      response.end(jsonContent);
      console.log(jsonContent); 
  }
}).listen(8090);
console.log("server initialized");

http.createServer(function(request, response){
  var path = url.parse(request.url).pathname;
  if(path=="/getcourses_teacher"){
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');
      const jsonContent = JSON.stringify(courses_row_teacher);
      response.end(jsonContent);
      console.log(jsonContent); 
  }
}).listen(8095);
console.log("server initialized");

http.createServer(function(request, response){
  var path = url.parse(request.url).pathname;
  if(path=="/getannouncements"){
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');
      const jsonContent = JSON.stringify(announcements_row);
      response.end(jsonContent);
      console.log(jsonContent); 
  }
}).listen(8070);
console.log("server initialized");

http.createServer(function(request, response){
  var path = url.parse(request.url).pathname;
  if(path=="/getallassignments_student"){
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');
      const jsonContent = JSON.stringify(all_assignments_row_student);
      response.end(jsonContent);
      console.log(jsonContent); 
  }
}).listen(8060);
console.log("server initialized");

http.createServer(function(request, response){
  var path = url.parse(request.url).pathname;
  if(path=="/getallassignments_teacher"){
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');
      const jsonContent = JSON.stringify(all_assignments_row_teacher);
      response.end(jsonContent);
      console.log(jsonContent); 
  }
}).listen(8063);
console.log("server initialized");

http.createServer(function(request, response){
  var path = url.parse(request.url).pathname;
  if(path=="/getcourseassignments"){
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');
      const jsonContent = JSON.stringify(course_assignments_row);
      response.end(jsonContent);
      console.log(jsonContent); 
  }
}).listen(8067);
console.log("server initialized");


function LoadCoursesStudent() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8090/getcourses_student", true);
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
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8095/getcourses_teacher", true);
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
    new_div = document.createElement("div")
    new_div.className = "course"

    new_heading = document.createElement("H4")
    new_heading.className = "course_title"

    new_link = document.createElement("a")
    new_link.href = "course_homepage_" + role + ".html"
    new_link.innerHTML += course_name
    new_link.className = "course_title"

    new_heading.appendChild(new_link)
    new_div.appendChild(new_heading)
    document.getElementById("courses_panel").appendChild(new_div)
}


function LoadAnnouncements() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8070/getannouncements", true);
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
      }
  }
  xhttp.send();
}


function LoadAllAssignmentsStudent() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8060/getallassignments_student", true);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
           let assignments = JSON.parse(this.responseText);
           
           todo_div = document.createElement("div")
           todo_div.className = "assignment_section"
           todo_div.id = "todo"
           todo_heading = document.createElement("H4")
           todo_heading.className = "assignment_title"
           todo_heading.appendChild(document.createTextNode("To Do")) 
           todo_div.appendChild(todo_heading)
           document.getElementById("assignments_panel").appendChild(todo_div)
          
           upcoming_div = document.createElement("div")
           upcoming_div.className = "assignment_section"
           upcoming_div.id = "upcoming"
           upcoming_heading = document.createElement("H4")
           upcoming_heading.className = "assignment_title"
           upcoming_heading.appendChild(document.createTextNode("Upcoming Assignments")) 
           upcoming_div.appendChild(upcoming_heading)
           document.getElementById("assignments_panel").appendChild(upcoming_div)
          
           past_div = document.createElement("div")
           past_div.className = "assignment_section"
           past_div.id = "past"
           past_heading = document.createElement("H4")
           past_heading.className = "assignment_title"
           past_heading.appendChild(document.createTextNode("Past Assignments")) 
           past_div.appendChild(past_heading)
           document.getElementById("assignments_panel").appendChild(past_div)
          
           for (let i=0; i<assignments.length; i++) {
             AddAssignment(assignments[i], "student")
           }
          
           if (todo_div.childElementCount==1) {
               todo_div.remove()
           }
           if (upcoming_div.childElementCount==1) {
               upcoming_div.remove()
           }
           if (past_div.childElementCount==1) {
               past_div.remove()
           }
       }
   }
   xhttp.send();
}

function AddAssignment(assignment, role) {    
    new_div = document.createElement("div")
    new_div.className = "assignment"
    
    new_heading = document.createElement("H4")
    new_heading.className = "assignment_title"

    new_link = document.createElement("a")
    new_link.href = "assignment_" + role + ".html"
    new_link.innerHTML += assignment["name"]
    new_link.className = "assignment_title"
    
    new_text = document.createElement("p")
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
