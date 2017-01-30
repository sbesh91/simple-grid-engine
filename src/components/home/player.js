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
			playerOffset: (props.PlayerMargin + props.PlayerSize * 2) / 2,
			dragging: false
		};			
	};
	componentDidMount(){
        if(this.props.Selected){
			this.snap(document.getElementById(this.props.Selected));
		} else {				
			this.snap(document.getElementById("0x0"));
		}
    }
	snap(el){
		if(el){
			const rect = el.getBoundingClientRect();
			this.setState({
				x: rect.left,
				y: rect.top,
				dragging:false
			});
		}
	}
	start = e => {
		let [move,end] = this.evt = EVENTS[e.type==='touchstart'?1:0];		
		this.setState({
			dragging:true
		});
		addEventListener(move, this.move);
		addEventListener(end, this.end);
		this.base.setAttribute('dragging', true);	
		this.offset = {
			x: 0,
			y: 0
		};
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
		
		const x = this.state.x + this.offset.x;
		const y = this.state.y + this.offset.y;

		const xOff = x + this.state.playerOffset;
		const yOff = y + this.state.playerOffset;			 

		this.base.style.pointerEvents = "none";			

		//element to snap player to
		const el = document.elementFromPoint(xOff,yOff);

		if(el.dataset && el.dataset.snap){
			this.snap(el);
		} else {
			this.setState({
				x: this.state.x,
				y: this.state.y,
				dragging: false
			})
		}

		this.base.removeAttribute('dragging');	
		this.base.style.pointerEvents = "auto";											
		
		this.down = this.offset = null;
	};	
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