
function fileChange(value){
    let fileName = value.files[0].name
    value.previousElementSibling.innerText = fileName
    console.log(value.previousElementSibling)
    console.log(fileName)
}