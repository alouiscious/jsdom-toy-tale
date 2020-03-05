let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getAllToys()
  // insertToys(allToys)
  
  let toy = {
    name: "",
    img: "",
    likes: ""    
  }  
  const toyForm = document.querySelector(".container");
  let toyDiv = document.querySelector("#toy-collection");
  document.addEventListener("click", (e) => {
    // hide & seek with the form
    if (e.target.matches("#new-toy-btn")) {
      addToy = !addToy
      if (addToy) {
        toyForm.addEventListener('submit', s => { s.preventDefault() }),
        postToy(toy);
        toyForm.style.display = "block";
      } else {
        toyForm.style.display = "none";
      }
      // toyDiv.insertAdjacentHTML("beforebegin", `<div id="newestToys"></div>`),
      // newestToys.insertAdjacentHTML("afterbegin", `<h3 id="newToyLbl">Recently Added!</h3>`),
      // newToyLbl.insertAdjacentHTML("afterend", `<img src=${toyImg}/>`),
      // likeBtn.insertAdjacentHTML("beforebegin", `<p id="qtyLikes">${toyLikes} likes!</p>`),
      // qtyLikes.insertAdjacentHTML("afterend", `<button id="likeBtn">Like</button>`)
    }
  });

  // add all toys to index.html from the api database
  function getAllToys() {
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => { 
      debugger
      // allToys.forEach(toy => (toy.json)() 

      //   toyDiv.insertAdjacentHTML("afterbegin", `<div class='card' id='card'>${toyCard}</div>`)
      
    });
  }
});

// add new toys to database
function postToy(toy) {
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
  .then(toyCard => function showNewToy(toyCard){
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
