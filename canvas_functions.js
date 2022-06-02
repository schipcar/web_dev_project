var http = require('http');
    sqlite3 = require('sqlite3');
    fs = require('fs');
    url = require('url');
    request = require('request');
    myParser = require("body-parser");
    express = require("express");
    pag = require('https');
    db = 0

function add_announcement_form() {
    data = get_url_params()

    div = document.createElement("form");
    div.className = 'announcement_form';
    div.id = 'announcement_form_div';

    subject_prompt = document.createElement("p");
    text_prompt = document.createElement("p");

    subject_prompt.innerHTML = 'Announcement Subject:';
    text_prompt.innerHTML = 'Announcement Text:';

    subject_box = document.createElement("input");
    text_box = document.createElement("textarea");

    subject_box.className = 'announcement_form';
    subject_box.name = 'subject'
    subject_box.id = 'subject'

    text_box.className = 'announcement_form';
    text_box.name = 'body'
    text_box.id = 'body'

    subject_box.setAttribute("type", "text");
    text_box.rows = '4';

    submit_button = document.createElement("input")
    submit_button.type = "submit"
    submit_button.value = "Submit"
    submit_button.onclick = function() {
        add_announcement_onclick()
        document.getElementById('announcement_form_div').remove();
    }

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

function add_announcement_onclick() {
    data = get_url_params()

    subject_box = document.getElementById("subject")
    text_box = document.getElementById("body")

    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8010/putannouncement?course_name=" + data.course_name + "&subject=" + subject_box.value + "&body=" + text_box.value, true);
    xhttp.send();
}


function add_assignment_form() {

    div = document.createElement("form");
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

    name_box.name = "assignment_name"
    duedate_box.name = "duedate"
    points_box.name = "points"
    description_box.name = "description"

    name_box.id = "assignment_name"
    duedate_box.id = "duedate"
    points_box.id = "points"
    description_box.id = "description"

    name_box.setAttribute("type", "text");
    duedate_box.setAttribute("type", "text");
    points_box.setAttribute("type", "text");
    description_box.rows = '4';

    submit_button = document.createElement("input")
    submit_button.type = "submit"
    submit_button.value = "Submit"
    submit_button.onclick = function() {
        add_assignment_onclick()
        document.getElementById('assignment_form_div').remove();
    }

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

function add_assignment_onclick() {
    data = get_url_params()

    name_box = document.getElementById("assignment_name")
    duedate_box = document.getElementById("duedate")
    points_box = document.getElementById("points")
    description_box = document.getElementById("description")

    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8020/putassignment?course_name=" + data.course_name + "&assignment_name=" + name_box.value + "&duedate=" + duedate_box.value + "&points=" + points_box.value + "&description=" + description_box.value, true);
    xhttp.send();
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

function validateForm() {
    let form = document.getElementById("signup_form");
    let submit = document.getElementById("signup_submit")

    let sec_q1 = document.getElementById("signup_security_q1").value;
    let sec_q2 = document.getElementById("signup_security_q2").value;
    let sec_q3 = document.getElementById("signup_security_q3").value;

    allFilled = true;
    for (i = 0; i < form.children.length; i++) {
        el = form.children[i];
        if (el.tagName.toLowerCase() == "input") {
            if (el.value == "") {
                allFilled = false;
                break;
            }
        }
    }

    if (allFilled == false) {
        if (document.getElementById("unfilled_warning") == null) {
            let newp = document.createElement("p");
            newp.classList.add("signup_warning");
            newp.innerHTML = "All fields must be filled";
            newp.id = "unfilled_warning";
            form.appendChild(newp);
        }
    }
    else {
        let oldp = document.getElementById("unfilled_warning");
        if (oldp != null) {
            oldp.remove();
        }
    }

    let sameqs = sec_q1 == sec_q2 || sec_q1 == sec_q3 || sec_q2 == sec_q3;
    if (sameqs) {
        if (document.getElementById("same_qs_warning") == null) {
            let newp = document.createElement("p");
            newp.classList.add("signup_warning");
            newp.innerHTML = "Security questions must be unique";
            newp.id = "same_qs_warning";
            form.appendChild(newp);
        }
    }
    else {
        let oldp = document.getElementById("same_qs_warning");
        if (oldp != null) {
            oldp.remove();
        }
    }

    let allElseValid = document.getElementById("email_warning") == null
                        && document.getElementById("id_warning") == null
                        && document.getElementById("pw_warning") == null
                        && document.getElementById("conf_pw_warning") == null;
    if (allFilled && !sameqs && allElseValid) {
        submit.style.display = "block";
    }
    else {
        submit.style.display = "none";
    }
}

function validateEmail() {
    let form = document.getElementById("signup_form");
    let email = document.getElementById("signup_email").value;
    let email_br = document.getElementById("email_br");

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        if (document.getElementById("email_warning") == null) {
            let newp = document.createElement("p");
            newp.classList.add("signup_warning");
            newp.innerHTML = "Invalid email";
            newp.id = "email_warning";
            form.insertBefore(newp, email_br);
            email_br.style.display = "none";
        }
    }
    else {
        let oldp = document.getElementById("email_warning");
        if (oldp != null) {
            oldp.remove();
            email_br.style.display = "block";
        }
    }
}

function validateID() {
    let form = document.getElementById("signup_form");
    let id = document.getElementById("signup_id").value;
    let id_br = document.getElementById("id_br");

    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8049/getallids", true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let ids = JSON.parse(this.responseText);
            let duplicate = false;
            for (i = 0; i < ids.length; i++) {
                if (id == ids[i].user) {
                    duplicate = true;
                }
            }
            if (duplicate) {
                if (document.getElementById("id_warning") == null) {
                    let newp = document.createElement("p");
                    newp.classList.add("signup_warning");
                    newp.innerHTML = "This ID is already associated with an account";
                    newp.id = "id_warning";
                    form.insertBefore(newp, id_br);
                    id_br.style.display = "none";
                }
            }
            else {
                let oldp = document.getElementById("id_warning");
                if (oldp != null) {
                    oldp.remove();
                    id_br.style.display = "block";
                }
            }
         }
     }
     xhttp.send();
}

function validatePassword(form_id, pw_id, pw_br_id) {
    let form = document.getElementById(form_id);
    let password = document.getElementById(pw_id).value;
    let pw_br = document.getElementById(pw_br_id);

    let hasNumber = false;
    let hasSymbol = false;
    for (i = 0; i < password.length; i++) {
        let asciival = password.charCodeAt(i);
        if (asciival >= 48 && asciival <= 57) {
            hasNumber = true;
        }
        else if ((asciival >= 33 && asciival <= 47) || (asciival >= 58 && asciival <= 64)
                  || (asciival >= 91 && asciival <= 96) || (asciival >= 123 && asciival <= 126)) {
            hasSymbol = true;
        }
    }
    if (password.length < 5 || !hasNumber || !hasSymbol) {
        if (document.getElementById("pw_warning") == null) {
            let newp = document.createElement("p");
            newp.classList.add("signup_warning");
            newp.innerHTML = "Password must be at least 5 characters long and contain at least 1 number and 1 symbol";
            newp.id = "pw_warning";
            form.insertBefore(newp, pw_br);
            pw_br.style.display = "none";
        }
    }
    else {
        let oldp = document.getElementById("pw_warning");
        if (oldp != null) {
            oldp.remove();
            pw_br.style.display = "block";
        }
    }
}

function confirmPassword(form_id, pw_id, conf_pw_id, conf_pw_br_id) {
    let form = document.getElementById(form_id);
    let pw = document.getElementById(pw_id).value;
    let conf_pw = document.getElementById(conf_pw_id).value;
    let conf_pw_br = document.getElementById(conf_pw_br_id);

    if (pw != conf_pw) {
        if (document.getElementById("conf_pw_warning") == null) {
            let newp = document.createElement("p");
            newp.classList.add("signup_warning");
            newp.innerHTML = "Passwords do not match";
            newp.id = "conf_pw_warning";
            form.insertBefore(newp, conf_pw_br);
            conf_pw_br.style.display = "none";
        }
    }
    else {
        let oldp = document.getElementById("conf_pw_warning");
        if (oldp != null) {
            oldp.remove();
            conf_pw_br.style.display = "block";
        }
    }
}

function submitSignup() {
    let name = document.getElementById("signup_name").value;
    let email = document.getElementById("signup_email").value;
    let id = document.getElementById("signup_id").value;
    let password = document.getElementById("signup_pw").value;
    let account_type = document.getElementById("signup_account_type").value.toLowerCase();
    let sec_q1 = document.getElementById("signup_security_q1").value;
    let sec_a1 = document.getElementById("signup_answer_q1").value;
    let sec_q2 = document.getElementById("signup_security_q2").value;
    let sec_a2 = document.getElementById("signup_answer_q2").value;
    let sec_q3 = document.getElementById("signup_security_q3").value;
    let sec_a3 = document.getElementById("signup_answer_q3").value;

    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8047/signup?name=" + name + "&email=" + email + "&id=" + id
                + "&password=" + password + "&account_type=" + account_type + "&sec_q1=" + sec_q1 + "&sec_a1=" + sec_a1
                + "&sec_q2=" + sec_q2 + "&sec_a2=" + sec_a2 + "&sec_q3=" + sec_q3 + "&sec_a3=" + sec_a3, true);
    xhttp.send();

    location.href = "login_page.html";
}

function login() {
    let form = document.getElementById("login_form");
    let email = document.getElementById("email_entry").value;
    let password = document.getElementById("password_entry").value;

    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8051/getuserlogin?email=" + email + "&password=" + password, true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let user = JSON.parse(this.responseText);
            if (user.length == 0) {
                if (document.getElementById("account_dne_warning") == null) {
                    let newp = document.createElement("p");
                    newp.classList.add("signup_warning");
                    newp.innerHTML = "Account does not exist";
                    newp.id = "account_dne_warning";
                    form.appendChild(newp);
                }
            }
            else {
                let oldp = document.getElementById("account_dne_warning");
                if (oldp != null) {
                    oldp.remove();
                }

                user = user[0];
                if (user.status == "inactive") {
                    if (document.getElementById("account_inactive_warning") == null) {
                        let newp = document.createElement("p");
                        newp.classList.add("signup_warning");
                        newp.innerHTML = "Account is currently inactive and must be activated by an admin";
                        newp.id = "account_inactive_warning";
                        form.appendChild(newp);
                    }
                }
                else {
                    if (user.role == "student") {
                        location.href = "dashboard_student.html?user=" + user.user;
                    }
                    else if (user.role == "teacher") {
                        location.href = "dashboard_teacher.html?user=" + user.user;
                    }
                    else {
                        location.href = "dashboard_admin.html?user=" + user.user;
                    }
                }
            }
         }
     }
     xhttp.send();
}

function loadSecurityQs() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8041/getallusers", true);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          let users = JSON.parse(this.responseText);
          let email = document.getElementById("email_entry").value;
          let user;
          for (i = 0; i < users.length; i++) {
              if (users[i].email == email) {
                  user = users[i];
              }
          }

          let getSecQsForm = document.getElementById("get_sec_qs_form");
          let getSecQsButton = document.getElementById("get_sec_qs_button");
          getSecQsForm.style.display = "none";
          getSecQsButton.style.display = "none";

          let resetPwForm = document.getElementById("reset_password_form");
          resetPwForm.style.display = "block";

          let secQ1 = document.getElementById("sec_q1");
          let secQ2 = document.getElementById("sec_q2");
          let secQ3 = document.getElementById("sec_q3");
          secQ1.innerHTML = "&nbsp;" + user.sec_q1;
          secQ2.innerHTML = "&nbsp;" + user.sec_q2;
          secQ3.innerHTML = "&nbsp;" + user.sec_q3;
       }
   }
   xhttp.send();
}

function validateResetPassword() {
    let form = document.getElementById("reset_password_form");
    let button = document.getElementById("reset_password_button");

    allFilled = true;
    for (i = 0; i < form.children.length; i++) {
        el = form.children[i];
        if (el.tagName.toLowerCase() == "input") {
            if (el.value == "") {
                allFilled = false;
                break;
            }
        }
    }

    if (allFilled == false) {
        if (document.getElementById("unfilled_warning") == null) {
            let newp = document.createElement("p");
            newp.classList.add("signup_warning");
            newp.innerHTML = "All fields must be filled";
            newp.id = "unfilled_warning";
            form.appendChild(newp);
        }
    }
    else {
        let oldp = document.getElementById("unfilled_warning");
        if (oldp != null) {
            oldp.remove();
        }
    }

    let allValid = document.getElementById("pw_warning") == null && document.getElementById("conf_pw_warning") == null;
    if (allValid && allFilled) {
        button.style.display = "block";
    }
    else {
        button.style.display = "none";
    }
}

function resetPassword() {
    let form = document.getElementById("reset_password_form");
    let email = document.getElementById("email_entry").value;
    let answer1 = document.getElementById("answer1").value;
    let answer2 = document.getElementById("answer2").value;
    let answer3 = document.getElementById("answer3").value;
    let password = document.getElementById("new_password_entry").value;

    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8052/resetpassword?email=" + email + "&answer1=" + answer1 + "&answer2=" + answer2 + "&answer3=" + answer3 + "&password=" + password, true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let user = JSON.parse(this.responseText);
            if (user.length == 0) {
                if (document.getElementById("incorrect_answers_warning") == null) {
                    let newp = document.createElement("p");
                    newp.classList.add("signup_warning");
                    newp.innerHTML = "Answers incorrect";
                    newp.id = "incorrect_answers_warning";
                    form.appendChild(newp);
                }
            }
            else {
                location.href = "login_page.html";
            }
         }
     }
     xhttp.send();
}


var grades_row = 2;
var courses_row_student;
var courses_row_teacher;
var announcements_row;
var all_assignments_row_student;
var all_assignments_row_teacher
var course_assignments_row;

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
        let all_courses=row;
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
        let all_users=row;
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
    if (req.query.role == 'student') {
        db.run('UPDATE courses SET enrolled = enrolled + 1 WHERE name = ?', [req.query.coursename]);
    }
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
    db.run('INSERT INTO courses VALUES(?, ?, ?, ?, ?)', [req.query.name, req.query.teacher, req.query.desc, 0,
            req.query.capacity]);
})
app.listen(8046, function() {
  console.log("server initialized");
})

app.post("/signup", function(req, response) {
    console.log(req.query.name);
    console.log(req.query.email);
    console.log(req.query.id);
    console.log(req.query.password);
    console.log(req.query.account_type);
    console.log(req.query.sec_q1);
    console.log(req.query.sec_a1);
    console.log(req.query.sec_q2);
    console.log(req.query.sec_a2);
    console.log(req.query.sec_q3);
    console.log(req.query.sec_a3);
    db.run('INSERT INTO users VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.query.name, req.query.email,
            req.query.id, req.query.account_type, "inactive", req.query.password, req.query.sec_q1, req.query.sec_q2,
            req.query.sec_q3, req.query.sec_a1, req.query.sec_a2, req.query.sec_a3]);
})
app.listen(8047, function() {
  console.log("server initialized");
})

app.get("/getallteachers", function(req, response) {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');

      db.all("SELECT * FROM users WHERE role = 'teacher'", function(err, row) {
        let all_teachers=row;
        const jsonContent = JSON.stringify(all_teachers);
        response.end(jsonContent);
        console.log(jsonContent);
      });
})
app.listen(8048, function () {
    console.log("server initialized");
})

app.get("/getallids", function(req, response) {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');

      db.all("SELECT user FROM users", function(err, row) {
        let all_ids=row;
        const jsonContent = JSON.stringify(all_ids);
        response.end(jsonContent);
        console.log(jsonContent);
      });
})
app.listen(8049, function () {
    console.log("server initialized");
})

app.get("/getuserlogin", function(req, response) {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');

      let email = req.query.email;
      let password = req.query.password;
      console.log(email + "\n" + password);

      db.all("SELECT * FROM users WHERE email=? and password=?", [email, password], function(err, row) {
        let user=row;
        const jsonContent = JSON.stringify(user);
        response.end(jsonContent);
        console.log(jsonContent);
      });
})
app.listen(8051, function () {
    console.log("server initialized");
})

app.get("/resetpassword", function(req, response) {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');

      db.all("SELECT * FROM users WHERE email=? and sec_a1=? and sec_a2=? and sec_a3=?", [req.query.email, req.query.answer1, req.query.answer2, req.query.answer3], function(err, row) {
        let user=row;
        const jsonContent = JSON.stringify(user);
        if (jsonContent.length != 0) {
            db.run("UPDATE users SET password=? WHERE user=?", [req.query.password, JSON.parse(jsonContent)[0].user]);
        }
        response.end(jsonContent);
        console.log(jsonContent);
      });
})
app.listen(8052, function () {
    console.log("server initialized");
})

app.post('/putannouncement', function(req, res) {
  db.run('INSERT INTO announcements VALUES (?, ?)', [req.query.subject, req.query.body]);
  db.run('INSERT INTO courses_announcements VALUES (?, ?)', [req.query.course_name, req.query.subject]);
});
app.listen(8010, function() {
  console.log("server initialized");
})

app.post('/putassignment', function(req, res) {
  db.run('INSERT INTO assignments VALUES (?, ?, ?, ?, ?)', [req.query.assignment_name, req.query.course_name, req.query.duedate, req.query.points, req.query.description]);
});
app.listen(8020, function() {
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
              AddAnnouncement(announcements[i], i)
          }
          if (document.getElementById("main_panel").childElementCount==1) {
              document.getElementById("main_panel").innerHTML += "There are no announcements yet."
          }
      }
  }
  xhttp.send();
}

function AddAnnouncement(announcement, i) {
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

function LoadAllAssignmentsTeacher(main_div_id, role) {
  var url = document.location.href,
  params = url.split('?')

  var xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType("application/json");
  xhttp.open("GET", "http://localhost:8063/getallassignments_teacher?" + params[1], true);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
           let assignments = JSON.parse(this.responseText);
           AddAssignmentsTeacher(assignments, main_div_id, role)
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

function LoadCourseAssignmentsTeacher(main_div_id, role) {
  var url = document.location.href,
  params = url.split('?')

  let xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType("application/json");
  xhttp.open("GET", "http://localhost:8067/getcourseassignments?" + params[1], true);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
           let assignments = JSON.parse(this.responseText);
           AddAssignmentsTeacher(assignments, main_div_id, role)
       }
   }
   xhttp.send();
}

function LoadAllCourseAssignmentsTeacher(main_div_id, role) {
  var url = document.location.href,
  params = url.split('?')

  let xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType("application/json");
  xhttp.open("GET", "http://localhost:8067/getcourseassignments?" + params[1], true);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
           let assignments = JSON.parse(this.responseText);
           AddAllAssignmentsTeacher(assignments, main_div_id, role)
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

function AddAssignmentsTeacher(assignments, main_div_id, role) {
     AddDiv("past", "To Do", main_div_id, "1")  /* for teachers, past assignments go in 'To Do' section*/

     for (let i=0; i<assignments.length; i++) {
         AddAssignment(assignments[i], role)
     }

     if (document.getElementById("past").childElementCount==1) {
          document.getElementById("past").innerHTML += "All done!"
     }
}

function AddAllAssignmentsTeacher(assignments, main_div_id, role) {
     AddDiv("past", "To Do", main_div_id, "1")  /* for teachers, past assignments go in 'To Do' section*/
     AddDiv("upcoming", "Upcoming Assignments", main_div_id, "2")

     for (let i=0; i<assignments.length; i++) {
         assignment = assignments[i]

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

function addCourseAdminHelperLink(row, item) {
    data = get_url_params()
    let cell = document.createElement("td");
    let link = document.createElement("a");
    let link_text = document.createTextNode(item);
        link.href =  "course_homepage_admin.html?user=" + data.user + "&course_name=" + item
        link.className = 'course_link'
        link.appendChild(link_text)
        cell.appendChild(link);
        row.appendChild(cell);
}

function addCourseAdmin(course) {
    let courseTable = document.getElementById("all_courses_list");
    let ctBody = courseTable.children[1];
    let newRow = document.createElement("tr");
    ctBody.appendChild(newRow);

    addCourseAdminHelperLink(newRow, course.name);
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

    let teach_datalist = document.getElementById("teachers_datalist");
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8048/getallteachers", true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
             let teachers = JSON.parse(this.responseText);
             for (let i=0; i<teachers.length; i++) {
                 let newOption = document.createElement("option");
                    newOption.value = teachers[i].name;
                    teach_datalist.appendChild(newOption);
             }
         }
     }
     xhttp.send();
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

function addSpecificClass(user, coursename, oldCoursesUl) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8042/addcourseforuser?username=" + user.user + "&coursename=" + coursename + "&role=" + user.role, true);
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
                addClassButton.addEventListener("click", function() {addSpecificClass(user, courses[i].name, oldCoursesUl);});
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

function LoadDashboardAdmin() {
    let xhttp0 = new XMLHttpRequest();
    xhttp0.open("GET", "http://localhost:8041/getallusers", true);
    xhttp0.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let users = JSON.parse(this.responseText);
            let numActiveStudents = 0;
            let numActiveTeachers = 0;
            for (i = 0; i < users.length; i++) {
                let user = users[i];
                if (user.status == "active") {
                    if (user.role == "student") {
                        numActiveStudents++;
                    }
                    else if (user.role == "teacher") {
                        numActiveTeachers++;
                    }
                }
            }

            let sysInfo = document.getElementById("system_info");
            sysInfo.children[0].children[0].innerHTML = "&nbsp;" + numActiveStudents;
            sysInfo.children[1].children[0].innerHTML = "&nbsp;" + numActiveTeachers;
         }
     }
     xhttp0.send();

     let xhttp1 = new XMLHttpRequest();
     xhttp1.open("GET", "http://localhost:8040/getallcourses", true);
     xhttp1.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             let courses = JSON.parse(this.responseText);
             let sysInfo = document.getElementById("system_info");
             sysInfo.children[2].children[0].innerHTML = "&nbsp;" + courses.length;
          }
      }
      xhttp1.send();
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
  document.getElementById("myaccount_link").href = "myaccount_student.html?user=" + data.user // NEED TO ADD LINK LATER
  document.getElementById("dashboard_link").href = "dashboard_student.html?user=" + data.user
  document.getElementById("courses_link").href = "dashboard_student.html?user=" + data.user
  document.getElementById("logout_link").href = "login_page.html"
}

function LoadMainMenuLinksTeacher() {
  data = get_url_params()
  document.getElementById("myaccount_link").href = "myaccount_teacher.html?user=" + data.user // NEED TO ADD LINK LATER
  document.getElementById("dashboard_link").href = "dashboard_teacher.html?user=" + data.user
  document.getElementById("courses_link").href = "dashboard_teacher.html?user=" + data.user
  document.getElementById("logout_link").href = "login_page.html"
}

function LoadMainMenuLinksAdmin() {
  data = get_url_params()
  document.getElementById("myaccount_link").href = "myaccount_admin.html?user=" + data.user
  document.getElementById("settings_link").href = "settings_admin.html?user=" + data.user
  document.getElementById("dashboard_link").href = "dashboard_admin.html?user=" + data.user
  document.getElementById("courses_link").href = "courses_admin.html?user=" + data.user
  document.getElementById("logout_link").href = "login_page.html"
}

function LoadCourseMenuLinksStudent() {
  data = get_url_params()
  document.getElementById("course_homepage_link").href = "course_homepage_student.html?user=" + data.user + "&course_name=" + data.course_name
  document.getElementById("announcements_link").href = "announcements_student.html?user=" + data.user + "&course_name=" + data.course_name
  document.getElementById("assignments_link").href = "assignments_student.html?user=" + data.user + "&course_name=" + data.course_name
  document.getElementById("grades_link").href = "grades_student.html?user=" + data.user + "&course_name=" + data.course_name
}

function LoadCourseMenuLinksTeacher() {
  data = get_url_params()
  document.getElementById("course_homepage_link").href = "course_homepage_teacher.html?user=" + data.user + "&course_name=" + data.course_name
  document.getElementById("announcements_link").href = "announcements_teacher.html?user=" + data.user + "&course_name=" + data.course_name
  document.getElementById("assignments_link").href = "assignments_teacher.html?user=" + data.user + "&course_name=" + data.course_name
  document.getElementById("grades_link").href = "grades_teacher.html?user=" + data.user + "&course_name=" + data.course_name
}

function LoadCourseMenuLinksAdmin() {
  data = get_url_params()
  document.getElementById("course_homepage_link").href = "course_homepage_admin.html?user=" + data.user + "&course_name=" + data.course_name
  document.getElementById("announcements_link").href = "announcements_admin.html?user=" + data.user + "&course_name=" + data.course_name
  document.getElementById("assignments_link").href = "assignments_admin.html?user=" + data.user + "&course_name=" + data.course_name
  document.getElementById("grades_link").href = "grades_admin.html?user=" + data.user + "&course_name=" + data.course_name
}

function LoadAllGrades() {
    var xhttp = new XMLHttpRequest();
    xhttp.overrideMimeType("application/json");
    xhttp.open("GET", "http://localhost:8088/getdictionary", true);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
             var dict_all = JSON.parse(this.responseText);
             var list_array = new Array();
             for (var i=0; i<dict_all.length; i++) {
               const dict_t = dict_all[i];
               const array1 = [dict_t.email, dict_t.name, dict_t.user, dict_t.punctuation, dict_t.possible, dict_t.course_name];
               list_array.push(array1)}
               nrows = dict_all.length
            createtable("tbl", list_array, nrows);}
     }
     xhttp.send();
  }

var counter = 0;
var Preferences = 0;
var nrows = 0;
Preferences.id = "tbl";

  function createtable(id, list_array, nrows){
    var TableDiv = document.getElementById("main_panel");
    var ncells = 6;
    var names = ["Email", "Name", "User", "Punctuation", "Possible", "Course"];

    var table = document.createElement('TABLE');
    table.border='1';
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
    table.id = id
    var header = table.createTHead();
    var row = header.insertRow(0);

    for (var p=0; p<6; p++){
           var cell = row.insertCell(p);
           cell.innerHTML = names[p];
    }

    for (var i=0; i<nrows; i++){
       var tr = document.createElement('TR');
       tableBody.appendChild(tr);

       for (var j=0; j<ncells; j++){
           var td = document.createElement('TD');
           console.log(list_array[i])
           td.appendChild(document.createTextNode(String(list_array[i][j])));
           tr.appendChild(td);
       }
    }
    if (Preferences == 0) {
      Preferences = table;
      TableDiv.appendChild(table)
    } else {
      TableDiv.removeChild(TableDiv.lastChild)
      Preferences = table;
    }

    TableDiv.appendChild(table)
}

var row_info_account = 2;
var row_sent = 2;
var row_student = 0;
var string_student = "SELECT * FROM grades";
var string_info = "SELECT * FROM users WHERE user=12345678"


function renew() {
  db = new sqlite3.Database('./canvas.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  db.all("SELECT * FROM grades", function(err, row) {
    row_sent=row
  });
  db.all(string_info, function(err, row) {
    row_info_account=row
  });
  db.all(string_student, function(err, row) {
    console.log(row)
    row_student=row
  });
});
}

renew()

app.use(myParser.urlencoded({ extended: true }));
app.get("/getdictionary", function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Max-Age', 2592000);
  res.setHeader('Content-Type', 'application/json');
  renew()
  res.send(JSON.stringify(row_sent));
});
app.post('/putdictionary', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Max-Age', 2592000);
  res.setHeader('Content-Type', 'application/json');
  db.run('INSERT INTO grades(email, name, user, punctuation, possible, course_name) VALUES(?,?,?,?,?,?)', [req.body.email, req.body.name, req.body.user, req.body.punctuation, req.body.possible, req.body.course_name]);
  renew()
  res.status(204).send()
});
app.post('/gradestudent', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Max-Age', 2592000);
  res.setHeader('Content-Type', 'application/json');
  string_student = 'SELECT * FROM grades WHERE user=' + '"' + String(req.body.student) + '"' + " AND course_name=" + '"' + String(req.body.course_name) + '"'
  renew()
  res.status(204).send()
});
app.get('/gradestudent2', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Max-Age', 2592000);
  res.setHeader('Content-Type', 'application/json');
  renew()
  res.send(JSON.stringify(row_student));
});
app.post('/gradestudent3', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Max-Age', 2592000);
    res.setHeader('Content-Type', 'application/json');
    string_student = 'SELECT * FROM grades WHERE course_name=' + '"' + String(req.body.course_name) + '"'
    renew()
    res.status(204).send()
  });
app.post('/info_account1', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Max-Age', 2592000);
    res.setHeader('Content-Type', 'application/json');
    string_info = 'SELECT * FROM users WHERE user=' + String(req.body.user)
    renew()
    res.status(204).send()
});
app.get('/info_account', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Max-Age', 2592000);
    res.setHeader('Content-Type', 'application/json');
    renew()
    res.send(JSON.stringify(row_info_account));
});
app.post('/edit', function(req, res) {
    db.run('REPLACE INTO users (name, email, user) VALUES (?, ?, ?)', [req.query.account_name, req.query.account_email, req.query.account_id]);
    console.log(req.query.account_name)
  });
app.listen(8088, function() {
  console.log('Server running at http://127.0.0.1:8088/');
});

function edit_info() {
    data = get_url_params()

    name_box = document.getElementById("Name")
    duedate_box = document.getElementById("Email")
    points_box = document.getElementById("ID")

    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8088/edit?account_name=" + name_box.value + "&account_email=" + duedate_box.value + "&account_id=" + points_box.value, true);
    xhttp.send();
}



