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
        this.genre === "masculino" ? this.calories = ( (10 * this.weight) + (6.25 * this.height) - (5 * this.age) + 5 ) * this.activityRange : this.calories = ( (10 * this.weight) + (6.25 * this.height) - (5 * this.age) - 161 ) * this.activityRange
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
const foodSection = document.getElementById("foods")
const backBtn = document.getElementById("backBtnContainer")
const selector = document.getElementById("selector")
const userSelector = document.getElementById("userSelector")
const infoButton = document.getElementById("activity-info")
const deleteButton = document.getElementById("deleteUser")
let storedUsers
let userToDelete

// - FUNCIONES - //
// Función para ocultar un elemento
function hideElement(element) {
    element.classList.add("hidden")
    element.classList.remove("visible")
}
// Función para mostrar un elemento
function showElement(element) {
    element.classList.remove("hidden")
    element.classList.add("visible")
}
//Función para ver usuario 
function verUsuario(){  
    const selectedUser = users.find( (user) => user.username === document.getElementById('userSelector').value )
    userToDelete = selectedUser
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
        showElement(deleteButton)
    }
}

//Oculto elementos de arranque
//hideElement(foodSection)
hideElement(foodSection)
hideElement(createUser)
hideElement(backBtn)
hideElement(resultsSection)
hideElement(deleteButton)

// - EVENT LISTENERS - //
// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    storedUsers = JSON.parse(localStorage.getItem("users")) || []
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
    const usernameform = document.getElementById("username").value
    if( users.find((user) => user.username === usernameform) ){
        alert("El nombre de usuario ya existe. Por favor, elige un nombre de usuario diferente.")
        users.pop()
        showElement(startSection)
        showElement(selector)
        hideElement(createUser)
        hideElement(backBtn)
        hideElement(resultsSection)
        hideElement(foodSection)
        return;
    }
    //Lo pusheo al array y lo guardo al LocalStorage
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
    newUser.textContent = username
    newUser.value = username
    userSelector.appendChild(newUser)

    showElement(resultsSection)
    showElement(foodSection)
    showElement(backBtn)
    hideElement(selector)
    hideElement(createUser)
}

//Borrar Usuario
deleteButton.addEventListener("click", () =>{
    Swal.fire({
        title: '¿Queres eliminar el usuario?',
        showDenyButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('¡Eliminado!', '', 'success')
          storedUsers = users.filter(user => user.username !== userToDelete.username)
          localStorage.setItem("users", JSON.stringify(storedUsers))
          hideElement(createUser)
          hideElement(backBtn)
          hideElement(resultsSection)
          hideElement(foodSection)
          hideElement(deleteButton)
          showElement(startSection)
          showElement(selector)
          location.reload()
        } else if (result.isDenied) {
          Swal.fire('El usuario no ha sido eliminado', '', 'error')
          hideElement(createUser)
          hideElement(selector)
          hideElement(startSection)
          showElement(resultsSection)
          showElement(backBtn)
          showElement(deleteButton)
        }
      })
})

//Boton de informacion
infoButton.addEventListener("click", () => {
    Swal.fire({
        title: '<strong>¿Qué es el rango de actividad?</strong>',
        icon: 'info',
        html:
        "<p>El rango de actividad indica que tanto esfuerzo físico hace una persona en su vida diaria siendo:</p>" +
            "<ul>" +
                "<li>1 - poco o ningun ejercicio</li>"+
                "<li>2 - Ejercicio ligero (1-3 días a la semana)</li>"+
                "<li>3 - Ejercicio moderado (3-5 días a la semana)</li>"+
                "<li>4 - Ejercicio fuerte (6-7 días a la semana)</li>"+
                "<li>5 - Ejercicio muy fuerte (dos veces al día, entrenamientos muy duros)</li>"+
            "</ul>",
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> OK!',
      })
})

//Boton de back
backBtn.addEventListener("click", () => {
    hideElement(createUser)
    hideElement(backBtn)
    hideElement(resultsSection)
    hideElement(foodSection)
    hideElement(deleteButton)
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

const url = '../foods.json';
fetch(url)
.then( response => response.json() )
.then( data => {
    console.log(data)
    data.forEach(comida =>{
        const newCard = document.createElement("div");
        newCard.id = "foodCard"
        newCard.innerHTML =`
        <h3>${comida.name}</h3>
        <h4>(${comida.servingSize})</h4>
        <ul>
            <li>Calorías: ${comida.calories}</li>
            <li>Proteínas: ${comida.protein}</li>
            <li>Carbohidratos: ${comida.carbohydrates}</li>
            <li>Grasas: ${comida.fat}</li>
        </ul>
        `
        foodSection.appendChild(newCard)
    })
})
.catch( error => {
    console.error("Hubo un error al obtener los datos pokemons", error)
})