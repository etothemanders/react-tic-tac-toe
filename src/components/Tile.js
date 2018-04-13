import React from 'react';

class Tile extends React.Component {
	handleClick = () => {
		// console.log(this.props.rowIndex, this.props.itemIndex);
		const { rowIndex, itemIndex } = this.props;
		this.props.assignOwner({rowIndex, itemIndex});
	};

	render() {
		return (
			<div className="tile" onClick={this.handleClick}>{this.props.tile.owner}
			</div>
    );
	}
}

export default Tile;
