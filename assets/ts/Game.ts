const questions = [
  new Question("What is Medela's Hospital Grade Pump called?", "Symphony", [
    "Pumpin' Style",
    "Spectra",
    "Harmony",
    "Symphony",
  ]),
  new Question("How many different sizes of Breast Shield are there?", "Five", [
    "Two",
    "Three",
    "Nine",
    "Five",
  ]),
  new Question(
    "What is the first type of milk produced during pregnancy called?",
    "Colostrum",
    ["Colostrum", "Whey", "Blooded", "Dry Milk"]
  ),
  new Question("What is Mastitis?", "Infection caused by 'plugged ducts'", [
    "Enlarged breasts",
    "A type of breast cancer",
    "Infection caused by 'plugged ducts'",
    "Low milk production",
  ]),
  new Question(
    "Many women with Mastitis feel like they have ______",
    "The Flu",
    ["Low Milk Supply", "The Flu", "Chicken Pox", "a Yeast Infection"]
  ),
  new Question("What hormone is necessary to induce lactation?", "Prolactin", [
    "Progesterone",
    "Prolactin",
    "Estrogen",
    "Lactation is not caused by hormones",
  ]),
  new Question("Who created My 'Breast Friend'", "Andrew Zenoff", [
    "Bill Clinton",
    "Andrew Zenoff",
    "Romina Ross",
    "Rosslyn Romanov",
  ]),
  new Question("Where is the ONLY Milk Bank in California?", "San Jose", [
    "San Francisco",
    "San Diego",
    "Los Angeles",
    "San Jose",
  ]),
  new Question(
    "Who is tasked with helping a family about breast feeding?",
    "Lactation Consultant",
    [
      "Lactation Consultant",
      "General Nurse Practitioner with 1800 Hours of Lactation Education",
      "Obstetrician",
      "Mastitician",
    ]
  ),
  new Question(
    "What causes the condition known as 'sore nipples' in breast feeding?",
    "Babies Latched Incorrectly",
    [
      "Babies Latched Incorrectly",
      "Teething",
      "Breast-Feeding Toddlers",
      "Engorged Breasts",
    ]
  ),
];

class Game {
  constructor(quiz:Quiz){
    this._quiz = quiz;
  }

  private _quiz:Quiz;
  private _seconds:number = 30;
  private _scores:Array<string> = JSON.parse( localStorage.getItem('scores') ) || [];
  private _interval = setInterval(() => {
    this._timerHandler();
  }, 1000)

  get seconds():number {
    return this._seconds;
  }

  set seconds(seconds:number) {
    this._seconds = seconds;
  }

  get quiz():Quiz {
    return this._quiz;
  }

  get scores():Array<string> {
    return this._scores;
  }

  set scores(scores:Array<string>) {
    this._scores = scores;
  }

  private _timerHandler():void {
    document.getElementById("timer").innerText = this.seconds < 10 ? `00:0${this.seconds--}` : `00:${this.seconds--}`;
    if(this.seconds == -1) {
      this._resetTimer();
      this.quiz.guess('');
      this.populate();
    }
  }

  private _resetTimer():void {
    this.seconds = 30;
  }

  private _showScores():void {
    const main:HTMLElement = (<HTMLElement>document.querySelector('main'));
    const scoreDate:Date = new Date();
    const remainder:number = scoreDate.getHours() % 12;
    const hours:number = remainder ? remainder : 12; 
    const scores:Array<string> = [...this.scores, `${this.quiz.score} / ${this.quiz.questions.length} - ${scoreDate.toLocaleDateString()} ${hours}:${scoreDate.getMinutes() < 10 ?'0'+scoreDate.getMinutes() : scoreDate.getMinutes()} ${scoreDate.getHours() >= 12 ? 'PM' : 'AM'}` ];
    localStorage.setItem('scores',JSON.stringify(scores));
    this.scores = scores;

    main.innerHTML = '<section class="grid"><h1 class="row centered">High Scores</h1>';
    const ul:HTMLElement = document.createElement('ul');
    ul.setAttribute('class','row');
    scores.forEach(score => {
      const li:HTMLElement = document.createElement('li');
      li.innerText = score;
      ul.appendChild(li);
    });
    const button:HTMLInputElement = (<HTMLInputElement>document.createElement('INPUT'));
    button.value = 'Play Again?';
    button.setAttribute('class','btn');
    button.onclick = () => {
      location.reload();
    };
    const clearScoresButton:HTMLInputElement = (<HTMLInputElement>document.createElement('INPUT'));
    clearScoresButton.value = 'Clear Scores?';
    clearScoresButton.setAttribute('class','btn');
    clearScoresButton.onclick = () => {
      localStorage.setItem('scores',JSON.stringify(new Array<number>()));
      location.reload();
    };
    const clearScoresRow:HTMLElement = document.createElement('div');
    clearScoresRow.classList.add('centered','row');
    clearScoresRow.appendChild(clearScoresButton);
    const div:HTMLElement = document.createElement('div');
    div.classList.add('centered','row');
    div.appendChild(button);
    document.querySelector('section.grid').appendChild(ul);
    document.querySelector('section.grid').appendChild(clearScoresRow);
    document.querySelector('section.grid').appendChild(div);
  }

  public populate():void {
    if(this.quiz.isGameOver) {
      console.log('GAME OVER');
      clearInterval(this._interval);
      this._showScores();
    } else {
      const questionElement:HTMLParagraphElement = document.querySelector('p.question') as HTMLParagraphElement;
      questionElement.innerText = this.quiz.question.text;
      
      const choices:Array<string> = this.quiz.question.choices;
      const buttonSection:HTMLElement = (<HTMLElement> document.querySelector(`section.button-container`));
      
      if(buttonSection.hasChildNodes()) {
        buttonSection.innerHTML = '';
      }

      choices.forEach((choice,index) => {
        const button:HTMLInputElement = (<HTMLInputElement>document.createElement('INPUT'));
        button.type = 'button';
        button.setAttribute('class','btn');
        button.value = choice;
        button.onclick = () => { 
          this.quiz.guess(choice);
          this._resetTimer();
          this.populate();
        };
        buttonSection.appendChild(button);
      });
    }
  }
}

const quiz:Quiz = new Quiz(questions);
new Game(quiz).populate();