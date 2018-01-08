// Change to images later instead of text
function Question(text, answer, choices) {
  this.text = text;
  this.answer = answer;
  this.choices = choices;
}
// Objects inherit the properties and methods from their prototype
Question.prototype.correctAnswer = function(choice) {
  return choice === this.answer;
}
