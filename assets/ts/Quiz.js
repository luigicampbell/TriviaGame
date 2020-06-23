var Quiz = (function () {
    function Quiz(questions, score, questionIndex) {
        var _this = this;
        if (score === void 0) { score = 0; }
        if (questionIndex === void 0) { questionIndex = 0; }
        this._score = 0;
        this._questionIndex = 0;
        this._questions = new Array();
        this.guess = function (answer) {
            if (_this.question.isCorrectAnswer(answer)) {
                _this.score++;
            }
            _this.questionIndex++;
        };
        this._score = score;
        this._questions = questions;
        this._questionIndex = questionIndex;
    }
    Object.defineProperty(Quiz.prototype, "questions", {
        get: function () {
            return this._questions;
        },
        set: function (questions) {
            this._questions = questions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quiz.prototype, "questionIndex", {
        get: function () {
            return this._questionIndex;
        },
        set: function (questionIndex) {
            this._questionIndex = questionIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quiz.prototype, "score", {
        get: function () {
            return this._score;
        },
        set: function (score) {
            this._score = score;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quiz.prototype, "question", {
        get: function () {
            return this.questions[this.questionIndex];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quiz.prototype, "isGameOver", {
        get: function () {
            return this.questions.length == this.questionIndex;
        },
        enumerable: true,
        configurable: true
    });
    return Quiz;
}());
