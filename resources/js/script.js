function validate(){
  console.log("Called validate")
  var email = document.getElementById("inputEmail");
  var password = document.getElementById("inputPassword");
  console.log(inputEmail.value);
  console.log(password.value);
  if(email.value && password.value){
    return res.redirect('/userHub');
  }
}
