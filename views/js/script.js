const searchBtn = document.getElementById("searchButton")
let buttons = document.querySelectorAll(".filter")
let cards = document.querySelectorAll(".car")
let size = document.querySelectorAll(".size")
const nama = document.querySelectorAll(".nama")
const query = document.getElementById("search")

console.log(query.value)

searchBtn.addEventListener('click', () => {
    for(let i = 0; i<cards.length; i++){
        if(query.value.toUpperCase() == size[i].innerHTML.toUpperCase() || query.value.toUpperCase() == nama[i].innerHTML.toUpperCase()){
            cards[i].classList.remove("hide")
        }else{
            cards[i].classList.add("hide")
        }
    }
})

const filter = (value) => {
    buttons.forEach(button => {
        if(value == button.innerText){
            button.classList.remove("btn-filter-2")
            button.classList.add("btn-filter")
        }else{
            button.classList.remove("btn-filter")
            button.classList.add("btn-filter-2")
        }
    })

    for(let i = 0; i<cards.length; i++){
        if(value == "All"){
            cards[i].classList.remove("hide");
        }else{
            console.log(size[i])
            if(size[i].innerHTML.toUpperCase() != value.toUpperCase()){
                cards[i].classList.add("hide")
            }else{
                cards[i].classList.remove("hide")
            }
        }
    }
}