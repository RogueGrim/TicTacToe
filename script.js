let GameBoard = {

    //array for holding the inputs
    Board: ['','','','','','','','',''],

    //function for pushing the inputs into the array 
    pushIn: function(index,input){
        this.Board.splice(index,1,input)
    },
    //function to reset the array
    resetBoard: function(){
        this.Board = ['','','','','','','','','']
        console.log(this.Board)
    },
}


let gameControl = function(){

    //object holding players
    let Players  = [
        {
            name: 'Player 1',
            input: 1,
            tag:'X',
            score:0
        },
        {
            name: 'Player 2',
            input: 2,
            tag:'O',
            score:0
        },
    ]
    let currentPlayer = Players[0]

    //function for changing the varaible to the next player
    let switchPlayer = function(){
        currentPlayer = currentPlayer === Players[1] ? Players[0] : Players[1]
    }

    let getActivePlayer = ()=> currentPlayer;

    let gameover = false

    let getGameStatus = ()=> gameover

    //function to check win 
    let checkWin = function(){

        let a = GameBoard.Board

        if(a[0]==1 && a[1]==1 && a[2]==1 || a[3]==1 && a[4]==1 && a[5]==1 || a[6]==1 && a[7]==1 && a[8]==1||
            a[0]==1 && a[3]==1 && a[6]==1 || a[1]==1 && a[4]==1 && a[7]==1 || a[2]==1 && a[5]==1 && a[8]==1||
            a[0]==1 && a[4]==1 && a[8]==1 || a[2]==1 && a[4]==1 && a[6]==1
        ){
            Players[0].score++
            gameover = true
            console.log(`${Players[0].name} Wins!!`)
            
        }else if(a[0]==2 && a[1]==2 && a[2]==2 || a[3]==2 && a[4]==2 && a[5]==2 || a[6]==2 && a[7]==2 && a[8]==2||
                a[0]==2 && a[3]==2 && a[6]==2 || a[1]==2 && a[4]==2 && a[7]==2 || a[2]==2 && a[5]==2 && a[8]==2||
                a[0]==2 && a[4]==2 && a[8]==2 || a[2]==2 && a[4]==2 && a[6]==2
        ){
            Players[1].score++
            gameover = true
            console.log(`${Players[1].name} Wins!!`)

        }else if(!a.includes('',0)){

            console.log('Its a Tie')
            gameover = true
        }
    }
    let playround = function(index){
        let input = currentPlayer.input
        GameBoard.pushIn(index,input)
        console.log(GameBoard.Board)
        checkWin()
        switchPlayer()
    }

    return {Players,getActivePlayer,switchPlayer,checkWin,playround,getGameStatus}
}

let updateScreen = function(){

    const game = gameControl()

    //declaring winner at the end of the game
    let declareWinner = function(){
        const display = document.getElementById('container')
        const plaque = document.createElement('div')
        plaque.classList.add('plaque')
        if(game.Players[0].score == 1){
            plaque.innerText= `${game.Players[0].name} Wins!!`
            display.appendChild(plaque)
        }else if(game.Players[1].score == 1){
            plaque.innerText= `${game.Players[1].name} Wins!!`
            display.appendChild(plaque)
        }else if(!GameBoard.Board.includes('',0)){
            plaque.innerText = 'Its a Tie'
            display.appendChild(plaque)
        }
        
    }

    //show the players turn 
    function playerTurn(){
        if(game.Players[0].score == 0 || game.Players[1].score == 0){
        const text = document.querySelector('.announcer')
        let activePlayer = game.getActivePlayer()
        text.textContent = `${activePlayer.name} 's Turn...`
        }else if(game.Players[0].score == 1 || game.Players[1].score == 1){
            const text = document.querySelector('.announcer')
            text.innerText = 'Game Over'
        }
    }

    //function to get input value and render input value
    function clickHandler(){

    let container = document.getElementById('container')        
    let area = document.querySelectorAll('.field')
    let reset = document.querySelector('.reset')
    let play = document.querySelector('.play')
        
            //click event for getting input,checking for valid move
            let getInput = function(){
                area.forEach((div)=>{
                    div.addEventListener('click',function(){ 
                        let index =  div.getAttribute('value')
                    if(GameBoard.Board[index]!==''){
                        document.querySelector('.announcer').innerText = 'Invalid Move'
                    }else{
                        const tag = document.createElement('p')
                        tag.classList.add('tag')
                        tag.innerText = game.getActivePlayer().tag
                        div.appendChild(tag)

                        game.playround(index)
                        declareWinner()
                        playerTurn()
                    }

                    })
                })
            }

            //click event for reseting the game
            let resetGame = function(){
                reset.addEventListener('click',function(){
                    GameBoard.resetBoard()
                    container.removeChild(container.lastChild)
                    area.forEach((remove)=>{
                        remove.innerHTML=''
                    })
                    game.Players[0].score = 0
                    game.Players[1].score = 0  
                    const text = document.querySelector('.announcer')
                    text.innerText = 'Enter Name And Click Play...'
                })
            }

            //click event for starting the game
            let playGame = function(){
                play.addEventListener('click',function(){
                    game.Players[0].name = document.getElementById('player1').value
                    game.Players[1].name = document.getElementById('player2').value
                    getInput()
                    playerTurn()
                    
                })
            }
        playGame()
        resetGame()
        
    }
    clickHandler()
   
}
updateScreen()
