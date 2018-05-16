const projects = [
  {
    name: 'Big 2',
    images: ['big21.png', 'big22.png', 'big23.png'],
    github: 'https://github.com/kaaaata/big-2',
    url: null,
    route: 'big2',
    blurb: 'This is an online client I built for the popular Asian card game Big 2, also known as Deuces. It features live 1v1, 1vAI, and AIvAI gameplay. The AI code utilizes a few machine learning algorithms. This project was inspired by my friends, who I grew up playing Big 2 with, and live chess websites such as chess.com and lichess.com.',
    features: [
      'Live 1v1, 1vAI, and AIvAI gameplay',
      'Reinforcement learning script to train AI by playing it against itself (currently 350 games/sec)',
      'Minimax algorithm to determine AI\'s best move',
    ],
    stack: [
      'React/Redux frontend',
      'Django API',
      'Python backend (card logic, AI, and machine learning code)',
      'Sass'
    ],
    demo: {
      'what': 'Gameplay Lifecycle',
      'description': 'In a 1v1 game, how do the React Client, the Django API, and the Python scripts work together? The following pointers walk through the entire lifecycle of a 1v1 game between P1 and P2, detailing the events that happen when a game is created, joined, played, and abandoned.',
      'pointers': [
        {
          event: 'P1 makes a new game',
          actions: [
            'Client pings API to create a new game',
            'New game object is initialized in memory, and returned to client',
            'Game object has a \'life\' property for each player with a positive value. The values keeps decreasing every second, deleting the player when it hits 0. As long as a player is connected to the game, the value is reset to its original positive value.',
            'Client renders a new game screen with \'waiting for player\'',
          ],
        },
        {
          event: 'P2 joins the game',
          actions: [
            'Client pings API to join a specific game',
            'Game object is updated with P2 as a player and randomly generated card hands, is returned to client',
            'Client detects all players have joined, and starts the game',
            'A new local view object is initialized on each players\' client, containing the means to render card graphics onto the screen',
            'Client starts listening to the API for instructions (short polling)',
          ],
        },
        {
          event: 'P1 makes a move (clicks a card, plays a hand, wins the game, etc.)',
          actions: [
            'Client creates a new instruction as an object detailing what P1 did, and sends it to the API',
            'API stores the instruction in memory (clients are constantly polling for new instructions)',
            'Client polls and finds a new instruction',
            'Client parses the instruction into a series of commands, which the game view executes and this causes the cards to move around on the screen',
          ],
        },
        {
          event: 'P2 leaves the game',
          actions: [
            'P2\'s client closes, and calls are no longer being made to the API to keep his \'life\' property positive',
            'P2\'s life property reaches 0, and he has officially abandoned the game',
            'P1\'s client detects that a player is no longer in the game, and his client then shows him a screen saying, the other player has left the game',
            'Note: window.onbeforeunload() and componentWillUnmount() are not always reliable, so a \'life\' mechanic like this is necessary',
          ],
        },
      ],
    },
    nextSteps: [
      'Optimize AI algorithms to improve minimax performance and increase AIvAI reinforcement learning games/sec',
      'Implement a chat feature',
      'Debug spectator mode',
    ],
  },
  {
    name: 'Jelly',
    images: ['jelly1.png', 'jelly2.png', 'jelly3.png'],
    github: 'https://github.com/kaaaata/jelly',
    url: 'https://jellyfishapp.herokuapp.com/',
    route: 'jelly',
    blurb: 'Jelly is a bash terminal clone for the web. Instead of going to youtube.com and using their search bar, simply alias youtube.com to \'yt\', and type \'yt gangnam style\' to instantly search youtube in a new tab.',
    features: [
      'Search any website with a short command',
      'Alias website URLs to create your own commands',
      'Create your own profile of commands and access it from any computer',
      'Import and export entire profiles of commmands in JSON format',
    ],
    stack: [
      'React frontend',
      'Node/Express.js API',
      'Postgres database',
    ],
    demo: {
    },
    nextSteps: [
      'More animations',
    ],
  },
];

export default projects;
