class Calculator {
    constructor(firstOperrandText, secondOperrandText) {
        this.firstOperrandText = firstOperrandText
        this.secondOperrandText = secondOperrandText
        this.clear()
    }
    clear() {
        this.firstOperrand = ''
        this.secondOperrand = ''
        this.operation = undefined
    }
    delete() {
        this.secondOperrand = this.secondOperrand.toString().slice(0, -1)

    }
    appendNumber(number) {
        if (number === '.' && this.secondOperrand.includes('.')) return
        this.secondOperrand = this.secondOperrand + number.toString()

    }
    calculate() {
        let calculated
        const first = parseFloat(this.firstOperrand)
        const second = parseFloat(this.secondOperrand)
        if (isNaN(first) || isNaN(second)) return
        switch (this.operation) {
            case '+':
                calculated = first + second
                break
            case '-':
                calculated = first - second
                break
            case '/':
                calculated = first / second
                break
            case '*':
                calculated = first * second
                break
            default:
                return
        }
        this.secondOperrand = calculated
        this.operation = undefined
        this.firstOperrand = ''

    }
    selectOperation(operation) {
        if (this.secondOperrand === '') return
        if (this.firstOperrand !== '') {
            this.calculate()
        }
        this.operation = operation
        this.firstOperrand = this.secondOperrand
        this.secondOperrand = ''

    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }

    }
    updateDisplay() {
        this.secondOperrandText.innerText = this.getDisplayNumber(this.secondOperrand)
        if (this.operation != null) {
            this.firstOperrandText.innerText = `${this.getDisplayNumber(this.firstOperrand)} ${this.operation}`
        } else {
            this.firstOperrandText.innerText = ''
        }


    }

}
const numberButtons = document.querySelectorAll('#number')
const operationButtons = document.querySelectorAll('#operation')
const allClearButton = document.querySelector('#all-clear')
const deleteButton = document.querySelector('#delete')
const equals = document.querySelector('#equals')
const firstOperrandText = document.querySelector('#first-opperand')
const secondOperrandText = document.querySelector('#second-opperand')

const calculator = new Calculator(firstOperrandText, secondOperrandText);
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equals.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})


