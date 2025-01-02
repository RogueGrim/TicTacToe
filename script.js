var GameBoard = {
    Board: ['','','','','','','','',''],
    pushIn: function(){
        this.Board.splice(this.index,1,this.input)
    },
    setInput: function(input,index){
        this.input = input
        this.index = index
    },
    show: function(){
        console.log(this.Board);
    },
}

function checkWin(){
    let a = GameBoard.Board
    if(a[0]==a[1]=='1' && a[1]==a[2]=='1'||a[3]==a[4]=='1' && a[4]==a[5]=='1'||a[6]==a[7]=='1' && a[7]==a[8]=='1'||
        a[0]==a[3]=='1' && a[3]==a[6]=='1'||a[1]==a[4]=='1'&& a[4]==a[7]=='1'||a[2]==a[5]=='1' && a[5]==a[8]=='1'||
        a[0]==a[4]=='1' && a[4]==a[8]=='1'||a[2]==a[4]=='1'&& a[4]==a[6]=='1'
    ){
        GameController.Players[0].score ++
        console.log(GameController.Players[0]) 
        
    }else if(a[0]==a[1]=='2' && a[1]==a[2]=='2'||a[3]==a[4]=='2' && a[4]==a[5]=='2'||a[6]==a[7]=='2' && a[7]==a[8]=='2'||
            a[0]==a[3]=='2' && a[3]==a[6]=='2'||a[1]==a[4]=='2' && a[4]==a[7]=='2'||a[2]==a[5]=='2' && a[5]==a[8]=='2'||
            a[0]==a[4]=='2' && a[4]==a[8]=='2'||a[2]==a[4]=='2'&& a[4]==a[6]=='2'
    ){
        GameController.Players[1].score ++
        console.log(GameController.Players[1])
    }
}

function GameController(){

    let Players = [
        {
            name: 'Player1',
            input: 1,
            score: '',
        },
        {
            name: 'Player2',
            input: 2,
            score: '',
        },
    ]

    let activePlayer = Players[0]

    const switchPlayer = ()=>{
        activePlayer = activePlayer === Players[0] ? Players[1] : Players[0]
    }

    const getActivePlayer = ()=> activePlayer

    const playRound = ()=>{
        let field = prompt('Enter Field')
        GameBoard.setInput(getActivePlayer().input,field)
        GameBoard.pushIn()
        switchPlayer()    
        checkWin()
    }

//for(i=0;i<5;i++){
    //playRound()
//}

    
}

GameController()