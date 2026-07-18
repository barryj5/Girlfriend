const imageInput = document.getElementById("imageUpload")
const AddButton = document.getElementById("AddButton")
const MainSection = document.querySelector(".imageGrid")
const SavedPage = document.getElementById("SavedPage")

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


    const newImage = {id: Date.now(), src: e.target.result}
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