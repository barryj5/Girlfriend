const imageInput = document.getElementById("imageUpload")
const AddButton = document.getElementById("AddButton")
const MainSection = document.querySelector(".imageGrid")
const SavedPage = document.getElementById("SavedPage")
const searchInput = document.querySelector(".homeInput")

let savedImage = JSON.parse(localStorage.getItem("Items"))||[];

let File = JSON.parse(localStorage.getItem("Item"))||[]
for(let it in File){
  let Img = document.createElement("img")
  let Div = document.createElement("div")
  let I = document.createElement("i")
  Div.className = "ImageDiv"
  I.className = "fa-solid fa-heart heart"
  Img.src = File[it]["src"]
  Div.appendChild(Img)
  Div.appendChild(I)
  MainSection.appendChild(Div)

  if (savedImage.some(image => image.id === File[it].id)) {
    I.classList.add("saved")
  }

  I.onclick = function(){
    const isSaved = I.classList.toggle("saved");
    if(isSaved){
      savedImage.push(File[it])
    }else{
      savedImage = savedImage.filter(Image => Image.id !== File[it].id)
    }
    localStorage.setItem("Items",JSON.stringify(savedImage))
  }
}
AddButton.onclick = function(){
  imageInput.click()
}
SavedPage.onclick = function(){
  window.location.href = "saved.html"
}

imageInput.addEventListener("change",function(){
  const file = imageInput.files[0]
  const reader = new FileReader()

  reader.onload = function(e){
    let div = document.createElement("div")
    let img = document.createElement("img")
    let i = document.createElement("i")
    div.className = "ImageDiv"
    i.className = "fa-solid fa-heart heart"
    div.appendChild(img)
    div.appendChild(i)
    img.src = e.target.result
    MainSection.appendChild(div)

    let captionText = prompt("Add a caption for this image:") 
    if(captionText === null){
      captionText = "Untitled"
    }

    const newImage = {id: Date.now(), src: e.target.result, caption: captionText}
    File.push(newImage)

    i.onclick = function(){
      const isSaved = i.classList.toggle("saved");
      if(isSaved){
        savedImage.push(newImage)
      }else{
        savedImage = savedImage.filter(Images => Images.id !== newImage["id"])
      }
      localStorage.setItem("Items",JSON.stringify(savedImage))
    }
    localStorage.setItem("Item",JSON.stringify(File))
  }
  reader.readAsDataURL(file)

})
searchInput.addEventListener("keydown",function(e){
  if(e.key === "Enter"){
    const inputted = searchInput.value.toLowerCase();
    const filteredImages = File.filter(image => image.caption && image.caption.toLowerCase().includes(inputted))
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