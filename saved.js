const HomePage = document.getElementById("HomePage")
const MainSection = document.querySelector(".imageGrid")
const searchInput = document.querySelector(".homeInput")
const AddButton = document.getElementById("AddButton")

HomePage.onclick = function(){
  window.location.href = "home.html"
}
AddButton.onclick = function(){
  window.alert("You cannot add an image to the saved page")
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
searchInput.addEventListener("keydown",function(e){
  if(e.key === "Enter"){
    const inputted = searchInput.value.toLowerCase();
    const filteredImages = savedImage.filter(image => image.caption && image.caption.toLowerCase().includes(inputted))
    MainSection.innerHTML = ""
    for(let filt in filteredImages){
      let Image = document.createElement("img")
      let Dive = document.createElement("div")
      let Icon = document.createElement("i")
      Dive.className = "ImageDiv"
      Icon.className = "fa-solid fa-heart heart"
      Image.src = filteredImages[filt]["src"]
      Dive.appendChild(Image)
      Dive.appendChild(Icon)
    MainSection.appendChild(Dive)
    }
  }
})