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
    show: function(){
        console.log
    }
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

    //function to check win 
    let checkWin = function(){
        let a = GameBoard.Board
        if(a[0]==1 && a[1]==1 && a[2]==1 || a[3]==1 && a[4]==1 && a[5]==1 || a[6]==1 && a[7]==1 && a[8]==1||
            a[0]==1 && a[3]==1 && a[6]==1 || a[1]==1 && a[4]==1 && a[7]==1 || a[2]==1 && a[5]==1 && a[8]==1||
            a[0]==1 && a[4]==1 && a[8]==1 || a[2]==1 && a[4]==1 && a[6]==1
        ){
            Players[0].score++
            console.log(`${Players[0].name} Wins!!`) 
            
        }else if(a[0]==2 && a[1]==2 && a[2]==2 || a[3]==2 && a[4]==2 && a[5]==2 || a[6]==2 && a[7]==2 && a[8]==2||
                a[0]==2 && a[3]==2 && a[6]==2 || a[1]==2 && a[4]==2 && a[7]==2 || a[2]==2 && a[5]==2 && a[8]==2||
                a[0]==2 && a[4]==2 && a[8]==2 || a[2]==2 && a[4]==2 && a[6]==2
        ){
            Players[1].score++
            console.log(`${Players[1].name} Wins!!`)
        }
    }
    

    return {Players,getActivePlayer,switchPlayer,checkWin,}
}

let updateScreen = function(){
    let game = gameControl()

    let declareWinner = function(){
        const display = document.getElementById('container')
        const plaque = document.createElement('div')
        plaque.classList.add('plaque')
        if(game.Players[0].score ==1){
            plaque.innerText= `${game.Players[0].name} Wins!!`
            display.appendChild(plaque)
        }else if(game.Players[1].score ==1){
            plaque.innerText= `${game.Players[1].name} Wins!!`
            display.appendChild(plaque)
        }
    }   

    let playerTurn = function(){
            let text = document.querySelector('.announcer')
            if(game.getActivePlayer() == game.Players[0]){
                text.innerText = `${game.Players[0].name} 's Turn...`
            }else{
                text.innerText = `${game.Players[1].name} "s Turn...`
            }
    }

    return {declareWinner,playerTurn}

}

//function to get input value and render input value
const clickHandler = function(){
    let game = gameControl()
    let screen = updateScreen()
    let container = document.getElementById('container')
    let area = document.querySelectorAll('.field')
    let reset = document.querySelector('.reset')
    let play = document.querySelector('.play')

    //click event for getting input,checking for valid move and pushing in the array
    let getInput = function(){
        area.forEach((div)=>{
            div.addEventListener('click',function(){  
            let index = div.getAttribute('value') 
            if(GameBoard.Board[index]!==''){
                document.querySelector('.announcer').innerText = 'invalid Move'
                div.innerHTML=''
            }else{
                GameBoard.pushIn(index,game.getActivePlayer().input)
                game.checkWin()
                screen.declareWinner()
                screen.playerTurn()
            }
            })
        })
    }

    //click event for rendering input and switching players
    let renderInput = function(){
        area.forEach((render)=>{
            render.addEventListener('click',function(){
                const tag = document.createElement('p')
                tag.classList.add('tag')
                tag.innerText = game.getActivePlayer().tag
                render.appendChild(tag)
                game.switchPlayer()
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
            game.Players[0].score= 0
            game.Players[1].score= 0    
        })
    }

    //click event for starting the game
    let startGame = function(){
        play.addEventListener('click',function(){
            game.Players[0].name = document.getElementById('player1').value
            game.Players[1].name = document.getElementById('player2').value
            getInput()
            renderInput()
            resetGame()
            screen.playerTurn()
        })
    }

    return{getInput,renderInput,resetGame,startGame}
}

let play = clickHandler()
play.startGame()