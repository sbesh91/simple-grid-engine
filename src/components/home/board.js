import { h, Component } from 'preact';
import style from './style';

export default class Board extends Component{
    constructor(props){
        super(props);

        this.state = {
            board: props.Board,
            gridSize: props.GridSize
        };
    };    

    render(){
        return (
            <div class={style.board}>				
                {
                    this.state.board.map(i => (
                        <div class={style.row}>
                            {
                                i.map(j => (
                                    <div                                         
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
            </div>	
        );
    }
}