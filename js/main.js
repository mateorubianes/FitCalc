// - CLASES - //
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
        if(this.genre === "masculino"){
            this.calories = ( (10 * this.weight) + (6.25 * this.height) - (5 * this.age) + 5 ) * this.activityRange
        }
        else if(this.genre === "femenino"){
            this.calories = ( (10 * this.weight) + (6.25 * this.height) - (5 * this.age) - 161 ) * this.activityRange
        }
        this.IMC = this.weight / Math.pow(this.height/100, 2)
    }
}

// - VARIABLES - //
const users = [] 
const startBtn = document.getElementById("start-btn")
const form = document.getElementById("userForm")
const createUser = document.getElementById("create-user")
const startSection = document.getElementById("start")
const resultsSection = document.getElementById("results")
const backBtn = document.getElementById("backBtnContainer")
const selector = document.getElementById("selector")
const userSelector = document.getElementById("userSelector")

// - FUNCIONES - //
// Función para ocultar un elemento
function hideElement(element) {
    element.classList.add("hidden");
    element.classList.remove("visible");
}
// Función para mostrar un elemento
function showElement(element) {
    element.classList.remove("hidden");
    element.classList.add("visible");
}
// Función busqueda de usuario
function userfinder(){
    let hola = 0
}
//Función para ver usuario 
function verUsuario(){  
    const selectedUser = users.find( (user) => user.username === document.getElementById('userSelector').value )
    if(selectedUser){
        const calories = selectedUser.calories
        const IMC = selectedUser.IMC
        const username = selectedUser.username
        resultsSection.innerHTML = "<h2>Hola "+username+"! tus resultados son: </h2><h3>Calorias de mantenimiento: "+calories+"</h3><h3>IMC:"+IMC+"</h3>"

        hideElement(createUser)
        hideElement(selector)
        hideElement(startSection)
        showElement(resultsSection)
        showElement(backBtn)
    }
}

//Oculto elementos de arranque
hideElement(createUser)
hideElement(backBtn)
hideElement(resultsSection)

// - EVENT LISTENERS - //
// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    users.push(...storedUsers);
    // Actualizar el select con los nombres de usuario
    storedUsers.forEach((storedUser) => {
        const newUser = document.createElement("option");
        newUser.textContent = storedUser.username;
        newUser.value = storedUser.username;
        userSelector.appendChild(newUser);
    });
});

//Creacion de un nuevo usuario
form.addEventListener("submit", submitForm);
function submitForm(event) {
    event.preventDefault()
    //chequeo que no exista
    if( users.find((user) => user.username === usernameform) ){
        alert("El nombre de usuario ya existe. Por favor, elige un nombre de usuario diferente.");
        users.pop()
        showElement(startSection)
        showElement(selector)
        hideElement(createUser)
        hideElement(backBtn)
        hideElement(resultsSection)
        return;
    }
    //Lo pusheo al array y lo guardo al LocalStorage
    const usernameform = document.getElementById("username").value
    users.push( new User( usernameform, 
                        document.getElementById("gender").value,
                        document.getElementById("age").value,
                        document.getElementById("weight").value,
                        document.getElementById("height").value,
                        document.getElementById("activity-range").value))
    localStorage.setItem("users", JSON.stringify(users));
    const calories = users[users.length-1].calories
    const IMC = users[users.length-1].IMC
    const username = users[users.length-1].username
    //Modifico el DOM
    const newUser = document.createElement("option")
    resultsSection.innerHTML = "<h2>Hola "+username+"! tus resultados son: </h2><h3>Calorias de mantenimiento: "+calories+"</h3><h3>IMC:"+IMC+"</h3>"     
    newUser.textContent = username; // Texto de la opción
    newUser.value = username;
    userSelector.appendChild(newUser)

    showElement(resultsSection)
    showElement(backBtn)
    hideElement(selector)
    hideElement(createUser)
}

//Boton de back
backBtn.addEventListener("click", () => {
    hideElement(createUser)
    hideElement(backBtn)
    hideElement(resultsSection)
    showElement(startSection)
    showElement(selector)
})

//Boton de start
startBtn.addEventListener("click", () => {
    showElement(createUser)
    hideElement(startSection)
    hideElement(selector)
    showElement(backBtn)
})
