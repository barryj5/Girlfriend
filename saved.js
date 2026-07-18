const HomePage = document.getElementById("HomePage")
const MainSection = document.querySelector(".imageGrid")

HomePage.onclick = function(){
  window.location.href = "home.html"
}

let savedImage = JSON.parse(localStorage.getItem("Items"))||[];
for(let it in savedImage){
  let Img = document.createElement("img")
  let Div = document.createElement("div")
  let I = document.createElement("i")
  Div.className = "ImageDiv"
  I.className = "fa-solid fa-heart heart"
  Img.src = savedImage[it]["src"]
  Div.appendChild(Img)
  Div.appendChild(I)
  MainSection.appendChild(Div)


  I.classList.add("saved")
  const thisId = savedImage[it].id

  I.onclick = function(){
    Div.remove()
    savedImage = savedImage.filter(Image => Image.id !== thisId)
    localStorage.setItem("Items",JSON.stringify(savedImage))
  }
}