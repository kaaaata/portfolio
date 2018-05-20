const projects = [
  {
    name: 'Big 2',
    images: ['big21.png', 'big22.png', 'big23.png'],
    github: 'https://github.com/kaaaata/big-2',
    url: null,
    route: 'big2',
    blurb: 'This is an online client I built for the popular Asian card game Big 2, also known as Deuces. It features live 1v1, 1vAI, and AIvAI gameplay. The AI logic utilizes a fusion of minimax, reinforcement learning optimized parameters, and hard coded logic. This project was inspired by my friends, with whom I grew up playing Big 2 with, and live chess websites such as chess.com and lichess.com.',
    features: [
      'Live 1v1, 1vAI, and AIvAI gameplay',
      'Reinforcement learning script to train AI by playing it against itself (currently 350 games/sec)',
      'Minimax algorithm to determine AI\'s best move',
    ],
    technologies: [
      'React/Redux frontend',
      'Django API',
      'Python backend (card logic, AI, and machine learning code)',
      'Sass'
    ],
    details: {
      'what': 'Gameplay Lifecycle',
      'description': 'In a 1v1 game, how do the React Client, the Django API, and the Python scripts work together? The following walks through the entire lifecycle of a 1v1 game between P1 and P2, detailing what happens when a game is created, joined, played, and abandoned.',
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
    technologies: [
      'React frontend',
      'Node/Express.js API',
      'Postgres database',
    ],
    details: {
      'what': 'Demo',
      'description': 'Below is a brief guide on how Jelly works.',
      'pointers': [
        {
          event: 'User creates an alias for a website\'s URL',
          actions: [
            'Command object is created and stored in Postgres database',
            'React client fetches and displays all user\'s commands, saving information in state',
          ],
        },
        {
          event: 'User enters an alias into the terminal',
          actions: [
            'React client generates a query string composed of the alias\' URL and the search string (if any)',
            'Using JavaScript\'s window.open(), a new tab or window is opened with the query string as the destination URL',
            'Since nearly all searchable websites can use the same URL query string pattern, Jelly works on nearly every website (try it!)',
          ],
        },
        {
          event: 'User exports their commands into JSON format',
          actions: [
            'All the user\'s commands get JSON.stringified and displayed to the user in an alert() popup',
            'The stringified profile of commands can be imported and used instantly by any other user'
          ],
        },
      ],
    },
    nextSteps: [
      'More animations',
    ],
  },
  {
    name: 'Day Logger',
    images: ['day1.png', 'day2.png', 'day3.png'],
    github: 'https://github.com/kaaaata/day-logger',
    url: 'http://day-logger.herokuapp.com/',
    route: 'day',
    blurb: 'This is a web app for users to log what they did each day, alongside ratings for happiness and productivity. The idea is to create an interface for people to visualize how happy and productive they are across a stretch of time.',
    features: [
      'Create your own calendar with customizable day names',
      'Enter activities into your calendar with ratings for happiness and productivity',
      'Every activity and calendar day will show a different emoji depending on how happy and productive you were',
      'View statistics like pie charts and scatterplots to see trends and patterns',
    ],
    technologies: [
      'React/Redux frontend',
      'Node/Express.js API',
      'Postgres database',
    ],
    details: {
      'what': 'Demo',
      'description': 'Below is a brief guide on how Day Logger (forgive the name) works.',
      'pointers': [
        {
          event: 'User creates a new day with some new activities',
          actions: [
            'New day object is created in Redux',
            'New activity objects are created in Redux and assigned a property representing it\'s day',
            'React view updates emojis for days and activities dynamically depending on happiness and productivity levels',
            'Statistical variables are updated in Redux',
          ],
        },
        {
          event: 'User presses the save button',
          actions: [
            'All days and activities in the Redux store are saved into the Postgres database',
          ],
        },
        {
          event: 'User visits statistics page',
          actions: [
            'Statistical variables in Redux store have already been calculated',
            'Chart.js is used to display statistical data in pie charts and scatterplots',
          ],
        },
      ],
    },
    nextSteps: [
      'More animations',
      'More analytics features',
    ],
  },
  {
    name: 'Quikker',
    images: ['quikker.jpg'],
    github: 'https://github.com/kaaaata/quikker',
    url: null,
    route: 'quikker',
    blurb: 'Quikker is a clone of Uber\'s backend that I built with three of my fellow engineers. My responsibility was to build the matching microservice API, which receives available passenger/driver data and creates optimal matches.',
    features: [
      'Use Node/Express.js API to receive available passenger/driver data and store in queues, preparing them for matching',
      'Create 5000 unique matches per second, removing the passenger/driver from their queues and inserting the match into a Postgres database table',
      'Successfully handle working with large data sets (10+ million rows of data)',
      'Achieve 1000-2000 RPM on the server',
    ],
    technologies: [
      'Node/Express.js API',
      'Postgres database',
      'New Relic',
      'Siege',
    ],
    details: {
      'what': 'Microservice Architecture',
      'description': 'The below pointers flesh out exactly what happens in this matching microservice from start to finish.',
      'pointers': [
        {
          event: 'Available passengers/drivers data come in from other microservices',
          actions: [
            'Passengers data is stored in a queue',
            'Drivers data is stored in a nested array data structure representing a zip-code-like geocoordinate system, each element of which is a queue',
          ],
        },
        {
          event: 'The API runs a matching algorithm on a loop',
          actions: [
            '5000 passenger-driver matches are generated at one time',
            'For every passenger, the algorithm fetches the nearest driver (who has been waiting the longest time) in the same geocoordinate as the passenger',
            'If there are no drivers there, an expanding-radius search technique is used to find the most nearest driver',
            'Passengers and drivers are removed from their respective queues, and when 5000 matches are created, they are inserted into a Postgres database table',
          ],
        },
        {
          event: 'Trips are constantly being updated',
          actions: [
            'Whenever a trip is updated (start, in progress, end, etc.), data is sent to the API',
            'API creates a Postgres query to update the appropriate row of data in the trips table',
          ],
        },
      ],
    },
    nextSteps: [
      'Deploy with AWS and Docker',
      'Improve matching algorithm (last I heard even Uber itself was having a hard time with this algorithm)',
      'Move passenger/driver queues from memory to AWS',
      'Improve Mocha test coverage',
    ],
  },
];

export default projects;
