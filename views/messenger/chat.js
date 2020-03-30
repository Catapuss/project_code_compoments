function openForm() {
  document.getElementById("popup").style.display = "block";
  document.getElementById("sendChat").style.display = "none";

}

function closeForm() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("sendChat").style.display = "block";
}

function getDateTime(timeID){
  var dt = new Date();
  var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

  var day = weekday[dt.getDay()];
  document.getElementById(timeID).innerHTML = day + ", "+ dt.toLocaleString([], {hour: '2-digit', minute:'2-digit'}) + ' (' + dt.toLocaleString([], {month: '2-digit', day: '2-digit'}) + ')';
}

function post_message(){ //always posting to window
  // console.log("posting")
  var message = document.getElementById('msg');
  if(!message.value)
    alert("Empty message.")
  else{
    console.log(message.value)
    parent = document.getElementById('window');
    var count = $(parent).children().length;
    //console.log(count)
    messageID = "your_messages" + count;
    timeID = "thisTime" + count;
      msg = $('<div class="blue" id="'+messageID+'"> <img src="user_files/image2.png" alt="Your avatar" class="right"><p>'+message.value+'</p><p style="font-size: 10px"><span class="time-right" id="'+timeID+'">Time/Date:</span></p></div>');
      msg.appendTo(parent);
      getDateTime(timeID);

      // **v remove this v**
      message.value+='!';
      load_message(message);
      // **^ remove this ^**

      message.value="";
    }//else
  }//^

  function load_message(messageText){ //always posting to window
    // console.log("loading")
    if(!messageText.value)
      alert("No incoming message!")
    else{
      console.log(messageText.value)
      var count = $(parent).children().length;
      //console.log(count)
      messageID = "their_messages" + count;
      timeID = "thisTime" + count;
        parent = document.getElementById('window');
        msg = $('<div class="darker" id="'+messageID+'"> <img src="user_files/image1.png" alt="Their avatar" class="left"><p>'+messageText.value+'</p><p style="font-size: 10px"><span class="time-left" id="'+timeID+'">Time/Date:</span></p></div>');
        msg.appendTo(parent);
        getDateTime(timeID);
        messageText.value="";
      }//else
    }//^
