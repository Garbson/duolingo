let currentQuestionIndex = 0;  
const app = document.getElementById('app');  

const questions = [
  {
    html: 'question1.html',
    css: 'question1.css',
    js: 'question1.js'
  },
  {
    html: 'question2.html',
    css: 'question2.css',
    js: 'question2.js'
  },
  {
    html: 'question3.html',
    css: 'question3.css',
    js: 'question3.js'
  },
  {
    html: 'question4.html',
    css: 'question4.css',
    js: 'question4.js'
  },
  {
    html: 'question5.html',
    css: 'question5.css',
    js: 'question5.js'
  }
];


function renderQuestion() {
  const question = questions[currentQuestionIndex];

  app.innerHTML = '';


  fetch(question.html)
    .then(response => response.text())
    .then(html => {
      app.innerHTML = html;

     
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = question.css;
      document.head.appendChild(link);

   
      const script = document.createElement('script');
      script.src = question.js;
      script.onload = () => {
     
        const nextButton = app.querySelector('.btn-next');
        if (nextButton) {
          nextButton.addEventListener('click', handleNext);
        }
      };
      document.body.appendChild(script);
    })
    .catch(error => console.log('Error fetching HTML:', error));
}


function handleNext() {

  currentQuestionIndex++;


  if (currentQuestionIndex < questions.length) {
    renderQuestion();  
  } else {
    alert('You have completed all the questions!');
  }
}


renderQuestion();