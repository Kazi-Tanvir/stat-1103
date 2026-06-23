// ============================================================
// STAT 1103 — Chapter 3: Elements of Probability
// Structured content data for the interactive learning platform
// ============================================================

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  topics: Topic[];
  problems: Problem[];
}

export interface Topic {
  id: string;
  number: number;
  title: string;
  sections: Section[];
  examples: Example[];
  keyFormulas: Formula[];
}

export interface Section {
  id: string;
  title?: string;
  content: string; // HTML-safe text with LaTeX markers
  type: "text" | "definition" | "theorem" | "note" | "warning";
}

export interface Formula {
  id: string;
  name: string;
  latex: string;
  description: string;
}

export interface Example {
  id: string;
  title: string;
  statement: string;
  solution: SolutionStep[];
  visualization?: VisualizationType;
}

export interface Problem {
  id: string;
  number: number;
  statement: string;
  subparts?: SubPart[];
  solution?: SolutionStep[];
  aiInstructions?: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  visualization?: VisualizationType;
  solved: boolean;
}

export interface SubPart {
  label: string;
  text: string;
}

export interface SolutionStep {
  stepNumber: number;
  title: string;
  explanation: string;
  formula?: string;
  result?: string;
  visualization?: VisualizationType;
  interactiveParams?: InteractiveParam[];
}

export interface InteractiveParam {
  name: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
}

export type VisualizationType =
  | "venn-diagram"
  | "dice-simulator"
  | "card-draw"
  | "marble-simulator"
  | "probability-tree"
  | "combinatorics"
  | "monty-hall"
  | "formula-breakdown"
  | "sample-space-grid"
  | "system-diagram";

// ============================================================
// CHAPTER 3 DATA
// ============================================================

export const chapter03: Chapter = {
  id: "chapter-03",
  number: 3,
  title: "Elements of Probability",
  subtitle: "The Mathematics of Uncertainty",
  description:
    "Explore the fundamental building blocks of probability theory — from sample spaces and events to Bayes' theorem and independence. Learn to quantify uncertainty and make informed decisions under incomplete information.",
  topics: [
    // ── TOPIC 1: INTRODUCTION ──
    {
      id: "introduction",
      number: 1,
      title: "Introduction to Probability",
      sections: [
        {
          id: "intro-concept",
          title: "What is Probability?",
          content:
            "The concept of the probability of a particular event of an experiment is subject to various meanings or interpretations. There are three broad ways of interpreting probability.",
          type: "text",
        },
        {
          id: "intro-frequentist",
          title: "Frequentist (Empirical) Interpretation",
          content:
            "In the frequency interpretation, the probability of a given outcome is considered as being a 'property' of that outcome. If an experiment is continually repeated under the same conditions, the proportion of time a particular outcome occurs approaches a constant value — this limiting frequency is the probability.",
          type: "definition",
        },
        {
          id: "intro-subjective",
          title: "Subjective Interpretation",
          content:
            "In the subjective interpretation, the probability of an outcome is not a property of the outcome itself, but rather a statement about the beliefs of the person quoting the probability concerning the chance that the outcome will occur.",
          type: "definition",
        },
        {
          id: "intro-axiomatic",
          title: "Mathematical (Axiomatic) Interpretation",
          content:
            "Regardless of which interpretation one gives to probability, the mathematics of probability are the same in either case. We will study the axiomatic approach which provides the rigorous mathematical framework.",
          type: "definition",
        },
        {
          id: "intro-example",
          content:
            'Consider a geologist who says "there is a 60 percent chance of oil in a certain region." This could mean: (1) Over the long run, in 60% of regions with similar environmental conditions, there will be oil (frequency interpretation), or (2) The geologist believes it is more likely that the region will contain oil than not (subjective interpretation).',
          type: "note",
        },
      ],
      examples: [],
      keyFormulas: [],
    },

    // ── TOPIC 2: SAMPLE SPACE AND EVENTS ──
    {
      id: "sample-space-events",
      number: 2,
      title: "Sample Space and Events",
      sections: [
        {
          id: "ss-definition",
          title: "Sample Space",
          content:
            "An experiment is a procedure whose outcome is not predictable with certainty in advance. The set of all possible outcomes of an experiment is known as the sample space of the experiment and is denoted by S.",
          type: "definition",
        },
        {
          id: "ss-examples",
          title: "Examples of Sample Spaces",
          content:
            "1. Sex of a newborn child: S = {g, b}\n2. Horse race with 7 horses: S = {all orderings of (1,2,3,4,5,6,7)}\n3. Dosage until positive reaction: S = {x : 0 < x < ∞}",
          type: "text",
        },
        {
          id: "ss-events",
          title: "Events",
          content:
            "Any subset E of the sample space is known as an event. An event is a set consisting of possible outcomes of the experiment. If the outcome of the experiment is contained in E, then we say that E has occurred.",
          type: "definition",
        },
        {
          id: "ss-union",
          title: "Union of Events",
          content:
            "For any two events E and F of a sample space S, the new event E∪F (union) consists of all outcomes that are either in E or in F or in both E and F. E∪F occurs if at least one of E or F occurs.",
          type: "definition",
        },
        {
          id: "ss-intersection",
          title: "Intersection of Events",
          content:
            "For any two events E and F, the new event E∩F (intersection) consists of all outcomes that are in both E and F. E∩F occurs only if both E and F occur.",
          type: "definition",
        },
        {
          id: "ss-complement",
          title: "Complement of an Event",
          content:
            "For any event E, the complement Eᶜ consists of all outcomes in the sample space S that are not in E. Eᶜ occurs if and only if E does not occur.",
          type: "definition",
        },
        {
          id: "ss-mutually-exclusive",
          title: "Mutually Exclusive Events",
          content:
            "Two events E and F are said to be mutually exclusive if E∩F = ∅ (the null set). This means E and F cannot both occur simultaneously.",
          type: "definition",
        },
        {
          id: "ss-subset",
          title: "Containment",
          content:
            "If all outcomes in E are also in F, we say E is contained in F and write E ⊂ F. If E ⊂ F and F ⊂ E, then E = F.",
          type: "definition",
        },
      ],
      examples: [],
      keyFormulas: [
        {
          id: "union",
          name: "Union",
          latex: "E \\cup F",
          description: "All outcomes in E or F or both",
        },
        {
          id: "intersection",
          name: "Intersection",
          latex: "E \\cap F = EF",
          description: "All outcomes in both E and F",
        },
        {
          id: "complement",
          name: "Complement",
          latex: "E^c",
          description: "All outcomes NOT in E",
        },
      ],
    },

    // ── TOPIC 3: VENN DIAGRAMS ──
    {
      id: "venn-diagrams",
      number: 3,
      title: "Venn Diagrams & Algebra of Events",
      sections: [
        {
          id: "venn-intro",
          title: "Venn Diagrams",
          content:
            "A Venn diagram is a graphical representation of events. The sample space S is represented as all points in a large rectangle, and events E, F, G... are represented as circles within the rectangle. Shaded regions represent specific events of interest.",
          type: "text",
        },
        {
          id: "venn-commutative",
          title: "Commutative Law",
          content: "E ∪ F = F ∪ E  and  EF = FE",
          type: "theorem",
        },
        {
          id: "venn-associative",
          title: "Associative Law",
          content:
            "(E ∪ F) ∪ G = E ∪ (F ∪ G)  and  (EF)G = E(FG)",
          type: "theorem",
        },
        {
          id: "venn-distributive",
          title: "Distributive Law",
          content:
            "(E ∪ F)G = EG ∪ FG  and  EF ∪ G = (E ∪ G)(F ∪ G)",
          type: "theorem",
        },
        {
          id: "venn-demorgan",
          title: "DeMorgan's Laws",
          content:
            "(E ∪ F)ᶜ = EᶜFᶜ  —  The complement of a union is the intersection of complements.\n(EF)ᶜ = Eᶜ ∪ Fᶜ  —  The complement of an intersection is the union of complements.",
          type: "theorem",
        },
      ],
      examples: [],
      keyFormulas: [
        {
          id: "demorgan1",
          name: "DeMorgan's Law 1",
          latex: "(E \\cup F)^c = E^c F^c",
          description: "Complement of union = intersection of complements",
        },
        {
          id: "demorgan2",
          name: "DeMorgan's Law 2",
          latex: "(EF)^c = E^c \\cup F^c",
          description: "Complement of intersection = union of complements",
        },
        {
          id: "distributive",
          name: "Distributive Law",
          latex: "(E \\cup F)G = EG \\cup FG",
          description: "Distribution over union",
        },
      ],
    },

    // ── TOPIC 4: AXIOMS OF PROBABILITY ──
    {
      id: "axioms-probability",
      number: 4,
      title: "Axioms of Probability",
      sections: [
        {
          id: "ax-intuition",
          title: "Intuition",
          content:
            "If an experiment is continually repeated under the exact same conditions, then for any event E, the proportion of time that the outcome is contained in E approaches some constant value as the number of repetitions increases. This constant limiting frequency is what we mean by the probability of an event.",
          type: "text",
        },
        {
          id: "ax-axiom1",
          title: "Axiom I",
          content: "For any event E: 0 ≤ P(E) ≤ 1",
          type: "theorem",
        },
        {
          id: "ax-axiom2",
          title: "Axiom II",
          content: "P(S) = 1 — The probability of the entire sample space is 1.",
          type: "theorem",
        },
        {
          id: "ax-axiom3",
          title: "Axiom III",
          content:
            "For any sequence of mutually exclusive events E₁, E₂, ...: P(E₁ ∪ E₂ ∪ ...) = P(E₁) + P(E₂) + ...",
          type: "theorem",
        },
        {
          id: "ax-complement",
          title: "Complement Rule",
          content:
            "From Axiom II: 1 = P(S) = P(E ∪ Eᶜ) = P(E) + P(Eᶜ), therefore P(Eᶜ) = 1 − P(E)",
          type: "theorem",
        },
        {
          id: "ax-inclusion-exclusion",
          title: "Inclusion-Exclusion Principle",
          content:
            "For two events E and F: P(E ∪ F) = P(E) + P(F) − P(EF). This avoids double-counting the intersection.",
          type: "theorem",
        },
      ],
      examples: [
        {
          id: "ex-3-4a",
          title: "Example 3.4a — Smoking Statistics",
          statement:
            "A total of 28 percent of American males smoke cigarettes, 7 percent smoke cigars, and 5 percent smoke both cigars and cigarettes. What percentage of males smoke neither cigars nor cigarettes?",
          solution: [
            {
              stepNumber: 1,
              title: "Define the Events",
              explanation:
                "Let E = event that a male smokes cigarettes. Let F = event that a male smokes cigars.",
              formula: "P(E) = 0.28, \\quad P(F) = 0.07, \\quad P(EF) = 0.05",
            },
            {
              stepNumber: 2,
              title: "Apply Inclusion-Exclusion",
              explanation:
                "To find the probability of smoking either cigarettes or cigars (or both), use the inclusion-exclusion principle.",
              formula:
                "P(E \\cup F) = P(E) + P(F) - P(EF) = 0.28 + 0.07 - 0.05 = 0.30",
            },
            {
              stepNumber: 3,
              title: "Find the Complement",
              explanation:
                "The probability of smoking neither is the complement of smoking at least one.",
              formula:
                "P(\\text{neither}) = 1 - P(E \\cup F) = 1 - 0.30 = 0.70",
              result: "70% of males smoke neither cigars nor cigarettes.",
              interactiveParams: [
                {
                  name: "pE",
                  label: "P(cigarettes)",
                  min: 0,
                  max: 1,
                  step: 0.01,
                  defaultValue: 0.28,
                },
                {
                  name: "pF",
                  label: "P(cigars)",
                  min: 0,
                  max: 1,
                  step: 0.01,
                  defaultValue: 0.07,
                },
                {
                  name: "pEF",
                  label: "P(both)",
                  min: 0,
                  max: 1,
                  step: 0.01,
                  defaultValue: 0.05,
                },
              ],
            },
          ],
          visualization: "venn-diagram",
        },
      ],
      keyFormulas: [
        {
          id: "axiom1",
          name: "Axiom I",
          latex: "0 \\leq P(E) \\leq 1",
          description: "Probability is between 0 and 1",
        },
        {
          id: "axiom2",
          name: "Axiom II",
          latex: "P(S) = 1",
          description: "Total probability is 1",
        },
        {
          id: "complement-rule",
          name: "Complement Rule",
          latex: "P(E^c) = 1 - P(E)",
          description: "Probability of not-E",
        },
        {
          id: "inclusion-exclusion",
          name: "Inclusion-Exclusion",
          latex: "P(E \\cup F) = P(E) + P(F) - P(EF)",
          description: "Probability of union of two events",
        },
      ],
    },

    // ── TOPIC 5: ODDS ──
    {
      id: "odds",
      number: 5,
      title: "Odds of an Event",
      sections: [
        {
          id: "odds-def",
          title: "Definition",
          content:
            "The odds of an event A tells how much more likely it is that A occurs than that it does not occur.",
          type: "definition",
        },
        {
          id: "odds-example",
          content:
            "If P(A) = 2/3, the odds of A is 2. This means P(A) is two times that of P(Aᶜ). We say the odds are 2 to 1 in favor of A.",
          type: "note",
        },
      ],
      examples: [],
      keyFormulas: [
        {
          id: "odds-formula",
          name: "Odds",
          latex:
            "O(A) = \\frac{P(A)}{P(A^c)} = \\frac{P(A)}{1 - P(A)}",
          description: "Odds of event A",
        },
        {
          id: "odds-to-prob",
          name: "Odds to Probability",
          latex: "P(A) = \\frac{O(A)}{1 + O(A)}",
          description: "Convert odds back to probability",
        },
      ],
    },

    // ── TOPIC 6: EQUALLY LIKELY OUTCOMES ──
    {
      id: "equally-likely",
      number: 6,
      title: "Equally Likely Outcomes",
      sections: [
        {
          id: "el-def",
          title: "Equally Likely Outcomes",
          content:
            "If all outcomes of an experiment with sample space S = {1, ..., N} are equally likely, then each outcome has probability 1/N.",
          type: "definition",
        },
        {
          id: "el-formula",
          content:
            "For any event E in a sample space with equally likely outcomes: P(E) = (number of outcomes in E) / N",
          type: "theorem",
        },
      ],
      examples: [],
      keyFormulas: [
        {
          id: "equally-likely",
          name: "Equally Likely Probability",
          latex:
            "P(E) = \\frac{\\text{number of outcomes in } E}{N}",
          description: "When all outcomes are equally likely",
        },
      ],
    },

    // ── TOPIC 7: COUNTING ──
    {
      id: "counting-principles",
      number: 7,
      title: "Basic Principle of Counting",
      sections: [
        {
          id: "bp-basic",
          title: "Basic Principle",
          content:
            "If experiment 1 can result in any one of m possible outcomes and, for each outcome of experiment 1, there are n possible outcomes of experiment 2, then together there are m×n possible outcomes.",
          type: "theorem",
        },
        {
          id: "bp-generalized",
          title: "Generalized Principle",
          content:
            "If r experiments are performed, with n₁ outcomes for the first, n₂ for the second (for each first outcome), and so on, then the total number of outcomes is n₁ × n₂ × ... × nᵣ.",
          type: "theorem",
        },
        {
          id: "bp-example",
          content:
            "Example: There are 36 possible outcomes when tossing 2 dice (6 × 6 = 36).",
          type: "note",
        },
      ],
      examples: [
        {
          id: "ex-3-5a",
          title: "Example 3.5a — Drawing Balls",
          statement:
            'Two balls are "randomly drawn" from a bowl containing 6 white and 5 black balls. What is the probability that one of the drawn balls is white and the other black?',
          solution: [
            {
              stepNumber: 1,
              title: "Count total ways to draw 2 balls",
              explanation: "Choose 2 balls from 11 total balls.",
              formula: "\\binom{11}{2} = \\frac{11!}{2! \\cdot 9!} = 55",
            },
            {
              stepNumber: 2,
              title: "Count favorable outcomes",
              explanation:
                "Choose 1 white from 6 AND 1 black from 5.",
              formula: "\\binom{6}{1} \\times \\binom{5}{1} = 6 \\times 5 = 30",
            },
            {
              stepNumber: 3,
              title: "Calculate probability",
              explanation: "Divide favorable by total.",
              formula: "P = \\frac{30}{55} = \\frac{6}{11} \\approx 0.545",
              result: "The probability is 6/11 ≈ 54.5%.",
            },
          ],
          visualization: "marble-simulator",
        },
      ],
      keyFormulas: [
        {
          id: "counting-basic",
          name: "Basic Counting",
          latex: "m \\times n",
          description: "Two experiments with m and n outcomes",
        },
        {
          id: "counting-general",
          name: "Generalized Counting",
          latex: "n_1 \\times n_2 \\times \\cdots \\times n_r",
          description: "r experiments",
        },
      ],
    },

    // ── TOPIC 8: PERMUTATIONS ──
    {
      id: "permutations",
      number: 8,
      title: "Permutations",
      sections: [
        {
          id: "perm-def",
          title: "Definition",
          content:
            "A permutation is an ordered arrangement of objects. The number of ways n distinct objects can be arranged in a linear order is n! (n factorial).",
          type: "definition",
        },
        {
          id: "perm-factorial",
          title: "Factorial",
          content:
            "n! = n × (n-1) × (n-2) × ... × 3 × 2 × 1. By convention, 0! = 1.",
          type: "definition",
        },
        {
          id: "perm-example",
          content:
            "How many arrangements of a, b, c? Answer: abc, acb, bac, bca, cab, cba = 3! = 6 permutations.",
          type: "note",
        },
      ],
      examples: [
        {
          id: "ex-3-5b",
          title: "Example 3.5b — Jones' Bookshelf",
          statement:
            "Mr. Jones has 10 books: 4 math, 3 chemistry, 2 history, 1 language. He wants all same-subject books together. How many different arrangements are possible?",
          solution: [
            {
              stepNumber: 1,
              title: "Order the subject groups",
              explanation:
                "There are 4 subjects, so they can be arranged in 4! ways.",
              formula: "4! = 24 \\text{ orderings of subject groups}",
            },
            {
              stepNumber: 2,
              title: "Arrange within each group",
              explanation:
                "Math books: 4! ways, Chemistry: 3! ways, History: 2! ways, Language: 1! way.",
              formula:
                "4! \\times 3! \\times 2! \\times 1! = 24 \\times 6 \\times 2 \\times 1 = 288",
            },
            {
              stepNumber: 3,
              title: "Multiply together",
              explanation:
                "Total = (orderings of groups) × (arrangements within groups).",
              formula:
                "4! \\times 4! \\times 3! \\times 2! \\times 1! = 24 \\times 288 = 6912",
              result: "There are 6,912 possible arrangements.",
            },
          ],
        },
      ],
      keyFormulas: [
        {
          id: "factorial",
          name: "Factorial",
          latex: "n! = n(n-1)(n-2) \\cdots 3 \\cdot 2 \\cdot 1",
          description: "Number of permutations of n objects",
        },
      ],
    },

    // ── TOPIC 9: COMBINATIONS ──
    {
      id: "combinations",
      number: 9,
      title: "Combinations",
      sections: [
        {
          id: "comb-def",
          title: "Definition",
          content:
            "A combination is a selection of items where order does not matter. The number of ways to choose r items from n is denoted C(n,r) or 'n choose r'.",
          type: "definition",
        },
        {
          id: "comb-reasoning",
          content:
            "When order matters, there are n(n-1)...(n-r+1) ways to select r from n. Since each group of r is counted r! times, we divide by r!.",
          type: "text",
        },
      ],
      examples: [
        {
          id: "ex-3-5d",
          title: "Example 3.5d — Committee Selection",
          statement:
            "A committee of size 5 is to be selected from a group of 6 men and 9 women. If the selection is made randomly, what is the probability that the committee consists of 3 men and 2 women?",
          solution: [
            {
              stepNumber: 1,
              title: "Count total ways to form committee",
              explanation:
                "Choose any 5 from 15 people.",
              formula:
                "\\binom{15}{5} = \\frac{15!}{5! \\cdot 10!} = 3003",
            },
            {
              stepNumber: 2,
              title: "Count favorable outcomes",
              explanation:
                "Choose 3 men from 6 AND 2 women from 9.",
              formula:
                "\\binom{6}{3} \\times \\binom{9}{2} = 20 \\times 36 = 720",
            },
            {
              stepNumber: 3,
              title: "Calculate probability",
              explanation: "Divide favorable by total.",
              formula:
                "P = \\frac{720}{3003} = \\frac{240}{1001} \\approx 0.2398",
              result: "The probability is 240/1001 ≈ 24.0%.",
            },
          ],
          visualization: "combinatorics",
        },
      ],
      keyFormulas: [
        {
          id: "combination",
          name: "Combination",
          latex:
            "\\binom{n}{r} = \\frac{n!}{r!(n-r)!}",
          description: "Number of ways to choose r from n (order doesn't matter)",
        },
      ],
    },

    // ── TOPIC 10: CONDITIONAL PROBABILITY ──
    {
      id: "conditional-probability",
      number: 10,
      title: "Conditional Probability",
      sections: [
        {
          id: "cp-intro",
          title: "Why Conditional Probability?",
          content:
            "Conditional probability is one of the most important concepts in probability theory. It is useful when: (1) we have partial information about the result, (2) we want to recalculate probability with additional information, (3) sometimes it is easier to compute conditional probability first.",
          type: "text",
        },
        {
          id: "cp-definition",
          title: "Definition",
          content:
            "The conditional probability of E given F is defined as P(E|F) = P(EF)/P(F), provided P(F) > 0.",
          type: "definition",
        },
        {
          id: "cp-multiplication",
          title: "Multiplication Rule",
          content:
            "Rearranging: P(EF) = P(F) × P(E|F). The probability that both E and F occur equals the probability that F occurs multiplied by the conditional probability of E given F.",
          type: "theorem",
        },
        {
          id: "cp-dice-example",
          content:
            "Two fair dice: What is P(sum=8 | first die=3)? There are 6 possible outcomes where first die = 3: (3,1)...(3,6). Only (3,5) gives sum 8. So P(E|F) = P(EF)/P(F) = (1/36)/(6/36) = 1/6.",
          type: "note",
        },
      ],
      examples: [
        {
          id: "ex-3-6a",
          title: "Example 3.6a — Transistor Bin",
          statement:
            "A bin contains 5 defective (immediately fail), 10 partially defective (fail after hours), and 25 acceptable transistors. A transistor is chosen at random and put into use. If it does not immediately fail, what is the probability it is acceptable?",
          solution: [
            {
              stepNumber: 1,
              title: "Define Events",
              explanation:
                "Let A = transistor is acceptable. Let D = transistor does not immediately fail (not one of the 5 defective).",
              formula:
                "P(A) = \\frac{25}{40}, \\quad P(D) = \\frac{35}{40}",
            },
            {
              stepNumber: 2,
              title: "Identify Joint Probability",
              explanation:
                "If the transistor is acceptable, it certainly does not immediately fail. So P(A and D) = P(A) = 25/40.",
              formula:
                "P(AD) = P(A) = \\frac{25}{40}",
            },
            {
              stepNumber: 3,
              title: "Apply Conditional Probability",
              explanation: "Use the definition of conditional probability.",
              formula:
                "P(A|D) = \\frac{P(AD)}{P(D)} = \\frac{25/40}{35/40} = \\frac{25}{35} = \\frac{5}{7} \\approx 0.714",
              result:
                "Given it didn't immediately fail, there's a 5/7 ≈ 71.4% chance it's acceptable.",
            },
          ],
        },
        {
          id: "ex-3-6c",
          title: "Example 3.6c — Branch Office Manager",
          statement:
            "Ms. Perez figures there is a 30% chance her company will set up a branch office in Phoenix. If it does, she is 60% certain she will be made manager. What is the probability that Perez will be a Phoenix branch office manager?",
          solution: [
            {
              stepNumber: 1,
              title: "Define Events",
              explanation:
                "Let B = company sets up branch office. Let M = Perez is made manager.",
              formula: "P(B) = 0.30, \\quad P(M|B) = 0.60",
            },
            {
              stepNumber: 2,
              title: "Apply Multiplication Rule",
              explanation:
                "We want P(BM) — the probability both events happen.",
              formula:
                "P(BM) = P(B) \\times P(M|B) = 0.30 \\times 0.60 = 0.18",
              result:
                "There is an 18% chance Perez will be the Phoenix manager.",
            },
          ],
        },
      ],
      keyFormulas: [
        {
          id: "conditional-prob",
          name: "Conditional Probability",
          latex:
            "P(E|F) = \\frac{P(EF)}{P(F)}, \\quad P(F) > 0",
          description: "Probability of E given F has occurred",
        },
        {
          id: "multiplication-rule",
          name: "Multiplication Rule",
          latex: "P(EF) = P(F) \\cdot P(E|F)",
          description: "Joint probability via conditional",
        },
      ],
    },

    // ── TOPIC 11: BAYES' FORMULA ──
    {
      id: "bayes-formula",
      number: 11,
      title: "Bayes' Formula",
      sections: [
        {
          id: "bf-total-prob",
          title: "Law of Total Probability (Two Events)",
          content:
            "Since E = EF ∪ EFᶜ and these are mutually exclusive: P(E) = P(EF) + P(EFᶜ) = P(E|F)P(F) + P(E|Fᶜ)P(Fᶜ). This expresses P(E) as a weighted sum of conditional probabilities.",
          type: "theorem",
        },
        {
          id: "bf-total-general",
          title: "General Law of Total Probability",
          content:
            "If F₁, F₂, ..., Fₙ are mutually exclusive events whose union is S, then: P(E) = Σᵢ P(E|Fᵢ)P(Fᵢ)",
          type: "theorem",
        },
        {
          id: "bf-bayes",
          title: "Bayes' Formula",
          content:
            "Given E has occurred, the probability that a specific Fⱼ also occurred is: P(Fⱼ|E) = P(E|Fⱼ)P(Fⱼ) / Σᵢ P(E|Fᵢ)P(Fᵢ). This formula shows how prior beliefs P(Fⱼ) should be updated in light of new evidence E.",
          type: "theorem",
        },
      ],
      examples: [
        {
          id: "ex-3-7a",
          title: "Example 3.7a — Insurance: Accident Prone",
          statement:
            "An insurance company classifies people as accident prone (30% of population) or not. Accident-prone person: P(accident) = 0.4. Non-accident-prone: P(accident) = 0.2. What is the probability a new policy holder has an accident within a year?",
          solution: [
            {
              stepNumber: 1,
              title: "Define Events",
              explanation:
                "Let A₁ = accident within a year. Let A = person is accident prone.",
              formula: "P(A) = 0.30, \\quad P(A^c) = 0.70",
            },
            {
              stepNumber: 2,
              title: "Apply Law of Total Probability",
              explanation: "Condition on whether the person is accident prone.",
              formula:
                "P(A_1) = P(A_1|A)P(A) + P(A_1|A^c)P(A^c)",
            },
            {
              stepNumber: 3,
              title: "Calculate",
              explanation: "Plug in the given values.",
              formula:
                "P(A_1) = (0.4)(0.3) + (0.2)(0.7) = 0.12 + 0.14 = 0.26",
              result: "26% of new policy holders will have an accident.",
            },
          ],
          visualization: "probability-tree",
        },
        {
          id: "ex-3-7a-followup",
          title: "Example 3.7a (Continued) — Reverse: Is He Accident Prone?",
          statement:
            "Given that the policy holder had an accident, what is the probability he is accident prone?",
          solution: [
            {
              stepNumber: 1,
              title: "Apply Bayes' Formula",
              explanation:
                "We want to reverse the conditioning — go from P(A₁|A) to P(A|A₁).",
              formula:
                "P(A|A_1) = \\frac{P(A_1|A)P(A)}{P(A_1)}",
            },
            {
              stepNumber: 2,
              title: "Substitute Values",
              explanation:
                "Use P(A₁) = 0.26 from previous calculation.",
              formula:
                "P(A|A_1) = \\frac{(0.4)(0.3)}{0.26} = \\frac{0.12}{0.26} = \\frac{6}{13} \\approx 0.4615",
              result:
                "There is approximately a 46.15% chance the accident holder is accident prone (up from the prior 30%).",
              interactiveParams: [
                {
                  name: "pAccidentProne",
                  label: "P(accident prone)",
                  min: 0.01,
                  max: 0.99,
                  step: 0.01,
                  defaultValue: 0.3,
                },
                {
                  name: "pAccGivenProne",
                  label: "P(accident | prone)",
                  min: 0.01,
                  max: 0.99,
                  step: 0.01,
                  defaultValue: 0.4,
                },
                {
                  name: "pAccGivenNotProne",
                  label: "P(accident | not prone)",
                  min: 0.01,
                  max: 0.99,
                  step: 0.01,
                  defaultValue: 0.2,
                },
              ],
            },
          ],
          visualization: "probability-tree",
        },
      ],
      keyFormulas: [
        {
          id: "total-prob",
          name: "Law of Total Probability",
          latex:
            "P(E) = P(E|F)P(F) + P(E|F^c)P(F^c)",
          description: "Express P(E) as weighted conditional sum",
        },
        {
          id: "bayes",
          name: "Bayes' Formula",
          latex:
            "P(F_j|E) = \\frac{P(E|F_j)P(F_j)}{\\sum_{i=1}^{n} P(E|F_i)P(F_i)}",
          description: "Update prior probabilities with evidence",
        },
      ],
    },

    // ── TOPIC 12: INDEPENDENT EVENTS ──
    {
      id: "independent-events",
      number: 12,
      title: "Independent Events",
      sections: [
        {
          id: "ie-def",
          title: "Definition",
          content:
            "Two events E and F are independent if any one of these equivalent conditions holds: (1) P(EF) = P(E)P(F), (2) P(E|F) = P(E), (3) P(F|E) = P(F). Independence means knowing F occurred does not change the probability of E.",
          type: "definition",
        },
        {
          id: "ie-complement",
          title: "Independence and Complements",
          content:
            "If E and F are independent, then E and Fᶜ are also independent. Proof: P(EFᶜ) = P(E) − P(EF) = P(E) − P(E)P(F) = P(E)(1 − P(F)) = P(E)P(Fᶜ).",
          type: "theorem",
        },
        {
          id: "ie-multiple",
          title: "Independence of Multiple Events",
          content:
            "Events E₁, E₂, ..., Eₙ are independent if for every subset: P(E₁'E₂'...Eᵣ') = P(E₁')P(E₂')...P(Eᵣ').",
          type: "definition",
        },
        {
          id: "ie-parallel",
          title: "Parallel System",
          content:
            "A system of n components is a parallel system if it functions when at least one component functions. If component i functions independently with probability pᵢ, then P(system functions) = 1 − Πᵢ(1 − pᵢ).",
          type: "theorem",
        },
      ],
      examples: [
        {
          id: "ex-3-8a",
          title: "Example 3.8a — Card Independence",
          statement:
            "A card is selected at random from a 52-card deck. If A is the event that the card is an ace and H is the event it is a heart, show A and H are independent.",
          solution: [
            {
              stepNumber: 1,
              title: "Calculate Individual Probabilities",
              explanation: "Find P(A) and P(H) separately.",
              formula:
                "P(A) = \\frac{4}{52} = \\frac{1}{13}, \\quad P(H) = \\frac{13}{52} = \\frac{1}{4}",
            },
            {
              stepNumber: 2,
              title: "Calculate Joint Probability",
              explanation:
                "P(AH) = probability of ace of hearts = 1/52.",
              formula: "P(AH) = \\frac{1}{52}",
            },
            {
              stepNumber: 3,
              title: "Verify Independence",
              explanation:
                "Check if P(AH) = P(A) × P(H).",
              formula:
                "P(A) \\times P(H) = \\frac{1}{13} \\times \\frac{1}{4} = \\frac{1}{52} = P(AH) \\checkmark",
              result:
                "Since P(AH) = P(A)P(H), the events A and H are independent!",
            },
          ],
          visualization: "card-draw",
        },
      ],
      keyFormulas: [
        {
          id: "independence",
          name: "Independence",
          latex: "P(EF) = P(E) \\cdot P(F)",
          description: "Definition of independent events",
        },
        {
          id: "parallel-system",
          name: "Parallel System",
          latex:
            "P(\\text{system works}) = 1 - \\prod_{i=1}^{n}(1 - p_i)",
          description: "At least one component works",
        },
      ],
    },
  ],

  // ============================================================
  // PROBLEMS
  // ============================================================
  problems: [
    // ── PROBLEM 1 (FULLY SOLVED) ──
    {
      id: "problem-01",
      number: 1,
      statement:
        "A box contains three marbles — one red, one green, and one blue. Consider an experiment that consists of taking one marble from the box, then replacing it in the box and drawing a second marble from the box. Describe the sample space. Repeat for the case in which the second marble is drawn without first replacing the first marble.",
      difficulty: "easy",
      tags: ["sample-space"],
      solved: true,
      visualization: "marble-simulator",
      solution: [
        {
          stepNumber: 1,
          title: "Identify the Experiment",
          explanation:
            "We draw two marbles from a box containing Red (R), Green (G), and Blue (B). We need to list all possible outcomes for two scenarios.",
        },
        {
          stepNumber: 2,
          title: "With Replacement — List Outcomes",
          explanation:
            "After drawing the first marble, we put it back before drawing the second. This means the second draw has the same 3 options regardless of the first draw.",
          formula:
            "S = \\{RR, RG, RB, GR, GG, GB, BR, BG, BB\\}",
          result: "There are 3 × 3 = 9 outcomes with replacement.",
        },
        {
          stepNumber: 3,
          title: "Without Replacement — List Outcomes",
          explanation:
            "The first marble is NOT returned, so the second draw only has 2 remaining marbles.",
          formula:
            "S = \\{RG, RB, GR, GB, BR, BG\\}",
          result:
            "There are 3 × 2 = 6 outcomes without replacement. Note: no repeated-color pairs like RR.",
        },
      ],
    },

    // ── PROBLEM 5 (FULLY SOLVED) ──
    {
      id: "problem-05",
      number: 5,
      statement:
        "A system is composed of four components, each of which is either working or failed. The outcome is given by the vector (x₁, x₂, x₃, x₄), where xᵢ = 1 if component i is working and 0 if failed.",
      subparts: [
        { label: "a", text: "How many outcomes are in the sample space?" },
        {
          label: "b",
          text: "Suppose the system works if components 1 and 2 are both working, or if components 3 and 4 are both working. List all outcomes where the system works.",
        },
        {
          label: "c",
          text: "Let E be the event that components 1 and 3 are both failed. How many outcomes are in event E?",
        },
      ],
      difficulty: "medium",
      tags: ["sample-space", "counting"],
      solved: true,
      visualization: "system-diagram",
      solution: [
        {
          stepNumber: 1,
          title: "Part (a): Count the Sample Space",
          explanation:
            "Each of 4 components is either working (1) or failed (0). This is like a binary string of length 4.",
          formula:
            "|S| = 2^4 = 16 \\text{ outcomes}",
          result: "The sample space has 16 outcomes.",
        },
        {
          stepNumber: 2,
          title: "Part (b): System Works Condition",
          explanation:
            "System works if (x₁=1 AND x₂=1) OR (x₃=1 AND x₄=1). We list all 16 vectors and check which satisfy this condition.",
          formula:
            "\\text{Works: } (1,1,0,0), (1,1,0,1), (1,1,1,0), (1,1,1,1),\\\\ (0,0,1,1), (0,1,1,1), (1,0,1,1)",
          result: "7 outcomes result in the system working.",
        },
        {
          stepNumber: 3,
          title: "Part (c): Both Components 1 and 3 Failed",
          explanation:
            "E requires x₁ = 0 and x₃ = 0. Components 2 and 4 can be anything (0 or 1).",
          formula:
            "|E| = 1 \\times 2 \\times 1 \\times 2 = 4",
          result:
            "E has 4 outcomes: (0,0,0,0), (0,0,0,1), (0,1,0,0), (0,1,0,1).",
        },
      ],
    },

    // ── PROBLEM 29 (FULLY SOLVED) ──
    {
      id: "problem-29",
      number: 29,
      statement:
        "You ask your neighbor to water a sickly plant while you are on vacation. Without water it will die with probability 0.8; with water it will die with probability 0.15. You are 90 percent certain that your neighbor will remember to water the plant.",
      subparts: [
        { label: "a", text: "What is the probability that the plant will be alive when you return?" },
        {
          label: "b",
          text: "If it is dead, what is the probability your neighbor forgot to water it?",
        },
      ],
      difficulty: "hard",
      tags: ["conditional-probability", "bayes-formula"],
      solved: true,
      visualization: "probability-tree",
      solution: [
        {
          stepNumber: 1,
          title: "Define Events",
          explanation:
            "Let W = neighbor waters the plant. Let D = plant dies.",
          formula:
            "P(W) = 0.90, \\quad P(W^c) = 0.10",
        },
        {
          stepNumber: 2,
          title: "List Conditional Probabilities",
          explanation: "The probability of dying depends on whether the plant gets water.",
          formula:
            "P(D|W) = 0.15, \\quad P(D|W^c) = 0.80",
        },
        {
          stepNumber: 3,
          title: "Part (a): P(plant alive)",
          explanation:
            "First find P(D) using law of total probability, then P(alive) = 1 − P(D).",
          formula:
            "P(D) = P(D|W)P(W) + P(D|W^c)P(W^c) = (0.15)(0.90) + (0.80)(0.10) = 0.135 + 0.08 = 0.215",
        },
        {
          stepNumber: 4,
          title: "Calculate P(alive)",
          explanation: "The complement of dying is being alive.",
          formula: "P(\\text{alive}) = 1 - P(D) = 1 - 0.215 = 0.785",
          result: "The plant has a 78.5% chance of being alive.",
          interactiveParams: [
            {
              name: "pWater",
              label: "P(neighbor waters)",
              min: 0,
              max: 1,
              step: 0.01,
              defaultValue: 0.9,
            },
            {
              name: "pDieWithWater",
              label: "P(die | watered)",
              min: 0,
              max: 1,
              step: 0.01,
              defaultValue: 0.15,
            },
            {
              name: "pDieWithout",
              label: "P(die | no water)",
              min: 0,
              max: 1,
              step: 0.01,
              defaultValue: 0.8,
            },
          ],
        },
        {
          stepNumber: 5,
          title: "Part (b): Apply Bayes' Formula",
          explanation:
            "Given the plant is dead, what is the probability the neighbor forgot?",
          formula:
            "P(W^c|D) = \\frac{P(D|W^c)P(W^c)}{P(D)} = \\frac{(0.80)(0.10)}{0.215} = \\frac{0.08}{0.215} \\approx 0.372",
          result:
            "If the plant is dead, there is a 37.2% probability the neighbor forgot to water it.",
        },
      ],
    },

    // ── MONTY HALL (FULLY SOLVED) ──
    {
      id: "problem-monty-hall",
      number: 99,
      statement:
        "Suppose you're on a game show, and you're given the choice of three doors: Behind one door is a car; behind the others, goats. You pick a door, say No. 1, and the host, who knows what's behind the doors, opens another door, say No. 3, which has a goat. He then says to you, 'Do you want to pick door No. 2?' Is it to your advantage to switch your choice?",
      difficulty: "hard",
      tags: ["conditional-probability", "bayes-formula"],
      solved: true,
      visualization: "monty-hall",
      solution: [
        {
          stepNumber: 1,
          title: "Set Up the Problem",
          explanation:
            "Let's say you pick Door 1. The car is equally likely behind any door. The host (who knows where the car is) always opens a door with a goat.",
          formula:
            "P(\\text{car behind door } i) = \\frac{1}{3}, \\quad i = 1, 2, 3",
        },
        {
          stepNumber: 2,
          title: "If You DON'T Switch (Stay with Door 1)",
          explanation:
            "You win only if the car was behind Door 1 all along.",
          formula:
            "P(\\text{win by staying}) = \\frac{1}{3}",
        },
        {
          stepNumber: 3,
          title: "If You DO Switch",
          explanation:
            "You win if the car was behind Door 2 or Door 3. If car was behind Door 2, host opens Door 3 → you switch to Door 2 → WIN. If car was behind Door 3, host opens Door 2 → you switch to Door 3 → WIN. That's 2 out of 3 scenarios!",
          formula:
            "P(\\text{win by switching}) = \\frac{2}{3}",
        },
        {
          stepNumber: 4,
          title: "Conclusion",
          explanation:
            "Switching doubles your probability of winning from 1/3 to 2/3! The key insight is that the host's action of opening a door with a goat gives you information — it concentrates the 2/3 probability that was spread over the other two doors onto the single remaining door.",
          result:
            "YES — you should always switch! Switching gives you a 2/3 chance of winning vs 1/3 by staying.",
        },
      ],
    },

    
    // ── SOLVED PROBLEMS FROM PREVIOUS AI INSTRUCTIONS ──
    {
      id: "problem-02",
      number: 2,
      statement:
        "An experiment consists of tossing a coin three times. What is the sample space of this experiment? Which event corresponds to the experiment resulting in more heads than tails?",
      difficulty: "easy",
      tags: ["sample-space"],
      solved: true,
      visualization: "sample-space-grid",
      solution: [
        {
          stepNumber: 1,
          title: "List all possible outcomes",
          explanation: "For 3 coin tosses, each toss is H or T, so there are 2³ = 8 possible outcomes in the sample space.",
          formula: "S = \{HHH, HHT, HTH, HTT, THH, THT, TTH, TTT\}",
        },
        {
          stepNumber: 2,
          title: "Identify the desired event",
          explanation: "We need outcomes with more heads than tails. In 3 tosses, this means at least 2 heads.",
          formula: "E = \{HHH, HHT, HTH, THH\}",
          result: "There are 4 such outcomes.",
        },
        {
          stepNumber: 3,
          title: "Calculate the probability",
          explanation: "Divide the number of favorable outcomes by the total outcomes.",
          formula: "P(E) = \frac{4}{8} = \frac{1}{2}",
          result: "The probability is 50%.",
        }
      ]
    },
    {
      id: "problem-06",
      number: 6,
      statement: "Let E, F, G be three events. Find expressions for the events that of E, F, G: (a) only E occurs, (b) both E and G but not F occur, (c) at least one occurs, (f) none occurs.",
      difficulty: "medium",
      tags: ["sample-space", "set-operations"],
      solved: true,
      visualization: "venn-diagram",
      solution: [
        {
          stepNumber: 1,
          title: "Part (a): Only E occurs",
          explanation: "E must occur, but F and G must NOT occur.",
          formula: "E \cap F^c \cap G^c = EF^cG^c",
        },
        {
          stepNumber: 2,
          title: "Part (b): Both E and G but not F",
          explanation: "E and G must occur, but F must NOT occur.",
          formula: "E \cap G \cap F^c = EGF^c",
        },
        {
          stepNumber: 3,
          title: "Part (c): At least one occurs",
          explanation: "This is the union of all three events.",
          formula: "E \cup F \cup G",
        },
        {
          stepNumber: 4,
          title: "Part (f): None occurs",
          explanation: "This is the complement of at least one occurring.",
          formula: "E^c \cap F^c \cap G^c = (E \cup F \cup G)^c",
          result: "Expressed using DeMorgan's laws.",
        }
      ]
    },
    {
      id: "problem-19",
      number: 19,
      statement: "Consider a set of 23 unrelated people. Because each pair of people shares the same birthday with probability 1/365, and there are C(23,2)=253 pairs, why isn't the probability that at least two people have the same birthday equal to 253/365?",
      difficulty: "hard",
      tags: ["counting", "independence"],
      solved: true,
      solution: [
        {
          stepNumber: 1,
          title: "Why naive addition fails",
          explanation: "The events 'Person i and Person j share a birthday' are NOT mutually exclusive. If A and B share a birthday, and B and C share a birthday, then A and C automatically share one too. You cannot simply add probabilities of non-mutually exclusive events.",
        },
        {
          stepNumber: 2,
          title: "The correct approach: Complementary Probability",
          explanation: "It is easier to calculate the probability that NO TWO people share a birthday, and subtract from 1.",
          formula: "P(\text{no match}) = \frac{365}{365} \times \frac{364}{365} \times \cdots \times \frac{343}{365} \approx 0.4927",
        },
        {
          stepNumber: 3,
          title: "Final Calculation",
          explanation: "Subtract from 1 to find the probability of at least one match.",
          formula: "P(\text{match}) = 1 - 0.4927 = 0.5073",
          result: "The true probability is ~50.7%, not 253/365 (~69%).",
        }
      ]
    },
    {
      id: "problem-27",
      number: 27,
      statement: "There are two factories that produce microwaves. Each microwave from factory A is defective with probability .05, from factory B with probability .01. You purchase two microwaves from the same factory (equally likely A or B). If the first microwave is defective, what is the conditional probability that the other one is also defective?",
      difficulty: "hard",
      tags: ["conditional-probability", "bayes-formula"],
      solved: true,
      visualization: "probability-tree",
      solution: [
        {
          stepNumber: 1,
          title: "Define Events and Priors",
          explanation: "Let A = Factory A, B = Factory B. Let D1 = first defective, D2 = second defective. P(A) = P(B) = 0.5.",
        },
        {
          stepNumber: 2,
          title: "Update probabilities after observing D1",
          explanation: "Use Bayes' formula to find the probability the factory is A given the first is defective.",
          formula: "P(A|D_1) = \frac{P(D_1|A)P(A)}{P(D_1|A)P(A) + P(D_1|B)P(B)} = \frac{0.05(0.5)}{0.05(0.5) + 0.01(0.5)} = \frac{5}{6}"
        },
        {
          stepNumber: 3,
          title: "Calculate probability of D2",
          explanation: "Now we know the factory is A with probability 5/6, and B with probability 1/6. We use the law of total probability for D2.",
          formula: "P(D_2|D_1) = P(D_2|A)P(A|D_1) + P(D_2|B)P(B|D_1) = (0.05)\frac{5}{6} + (0.01)\frac{1}{6}",
          result: "P(D2|D1) = 26/600 ≈ 0.0433 (4.33%)",
        }
      ]
    },
    {
      id: "problem-28",
      number: 28,
      statement: "A red die, blue die, and yellow die are rolled. What is P(B < Y < R)?",
      difficulty: "hard",
      tags: ["counting", "conditional-probability"],
      solved: true,
      visualization: "dice-simulator",
      solution: [
        {
          stepNumber: 1,
          title: "Total Outcomes",
          explanation: "There are 3 dice, each with 6 sides.",
          formula: "|S| = 6^3 = 216",
        },
        {
          stepNumber: 2,
          title: "Count Favorable Outcomes",
          explanation: "For B < Y < R to be true, all three dice must have strictly different numbers. How many ways can we choose 3 distinct numbers from 6? That is 6 choose 3.",
          formula: "\binom{6}{3} = \frac{6!}{3!3!} = 20",
        },
        {
          stepNumber: 3,
          title: "Determine the ordering",
          explanation: "For any chosen set of 3 distinct numbers (e.g., 2, 4, 5), there is exactly ONE way to assign them to B, Y, and R such that B < Y < R (B=2, Y=4, R=5).",
          result: "There are exactly 20 outcomes where B < Y < R.",
        },
        {
          stepNumber: 4,
          title: "Final Probability",
          explanation: "Divide favorable outcomes by total outcomes.",
          formula: "P(B < Y < R) = \frac{20}{216} = \frac{5}{54}",
          result: "The probability is 5/54.",
        }
      ]
    },
    {
      id: "problem-30",
      number: 30,
      statement: "Two balls, each equally likely to be red or blue, are put in an urn. At each stage one ball is randomly chosen, its color noted, and returned. If the first two chosen are red, what is the probability that (a) both balls are red, (b) the next ball chosen will be red?",
      difficulty: "hard",
      tags: ["conditional-probability", "bayes-formula"],
      solved: true,
      visualization: "marble-simulator",
      solution: [
        {
          stepNumber: 1,
          title: "Define the initial state (Hypotheses)",
          explanation: "The urn has 2 balls, each independently R or B. H0: 0 Red (1/4 prob), H1: 1 Red (1/2 prob), H2: 2 Red (1/4 prob).",
        },
        {
          stepNumber: 2,
          title: "Likelihood of observing 2 Reds",
          explanation: "Let E = first two draws are Red. P(E|H0) = 0. P(E|H1) = (1/2)². P(E|H2) = 1² = 1.",
        },
        {
          stepNumber: 3,
          title: "Apply Bayes' Formula for Part (a)",
          explanation: "What is P(H2|E)? First find P(E).",
          formula: "P(E) = 0(\frac{1}{4}) + \frac{1}{4}(\frac{1}{2}) + 1(\frac{1}{4}) = \frac{3}{8}",
          result: "P(H2|E) = 1(1/4) / (3/8) = 2/3.",
        },
        {
          stepNumber: 4,
          title: "Part (b): Probability next ball is red",
          explanation: "Use Law of Total Probability conditioning on the hypotheses, given E.",
          formula: "P(\text{next R}|E) = P(R|H1)P(H1|E) + P(R|H2)P(H2|E) = (1/2)(1/3) + (1)(2/3)",
          result: "P(next R) = 5/6.",
        }
      ]
    },
    {
      id: "problem-43",
      number: 43,
      statement: "Three prisoners are told one will be executed (chosen at random). Prisoner A asks the jailer which of B, C will go free. The jailer refuses, saying A's probability would rise from 1/3 to 1/2. Is the jailer's reasoning correct?",
      difficulty: "hard",
      tags: ["conditional-probability"],
      solved: true,
      visualization: "monty-hall",
      solution: [
        {
          stepNumber: 1,
          title: "Set up the probabilities",
          explanation: "Initially, P(A executed) = P(B executed) = P(C executed) = 1/3.",
        },
        {
          stepNumber: 2,
          title: "Analyze the Jailer's Behavior",
          explanation: "If A is to be executed, jailer names B or C (prob 1/2 each). If B is executed, jailer names C (prob 1). If C is executed, jailer names B (prob 1).",
        },
        {
          stepNumber: 3,
          title: "Condition on the Jailer's Answer",
          explanation: "Suppose the jailer says 'B will go free'. What is P(A executed | jailer says B)?",
          formula: "P(A | \text{says B}) = \frac{P(\text{says B} | A)P(A)}{P(\text{says B})} = \frac{(1/2)(1/3)}{(1/2)(1/3) + 0(1/3) + (1)(1/3)}",
        },
        {
          stepNumber: 4,
          title: "Evaluate",
          explanation: "The denominator is 1/6 + 0 + 1/3 = 1/2. The numerator is 1/6.",
          formula: "P(A | \text{says B}) = \frac{1/6}{1/2} = \frac{1}{3}",
          result: "The jailer is WRONG. A's probability of execution remains exactly 1/3. This is identical to the Monty Hall problem.",
        }
      ]
    }
  ],
};

// ============================================================
  // HELPER: Get all chapters (for future expansion)

export const allChapters: { id: string; number: number; title: string; available: boolean }[] = [
  { id: "chapter-01", number: 1, title: "Introduction to Statistics", available: false },
  { id: "chapter-02", number: 2, title: "Descriptive Statistics", available: false },
  { id: "chapter-03", number: 3, title: "Elements of Probability", available: true },
  { id: "chapter-04", number: 4, title: "Random Variables and Expectation", available: false },
  { id: "chapter-05", number: 5, title: "Special Random Variables", available: false },
  { id: "chapter-06", number: 6, title: "Distributions of Sampling Statistics", available: false },
  { id: "chapter-07", number: 7, title: "Parameter Estimation", available: false },
  { id: "chapter-08", number: 8, title: "Hypothesis Testing", available: false },
  { id: "chapter-09", number: 9, title: "Regression", available: false },
  { id: "chapter-10", number: 10, title: "Analysis of Variance", available: false },
  { id: "chapter-11", number: 11, title: "Goodness of Fit Tests", available: false },
  { id: "chapter-12", number: 12, title: "Nonparametric Hypothesis Tests", available: false },
  { id: "chapter-13", number: 13, title: "Quality Control", available: false },
  { id: "chapter-14", number: 14, title: "Life Testing", available: false },
  { id: "chapter-15", number: 15, title: "Simulation & Bootstrap Methods", available: false },
  { id: "chapter-16", number: 16, title: "Machine Learning and Big Data", available: false },
];

export function getChapter(id: string): Chapter | undefined {
  if (id === "chapter-03") return chapter03;
  return undefined;
}

export function getTopic(chapterId: string, topicId: string): Topic | undefined {
  const chapter = getChapter(chapterId);
  if (!chapter) return undefined;
  return chapter.topics.find((t) => t.id === topicId);
}

export function getProblem(chapterId: string, problemId: string): Problem | undefined {
  const chapter = getChapter(chapterId);
  if (!chapter) return undefined;
  return chapter.problems.find((p) => p.id === problemId);
}
