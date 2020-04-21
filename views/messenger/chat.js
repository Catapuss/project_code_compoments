const CLIENT_ID = 'o4KUjCsGYUETPyji';

let names = ['Zach R', 'Alex P', 'Joe Shmoe', 'Eben F', 'Swami V', 'Tamer S']; //get user info from database
img_src = ['user_files/image1.png', 'user_files/image2.png', 'user_files/image3.png', 'user_files/image4.png', 'user_files/image5.png', 'user_files/image6.png'];

let index = 0;

const drone = new ScaleDrone(CLIENT_ID, {
  data: { // Will be sent out as clientData via events
    name: getName(),
    src: getImgSrc(),
    color: getRandomColor(),
  },
});

let members = [];

drone.on('open', error => {
  if (error) {
    return console.error(error);
  }
  console.log('Successfully connected to Scaledrone');

  const room = drone.subscribe('observable-chat');
  room.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined room');
  });

  room.on('members', m => {
    members = m;
    updateMembersDOM();
  });

  room.on('member_join', member => {
    members.push(member);
    updateMembersDOM();
  });

  room.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    updateMembersDOM();
  });

  room.on('data', (text, member) => {
    if (member) {
      addMessageToListDOM(text, member);
    } else {
      // Message is from server
    }
  });
});

drone.on('close', event => {
  console.log('Connection was closed', event);
});

drone.on('error', error => {
  console.error(error);
});

function getName() {
  index = Math.floor(Math.random() * names.length);
  /*final product should return specific user id of whoever is currently signed in*/
  return names[index];
}
function getImgSrc(){
  return img_src[index];
}
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

//------------- DOM STUFF

const DOM = {
  membersCount: document.querySelector('.members-count'),
  membersList: document.querySelector('.members-list'),
  messages: document.querySelector('.messages'),
  input: document.querySelector('.message-form__input'),
  form: document.querySelector('.message-form'),
};

DOM.form.addEventListener('submit', sendMessage);

function sendMessage() {
  const value = DOM.input.value;
  if (value === '') {
    return;
  }
  DOM.input.value = '';
  drone.publish({
    room: 'observable-chat',
    message: value,
  });
}

function createMemberElement(member) {
  const { name, src, color } = member.clientData;
  const el = document.createElement('card');
  var node = $('<div class="jumbotron align-left" style="padding: 0px;"> <img src="'+src+'" alt="Profile Image" style="max-width: 80px;width: auto;margin-right: 20px;border-radius: 50%; border: 1px solid #e4e4e4;"> <label>'+name+'</label> </div>');
  node.appendTo(el);
  //el.appendChild(node);
  el.className = 'member';
  el.style.color = color;
// console.log();
  return el;
}

function updateMembersDOM() {
  DOM.membersCount.innerText = `${members.length} users in chat:`;
  DOM.membersList.innerHTML = '';
  members.forEach(member =>
    DOM.membersList.appendChild(createMemberElement(member))
  );
}

function createMessageElement(text, member) {
  const el = document.createElement('div');
  el.appendChild(createMemberElement(member));
  el.appendChild(document.createTextNode(text));
  el.className = 'message';
  return el;
}

function addMessageToListDOM(text, member) {
  const el = DOM.messages;
  const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
  el.appendChild(createMessageElement(text, member));
  if (wasTop) {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
  getDateTime();
}

function openForm() {
  document.getElementById("popup").style.display = "block";
  document.getElementById("sendChat").style.display = "none";
  getDateTime();
}

function closeForm() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("sendChat").style.display = "block";
}

function getDateTime(){
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
  document.getElementById("timeID").innerHTML = day + ", "+ dt.toLocaleString([], {hour: '2-digit', minute:'2-digit'}) +
                                              ' (' + dt.toLocaleString([], {month: '2-digit', day: '2-digit'}) + ')';
}
