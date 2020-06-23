var Question = (function () {
    function Question(text, answer, choices) {
        var _this = this;
        this._text = 'TEXT';
        this._answer = 'ANSWER';
        this._choices = new Array();
        this.isCorrectAnswer = function (choice) {
            return _this.answer == choice;
        };
        this._text = text;
        this._answer = answer;
        this._choices = choices;
    }
    Object.defineProperty(Question.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (text) {
            this._text = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Question.prototype, "answer", {
        get: function () {
            return this._answer;
        },
        set: function (answer) {
            this._answer = answer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Question.prototype, "choices", {
        get: function () {
            return this._choices;
        },
        set: function (choices) {
            this._choices = choices;
        },
        enumerable: true,
        configurable: true
    });
    return Question;
}());
