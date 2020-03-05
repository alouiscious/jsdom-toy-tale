let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getAllToys()
  // insertToys(allToys)
  
  // let toy = {};  
  const toyForm = document.querySelector(".container");
  // let toyDiv = document.querySelector("#toy-collection");
  document.addEventListener("click", (e) => {
    // hide & seek with the form
    if (e.target.matches("#new-toy-btn")) {
      addToy = !addToy
      if (addToy) {
        toyForm.addEventListener('submit', s => { s.preventDefault()}),
        postToy(toy);
        toyForm.style.display = "block";
      } else {
        toyForm.style.display = "none";
      }
    }
  });

  // add new toys to database
  function postToy(toy) {
    document.querySelector("#new-toy-btn").insertAdjacentHTML("afterend", `<div id="newestToys"></div>`),
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "name": toy.name.value,
        "img": toy.img.value,
        "likes": 0
      })
    })
    .then(resp => resp.json())      //  takes in response as an argument
    .then(toy => function showNewToy(toy){
      toyDiv.insertAdjacentHTML("beforebegin", `<div id="newestToys"></div>`),
      newestToys.insertAdjacentHTML("afterbegin", `<h3 id="newToyLbl">Recently Added!</h3>`),
      newToyLbl.insertAdjacentHTML("afterend", `<img src=${toyImg}/>`),
      likeBtn.insertAdjacentHTML("beforebegin", `<p id="qtyLikes">${toyLikes} likes!</p>`),
      qtyLikes.insertAdjacentHTML("afterend", `<button id="likeBtn">Like</button>`)
    }) 
    .catch((error) => {         // how to manage when fetch goes wrong
      alert("Nope! That wasn't it!"),
      document.body.innerHTML = error.message
    })
    
  };

    // add all toys to index.html from the api database
    function getAllToys() {
      fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(json => json.forEach(toy => {
        document.querySelector("#toy-collection").insertAdjacentHTML("afterbegin", `<div id="card" class="card"></div>`),
        document.querySelector("#card").insertAdjacentHTML("afterbegin", `<h2 id='toyName' class='toyName'>${toy.name}</h2>`),
        document.querySelector("#toyName").insertAdjacentHTML("afterend",`<img src=${toy.image} id="toyImage" style="width: 50"/>`),
        document.querySelector("#toyImage").insertAdjacentHTML("afterend", `<p id="qtyLikes">${toy.likes} likes!</p>`),
        document.querySelector("#qtyLikes").insertAdjacentHTML("afterend", `<button id="likeBtn">Like</button>`)      
      }))
    };
  
});