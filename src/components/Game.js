import React from 'react';

import Board from './Board';

class Game extends React.Component {
	state = {
		board: [],
		currentPlayer: 'x',
		winner: null,
	};

	drawBoard = () => {
		let board = [];

		for (let i=0; i < 3; i++) {
			let row = [];

			for (let j=0; j < 3; j++) {
				let tile = {
					owner: false,
				};
				row.push(tile);
			}
			board.push(row);
		}

		this.setState({ board });
	};

	startGame = () => {
		this.drawBoard();
	};

	checkHWinner = () => {
		const board = this.state.board;
		for (let i=0; i < board.length; i++) {
			const row = board[i];

			let owners = {};

			for (let j=0; j < row.length; j++) {
				const tile = row[j];
				if (tile.owner) {
					owners[tile.owner] = owners[tile.owner] + 1 || 1;
				}
			}

			// {}, {'x': 1, 'y', 2}, { 'x': 1, '-': 2 }
			if (Object.keys(owners).length === 1 && owners[this.state.currentPlayer] === 3) {
				return true;
			}
		}
		return false;
	};

	checkforVWinner = () => {
		const board = this.state.board;

		for (let i=0; i < board.length; i++) { // iterating columns
			let owners = {};

			for (let j=0; j < board.length; j++) {
				const tile = board[j][i];

				if (tile.owner) {
					owners[tile.owner] = owners[tile.owner] + 1 || 1;
				}
			}

			if (Object.keys(owners).length === 1 && owners[this.state.currentPlayer] === 3) {
				return true;
			}
			
		}

		return false;

	};

	checkDWinner = () => {
		const board = this.state.board;

		// check diagonal 1
		let owners = {};

		for (let i=0; i < board.length; i++) {
			const tile = board[i][i];

			if (tile.owner) {
				owners[tile.owner] = owners[tile.owner] + 1 || 1;
			}
		}

		if (Object.keys(owners).length === 1 && owners[this.state.currentPlayer] === 3) {
			return true;
		}

		// check diagonal 2
		owners = {};

		for (let i=0, j=2; i < board.length && j > -1; i++, j--) {
			const tile = board[i][j];

			if (tile.owner) {
				owners[tile.owner] = owners[tile.owner] + 1 || 1;
			}
		}

		if (Object.keys(owners).length === 1 && owners[this.state.currentPlayer] === 3) {
			return true;
		}

		// no diagonal winner
		return false;
	};

	checkForWinner = () => {
		// 1. check for horizontal winner
		const hwinner = this.checkHWinner();
		// 2. check for vertical winner
		const vwinner = this.checkforVWinner();
		// 3. check for diagonal winner
		const dwinner = this.checkDWinner();

		if (hwinner || vwinner || dwinner) {
			return true;
		} else {
			return null;
		}
	};

	assignOwner = ({ rowIndex, itemIndex }) => {
		console.log(rowIndex, itemIndex);
		// 1. update the owner for the tile to the current player
		const board = [...this.state.board];
		board[rowIndex][itemIndex]['owner'] = this.state.currentPlayer;
		const nextPlayer = this.state.currentPlayer === 'x' ? 'o' : 'x';
		// 2. check for winner
		const isWinner = this.checkForWinner();
		let winnersName = null;
		if (isWinner) {
			winnersName = this.state.currentPlayer;
		}
		// 3. set state
		this.setState({ board, currentPlayer: nextPlayer, winner: winnersName });
	};

	render() {
		return (
      <div className="game">
      	<h2>current player: {this.state.currentPlayer}</h2>
      	<h2>winner: {this.state.winner}</h2>
	      <button onClick={this.startGame}>Start Game</button>
	      <Board board={this.state.board} assignOwner={this.assignOwner}></Board>
      </div>
    );
	}
}

export default Game;
