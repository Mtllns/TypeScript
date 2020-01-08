"use strict";
let car;
function submitCar() {
    event.preventDefault();
    let plate = document.getElementById("plate").value;
    let brand = document.getElementById("brand").value;
    let color = document.getElementById("color").value;
    let content_ruedas = document.getElementById("ruedas");
    let resultado = document.getElementById('resultado');
    let btn_createCar = document.getElementById('create-car');
    let num_errors = 0;
    let expreg = /^[0-9]{4}[aA-zZ]{3}$/;
    // Validacion Plate
    if (plate == "") {
        alert("Introduzca la matrícula");
        num_errors++;
    }
    else if (!expreg.test(plate)) {
        alert("La matrícula instroducida NO es correcta,hacen falta 4 numeros y 3 letras");
        num_errors++;
    }
    // Validacion Brand
    if (brand == "") {
        alert("El campo Marca es necesario");
        num_errors++;
    }
    else if (/^[aA-zZ]$/.test(brand)) {
        alert("El campo Marca solo permite letras");
        num_errors++;
    }
    // Validacion Color
    if (color == "") {
        alert("El campo Color es necesario");
        num_errors++;
    }
    if (num_errors > 0) {
        return false;
    }
    else {
        car = new Car(plate, color, brand);
        content_ruedas.classList.remove('d-none');
        resultado.classList.remove('d-none');
        btn_createCar.classList.add('d-none');
        document.getElementById('carInfo').innerHTML = 'Matrícula: ' + plate + ' Marca: ' + brand + ' Color: ' + color;
    }
}
function submitWeels() {
    event.preventDefault();
    let error = 0;
    // captura los valores de los campos Marca rueda y Diametro rueda
    for (let i = 1; i <= 4; i++) {
        let mr = document.getElementById('mr_' + i).value;
        let dr = Number(document.getElementById('dr_' + i).value);
        // Comprueba si los campos son correctos
        if (mr == "") {
            alert("El campo Marca rueda " + i + " no es correcto.");
            error++;
        }
        else if (dr < 0.4 || dr > 2) {
            alert("El campo Diámetro Rueda " + i + " no es correcto.");
            error++;
        }
    }
    // Si no hay errores entra el for
    if (error == 0) {
        // vuelve a capturar los valores de los campos Marca Rueda y Diametro Rueda
        for (let i = 1; i <= 4; i++) {
            let mr = document.getElementById('mr_' + i).value;
            let dr = Number(document.getElementById('dr_' + i).value);
            car.addWheel(new Wheel(Number(dr), mr)); // Se añaden los valores capturados en Wheel (diameter, brand).
        }
        printWheels(); // Se ejecuta la funcion printWheels
    }
    else {
        return false;
    }
}
// Funcion imprimir ruedas
function printWheels() {
    for (let i = 0; i < car.wheels.length; i++) {
        document.getElementById('wheel' + i).innerHTML = 'Marca Rueda ' + (i + 1) + ':' + car.wheels[i].brand;
        document.getElementById('diameter' + i).innerHTML = 'Diametro Rueda ' + (i + 1) + ':' + car.wheels[i].diameter;
    }
}
