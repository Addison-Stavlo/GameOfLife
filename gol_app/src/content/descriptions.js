class Description {
  constructor(title, paragraphs, rules = null) {
    this.title = title;
    this.paragraphs = paragraphs;
    this.rules = rules;
  }
}

const whatIs = new Description("What is a Cellular Automatom???", [
  `A Cellular Automaton is discrete mathematical model consisting of a grid
      of cells whose current state is dependant only on its previous state and
      a set of predetermined rules. Each generation is calculated by
      evaluating the amount of active neighbors each cell has. Depending on
      the amount of active neighbors and the ruleset, a cell may become
      activated or deactivated. Given a fixed ruleset, the same initial state
      will evolve in the same manner every time it is run. Cellular Automata
      have given aid to various fields of scientific research including
      biology, physics, and chemistry.`
]);

const conwayRule = new Description("Conway's Rules are:", [
  "If a dead cell has exactly 3 live neighbors it will come to life.",
  `If a live cell does not have exactly 2 or 3 live neighbors then it
      dies.`
]);

const whatConway = new Description(
  "What is Conway's Game of Life???",
  [
    `One of the most famous implementations of a CA is Conway's Game of Life.
    Developed by mathematician John Conway in 1970, the Game of Life has
    been a topic of interest in mathematics and computer science ever since.
    This universal Turing machine was build with some very simple rules and
    holds the power to compute anything that can be computed
    algorithmically.`
  ],
  conwayRule
);

const customRule = new Description("The Custom Rules are:", [
  "If a cell has more active neighbors than the suffocation limit, it dies.",
  "If a cell has less active neighbors than the isolation limit, it dies.",
  "A cell has a number of active neighbors between and including these limits, it lives."
]);

const whatsDiff = new Description(
  "What is the Custom game mode?",
  [
    `There are two main things that differ about this CA, the first is the 
    two extra visible states for new life and decaying death.  This gives the 
    user a better visual representation of what has changed since the previous 
    generation.  The second is the ability to set custom game rules.`
  ],
  customRule
);

export default [whatIs, whatConway, whatsDiff];
