import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { range, sample } from 'lodash';
import { mq, colors } from './styles';
import {
  graphqlQuery,
  registerSnakeHighScore,
  trackStats
} from './utils/graphql';

const rows = 20;
const cols = 25;
const intervalSpeed = 100;

const snakeCss = css`
  width: fit-content;
  margin: auto;

  .snake_game__container {
    width: fit-content;
    border-left: 1px solid ${colors.grey};
    border-top: 1px solid ${colors.grey};
  
    .snakeRow {
      height: 25px;
    }
  }

  ${mq.phoneAndTablet(`
    display: none;
  `)}
`;

class Snake extends React.Component {
  constructor() {
    super();
    this.state = {
      food: [],
      snake: [[9, 15], [8, 15], [7, 15], [6, 15], [5, 15]],
      isSnakeDead: false,
      score: 5,
      snakeHighScore: '...loading',
      snakeTotalFoodEaten: '...loading'
    };

    this.moveDirection = 'right';
    this.lastMoveDirection = 'right';
    this.moveInterval = null;
  }

  async componentDidMount() {
    const { snakeHighScore } = await graphqlQuery('{ snakeHighScore }');
    this.setState({ snakeHighScore });
    const { snakeTotalFoodEaten } = await graphqlQuery('{ snakeTotalFoodEaten }');
    this.setState({ snakeTotalFoodEaten });
    this.startGame();
  }

  componentWillUnmount() {
    clearInterval(this.moveInterval);
  }

  startGame() {
    this.moveDirection = 'right';
    this.lastMoveDirection = 'right';

    document.onkeydown = (e) => {
      e.preventDefault();
      if ([87, 38].includes(e.keyCode)) { // w, up
        if (this.lastMoveDirection !== 'down') this.moveDirection = 'up';
      } else if ([83, 40].includes(e.keyCode)) { // s, down
        if (this.lastMoveDirection !== 'up') this.moveDirection = 'down';
      } else if ([68, 39].includes(e.keyCode)) { // d, right
        if (this.lastMoveDirection !== 'left') this.moveDirection = 'right';
      } else if ([65, 37].includes(e.keyCode)) { // a, left
        if (this.lastMoveDirection !== 'right') this.moveDirection = 'left';
      }
    };

    this.setState({
      food: [],
      snake: [[9, 15], [8, 15], [7, 15], [6, 15], [5, 15]],
      isSnakeDead: false,
      score: 5
    }, () => {
      this.placeFood();
      this.moveInterval = setInterval(() => {
        this.moveSnake();
      }, intervalSpeed);
    });
  }

  moveSnake() {
    const { snake, score, snakeHighScore, snakeTotalFoodEaten } = this.state;
    const currentHeadX = snake[0][0];
    const currentHeadY = snake[0][1];
    let newHeadX = currentHeadX;
    let newHeadY = currentHeadY;

    switch (this.moveDirection) {
      case 'right':
        newHeadX = currentHeadX + 1 <= cols - 1 ? currentHeadX + 1 : 0;
        this.lastMoveDirection = 'right';
        break;
      case 'left':
        newHeadX = currentHeadX - 1 >= 0 ? currentHeadX - 1 : cols - 1;
        this.lastMoveDirection = 'left';
        break;
      case 'up':
        newHeadY = currentHeadY - 1 >= 0 ? currentHeadY - 1 : rows - 1;
        this.lastMoveDirection = 'up';
        break;
      case 'down':
        newHeadY = currentHeadY + 1 <= rows - 1 ? currentHeadY + 1 : 0;
        this.lastMoveDirection = 'down';
        break;
      default:
        return;
    }

    const didSnakeEatFood = this.isFoodOnCell(newHeadX, newHeadY);
    const didSnakeDie = this.isSnakeOnCell(newHeadX, newHeadY);
    const restOfSnake = snake.slice(
      0,
      snake.length - (didSnakeEatFood ? 0 : 1)
    );

    if (didSnakeDie) {
      document.onkeydown = null;
      this.setState({ isSnakeDead: true });
      clearInterval(this.moveInterval);
      registerSnakeHighScore(score);
      if (score > snakeHighScore) {
        this.setState({ snakeHighScore: score });
      }
      return;
    }

    this.setState({
      snake: [
        [newHeadX, newHeadY],
        ...restOfSnake
      ]
    }, () => {
      if (didSnakeEatFood) {
        this.setState({
          score: score + 1,
          snakeTotalFoodEaten: typeof snakeTotalFoodEaten === 'number'
            ? snakeTotalFoodEaten + 1
            : snakeTotalFoodEaten
        });
        this.placeFood();
        trackStats('snake_ate_food');
      }
    });
  }

  isSnakeOnCell(x, y) {
    const { snake } = this.state;

    for (let i = 0; i < snake.length; i++) {
      if (snake[i][0] === x && snake[i][1] === y) {
        return true;
      }
    }

    return false;
  }

  isFoodOnCell(x, y) {
    return x === this.state.food[0] && y === this.state.food[1];
  }

  placeFood() {
    if (this.state.snake.length < rows * cols) {
      const validCells = [];

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (!this.isSnakeOnCell(x, y)) {
            validCells.push([x, y]);
          }
        }
      }

      this.setState({ food: sample(validCells) });
    }
  }

  getCellColor(x, y) {
    if (this.isFoodOnCell(x, y)) {
      return colors.green;
    } else if (this.isSnakeOnCell(x, y)) {
      return this.state.isSnakeDead ? colors.red : colors.yellow;
    }

    return colors.black;
  }

  render() {
    return (
      <>
        <div
          css={css`
            display: none;

            ${mq.phoneAndTablet(`
              display: block;
            `)}
          `}
        >
          Please increase your browser width to play Snake! ʘ‿ʘ
        </div>
        <div css={snakeCss}>
          <div className='snake_game__container'>
            {range(rows).map(y => (
              <div key={y} className='snakeRow'>
                {range(25).map(x => (
                  <div
                    key={x}
                    css={css`
                      width: 25px;
                      height: 25px;
                      border-bottom: 1px solid ${colors.grey};
                      border-right: 1px solid ${colors.grey};
                      display: inline-block;
                      background: ${this.getCellColor(x, y)};
                    `}
                  />
                ))}
              </div>
            ))}
          </div>
          <div>
            <span>Score: {this.state.score}</span>
            &nbsp;|&nbsp;
            <span>Global High Score: {this.state.snakeHighScore}</span>
            &nbsp;|&nbsp;
            <span>Global Food Eaten: {this.state.snakeTotalFoodEaten}</span>
            {this.state.isSnakeDead && (
              <span>&nbsp;|&nbsp;
                <span
                  onClick={() => this.startGame()}
                  css={css`cursor: pointer;`}
                >
                  Play Again
                </span>
              </span>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Snake;
