const imageInput = document.getElementById("imageUpload")
const AddButton = document.getElementById("AddButton")
const MainSection = document.querySelector(".imageGrid")

const Images = []


let File = JSON.parse(localStorage.getItem("Item"))||[]
for(let it in File){
  let Img = document.createElement("img")
  Img.src = File[it]
  MainSection.appendChild(Img)

}
AddButton.onclick = function(){
  imageInput.click()
}

imageInput.addEventListener("change",function(){
  const file = imageInput.files[0]
  const reader = new FileReader()

  reader.onload = function(e){
    let img = document.createElement("img")
    img.src = e.target.result
    MainSection.appendChild(img)
    Images.push(e.target.result)

    File.push(e.target.result)
    localStorage.setItem("Item",JSON.stringify(File))
  }
  reader.readAsDataURL(file)

})