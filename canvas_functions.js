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
    document.getElementById('announcements_panel').appendChild(div);
 
}