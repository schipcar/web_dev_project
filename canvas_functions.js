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
var courses_row = 2;

let db = new sqlite3.Database('./canvas.db', (err) => {
  if (err) {
    console.error(err.message);
  } 
  db.all("SELECT * FROM grades", function(err, row) {
    grades_row=row
  });
  db.all("SELECT * FROM courses", function(err, row) {
    courses_row=row
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

/*
http.createServer(function(request, response){
  var path = url.parse(request.url).pathname;
  if(path=="/getcourses"){
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');
      const jsonContent = JSON.stringify(courses_row);
      response.end(jsonContent);
      console.log(jsonContent); 

  }
}).listen(8090);
console.log("server initialized");
*/



function LoadCourses() {
  document.getElementByid("courses_panel").style.color = "white";
  document.getElementById("courses_panel").innerHTML += "test"; 
/*  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8090/getcourses", true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           var dict_all = JSON.parse(this.responseText);
           document.getElementByid("courses_panel").style.color = "white";
           document.getElementById("courses_panel").innerHTML += "test";
           console.log(dict_all);
           document.getElementById("courses_panel").innerHTML += dict_all; 
     }
   }
   xhttp.send();*/
}
