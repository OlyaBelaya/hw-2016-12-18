;(function() {
	"use strict"

let users = [
{id: "User1", name: "Jack", lastname:"Daniels", age: 20, default: true},
{id: "User2", name: "Johnny", lastname:"Walker", age: 25},
{id: "User3", name: "Hankey", lastname:"Bannister", age: 27},
{id: "User4", name: "William", lastname:"Lawson", age: 30}
];

let strHash = "/?name=&lastname=&age="; 

hashChange();

window.addEventListener("popstate", renderPerson);
document.body.addEventListener("click", handleClick);
window.addEventListener("hashchange", hashChange);

function handleClick(ev){

	if(ev.target.localName === "a"){
		
		ev.preventDefault();
		let id = ev.target.getAttribute("href").slice(1);
		let user = users.find(el=>el.id === id);
 		document.querySelector("p").textContent = printData(user);

 		let str = strHash;
 		let arrName = strHash.match(/(\w+=)/g);
 		for (let item in arrName) {
 			str = str.replace(arrName[item], arrName[item] + user[arrName[item].substring(0, arrName[item].length -1)]); 
 	}
		history.pushState({id}, "", `${location.origin}/${id}${str}`);
	}
}

function renderPerson(ev){
	if (!ev.state || !ev.state.id) return;
	let user = users.find(el => el.id === ev.state.id);
	document.querySelector("p").textContent = printData(user);
}


function hashChange(ev){
	let user = "";
	if (!(location.hash) === true) {
		user = users.find(el=>el.default);
	} else {
		let hash = location.hash.slice(1);
		let itemToUpdate = hash.substring(0, hash.indexOf("=") ),
		newValue = hash.substring(hash.indexOf("=")+1),
		id = location.pathname.match(/\w+/g);
	    user = users.find(el=> el.id === id[0]);
		user[itemToUpdate] = newValue;
	}
	
		document.querySelector("p").textContent = printData(user);
	}	

	function printData(item){

      return `Name: ${item.name}   Last Name: ${item.lastname}    Age: ${item.age}`;
	}

})();

