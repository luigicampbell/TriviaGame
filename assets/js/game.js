var Question(text, answer, choices){
  this.text = text;
  this.answer = answer;
  this.choice = choices;
}

Question.prototype.correctAnswer = function functionName(choice) {
  return choice === this.answer;
}
function Quiz(questions){
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}
Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}
Quiz.prototype.isEnded = function(){
  return this.questions.length === this.questionIndex;
}
Quiz.prototype.guess = function(answer) {
  
}
//
// var questions = {
//   diamond:
//   {
//     name: "Diamond",
//     value: 0
//   },
//   sapphire:
//   {
//     name: "Sapphire",
//     value: 0
//   },
//   ruby:
//   {
//     name: "Ruby",
//     value: 0
//   },
//   emerald:
//   {
//     name: "Emerald",
//     value: 0
//   }
// };
