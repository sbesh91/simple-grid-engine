import { h, Component } from 'preact';
import Players from './players.js';
import Board from './board.js';
import style from './style';

export default class Home extends Component {
	constructor(){
		super();

		this.state = {
			rows: 10,
			cols: 10,
			gridSize: 50,
			playerSize: 30,
			playerMargin: 10,
			board: [],			
			players: []
		};			

		this.state.players = this.buildPlayers(5,this.state.rows,this.state.cols);
		this.state.board = this.buildBoard(this.state.rows,this.state.cols);		
	}
	buildPlayers(count,rows,cols){
		let players = [];

		for(let i = 0; i < count; i++){
			players.push(`${this.getRandomInt(0,rows)}x${this.getRandomInt(0,cols)}`);
		}

		return players;
	}
	buildBoard(rows,cols){
		let board = [];		
		for(let i = 0; i < rows; i++){
			let row = []
			for(let j = 0; j < cols; j++){
				row.push({
					x: j,
					y: i
				});
			}
			board.push(row);
		}
		return board;
	}	
	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
	render() {
		// todo turn player into list of players and give access to all if admin
		// todo give players vision of others and access to only ones provided by admin
		return (
			<div class={style.home}>										
				<Board 
					GridSize={this.state.gridSize}
					Board={this.state.board}/>			
				<Players 
					Players={this.state.players}
					PlayerMargin={this.state.playerMargin}
					PlayerSize={this.state.playerSize}/>
			</div>
		);
	}
}
