let addToy = false;


// create dom elements 



// fetch data

// add event listeners 





document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.querySelector('#toy-collection')
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const card = document.createElement('div')

  function fetchToys(){
    fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then(toyObj => {
        toyObj.forEach((toy) => {
          console.log(toy)
         renderToy(toy) 
      })
  })}

  function renderToy(toy){
    
    let div = document.createElement('div')
    div.className = 'card'
    div.dataset.id = toy.id
    div.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>`

    toyCollection.append(div)

  }

fetchToys();

  toyFormContainer.addEventListener('submit', renderForm)

  function renderForm(event){
    event.preventDefault();
    let name = event.target.name.value
    let image = event.target.image.value

    let newToy = {name, image, likes: 0}

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }, 
      body: JSON.stringify(newToy) 
    })
    .then(response => response.json())
    .then(dataObj => renderToy(dataObj))
  
  }

  toyCollection.addEventListener('click', increaseLikes)

  function increaseLikes(event){
    //  debugger
    // console.log(event.target.value)

    let div = event.target.closest('div')
    let id = parseInt(div.dataset.id)
    let likes = div.querySelector('p')
    let newLikes = parseInt(likes.textContent) + 1


    if(event.target.className === 'like-btn'){
      fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({likes: newLikes})
      })
      likes.textContent = `${newLikes} likes`
    }


  }



  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
