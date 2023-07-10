let personas = []
let i = 0
while(true){
    personas.push(prompt("Ingrese el " + (i+1) +"° nombre. para finalizar el ingreso de nombres presione cancelar"))
    if(personas[i] === null || personas[i] === ""){
        personas.length = personas.length - 1
        break;
    }
    i++
}

let dineroIndividual = []
for(i=0;i<personas.length;i++){
    let dineroPagado = parseFloat(prompt("ingrese cuanto dinero pago " + personas[i]))
    if( isNaN(dineroPagado) ){
        console.log("Ingrese un numero válido por favor")
        i--
    }
    else{
        dineroIndividual.push(dineroPagado)
    }   
}

let dineroTotal = 0
for (let j=0;j<dineroIndividual.length;j++) {
    dineroTotal += parseInt(dineroIndividual[j])
}

console.log("=======================================")
console.log("dinero pagado: $" + dineroTotal)
console.log("Cada uno debería pagar: " + (dineroTotal/personas.length) )

for(i=0;i<personas.length;i++){
    divisionDinero(personas[i], personas.length, dineroIndividual[i], dineroTotal)
}

function divisionDinero(persona, cantidadPersonas, dineroIndividual, dineroTotal){
    const division = dineroTotal/cantidadPersonas
    console.log("=======================================")
    console.log(persona + " ha pagado " + dineroIndividual)
    if(dineroIndividual > division){
        const saldo = dineroIndividual - division
        console.log( persona + " debe recibir $" + saldo)
    }
    else if(dineroIndividual < division){
        const deuda = division - dineroIndividual
        console.log( persona + " debe pagar $" + deuda)
    }
    else if(dineroIndividual === division){
        console.log( persona + " no debe pagar ni recibir nada")
    }
}

  
