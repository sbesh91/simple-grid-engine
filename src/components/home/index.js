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
			board: []
		};			
		this.state.board = this.buildBoard(this.state.rows,this.state.cols);		
	};
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
	};
	render() {
		return (
			<div class={style.home}>
				<Player PlayerSize={this.state.playerSize} PlayerMargin={this.state.playerMargin}/>
				<div class={style.board}>
					{
						this.state.board.map(i => (
							<div class={style.row}>
								{
									i.map(j => (
										<div 
											onMouseUp={this.handle}
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
				</div>				
			</div>
		);
	}
}
