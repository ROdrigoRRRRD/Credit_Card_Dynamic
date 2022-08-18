// CARDHOLDER NAME

let nameCard = document.querySelector('.card__details-name');
let nameInput = document.querySelector('#cardholder');
let nameErrorDiv = document.querySelector('.form__cardholder--error');

//CARD NUMBER

let numberCard = document.querySelector('.card__number');
let numberInput = document.querySelector('#cardnumber');
let numberErrorDiv = document.querySelector('.form__inputnumber--error');

// MM
let monthCard = document.querySelector('.card__details-month');
let monthInput = document.querySelector('#cardMonth');
let monthErrorDiv = document.querySelector('.form__input-mm--error');

// YY

let yearCard = document.querySelector('.card__details-year');
let yearInput = document.querySelector('#cardYear');
let yearErrorDiv = document.querySelector('.form__input-yy--error');

// CVC

let cvcCard = document.querySelector('.card-back__cvc');
let cvcInput = document.querySelector('#cardCvc');
let cvcErrorDiv = document.querySelector('.form__input-cvc--error');

//Escucha dinamica del number
nameInput.addEventListener('input', () => {
    if (nameInput.value == '') {
        nameCard.innerText = 'JANE APPLESEED';
    } else {
        nameCard.innerText = nameInput.value;
    }
});

//Escucha Dinamica del Numero

numberInput.addEventListener('input', event => {
    let inputValue = event.target.value;
    let regExp = /[A-z]/g;
    if (regExp.test(numberInput.value) == true) {
        showError(numberInput, numberErrorDiv, 'Wrong format, numbers only', true);
    } else {
        numberInput.value = inputValue.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim();
        showError(numberInput, numberErrorDiv, '', false);
    }

    if (numberInput.value == '') {
        numberCard.innerText = '0000 0000 0000 0000';
    } else {
        numberCard.innerText = numberInput.value;
    }
});

//Ingreso Dinamico Del Mes

monthInput.addEventListener('input', () => {
    monthCard.innerText = monthInput.value;
    validateLetters(monthInput, monthErrorDiv);
});

//Ingreso Dinamico del Año

yearInput.addEventListener('input', () => {
    yearCard.innerText = yearInput.value;
    validateLetters(yearInput, yearErrorDiv);
});

//Ingreso Dinamico del cvc

cvcInput.addEventListener('input', () => {
    cvcCard.innerText = cvcInput.value;
    validateLetters(cvcInput, cvcErrorDiv);
});

//Boton Escucha

let confirmBtn = document.querySelector('.form__submit');
let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

confirmBtn.addEventListener('click', event => {
    event.preventDefault();

    // Validar Nombre

    if (verifyFilled(nameInput, nameErrorDiv)) {
        nameValidation = true;
    } else {
        nameValidation = false;
    }

    // Validar Numero

    if (verifyFilled(numberInput, numberErrorDiv) == true) {
        if (numberInput.value.length == 19) {
            showError(numberInput, numberErrorDiv, '', false);
            numberValidation = true;
        } else {
            showError(numberInput, numberErrorDiv, 'Wrong Number', true);
            numberValidation = false;
        }
    }
    // Validar el Mes

    if (verifyFilled(monthInput, monthErrorDiv)) {
        if (monthInput.value > 0 && monthInput.value <= 12) {
            showError(monthInput, monthErrorDiv, '', false);
            monthValidation = true;
        } else {
            showError(monthInput, monthErrorDiv, 'Wrong Month');
            monthValidation = false;
        }
    }

    // Validar el Año

    if (verifyFilled(yearInput, yearErrorDiv)) {
        if (yearInput.value > 22 && yearInput.value <= 27) {
            showError(yearInput, yearErrorDiv, '', false);
            yearValidation = true;
        } else {
            showError(yearInput, yearErrorDiv, 'Wrong Year', true);
            yearValidation = false;
        }
    }

    // Validar Cvc

    if (verifyFilled(cvcInput, cvcErrorDiv)) {
        if (cvcInput.value.length == 3) {
            showError(cvcInput, cvcErrorDiv, '', false);
            cvcValidation = true;
        } else {
            showError(cvcInput, cvcErrorDiv, 'Wrong Error', true);
            cvcValidation = false;
        }
    }

    if (nameValidation == true && numberValidation == true && monthValidation == true && yearValidation == true && cvcValidation == true) {
        formSection.style.display = 'none';
        thanksSection.style.display = 'block';
    }
})

// Secciones Formulario 

let formSection = document.querySelector('.form');
let thanksSection = document.querySelector('.thanks-section');

//Funciones 

function showError(divInput, divError, msgError, show) {
    if (show) {
        divError.innerText = msgError;
        divInput.style.borderColor = '#FF0000';
    } else {
        divError.innerText = msgError;
        divInput.style.borderColor = 'hsl(270, 3%, 87%)';
    }
}

function verifyFilled(divInput, divError) {
    if (divInput.value.length > 0) {
        showError(divInput, divError, "", false);
        return true;
    } else {
        showError(divInput, divError, "Can't be blank", true);
        return false;
    }
}

function validateLetters(input, divError) {
    let regExp = /[A-z]/g;
    if (regExp.test(input.value)) {
        showError(input, divError, 'Wrong format, numbers only', true);
    } else {
        showError(input, divError, '', false);
    }
}