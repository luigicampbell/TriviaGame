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
var Game = (function () {
    function Game(quiz) {
        var _this = this;
        this._seconds = 30;
        this._scores = localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')).slice(0, 9) : [];
        this._interval = setInterval(function () {
            _this._timerHandler();
        }, 1000);
        this._timeElapsed = 0;
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
    Object.defineProperty(Game.prototype, "timeElapsed", {
        get: function () {
            return this._timeElapsed;
        },
        set: function (timeElapsed) {
            this._timeElapsed = timeElapsed;
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
        this.timeElapsed++;
    };
    Game.prototype._resetTimer = function () {
        this.seconds = 30;
    };
    Game.prototype._showScores = function () {
        var main = document.querySelector('main');
        var scoreDate = new Date();
        var remainder = scoreDate.getHours() % 12;
        var hours = remainder ? remainder : 12;
        var currentScore = this.quiz.score;
        var displayScore = currentScore + " / " + this.quiz.questions.length + " - " + scoreDate.toLocaleDateString() + " " + hours + ":" + (scoreDate.getMinutes() < 10 ? '0' + scoreDate.getMinutes() : scoreDate.getMinutes()) + " " + (scoreDate.getHours() >= 12 ? 'PM' : 'AM') + "\n Time Elapsed: " + this.timeElapsed + " seconds";
        var currentScorePayload = {
            'display': displayScore,
            'score': currentScore
        };
        var scores = __spread(this.scores, [currentScorePayload]).sort(function (a, b) { return (b['score'] && Number(a['score']) < Number(b['score']) ? 1 : -1); });
        localStorage.setItem('scores', JSON.stringify(scores));
        this.scores = scores;
        main.innerHTML = '<section class="grid"><h1 class="row centered">High Scores</h1>';
        var ol = document.createElement('ol');
        ol.setAttribute('class', 'row');
        scores.forEach(function (score) {
            var li = document.createElement('li');
            li.innerText = score['display'];
            ol.appendChild(li);
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
            Main.start();
        };
        var clearScoresRow = document.createElement('div');
        clearScoresRow.classList.add('centered', 'row');
        clearScoresRow.appendChild(clearScoresButton);
        var div = document.createElement('div');
        div.classList.add('centered', 'row');
        div.appendChild(button);
        document.querySelector('section.grid').appendChild(ol);
        document.querySelector('section.grid').appendChild(clearScoresRow);
        document.querySelector('section.grid').appendChild(div);
    };
    Game.prototype.populate = function () {
        var _this = this;
        if (this.quiz.isGameOver) {
            clearInterval(this._interval);
            this._showScores();
        }
        else {
            var questionElement = document.querySelector('p.question');
            questionElement.innerText = this.quiz.question.text;
            var choices = Game.shuffle(this.quiz.question.choices);
            var buttonSection_1 = document.querySelector("section.button-container");
            if (buttonSection_1.hasChildNodes()) {
                buttonSection_1.innerHTML = '';
            }
            buttonSection_1.classList.add('grid');
            choices.forEach(function (choice, index) {
                var wrapper = document.createElement('div');
                wrapper.classList.add('centered', 'col-2');
                var button = document.createElement('INPUT');
                button.type = 'button';
                button.classList.add('btn', 'box');
                button.value = choice;
                button.onclick = function () {
                    var isCorrect = _this.quiz.guess(choice);
                    if (isCorrect) {
                        Game.displayModal();
                    }
                    _this._resetTimer();
                    _this.populate();
                };
                wrapper.appendChild(button);
                buttonSection_1.appendChild(wrapper);
            });
        }
    };
    Game.shuffle = function (list) {
        var counter = list.length;
        var temp;
        var index;
        while (counter) {
            index = Math.floor(Math.random() * counter--);
            temp = list[counter];
            list[counter] = list[index];
            list[index] = temp;
        }
        return list;
    };
    Game.displayModal = function () {
        var modal = document.querySelector('div.hide-modal');
        modal.classList.remove('hide-modal');
        modal.classList.add('modal', 'text-center');
        setTimeout(function () {
            modal.classList.add('hide-modal');
            modal.classList.remove('modal');
        }, 1000);
    };
    Game.getCurrentYear = function () {
        return new Date().getFullYear();
    };
    return Game;
}());
