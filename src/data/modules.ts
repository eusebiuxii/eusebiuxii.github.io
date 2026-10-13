/**
 * University modules shown on the About page, grouped by year.
 * Brought over from the old portfolio's "University Modules" page.
 */

export interface UniModule {
  code: string
  name: string
  points: string[]
  /** Project pages built during the module */
  projects?: { title: string; href: string }[]
}

export const moduleYears: { year: string; modules: UniModule[] }[] = [
  {
    year: "Year 1",
    modules: [
      {
        code: "COMP105",
        name: "Programming Language Paradigms",
        points: [
          "Focus on functional programming using Haskell",
          "Had to relearn basics such as recursion because of the functional nature of the language",
          "Widened my view of the different kinds of programming languages, though it's not a paradigm I've used since",
        ],
      },
      {
        code: "COMP108",
        name: "Data Structures and Algorithms",
        points: [
          "Explored arrays, queues, stacks, linked lists and different sorting algorithms, comparing their efficiency",
          "Mostly theory driven, but these are very useful notions in computer science",
          "The knowledge applied to a lot of problems I came across during my studies",
        ],
      },
      {
        code: "COMP116",
        name: "Analytic Techniques for Computer Science",
        points: [
          "A theory-heavy module with complicated new concepts, some of which took time to fully grasp",
          "Complex numbers and their applications, spectral methods, calculus, linear algebra and more",
          "They proved their usefulness in later projects and modules",
        ],
      },
      {
        code: "COMP122",
        name: "Object Oriented Programming",
        points: [
          "One of my favourite modules: lots of Java coding, exploring concepts I found really useful",
          "Hierarchies of related classes, polymorphism and GUIs, all put into practice",
          "Led me to other interesting projects and made future modules easier to understand",
        ],
      },
    ],
  },
  {
    year: "Year 2",
    modules: [
      {
        code: "COMP202",
        name: "Complexity of Algorithms",
        points: [
          "Asymptotic notation, AVL trees, different sorting algorithms and cryptography",
          "Included a coding assignment that put the material into practice",
          "Helps with general coding problems, especially in competitions like ICPC",
        ],
      },
      {
        code: "COMP208",
        name: "Group Software Project",
        points: [
          "Building a piece of software in a team of 5–6 people",
          "Our idea was an interactive game that helps children learn maths",
          "It has a full authentication system, menus, settings, gameplay and a leaderboard",
        ],
        projects: [{ title: "Hot Air!", href: "/projects/hot-air" }],
      },
      {
        code: "COMP222",
        name: "Game Design",
        points: [
          "Went deeper into game design practices and structures, building on my A-Level and group project games",
          "Game engines, renderers, geometry, vector arithmetic and transformations, virtual agents and more",
          "I made a game heavily inspired by the classic Asteroids",
        ],
        projects: [
          { title: "Icarus Initiative", href: "/projects/icarus-initiative" },
        ],
      },
      {
        code: "COMP228",
        name: "App Development",
        points: [
          "A new area for me, focusing on iOS and how mobile software differs from (and resembles) desktop",
          "Used Swift and Xcode to develop several iOS apps",
          "The most enjoyable module of my degree: I learned a lot and had fun coding with classmates in the Mac lab",
        ],
        projects: [
          { title: "Fortuna", href: "/projects/fortuna" },
          {
            title: "New Brighton Murals",
            href: "/projects/new-brighton-murals",
          },
        ],
      },
    ],
  },
  {
    year: "Year 3",
    modules: [
      {
        code: "COMP305",
        name: "Biocomputation",
        points: [
          "Neurons, neural networks, perceptrons, learning and genetic algorithms",
          "Went into a lot of detail on concepts that were hard to grasp at first",
          "Purely theory, but it helped in other modules",
        ],
      },
      {
        code: "COMP329",
        name: "Autonomous Mobile Robotics",
        points: [
          "Having never done robotics before, this was an intriguing area to study",
          "Focused mostly on intelligent agents in a virtual environment, similar to game agents",
          "Using sensors and controlling motors, letting an AI make decisions for different scenarios",
        ],
      },
      {
        code: "COMP338",
        name: "Computer Vision",
        points: [
          "Continuing the AI theme: how visual data can be analysed and interpreted",
          "Classifying images, applying filters, selecting training data and more",
          "Included a few smaller projects using Python and PyTorch",
        ],
      },
      {
        code: "COMP343",
        name: "Computer Forensics",
        points: [
          "Forensic processes and the law around collecting digital evidence, with plenty of essays",
          "Carried out similar procedures with tools like Kali Linux and Autopsy, writing up the findings",
          "Read recent academic papers on forensic processes, looking for ways to improve them",
        ],
      },
    ],
  },
]
