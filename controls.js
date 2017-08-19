const id = $('.id')
const question = $('.question');
const next = $('.next');
const start = $('.start');
const welcome = $('.welcome');
const finish = $('.finish');
const radio = $('label.btn')
const show = $('.show');
const quiz = $('.quiz');
const results = $('.results');
const warning = $('.warning');
const options = $("input[name='options']:checked");
const paginationLink = $('li>a');
const pagination = $('.thepagination');
const questionsWrapper = $('.questions-wrapper');
const answersWrapper = $('.answers-wrapper');
let myChart;

function startQuiz() {
    initializeAnswers();
    if (localStorage.personName != '' && typeof (localStorage.personName) != 'undefined') {
        quiz.removeClass('hidden');
        welcome.addClass('hidden');
    }
}


start.on('click', function () {
    quiz.removeClass('hidden');
    welcome.addClass('hidden');
    localStorage.setItem("personName", $('#personName').val());
})

radio.on('click', function () {
    setTimeout(function () { pushAnswer(i), console.log('push') }, 50)
})

next.on('click', function () {
    i++; nextEmpty();
})

paginationLink.on('click', function () {
    i = parseInt(this.text) - 1;
    showQuestion(i);
    setRadio(i);
})

finish.on('click', function () {
    
    try {
        $(function () {
            myChart = Highcharts.chart('results__chart', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Уровень субъективного контроля'
                },
                xAxis: {
                    categories: ['Общая интернальность (Ио)', 'в области достижений (Ид)', ' в области неудач (Ин)', 'в семейных отношениях (Ис)', 'в области производственных отно­шении (Ип)', 'в области межличностных отноше­ний (Им)', ' в отношении здоровья и болезни (Из)']
                },
                series: [{
                    showInLegend: false,
                    name: localStorage.getItem("personName"),
                    data: [evaluateCommon(), evaluateArchievements(), evaluateFailures(), evaluateFamily(), evaluateProduction(), evaluateInterpersonal(), evaluateHealth()]
                }]
            });
        });
        evaluationDescription();
        setTimeout(setBlank, 2000);
        quiz.addClass('hidden'); results.removeClass('hidden')
        
    } catch (err) {
        next.removeClass('hidden'), pagination.removeClass('hidden'), answersWrapper.removeClass('hidden'), questionsWrapper.removeClass('hidden'), finish.addClass('hidden')
        alert('Произошла ошибка. Сейчас вы вернетесь к опроснику, проверьте ответили ли вы на все вопросы.');
        answers[43].value = '';
    }
})