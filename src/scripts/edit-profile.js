function toggleEdit(flag)
{
    var left = document.getElementById("left-col");
    left.classList.toggle("disabled-button");

    var form = document.getElementById("main-form");
    form.classList.toggle("disabled-button");
    
    var button = document.getElementById("edit-btn");
    if(flag)
    {
        button.setAttribute("disabled","true");
    }
    else
    {
        button.removeAttribute("disabled");
    }
    
    console.log("Edit toggled.");
}