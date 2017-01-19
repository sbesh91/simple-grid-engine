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
        gridSize: gridSize
    },
    mounted(){
        const target = document.querySelector(".player");
        target.addEventListener('touchstart', this.onStart);
        target.addEventListener('touchmove', this.onMove);
        target.addEventListener('touchend', this.onEnd);

        target.addEventListener('mousedown', this.onStart);
        target.addEventListener('mousemove', this.onMove);
        target.addEventListener('mouseup', this.onEnd);
    },
    methods: {
        onStart(e){
            console.log(e);
        },
        onMove(e){
            console.log(e);
        },
        onEnd(e){
            console.log(e);
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