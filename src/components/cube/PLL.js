export const PLL = [
  {
    id: 'H',
    step: "pll",
    name: "H",
    algorithms: [
      "(M2 U M2 U2 M2 U M2)"
    ],
    squares: 4,
    moves: 7,
    effects: [
      { from: 2, to: 8, mirror: true },
      { from: 4, to: 6, mirror: true }
    ]
  },
  {
    id: 'Ua',
    step: "pll",
    name: "Ua",
    algorithms: [
      "y2 (F2 U' M' U2 M U' F2)",
      "y2 (R U' R U R U R U' R' U' R2)"
    ],
    squares: 3,
    moves: 7,
    effects: [
      { from: 2, to: 4 },
      { from: 4, to: 6 },
      { from: 6, to: 2 }
    ]
  },
  {
    id: 'Ub',
    step: "pll",
    name: "Ub",
    algorithms: [
      "y2 (F2 U M' U2 M U F2)",
      "y2 (R2 U R U R' U' R' U' R' U R')"
    ],
    squares: 3,
    moves: 7,
    effects: [
      { from: 2, to: 6 },
      { from: 6, to: 4 },
      { from: 4, to: 2 }
    ]
  },
  {
    id: 'Z',
    step: "pll",
    name: "Z",
    algorithms: [
      "(M2 U)2 (M U2 M2 U2 M U2)"
    ],
    squares: 4,
    moves: 10,
    effects: [
      { from: 2, to: 4, mirror: true },
      { from: 8, to: 6, mirror: true }
    ]
  },
  {
    id: 'Aa',
    step: "pll",
    name: "Aa",
    algorithms: [
      "x' z2 (L' U L) D2 (L U' L') D2 L2"
    ],
    squares: 3,
    moves: 9,
    effects: [
      { from: 1, to: 3 },
      { from: 3, to: 9 },
      { from: 9, to: 1 }
    ]
  },
  {
    id: 'Ab',
    step: "pll",
    name: "Ab",
    algorithms: [
      "x' (R U' R) D2 (R' U R) D2 R2"
    ],
    squares: 3,
    moves: 9,
    effects: [
      { from: 3, to: 7 },
      { from: 7, to: 9 },
      { from: 9, to: 3 }
    ]
  },
  {
    id: 'E',
    step: "pll",
    name: "E",
    algorithms: [
      "y x' (R U' R' D) (R U R' D') (R U R' D) (R U' R' D')"
    ],
    squares: 4,
    moves: 4,
    effects: [
      { from: 1, to: 3, mirror: true },
      { from: 7, to: 9, mirror: true }
    ]
  },
  {
    id: 'F',
    step: "pll",
    name: "F",
    algorithms: [
      "y (R' U' F') (R U R' U' R' F R2 U' R' U' R U R') (U R)"
    ],
    squares: 4,
    moves: 18,
    effects: [
      { from: 1, to: 3, mirror: true },
      { from: 4, to: 6, mirror: true }
    ]
  },
  {
    id: 'Ga',
    step: "pll",
    name: "Ga",
    algorithms: [
      ""
    ],
    squares: 6,
    moves: 0,
    effects: [
      { from: 1, to: 9 },
      { from: 9, to: 7 },
      { from: 7, to: 1 },
      { from: 2, to: 4 },
      { from: 4, to: 8 },
      { from: 8, to: 2 }
    ]
  },
  {
    id: 'Gb',
    step: "pll",
    name: "Gb",
    algorithms: [
      ""
    ],
    squares: 6,
    moves: 0,
    effects: [
      { from: 1, to: 7 },
      { from: 7, to: 9 },
      { from: 9, to: 1 },
      { from: 2, to: 8 },
      { from: 8, to: 4 },
      { from: 4, to: 2 }
    ]
  },
  {
    id: 'Gc',
    step: "pll",
    name: "Gc",
    algorithms: [
      ""
    ],
    squares: 6,
    moves: 0,
    effects: [
      { from: 3, to: 7 },
      { from: 7, to: 9 },
      { from: 9, to: 3 },
      { from: 2, to: 6 },
      { from: 6, to: 8 },
      { from: 8, to: 2 }
    ]
  },
  {
    id: 'Gd',
    step: "pll",
    name: "Gd",
    algorithms: [
      ""
    ],
    squares: 6,
    moves: 0,
    effects: [
      { from: 3, to: 9 },
      { from: 9, to: 7 },
      { from: 7, to: 3 },
      { from: 2, to: 8 },
      { from: 8, to: 6 },
      { from: 6, to: 2 }
    ]
  },
  {
    id: 'Ja',
    step: "pll",
    name: "Ja",
    algorithms: [
      "(L' U2 L U) (L' U') (R U' L U R')",
      "y2 (R' U2 R U) (R' U2) (L U' R U L')"
    ],
    squares: 4,
    moves: 11,
    effects: [
      { from: 1, to: 7, mirror: true },
      { from: 4, to: 8, mirror: true }
    ]
  },
  {
    id: 'Jb',
    step: "pll",
    name: "Jb",
    algorithms: [
      "(R U2 R' U') (R U2) (L' U R' U' L)",
      "(R U R' F') (R U R' U' R' F R2 U' R') U'"
    ],
    squares: 4,
    moves: 11,
    effects: [
      { from: 3, to: 9, mirror: true },
      { from: 6, to: 8, mirror: true }
    ]
  },
  {
    id: 'Na',
    step: "pll",
    name: "Na",
    algorithms: [
      "(L U' R U2 L' U R')2 U",
      "(r' D r U2)4 (r' D r)"
    ],
    squares: 4,
    moves: 15,
    effects: [
      { from: 4, to: 6, mirror: true },
      { from: 3, to: 7, mirror: true }
    ]
  },
  {
    id: 'Nb',
    step: "pll",
    name: "Nb",
    algorithms: [
      "(R' U L' U2 R U' L)2 U",
      "(l D' l' U2)4 (l D' l')"
    ],
    squares: 4,
    moves: 15,
    effects: [
      { from: 4, to: 6, mirror: true },
      { from: 1, to: 9, mirror: true }
    ]
  },
  {
    id: 'Ra',
    step: "pll",
    name: "Ra",
    algorithms: [
      "y2 (L U2) (L' U2) (L F') (L' U' L U) (L F L2)"
    ],
    squares: 4,
    moves: 15,
    effects: [
      { from: 2, to: 6, mirror: true },
      { from: 7, to: 9, mirror: true }
    ]
  },
  {
    id: 'Rb',
    step: "pll",
    name: "Rb",
    algorithms: [
      "(R' U2) (R U2) (R' F) (R U R' U') (R' F' R2 U')",
    ],
    squares: 4,
    moves: 14,
    effects: [
      { from: 1, to: 3, mirror: true },
      { from: 6, to: 8, mirror: true }
    ]
  },
  {
    id: 'T',
    step: "pll",
    name: "T",
    algorithms: [
      "(R U R' U' R' F R2 U' R' U' R U R' F')",
    ],
    squares: 4,
    moves: 14,
    effects: [
      { from: 3, to: 9, mirror: true },
      { from: 4, to: 6, mirror: true }
    ]
  },
  {
    id: 'V',
    step: "pll",
    name: "V",
    algorithms: [
      "(R' U R' d') (R' F' R2 U') (R' U R') (F R F)",
    ],
    squares: 4,
    moves: 14,
    effects: [
      { from: 1, to: 9, mirror: true },
      { from: 2, to: 6, mirror: true }
    ]
  },
  {
    id: 'Y',
    step: "pll",
    name: "Y",
    algorithms: [
      "(F R U' R' U' R U R' F') (R U R' U') (R' F R F')",
    ],
    squares: 4,
    moves: 17,
    effects: [
      { from: 1, to: 9, mirror: true },
      { from: 2, to: 4, mirror: true }
    ]
  },
];
