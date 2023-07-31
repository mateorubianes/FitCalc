//Clase del Usuario
class User{
    constructor (username, genre, age, weight, height, activityRange){ //activity range va del 0 al 4 dependiendo que tan activo seas
        this.username = username
        this.genre = genre
        this.age = parseInt(age)
        this.weight = parseFloat(weight)
        this.height = parseInt(height)
        switch( parseInt(activityRange) ){
            case 0:
                this.activityRange = 1.55
                break
            case 1:
                this.activityRange = 1.85
                break
            case 2:
                this.activityRange = 2
                break
            case 3:
                this.activityRange = 2.2
                break
            case 4:
            this.activityRange = 2.4
            break
        }
    }
    caloriesCalculation(){
        let result = 0
        if(this.genre === "masculino"){
            result = ( (10 * this.weight) + (6.25 * this.height) - (5 * this.age) + 5 ) * this.activityRange
        }
        else if(this.genre === "femenino"){
            result = ( (10 * this.weight) + (6.25 * this.height) - (5 * this.age) - 161 ) * this.activityRange
        }
        else{
            result = 12
        }
        return result
    }
    IMCcalculation(){
        return this.weight / Math.pow(this.height/100, 2)
    }
}

//Creo Usuarios
const users = [] 
const startBtn = document.getElementById("start-btn")
const form = document.getElementById("userForm")
const createUser = document.getElementById("create-user")
const startSection = document.getElementById("start")
const resultsSection = document.getElementById("results")
const backBtn = document.getElementById("backBtnContainer")
const selector = document.getElementById("selector")
const userSelector = document.getElementById("userSelector")

backBtn.style.display = "none"
resultsSection.style.display = "none"

backBtn.addEventListener("click", () => {
    startSection.style.display = "flex"
    createUser.style.display = "none"
    backBtn.style.display = "none"
    resultsSection.style.display = "none"
    selector.style.display = "flex"
})
startBtn.addEventListener("click", () => {
    startSection.style.display = "none"
    createUser.style.display = "flex"
    resultsSection.style.display = "none"
    selector.style.display = "none"
})
form.addEventListener("submit", submitForm);
function submitForm(event) {
    event.preventDefault()
    const usernameform = document.getElementById("username").value
    if( users.find((user) => user.username === usernameform) ){
        alert("El nombre de usuario ya existe. Por favor, elige un nombre de usuario diferente.");
        users.pop()
        console.log(users)
        startSection.style.display = "flex"
        createUser.style.display = "none"
        backBtn.style.display = "none"
        resultsSection.style.display = "none"
        selector.style.display = "flex"
        return;
    }
    users.push( new User( usernameform, 
                        document.getElementById("gender").value,
                        document.getElementById("age").value,
                        document.getElementById("weight").value,
                        document.getElementById("height").value,
                        document.getElementById("activity-range").value))
    createUser.style.display = "none"
    resultsSection.style.display = "flex"
    selector.style.display = "none"
    backBtn.style.display = "flex"
    const calories = users[users.length-1].caloriesCalculation()
    const IMC = users[users.length-1].IMCcalculation()
    const username = users[users.length-1].username
    resultsSection.innerHTML = "<h2>Hola "+username+"! tus resultados son: </h2><h3>Calorias de mantenimiento: "+calories+"</h3><h3>IMC:"+IMC+"</h3>"     
    const newUser = document.createElement("option")
    newUser.textContent = username; // Texto de la opción
    newUser.value = username;
    userSelector.appendChild(newUser)
}
function verUsuario(){  
    const selectedUser = users.find( (user) => user.username === document.getElementById('userSelector').value )
    if(selectedUser){
        startSection.style.display = "none"
        createUser.style.display = "none"
        resultsSection.style.display = "flex"
        selector.style.display = "none"
        backBtn.style.display = "flex"
        const calories = selectedUser.caloriesCalculation()
        const IMC = selectedUser.IMCcalculation()
        const username = selectedUser.username
        resultsSection.innerHTML = "<h2>Hola "+username+"! tus resultados son: </h2><h3>Calorias de mantenimiento: "+calories+"</h3><h3>IMC:"+IMC+"</h3>"
    }
    else{
        alert("No ha seleccionado ninguno usuario o el nombre es inválido")
    }   
}


