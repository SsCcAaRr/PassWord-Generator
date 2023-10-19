const passwordDisplay = document.querySelector("[data-passwordDisplay]")
const copyBtn = document.querySelector("[data-copy]")
const copyMsg = document.querySelector("[data-copyMsg]")
const lengthDisplay = document.querySelector("[data-lenghtNumber]")
const inputSlider = document.querySelector("[data-lenghtSlider]")
const uppercaseCheck = document.querySelector('#uppercase')
const lowercaseCheck = document.querySelector('#lowercase')
const numbersCheck = document.querySelector('#numbers')
const symbolsCheck = document.querySelector('#symbols')
const indicator = document.querySelector("[data-indicator]")
const generateBtn = document.querySelector(".generateButton")
const symbols = '!@#$%^&*()-_+={}[];:<,>./?`~'
const allCheckBox = document.querySelectorAll('input[type=checkbox]')

let password = ""
let passwordLenght = 10
let checkCount = 1
handleSlider();
setIndicator('#ccc')


function handleSlider() {
    inputSlider.value = passwordLenght
    lengthDisplay.textContent = passwordLenght
}

function setIndicator(color) {
    indicator.style.background = color 
}

function getRndInteger(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRndNumber() {
    return getRndInteger(0,9)
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97,123))
}

function generateupperCase() {
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol() {
    const randNum = getRndInteger(0,symbols.length)
    return symbols.charAt(randNum)
}

function calcStrenght() {
    let hasUpper = false
    let hasLower = false
    let hasNum = false
    let hasSym = false
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLenght >= 8) {
        setIndicator("#0f0");
      } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLenght >= 6
      ) {
        setIndicator("#ff0");
      } else {
        setIndicator("#f00");
      }

}

async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText = 'Copied'
    }
    catch(e){
        copyMsg.innerText= 'Failed'
    }

    copyMsg.classList.add('active')

    setTimeout (  ()=> {
        copyMsg.classList.remove('active')
    }, 2000 )

}

function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange(){
    checkCount = 0
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++
    })
}

if(passwordLenght < checkCount ) {
    passwordLenght = checkCount;
    handleSlider();
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange)
})

inputSlider.addEventListener('input' , (e) => {
    passwordLenght = e.target.value
    handleSlider()
})

copyBtn.addEventListener('click' ,() => {
    if(passwordDisplay.value)
    copyContent();
})

generateBtn.addEventListener('click', () => {
    if (checkCount == 0)
    return

    if (passwordLenght < checkCount){
        passwordLenght = checkCount
        handleSlider()
    }

    console.log("Starting the Journey");

    password =""

    let funcArr =[]

    if(uppercaseCheck.checked)
    funcArr.push(generateupperCase)

    if(lowercaseCheck.checked)
    funcArr.push(generateLowerCase)

    if(numbersCheck.checked)
    funcArr.push(getRndNumber)

    if(symbolsCheck.checked)
    funcArr.push(generateSymbol)

    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("COmpulsory adddition done");

    //remaining adddition
    for(let i=0; i<passwordLenght-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrenght();


})