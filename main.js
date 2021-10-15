// I love Anechka Grigoryan <3


document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') generate.click();
});

const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

clipboard.addEventListener('click', () => {
	resultEl.select();
    document.execCommand("copy");
});

generate.addEventListener('click', () => {
	const length = lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
	
	resultEl.value  = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(lower , upper, number, symbol, length) {
    let genereatedPassword = '';

    const typesCount = lower + upper + number + symbol;

    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter
    (
        item => Object.values(item)[0]
    );
 
    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i+= typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            genereatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = genereatedPassword.slice(0, length);
    console.log(genereatedPassword.slice(0, length));
    return finalPassword;
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random()  * symbols.length)];
}