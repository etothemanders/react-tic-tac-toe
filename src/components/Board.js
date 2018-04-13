import React from 'react';

import Tile from './Tile';

class Board extends React.Component {
	handleClick = () => {
		console.log('hi');
	};

	renderRow = (row, rowIndex) => {
		return (
      <div className="row" key={rowIndex}>
      	{row.map((tile, itemIndex) => <Tile key={itemIndex} tile={tile} rowIndex={rowIndex} itemIndex={itemIndex} assignOwner={this.props.assignOwner}></Tile>)}
      </div>
    );
	};

	render() {
		return (
      <div className="board">
      	{this.props.board.map((row, rowIndex) => this.renderRow(row, rowIndex))}
      </div>
    );
	}
}

export default Board;
