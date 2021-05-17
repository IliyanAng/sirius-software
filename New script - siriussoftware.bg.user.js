// ==UserScript==
// @name        New script - siriussoftware.bg
// @namespace   Violentmonkey Scripts
// @match       https://siriussoftware.bg/
// @grant       none
// @version     1.0
// @author      -
// @description 5/15/2021, 11:33:14 AM
// ==/UserScript==
function setPlayingField() {
  let contactBtn = document.querySelector('.round-button');
  contactBtn.removeAttribute('href');
  let mainContent = document.querySelector('.main-content');
  let absoluteBanners = document.querySelectorAll('.absolute');

  absoluteBanners.forEach(element => {
    element.classList.remove("absolute");
  });

  mainContent.innerHTML += modalHtml;
  document.head.innerHTML += cssStyles;
  contactBtn.addEventListener('click', openContact)
};

function openContact() {
  let myModal = document.getElementById("contactModal");
  let closeBtn = document.getElementsByClassName("close")[0];
  closeBtn.onclick = function () {
    myModal.style.display = "none";
  };
  myModal.style.display = "block";
  setAccountManager();
};

async function setAccountManager() {
  let modalBody = document.querySelector('.card-container');
  let loader = document.querySelector('.loader');
  loader.style.display = 'block';
  modalBody.style.cssText = `visibility: visible; opacity: 0; transition: visibility 0s, opacity 0.2s linear;`;
  let assigned = document.querySelector('.success-account');

  if (assigned) {
    setAlreadyAssignedAccManager(loader, modalBody);
  }

  else {
    await assignNewAccountManager(loader, modalBody);
  }
}

function setAlreadyAssignedAccManager(loader, modalBody) {
  loader.style.display = 'none';
  modalBody.style.cssText = `visibility: visible; opacity: 1;`;
  modalBody.innerHTML = '<div class="success-account">You already have assigned Poke*cough* Account Manager.</div> <button id="get-new" class="primary">Want New?</button>';
  let assignNewAccManager = document.querySelector('#get-new');
  assignNewAccManager.onclick = () => {
    modalBody.innerHTML = modalBodyHtml;
    setAccountManager();
  };
}

async function assignNewAccountManager(loader, modalBody) {
  let findnewAccManager = document.querySelector('#find-new');
  findnewAccManager.onclick = setAccountManager;
  let hireAccManager = document.querySelector('#hire');
  hireAccManager.onclick = hireAccountManager;

  let accountManagerId = Math.floor(Math.random() * 500);
  let accountManager = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${accountManagerId}`)).json();
  let accountContainer = getAccountContainer();
  let location = await getAccountManagerLocation(accountManager.location_area_encounters);
  let randomMove = Math.floor(Math.random() * accountManager.moves.length);

  accountContainer.type.innerHTML = accountManager.types[0].type.name.toUpperCase();
  accountContainer.name.innerHTML = accountManager.name;
  accountContainer.image.setAttribute('src', accountManager.sprites.front_default);
  accountContainer.skills.innerHTML = accountManager.abilities.map(x => `<li>${x.ability.name}</li>`);
  accountContainer.location.innerHTML = `I'm usually at: ${location}`;
  accountContainer.quote.innerHTML = `With me you will get ${accountManager.weight} ${accountManager.moves[randomMove].move.name}'s per day!`;

  modalBody.style.cssText = `visibility: visible; opacity: 1;`;
  loader.style.display = 'none';
}


function getAccountContainer() {
  return {
    type: document.querySelector('.card-container .pro'),
    name: document.querySelector('.card-container h6'),
    location: document.querySelector('.card-container h3'),
    image: document.querySelector('.card-container img'),
    skills: document.querySelector('.card-container .skills ul'),
    quote: document.querySelector('.card-container .quote'),
  }
}

async function getAccountManagerLocation(url) {
  try {
    let result = await (await fetch(url)).json();
    return result[0].location_area.name;
  } catch (err) {
    return 'Unknown Hideout';
  }
}

function hireAccountManager() {
  let modalBody = document.querySelector('.card-container');
  modalBody.innerHTML = '<div class="success-account">You are now the proud owner of an Account Manager!</div>'
}

window.addEventListener('load', setPlayingField);


var modalBodyHtml = `	<span class="pro">PRO</span>
<img class="round" src="" alt="accountManager" />
<h6></h6>
<h3></h3>
<p class="quote"></p>
<div class="buttons">
  <button id="hire" class="primary">
    Hire
  </button>
  <button id="find-new" class="primary ghost">
    Find new
  </button>
</div>

<div class="skills">
  <h6>Abilities</h6>
  <ul>
  </ul>
</div>`;

var modalHtml = `<div id="contactModal" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <span class="close">&times;</span>
      <h2>Welcome. Below is your designated Account Manager</h2>
    </div>
    <div class="modal-body">
    <div class="loader"></div>
     <div class="card-container">
	<span class="pro">PRO</span>
	<img class="round" src="" alt="accountManager" />
	<h6></h6>
	<h3></h3>
	<p class="quote"></p>
	<div class="buttons">
		<button id="hire" class="primary">
			Hire
		</button>
		<button id="find-new" class="primary ghost">
			Find new
		</button>
	</div>

	<div class="skills">
		<h6>Abilities</h6>
		<ul>
		</ul>
	</div>
</div>

</footer>
    </div>
    <div class="modal-footer">
      <h3>Big Bussiness energy</h3>
    </div>
  </div>
</div>`;

var cssStyles = `<style>
/* Loading animation */
.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    animation: spin 0.5s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 9999; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 500px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
}

.card-container {
	background-color: #231e39;
	border-radius: 5px;
	box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.75);
	color: #b3b8cd;
	padding-top: 30px;
	position: relative;
	width: 350px;
  margin:5rem;
	max-width: 100%;
	text-align: center;
}

.card-container .pro {
	color: #231e39;
	background-color: #febb0b;
	border-radius: 3px;
	font-size: 14px;
	font-weight: bold;
	padding: 3px 7px;
	position: absolute;
	top: 30px;
	left: 30px;
}

.card-container .round {
	border: 1px solid #03bfcb;
	border-radius: 50%;
	padding: 7px;
}

div.card-container h3 {
	margin: 10px 0;
}

div.card-container h6 {
	margin: 5px 0;
	text-transform: uppercase;
}

div.card-container p {
	font-size: 14px;
	line-height: 21px;
}
.card-container .quote{
  margin-bottom: 25px;
}

div.card-container button.primary {
	background-color: #03bfcb;
	border: 1px solid #03bfcb;
	border-radius: 3px;
	color: #231e39;
	font-family: Montserrat, sans-serif;
	font-weight: 500;
	padding: 10px 25px;
}

div.card-container button.primary.ghost {
	background-color: transparent;
	color: #02899c;
}

div.card-container .skills {
	background-color: #1f1a36;
	text-align: left;
	padding: 15px;
	margin-top: 30px;
}

div.card-container .skills ul {
	list-style-type: none;
	margin: 0;
	padding: 0;
}

div.card-container .skills ul li {
	border: 1px solid #2d2747;
	border-radius: 2px;
	display: inline-block;
	font-size: 12px;
	margin: 0 7px 7px 0;
	padding: 7px;
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {top:-300px; opacity:0} 
  to {top:0; opacity:1}
}

@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

/* The Close Button */
.close {
  color: black;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 2px 16px;
  background-color: #b0bec5;
  color: black;
}

.modal-body {padding: 2px 16px;}

.modal-footer {
  padding: 2px 16px;
  background-color: #e2f1f8;
  color: black;
}

.success-account {
  padding: 30px;
  color: white;
}
</style>`;