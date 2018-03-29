window.onload = function(){
  // let seconds = 11;
  // var timeIsOut = false;

  // Timer Function
  // function createTimer(){
  //   setInterval(function(){
  //     document.getElementById("timer").innerHTML = seconds < 10 ? `00:0${seconds--}` : `00:${seconds--}`;
  //   }, 1 * 1000);
  // }
  //
  // // Clear Timer Function
  // function myStopFunction() {
  //     clearInterval(seconds);
  //     console.log(`Seconds ${seconds}`);
  //     seconds = 11;
  // }
  //
  // // Time is out Function
  // function timeIsOut(){
  //       myStopFunction();
  //       populate();
  //       showProgress();
  // }

  var seconds = 10;
  // var outtaTime = false;

  var myVar = setInterval(function() {
    myTimer()
  }, 1000);

  function resetTimer(){
    seconds = 10;
  }

  function myTimer() {
    document.getElementById("timer").innerHTML = seconds < 10 ? `00:0${seconds--}` : `00:${seconds--}`;
  }

  // Creating a quiz populater
  function populate() {
    // Check if quiz is ended
    if(quiz.isEnded()) {
      console.log('inside isEnded');
      clearInterval(myVar);
      showScores();
    }
    else {
      // createTimer();
      console.log('inside should start');
      // Show question
      var element = document.getElementById("question");
      console.log(`Timer should be showing time`);
      console.log('inside game.js, choices for question: ');
      console.log(quiz.getQuestionIndex());
      element.innerHTML = quiz.getQuestionIndex().text;
      // Show Choices
      var choices = quiz.getQuestionIndex().choices;
      for (var i = 0; i < choices.length; i++){
        var element = document.getElementById("choice" + i);
        element.innerHTML = choices[i];
        guess("button" + i, choices[i]);
      }
      showProgress();
    }

  };

  // TODO: Update Question Index then populate new questions when timer reaches '0'
  //

  // Passes id and guess
  function guess(id, guess) {
    var button = document.getElementById(id);
    // Tried inserting condition here to check for time < '0'
    // seconds > 0 ?
    seconds === 0 ? quiz.guess('outta time') :
    button.onclick = function() {
      resetTimer();
      quiz.guess(guess);
      populate();
    }
    //:
    //   resetTimer();
    //   quiz.guess();
    //   populate();
  }
// function outtaTime(id){
// seconds === 0 ?
//    document.getElementById(id).click():
//    console.log(`have time`);
// }
  // Shows question progress
  function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = currentQuestionNumber + " / " + quiz.questions.length;
  }
  // Prints End Game and Scores to html
  function showScores() {
    var gameOverHtml = "<h2 id='score'> You answered: " + quiz.score + " out of " + quiz.questions.length + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;
    var winGameHtml = '<div class="item1"><img src="assets/images/win.jpg"><h2>Great Job!!</h2><h2><a href="index.html">Try Again?</a></h2></div><div id="connect" class="item1"><a href="https://github.com/luigicampbell" target="_blank"><img src="assets/images/if_github_square_black_107109.png"   class="networking" alt="Github"></a><a href="https://www.linkedin.com/in/luigi-campbell-464838149/" target="_blank"><img src="assets/images/if_linkedin_square_color_107091.png"   class="networking" alt="LinkedIn"></a><a href="https://stackoverflow.com/users/8793814/luigi" target="_blank"><img src="assets/images/if_StackOverflow_273179.png"   class="networking" alt="Stackoverflow"></a></div>';
    var loseGameHtml = '<div class="item1"><img src="assets/images/lose.jpg"><h2>Oh Darn... </h2><h2><a href="index.html">Try Again?</a></h2></div><div id="connect" class="item1"><a href="https://github.com/luigicampbell" target="_blank"><img src="assets/images/if_github_square_black_107109.png"   class="networking" alt="Github"></a><a href="https://www.linkedin.com/in/luigi-campbell-464838149/" target="_blank"><img src="assets/images/if_linkedin_square_color_107091.png"   class="networking" alt="LinkedIn"></a><a href="https://stackoverflow.com/users/8793814/luigi" target="_blank"><img src="assets/images/if_StackOverflow_273179.png"   class="networking" alt="Stackoverflow"></a></div>';
    if(quiz.score > 8 ){
      console.log(`Score: ${quiz.score}`);
      console.log("win");
      element.innerHTML += winGameHtml;
    }
    else {
      console.log(`Score: ${quiz.score}`);
      console.log("lose");
      element.innerHTML += loseGameHtml;
    }
  }
  // Instances of Question courtesy of GF in LE Program @ Cedars
  var questions = [
    new Question("What is Medela's Hospital Grade Pump called?","Symphony",["Pumpin' Style", "Spectra", "Harmony","Symphony"]),
    new Question("How many different sizes of Breast Shield are there?", "Five",["Two","Three","Nine","Five"]),
    new Question("What is the first type of milk produced during pregnancy called?","Colostrum",["Colostrum","Whey","Blooded","Dry Milk"]),
    new Question("What is Mastitis?", "Infection caused by 'plugged ducts'",["Enlarged breasts","A type of breast cancer", "Infection caused by 'plugged ducts'","Low milk production"]),
    new Question("Many women with Mastitis feel like they have ______","The Flu",["Low Milk Supply","The Flu","Chicken Pox","a Yeast Infection"]),
    new Question("What hormone is necessary to induce lactation?","Prolactin",["Progesterone","Prolactin","Estrogen","Lactation is not caused by hormones"]),
    new Question("Who created My 'Breast Friend'","Andrew Zenoff",["Bill Clinton","Andrew Zenoff","Romina Ross","Rosslyn Romanov"]),
    new Question("Where is the ONLY Milk Bank in California?","San Jose",["San Francisco", "San Diego", "Los Angeles","San Jose"]),
    new Question("Who is tasked with helping a family about breast feeding?","Lactation Consultant",["Lactation Consultant", "General Nurse Practitioner with 1800 Hours of Lactation Education", "Obstetrician","Mastitician"]),
    new Question("What causes the condition known as 'sore nipples' in breast feeding?","Babies Latched Incorrectly", ["Babies Latched Incorrectly","Teething","Breast-Feeding Toddlers","Engorged Breasts"])
  ];
  var quiz = new Quiz(questions);
  populate();
}
