import { h, Component } from 'preact';
import Player from './player.js';
import style from './style';

export default class Players extends Component{
    constructor(props){
        super(props);

        this.state = {
            players: props.Players,
            playerSize: props.PlayerSize,
            playerMargin: props.PlayerMargin
        }
    };

    render(){
        return(
            <div>
                {
                    this.state.players.map(i =>(
                        <Player PlayerSize={this.state.playerSize} 
                                PlayerMargin={this.state.playerMargin} 
                                Selected={i}/>	
                    ))		
                }
            </div>            
        );			   
    };
}