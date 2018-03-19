function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
  console.log(this.questionIndex);
}
Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}
Quiz.prototype.isEnded = function() {
  return this.questions.length == this.questionIndex;
}
Quiz.prototype.guess = function(answer) {
  console.log(this.getQuestionIndex());
  console.log(this.getQuestionIndex().answer);
  console.log('choice that is passed: ' + answer);
  console.log('correct answer according to question' + this.getQuestionIndex().correctAnswer());
  if (this.getQuestionIndex().correctAnswer(answer)){
    this.score++;
  }
  this.questionIndex+=1;
}
