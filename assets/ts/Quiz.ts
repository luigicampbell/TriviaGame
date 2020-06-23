class Quiz {
  constructor(
    questions:Array<Question>,
    score:number=0,
    questionIndex:number=0
  ) {
    this._score = score;
    this._questions = questions;
    this._questionIndex = questionIndex;
  }

  private _score:number = 0;
  private _questionIndex:number = 0;
  private _questions:Array<Question> = new Array<Question>();

  get questions () {
    return this._questions;
  }

  set questions(questions:Array<Question>) {
    this._questions = questions;
  }

  get questionIndex() {
    return this._questionIndex;
  }

  set questionIndex(questionIndex:number) {
    this._questionIndex = questionIndex;
  }

  get score() {
    return this._score;
  }

  set score(score:number) {
    this._score = score;
  }

  get question ():Question {
    return this.questions[this.questionIndex];
  }

  get isGameOver ():boolean {
    return this.questions.length == this.questionIndex;
  }

  public guess = (answer:string):void => {
    if(this.question.isCorrectAnswer(answer)) {
      this.score++;
    }
    this.questionIndex++;
  }
}
