function initializeAnswers() {
    if (typeof (localStorage.answers) == 'undefined') {
        console.log('load blank')
        setBlank();
    }
    else {
        console.log('load from localstorage')
        return JSON.parse(localStorage.getItem("answers"));
    }
}

var answers = initializeAnswers();

function setBlank() {
    localStorage.personName = ''
    answers = [
        { 'questionNumber': 1, 'value': '' },
        { 'questionNumber': 2, 'value': '' },
        { 'questionNumber': 3, 'value': '' },
        { 'questionNumber': 4, 'value': '' },
        { 'questionNumber': 5, 'value': '' },
        { 'questionNumber': 6, 'value': '' },
        { 'questionNumber': 7, 'value': '' },
        { 'questionNumber': 8, 'value': '' },
        { 'questionNumber': 9, 'value': '' },
        { 'questionNumber': 10, 'value': '' },
        { 'questionNumber': 11, 'value': '' },
        { 'questionNumber': 12, 'value': '' },
        { 'questionNumber': 13, 'value': '' },
        { 'questionNumber': 14, 'value': '' },
        { 'questionNumber': 15, 'value': '' },
        { 'questionNumber': 16, 'value': '' },
        { 'questionNumber': 17, 'value': '' },
        { 'questionNumber': 18, 'value': '' },
        { 'questionNumber': 19, 'value': '' },
        { 'questionNumber': 20, 'value': '' },
        { 'questionNumber': 21, 'value': '' },
        { 'questionNumber': 22, 'value': '' },
        { 'questionNumber': 23, 'value': '' },
        { 'questionNumber': 24, 'value': '' },
        { 'questionNumber': 25, 'value': '' },
        { 'questionNumber': 26, 'value': '' },
        { 'questionNumber': 27, 'value': '' },
        { 'questionNumber': 28, 'value': '' },
        { 'questionNumber': 29, 'value': '' },
        { 'questionNumber': 30, 'value': '' },
        { 'questionNumber': 31, 'value': '' },
        { 'questionNumber': 32, 'value': '' },
        { 'questionNumber': 33, 'value': '' },
        { 'questionNumber': 34, 'value': '' },
        { 'questionNumber': 35, 'value': '' },
        { 'questionNumber': 36, 'value': '' },
        { 'questionNumber': 37, 'value': '' },
        { 'questionNumber': 38, 'value': '' },
        { 'questionNumber': 39, 'value': '' },
        { 'questionNumber': 40, 'value': '' },
        { 'questionNumber': 41, 'value': '' },
        { 'questionNumber': 42, 'value': '' },
        { 'questionNumber': 43, 'value': '' },
        { 'questionNumber': 44, 'value': '' },
    ]
}
