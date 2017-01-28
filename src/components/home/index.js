import { h, Component } from 'preact';
import Player from './player.js';
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
			players.push(`${this.getRandomInt(rows,cols)}x${this.getRandomInt(rows,cols)}`);
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
				<div class={style.board}>				
					{
						this.state.board.map(i => (
							<div class={style.row}>
								{
									i.map(j => (
										<div 
											onMouseUp={this.handle}
											data-snap="true"
											id={`${j.x}x${j.y}`}
											class={style.cell}
											style={{
												height:this.state.gridSize,
												width:this.state.gridSize
											}}></div>
									))
								}
							</div>
						))												
					}	
					{
						this.state.players.map(i =>(
							<Player PlayerSize={this.state.playerSize} PlayerMargin={this.state.playerMargin} Selected={i}/>	
						))
					}				
				</div>				
			</div>
		);
	}
}
