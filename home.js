const imageInput = document.getElementById("imageUpload")
const AddButton = document.getElementById("AddButton")
const MainSection = document.querySelector(".imageGrid")
const SavedPage = document.getElementById("SavedPage")
const searchInput = document.querySelector(".homeInput")
const overlay = document.getElementById("overlay")
const overlayImg = document.getElementById("overlayImg")

let savedImage = JSON.parse(localStorage.getItem("Items"))||[];

let File = JSON.parse(localStorage.getItem("Item"))||[]
for(let it in File){
  let Img = document.createElement("img")
  let Div = document.createElement("div")
  let I = document.createElement("i")
  let Trash = document.createElement("i")
  Div.className = "ImageDiv"
  I.className = "fa-solid fa-heart heart"
  Trash.className = "fa-solid fa-trash"
  Img.src = File[it]["src"]
  Div.appendChild(Img)
  Div.appendChild(I)
  Div.appendChild(Trash)
  MainSection.appendChild(Div)

  if (savedImage.some(image => image.id === File[it].id)) {
    I.classList.add("saved")
  }
  Trash.onclick = function(){
    const remove = confirm("Delete this image?")
    if(remove === true){
      Div.remove()
      File = File.filter(itemz=> itemz.id !== File[it].id)
      localStorage.setItem("Item",JSON.stringify(File))
    }
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
  Img.onclick = function(){
    overlayImg.src = Img.src
    overlay.classList.add("active")
  }
}
overlay.onclick = function(){
  overlay.classList.remove("active")
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
    let trash  = document.createElement("i")
    const canvas = document.createElement("canvas")
    div.className = "ImageDiv"
    i.className = "fa-solid fa-heart heart"
    trash.className =  "fa-solid fa-trash" 
    div.appendChild(img)
    div.appendChild(i)
    div.appendChild(trash)
    const tempImg = new Image()
    tempImg.src = e.target.result

    tempImg.onload = function(){
      const scaleFactor = 1000 / tempImg.width
      const newWidth = 1000
      const newHeight = tempImg.height * scaleFactor
      canvas.width = newWidth
      canvas.height = newHeight
      const ctx = canvas.getContext("2d")
      ctx.drawImage(tempImg, 0, 0, canvas.width, canvas.height)
      const compressed = canvas.toDataURL("image/jpeg", 0.7)

      img.src = compressed
      MainSection.appendChild(div)

      let captionText = prompt("Add a caption for this image:") 
      if(captionText === null){
        captionText = "Untitled"
      }

      const newImage = {id: Date.now(), src: compressed, caption: captionText}
      File.push(newImage)

      trash.onclick = function(){
        const remove = confirm("Delete this image?")
        if(remove === true){
          div.remove()
          File = File.filter(itemz=> itemz.id !== newImage.id)
          localStorage.setItem("Item",JSON.stringify(File))
        }
      }

      img.onclick = function(){
        overlayImg.src = img.src
        overlay.classList.add("active")
      }

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
  }
  reader.readAsDataURL(file)

})
searchInput.addEventListener("keydown",function(e){
  if(e.key === "Enter"){
    const inputted = searchInput.value.toLowerCase();
    const filteredImages = File.filter(image => image.caption && image.caption.toLowerCase().includes(inputted))
    if(filteredImages.length === 0){
      MainSection.innerHTML = "No results found"
    }else{
      MainSection.innerHTML = ""
    }
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
    Image.onclick = function(){
      overlayImg.src = Image.src
      overlay.classList.add("active")
    }
    }
  }
})