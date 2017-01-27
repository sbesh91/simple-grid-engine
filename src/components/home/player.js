import { h, Component } from 'preact';
import style from './style';

function coords(e) {
	let t = e.touches && e.touches[0] || e;
	return { x: t.pageX, y: t.pageY };
}

const EVENTS = [['mousemove','mouseup'], ['touchmove','touchend']]

export default class Player extends Component {
	constructor(props){
		super(props);
		this.state = {
			x: 0,
			y: 0,
			playerMargin: props.PlayerMargin,
			playerSize: props.PlayerSize,
			dragging: false
		};
	};
	start = e => {
		let [move,end] = this.evt = EVENTS[e.type==='touchstart'?1:0];		
		this.setState({
			dragging:true
		});
		addEventListener(move, this.move);
		addEventListener(end, this.end);
	};
	move = e => {
		let c = coords(e);
		if (!this.down) {
			this.down = c;
			return;
		}

		this.offset = {
			x: c.x - this.down.x,
			y: c.y - this.down.y
		};
    this.base.style.transform = `translate(${this.offset.x}px, ${this.offset.y}px)`;
  };
  end = e => {
		let [move,end] = this.evt;
		removeEventListener(move, this.move);
		removeEventListener(end, this.end);

		if (this.offset) {
			this.setState({
				x: this.state.x + this.offset.x,
				y: this.state.y + this.offset.y,
				dragging:false
			});
		}
		
		this.down = this.offset = null;
	};
	// this is just for the demo: shows when we have re-rendered:
	componentDidUpdate() {
		this.base.setAttribute('updated', true);
		setTimeout( () => this.base.removeAttribute('updated'), 150);
	}
	render({ }, { x, y }) {
  	return (
    <div class={style.player} 
			style={{
				left: x,
				top: y,
				transform: '',
				height: this.state.playerSize,
				width: this.state.playerSize,
				margin: this.state.playerMargin
			}} onMouseDown={this.start} onTouchStart={this.start}>        
		</div>
    );
  }
}