const body = document.querySelector('body')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

const arrayKeys = ['(',')','/','7','8','9','*','4','5','6','-','1','2','3','+','0','.','%', '',]

document.querySelectorAll('.charKey').forEach(function (key) {
    key.addEventListener('click', function () {
        const value = key.dataset.value
        input.value += value
    })
})

document.getElementById('clear').addEventListener('click', function () {
    input.value = ''
    input.focus()
    resultInput.value = ''
    resultInput.classList.remove('error')
    
})

input.addEventListener('keydown', function(event) {
    event.preventDefault()

    if(arrayKeys.includes(event.key)){
        input.value += event.key
        return
    }

    if(event.key === 'Backspace'){
        input.value = input.value.slice(0, -1)
    }
    if(event.key ==='Enter'){
        calculate()
    }
})

document.getElementById('equal').addEventListener('click', calculate)

function calculate () {
    try {
        const result = eval (input.value)
        input.value = result
        resultInput.value = result
        resultInput.classList.add('sucess')
    } catch (error) {
        resultInput.value = 'Opss, algo deu errado'
        resultInput.classList.add('error')
    }
}


document.getElementById('copy').addEventListener('click', function (event) {
    const button_copy = event.currentTarget
    if(button_copy.innerText === 'Copy' && resultInput.value) {
        button_copy.innerText = 'Copied!'
        button_copy.classList.add('sucess')
        navigator.clipboard.writeText(resultInput.value)
    }else if (!resultInput.innerText) {
        button_copy.innerText = 'Copy'
        button_copy.classList.remove('sucess')
    }
})

document.getElementById('darkmode-toggle').addEventListener('click', function () {
    if(body.dataset.theme === 'dark'){
        root.style.setProperty('--border-color', '#242424')
        root.style.setProperty('--primary-color', 'rgb(148, 66, 255)')
        body.dataset.theme = 'light'
    }else {
        root.style.setProperty('--border-color', '#fff')
        root.style.setProperty('--primary-color', '#fff')
        body.dataset.theme = 'dark'
    }
})

