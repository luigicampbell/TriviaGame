class Question {
  constructor(
    text:string,
    answer:string,
    choices:Array<string>
  ) {
    this._text = text;
    this._answer = answer;
    this._choices = choices;
  }

  private _text:string = 'TEXT';
  private _answer:string = 'ANSWER';
  private _choices:Array<string> = new Array<string>();
  
  get text():string {
    return this._text;
  }
  
  set text(text:string) {
    this._text = text;
  }

  get answer():string {
    return this._answer;
  }
  
  set answer(answer:string) {
    this._answer = answer;
  }
  
  get choices():Array<string> {
    return this._choices;
  }
  
  set choices(choices:Array<string>) {
    this._choices = choices;
  }

  public isCorrectAnswer = (choice:string):boolean => {
    return this.answer == choice;
  }

}