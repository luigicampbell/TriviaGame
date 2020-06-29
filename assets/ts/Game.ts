class Game {
  constructor(quiz:Quiz){
    this._quiz = quiz;
  }

  private _quiz:Quiz;
  private _seconds:number = 30;
  private _scores:Array<{'display':string,'score':number}> = localStorage.getItem('scores') ? JSON.parse( localStorage.getItem('scores') ).slice(0,9) : [];
  private _interval = setInterval(() => {
    this._timerHandler();
  }, 1000);
  private _timeElapsed:number = 0;

  get seconds():number {
    return this._seconds;
  }

  set seconds(seconds:number) {
    this._seconds = seconds;
  }

  get quiz():Quiz {
    return this._quiz;
  }

  get scores():Array<{'display':string,'score':number}> {
    return this._scores;
  }

  set scores(scores:Array<{'display':string,'score':number}>) {
    this._scores = scores;
  }

  get timeElapsed():number {
    return this._timeElapsed;
  }

  set timeElapsed(timeElapsed) {
    this._timeElapsed = timeElapsed;
  }

  private _timerHandler():void {
    document.getElementById("timer").innerText = this.seconds < 10 ? `00:0${this.seconds--}` : `00:${this.seconds--}`;
    if(this.seconds == -1) {
      this._resetTimer();
      this.quiz.guess('');
      this.populate();
    }
    this.timeElapsed++;
  }

  private _resetTimer():void {
    this.seconds = 30;
  }

  private _showScores():void {
    const main:HTMLElement = (<HTMLElement>document.querySelector('main'));
    const scoreDate:Date = new Date();
    const remainder:number = scoreDate.getHours() % 12;
    const hours:number = remainder ? remainder : 12;
    const currentScore:number = this.quiz.score;
    const displayScore:string = `${currentScore} / ${this.quiz.questions.length} - ${scoreDate.toLocaleDateString()} ${hours}:${scoreDate.getMinutes() < 10 ?'0'+scoreDate.getMinutes() : scoreDate.getMinutes()} ${scoreDate.getHours() >= 12 ? 'PM' : 'AM'}\n Time Elapsed: ${this.timeElapsed} seconds`;
    const currentScorePayload:{'display':string,'score':number} = {
      'display':displayScore,
      'score': currentScore
    };
    const scores:Array<{'display':string,'score':number}> = [...this.scores, currentScorePayload]
      .sort((a,b) => (b['score'] && Number(a['score']) < Number(b['score']) ? 1 : -1) );

    // console.log(scores);
    // console.log(JSON.stringify(scores));
    localStorage.setItem('scores',JSON.stringify(scores));
    this.scores = scores;

    main.innerHTML = '<section class="grid"><h1 class="row centered">High Scores</h1>';
    const ol:HTMLElement = document.createElement('ol');
    ol.setAttribute('class','row');
    scores.forEach(score => {
      // console.log('SCORE=>',score)
      const li:HTMLElement = document.createElement('li');
      li.innerText = score['display'];
      ol.appendChild(li);
    });
    const wrapper:HTMLDivElement = (<HTMLDivElement>document.createElement('div'));
        wrapper.classList.add('centered','col-2');
    const playAgainButton:HTMLInputElement = (<HTMLInputElement>document.createElement('INPUT'));
    playAgainButton.value = 'Play Again?';
    playAgainButton.type = 'button';
    playAgainButton.classList.add('btn','game-over'); //should also probably make these actual type buttons
    playAgainButton.onclick = () => {
      location.reload();
    };
    const clearScoresButton:HTMLInputElement = (<HTMLInputElement>document.createElement('INPUT'));
    clearScoresButton.value = 'Clear Scores?';
    clearScoresButton.type = 'button';
    clearScoresButton.classList.add('btn','game-over');
    clearScoresButton.onclick = () => {
      localStorage.setItem('scores',JSON.stringify(new Array<number>()));
      location.reload();
    };
    const clearScoresRow:HTMLElement = document.createElement('div');
    clearScoresRow.classList.add('centered','row');
    clearScoresRow.appendChild(clearScoresButton);
    const playAgainRow:HTMLElement = document.createElement('div');
    playAgainRow.classList.add('centered','row');
    playAgainRow.appendChild(playAgainButton);
    
    document.querySelector('section.grid').appendChild(ol);
    document.querySelector('section.grid').appendChild(clearScoresRow);
    document.querySelector('section.grid').appendChild(playAgainRow);
  }

  public populate():void {
    if(this.quiz.isGameOver) {
      // console.log('GAME OVER');
      clearInterval(this._interval);
      this._showScores();
    } else {
      const questionElement:HTMLParagraphElement = document.querySelector('p.question') as HTMLParagraphElement;
      questionElement.innerText = this.quiz.question.text;
      
      const choices:Array<string> = Game.shuffle( this.quiz.question.choices );
      const buttonSection:HTMLElement = (<HTMLElement> document.querySelector(`section.button-container`));
      
      if(buttonSection.hasChildNodes()) {
        buttonSection.innerHTML = '';
      }
      buttonSection.classList.add('grid');
      choices.forEach((choice,index) => {
        const wrapper:HTMLDivElement = (<HTMLDivElement>document.createElement('div'));
        wrapper.classList.add('centered','col-2');
        const button:HTMLInputElement = (<HTMLInputElement>document.createElement('INPUT'));
        
        button.type = 'button';
        button.classList.add('btn','box');
        button.value = choice;
        button.onclick = () => { 
          const isCorrect:boolean = this.quiz.guess(choice);
          // console.log(isCorrect);
          if(isCorrect) {
            Game.displayModal();
          }
          this._resetTimer();
          this.populate();
        };
        wrapper.appendChild(button);
        buttonSection.appendChild(wrapper);
      });
    }  
  }

  public static shuffle = ( list:Array<any> ):Array<any> => {
    let counter:number = list.length;
    let temp:string;
    let index:number;

    // While there remain elements to shuffle…
    while (counter) {
      index = Math.floor(Math.random() * counter--);

      // And swap it with the current element.
      temp = list[counter];
      list[counter] = list[index];
      list[index] = temp;
    }

    return list;
  }

  public static displayModal = ():void => {
    // console.log('DISPLAY MODAL');
    const modal:HTMLDivElement = document.querySelector('div.hide-modal') || document.createElement('div');
    const display:HTMLElement = document.querySelector('section.centered.timer');
    const positiveReinforcementMessages:Array<string> = [
      "Correct!",
      "~~Awesome~~",
      "There is no spoon :D",
      "You know your stuff!",
      "Well done!",
      "Dr. Frizzle would be proud.",
      "You did it!"
    ];
    modal.innerText = positiveReinforcementMessages[Math.floor(Math.random() * 7)];
    modal.classList.remove('hide-modal');
    modal.classList.add('modal','text-center');
    display.appendChild(modal);

    setTimeout(() => {
      modal.classList.add('hide-modal');
      modal.classList.remove('modal');
    }, 500);
  }

  public static getCurrentYear = ():number => {
    return new Date().getFullYear();
  }
}
