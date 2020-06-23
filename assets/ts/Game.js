var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var questions = [
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
    new Question("What is the first type of milk produced during pregnancy called?", "Colostrum", ["Colostrum", "Whey", "Blooded", "Dry Milk"]),
    new Question("What is Mastitis?", "Infection caused by 'plugged ducts'", [
        "Enlarged breasts",
        "A type of breast cancer",
        "Infection caused by 'plugged ducts'",
        "Low milk production",
    ]),
    new Question("Many women with Mastitis feel like they have ______", "The Flu", ["Low Milk Supply", "The Flu", "Chicken Pox", "a Yeast Infection"]),
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
    new Question("Who is tasked with helping a family about breast feeding?", "Lactation Consultant", [
        "Lactation Consultant",
        "General Nurse Practitioner with 1800 Hours of Lactation Education",
        "Obstetrician",
        "Mastitician",
    ]),
    new Question("What causes the condition known as 'sore nipples' in breast feeding?", "Babies Latched Incorrectly", [
        "Babies Latched Incorrectly",
        "Teething",
        "Breast-Feeding Toddlers",
        "Engorged Breasts",
    ]),
];
var Game = (function () {
    function Game(quiz) {
        var _this = this;
        this._seconds = 30;
        this._scores = JSON.parse(localStorage.getItem('scores')) || [];
        this._interval = setInterval(function () {
            _this._timerHandler();
        }, 1000);
        this._quiz = quiz;
    }
    Object.defineProperty(Game.prototype, "seconds", {
        get: function () {
            return this._seconds;
        },
        set: function (seconds) {
            this._seconds = seconds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "quiz", {
        get: function () {
            return this._quiz;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "scores", {
        get: function () {
            return this._scores;
        },
        set: function (scores) {
            this._scores = scores;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype._timerHandler = function () {
        document.getElementById("timer").innerText = this.seconds < 10 ? "00:0" + this.seconds-- : "00:" + this.seconds--;
        if (this.seconds == -1) {
            this._resetTimer();
            this.quiz.guess('');
            this.populate();
        }
    };
    Game.prototype._resetTimer = function () {
        this.seconds = 30;
    };
    Game.prototype._showScores = function () {
        var main = document.querySelector('main');
        var scoreDate = new Date();
        var remainder = scoreDate.getHours() % 12;
        var hours = remainder ? remainder : 12;
        var scores = __spread(this.scores, [this.quiz.score + " / " + this.quiz.questions.length + " - " + scoreDate.toLocaleDateString() + " " + hours + ":" + (scoreDate.getMinutes() < 10 ? '0' + scoreDate.getMinutes() : scoreDate.getMinutes()) + " " + (scoreDate.getHours() >= 12 ? 'PM' : 'AM')]);
        localStorage.setItem('scores', JSON.stringify(scores));
        this.scores = scores;
        main.innerHTML = '<section class="grid"><h1 class="row centered">High Scores</h1>';
        var ul = document.createElement('ul');
        ul.setAttribute('class', 'row');
        scores.forEach(function (score) {
            var li = document.createElement('li');
            li.innerText = score;
            ul.appendChild(li);
        });
        var button = document.createElement('INPUT');
        button.value = 'Play Again?';
        button.setAttribute('class', 'btn');
        button.onclick = function () {
            location.reload();
        };
        var clearScoresButton = document.createElement('INPUT');
        clearScoresButton.value = 'Clear Scores?';
        clearScoresButton.setAttribute('class', 'btn');
        clearScoresButton.onclick = function () {
            localStorage.setItem('scores', JSON.stringify(new Array()));
            location.reload();
        };
        var clearScoresRow = document.createElement('div');
        clearScoresRow.classList.add('centered', 'row');
        clearScoresRow.appendChild(clearScoresButton);
        var div = document.createElement('div');
        div.classList.add('centered', 'row');
        div.appendChild(button);
        document.querySelector('section.grid').appendChild(ul);
        document.querySelector('section.grid').appendChild(clearScoresRow);
        document.querySelector('section.grid').appendChild(div);
    };
    Game.prototype.populate = function () {
        var _this = this;
        if (this.quiz.isGameOver) {
            console.log('GAME OVER');
            clearInterval(this._interval);
            this._showScores();
        }
        else {
            var questionElement = document.querySelector('p.question');
            questionElement.innerText = this.quiz.question.text;
            var choices = this.quiz.question.choices;
            var buttonSection_1 = document.querySelector("section.button-container");
            if (buttonSection_1.hasChildNodes()) {
                buttonSection_1.innerHTML = '';
            }
            choices.forEach(function (choice, index) {
                var button = document.createElement('INPUT');
                button.type = 'button';
                button.setAttribute('class', 'btn');
                button.value = choice;
                button.onclick = function () {
                    _this.quiz.guess(choice);
                    _this._resetTimer();
                    _this.populate();
                };
                buttonSection_1.appendChild(button);
            });
        }
    };
    return Game;
}());
var quiz = new Quiz(questions);
new Game(quiz).populate();