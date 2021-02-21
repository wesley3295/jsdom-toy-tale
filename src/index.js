let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys()
});
//==============get request to api for toys=====================
function getToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(json => renderToys(json))
}
//==============parse toys to render===========================
const div = document.querySelector("div#toy-collection")
function renderToys(toys) {
toys.forEach(toy=>{
  //===========================creating elements(variables)==================
const cardDiv = document.createElement("div")
const nameH2 = document.createElement("h2")
const image = document.createElement("img")
let likeButton = document.createElement("button")
let p = document.createElement("p")


//===================setting values to attributes =================
cardDiv.className = "card"
nameH2.textContent = toy.name
 image.src = toy.image
image.width = 200
p.innerText = `${toy.likes} Likes`
likeButton.innerText = `Like <3`
likeButton.className = "like-btn"
likeButton.setAttribute('id', toy.id)

//=================================Updating Likes===========================
likeButton.addEventListener("click",(e)=>{
  e.preventDefault()
  let like = parseInt(e.target.previousElementSibling.innerText) + 1
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
    "likes": like
      })
    })
    .then(function(response){
      return response.json();
    }).then(function(){
      e.target.previousElementSibling.innerText = `${like} likes`;
    }).catch(function(error){
      alert(error.message)
    })
})
//==========================append elements=============================
 div.appendChild(cardDiv).append(nameH2, image,p, likeButton)
  })
}

//===========================Post Form===============================
const toyForm = document.querySelector("form.add-toy-form")
toyForm.addEventListener("submit", (e)=> { 
  e.preventDefault()
  createToy()})

function createToy(){
  //===========================declaring variables============================
  const toyInputs = document.querySelectorAll("input")
  
    fetch("http://localhost:3000/toys",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({
        "name": toyInputs[0].value,
        "image":toyInputs[1].value,
        "likes": 0
        
      })
    })
    .then(function(response){
      return response.json();
    }).then(function(toy){
      const cardDiv = document.createElement("div")
      const nameH2 = document.createElement("h2")
      const image = document.createElement("img")
      let likeButton = document.createElement("button")
      let p = document.createElement("p")
      
      
      //===================setting values to attributes =================
      cardDiv.className = "card"
      nameH2.textContent = toy.name
       image.src = toy.image
      image.width = 200
      p.innerText = `${toy.likes} Likes`
      likeButton.innerText = `Like <3`
      likeButton.className = "like-btn"
      likeButton.setAttribute('id', toy.id)
      div.appendChild(cardDiv).append(nameH2, image,p, likeButton)

    
    }).catch(function(error){
      alert(error.message)
    })
  
}
