class App {
    currentWeight = null
    currentSpan = null
    newWeight = null
    newSpan = null
    height = null
    heightSpan = null
    startDate = null
    endDate = null
    submit = null
    //initial values
    initialDate = new Date()
    minDate = new Date().toISOString().split('T')[0];
    //class/id object storage
    DOMElements = {
        currentWeight: 'current-weight',
        currentSpan: '.current-weight-span',
        newWeight: 'new-weight',
        newSpan: '.new-weight-span',
        height: 'height',
        heightSpan: '.height-span',
        startDate: 'start-date',
        endDate: 'end-date',
        submit: '.submit-button'
    }
    initializeApp() {
        this.handleElements()
        this.setInitialValues()
        this.addEventListeners()
    }
    addEventListeners() {
        this.currentWeight.addEventListener('input', () => {
            this.currentSpan.textContent = this.currentWeight.value
        })
        this.newWeight.addEventListener('input', () => {
            this.newSpan.textContent = this.newWeight.value
        })
        this.height.addEventListener('input', () => {
            this.heightSpan.textContent = this.height.value
        })
        this.startDate.addEventListener('change', this.setEndDateMin.bind(this))
        this.submit.addEventListener('click', this.handleSubmit.bind(this))
    }
    handleElements() {
        this.currentWeight = document.getElementById(this.DOMElements.currentWeight);
        this.currentSpan = document.querySelector(this.DOMElements.currentSpan);
        this.newWeight = document.getElementById(this.DOMElements.newWeight);
        this.newSpan = document.querySelector(this.DOMElements.newSpan);
        this.height = document.getElementById(this.DOMElements.height);
        this.heightSpan = document.querySelector(this.DOMElements.heightSpan);
        this.startDate = document.getElementById(this.DOMElements.startDate);
        this.endDate = document.getElementById(this.DOMElements.endDate);
        this.submit = document.querySelector(this.DOMElements.submit);
        console.log(this.currentWeight.value);
    }
    setInitialValues() {
        this.startDate.valueAsDate = this.initialDate
        this.startDate.min = this.minDate
        this.endDate.min = this.minDate
        this.currentSpan.textContent = this.currentWeight.value
        this.newSpan.textContent = this.newWeight.value
        this.heightSpan.textContent = this.height.value
    }
    setEndDateMin() {
        this.endDate.min = this.startDate.value
        this.endDate.value = this.endDate.min
    }
    handleSubmit(e) {
        e.preventDefault()

        this.count()
    }
    count() {
        if (!this.endDate.value) return alert('Podaj do kiedy chcesz schudnąć')
        if (parseInt(this.currentWeight.value, 10) < parseInt(this.newWeight.value, 10)) {
            this.newWeight.value = 0
            this.newSpan.textContent = 0
            return alert('Docelowa masa jest wyższa niż obecna')
        }
        document.querySelector('.answer').classList.remove('disable')
        //różnica mas
        const weightDifference = parseInt(this.currentWeight.value, 10) - parseInt(this.newWeight.value, 10)
        document.querySelector('.weight-difference strong').textContent = weightDifference > 0 ? weightDifference : '?';
        // obecne bmi 
        const heightInMeters = parseInt(this.height.value, 10) * 0.01
        const currentBmi = parseInt(this.currentWeight.value, 10) / (Math.pow(heightInMeters, 2))
        document.querySelector('.current-bmi strong').textContent = this.bmiDescription(currentBmi.toFixed(2))
        // docelowe bmi 
        const newBmi = parseInt(this.newWeight.value, 10) / (Math.pow(heightInMeters, 2))
        document.querySelector('.new-bmi strong').textContent = this.bmiDescription(newBmi.toFixed(2))
        // zmiana przez dni
        const changePerDay = this.changePerDay(weightDifference)
        document.querySelector('.daily-kg strong').textContent = changePerDay
        // ilosc kalorii
        const calPerDay = this.getCal(changePerDay)
        document.querySelector('.daily-cal strong').textContent = calPerDay
        // zmiana przez tygodnie
        const changePerWeek = this.changePerWeek(weightDifference)
        document.querySelector('.weekly-kg strong').textContent = changePerWeek

    }
    bmiDescription(bmi) {
        if (bmi < 16) return `${bmi} , chorobliwa niedowaga`
        if (bmi > 16 && bmi < 18) return `${bmi}, lekka niedowaga`
        if (bmi > 18 && bmi < 25) return `${bmi}, waga optymalna`
        if (bmi > 25 && bmi < 30) return `${bmi}, lekka nadwaga`
        if (bmi > 30) return `${bmi}, duża otyłość :)`
    }
    changePerDay(weightDifference) {
        const dayInMsc = 24 * 60 * 60 * 1000;
        const numberOfDays = this.getDateDifference() / dayInMsc;
        const changeDaily = numberOfDays ? (weightDifference / numberOfDays).toFixed(2) : null;
        return changeDaily
    }
    getCal(kgPerDay) {
        return 7000 * kgPerDay
    }
    changePerWeek(weightDifference) {
        const weekInMsc = 7 * 24 * 60 * 60 * 1000;
        const numberOfWeeks = this.getDateDifference() / weekInMsc;
        const changeWeekly = numberOfWeeks ? (weightDifference / numberOfWeeks).toFixed(2) : null;
        return changeWeekly
    }
    getDateDifference() {
        return new Date(this.endDate.value) - new Date(this.startDate.value)
    }
}
