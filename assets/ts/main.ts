class Main {
  public static start(): void {
    const questions = Game.shuffle([
      new Question("What is Medela's Hospital Grade Pump called?", "Symphony", [
        "Pumpin' Style",
        "Spectra",
        "Harmony",
        "Symphony",
      ]),
      new Question(
        "How many different sizes of Breast Shield are there?",
        "Five",
        ["Two", "Three", "Nine", "Five"]
      ),
      new Question(
        "What is the first type of milk produced during pregnancy called?",
        "Colostrum",
        ["Colostrum", "Whey", "Blooded", "Dry Milk"]
      ),
      new Question("What is Mastitis?", "Infection caused by 'plugged ducts'", [
        "Enlarged breasts",
        "A type of breast cancer",
        "Infection caused by 'plugged ducts'",
        "Low milk production",
      ]),
      new Question(
        "Many women with Mastitis feel like they have ______",
        "The Flu",
        ["Low Milk Supply", "The Flu", "Chicken Pox", "a Yeast Infection"]
      ),
      new Question(
        "What hormone is necessary to induce lactation?",
        "Prolactin",
        [
          "Progesterone",
          "Prolactin",
          "Estrogen",
          "Lactation is not caused by hormones",
        ]
      ),
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
      new Question(
        "Who is tasked with helping a family about breast feeding?",
        "Lactation Consultant",
        [
          "Lactation Consultant",
          "General Nurse Practitioner with 1800 Hours of Lactation Education",
          "Obstetrician",
          "Mastitician",
        ]
      ),
      new Question(
        "What causes the condition known as 'sore nipples' in breast feeding?",
        "Babies Latched Incorrectly",
        [
          "Babies Latched Incorrectly",
          "Teething",
          "Breast-Feeding Toddlers",
          "Engorged Breasts",
        ]
      ),
    ]);

    const quiz: Quiz = new Quiz(questions);
    new Game(quiz).populate();
  }
}
(<HTMLSpanElement>document.querySelector('span.currentYear')).innerText = String(Game.getCurrentYear()); 