let rows = 10;
let cols = 10;
let board = [];
let gridSize = 50;

function init(){
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
};
init();

new Vue({
    el: "#gridBody",
    data: {
        board: board,
        player: {
            x: 0,
            y: 0
        },
        mask: null,
        gridSize: gridSize,
        dragging: false,  
        boundingBox: null,
        currentHover: null 
    },
    mounted(){        
        document.addEventListener('touchstart', this.onStart);
        document.addEventListener('touchmove', this.onMove);
        document.addEventListener('touchend', this.onEnd);

        document.addEventListener('mousedown', this.onStart);
        document.addEventListener('mousemove', this.onMove);
        document.addEventListener('mouseup', this.onEnd);

        this.mask = document.querySelector(".player-mask");
        this.boundingBox = document.querySelector(".grid").getBoundingClientRect();
    },
    methods: {
        onHover(e){
            if(!this.dragging){
                return;
            }
            console.log("hover",e);
            this.currentHover = e;
        },
        onStart(e){      
            if(!e.target.classList.contains("player")){
                return;
            }      

            this.dragging = true;
        },
        onMove(e){
            if(!this.dragging){
                return;
            }   
            const x = e.clientX - this.boundingBox.left - 20;
            const y = e.clientY - this.boundingBox.top - 20;
            this.mask.style["transform"] = `translate(${x}px, ${y}px)`;                            
        },
        onEnd(e){          
            console.log(this.currentHover);
            this.currentHover = null;  
            this.dragging = false;            
            this.mask.style["transform"] = `none`;          
        },
        left(){
            this.move(Math.max(0, this.player.x - 1), this.player.y);
        },
        up(){
            this.move(this.player.x, Math.max(0, this.player.y - 1));
        },
        down(){
            this.move(this.player.x, Math.min(rows-1, this.player.y + 1));
        },
        right(){
            this.move(Math.min(cols-1, this.player.x + 1), this.player.y);
        },
        move(x, y){
            this.player = {
                x: x,
                y: y
            };
        }
    }
});