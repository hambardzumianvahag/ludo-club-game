const playBtn     = document.querySelector('.playBtn')
const container   = document.querySelector('.container')
const finalScore  = document.querySelector('.finalScore')

let blankDiv1 =document.createElement('div')
let blankDiv2 =document.createElement('div')
let player1 = document.createElement('div')
let player2 = document.createElement('div')

let player1Action = document.createElement('div')
let player2Action = document.createElement('div')

player1Action.classList.add('player1Action')
player2Action.classList.add('player2Action')
player1.classList.add('player1')
player2.classList.add('player2')
blankDiv1.classList.add('blankDiv')
blankDiv2.classList.add('blankDiv')


container.before(player2Action)
container.after(player1Action)

const STEP_SIZE = 50
const START_X1 = -2 * STEP_SIZE
const START_Y1 = 12 * STEP_SIZE
const START_X2 = 0
const START_Y2 = 0

// some dynamic styles

blankDiv1.style.width = `${STEP_SIZE * 3}px`
blankDiv1.style.height = `${STEP_SIZE * 3}px`
blankDiv2.style.height = `${STEP_SIZE * 3}px`
blankDiv2.style.width = `${STEP_SIZE * 3}px`
container.style.maxWidth = `${STEP_SIZE * 15 +3 }px`

// creating a board

function buildBoard(startX, startY, moves, step = STEP_SIZE) {
    let x = startX
    let y = startY
    const positions = []
    positions.push({ x, y })

    for (const move of moves) {
        for (let i = 0; i < move.time; i++) {
            if (move.x === -1 && move.y === -1 || move.x === 1 && move.y === 1) {
                y += move.y * step;
                positions.push({ x, y });
                x += move.x * step;
                positions.push({ x, y });
            } else if(move.x === 1 && move.y === -1 || move.x === -1 && move.y === 1){
                x += move.x * step;
                positions.push({ x, y });
                y += move.y * step;
                positions.push({ x, y });
            } else {
                // Normal move
                x += move.x * step;
                y += move.y * step;
                positions.push({ x, y });
            }
        }
    }
    return positions.map((position)=> `translate(${position.x}px, ${position.y}px)`)
}

// data for player 1
const player1BoardData = [
    { x: 0,  y: -1, time: 4 },
    { x: -1, y: -1, time: 1 },
    { x: -1, y:  0, time: 5 },
    { x:  0, y: -1, time: 2 },
    { x:  1, y:  0, time: 5 },
    { x:  1, y: -1, time: 1 },
    { x:  0, y: -1, time: 5 },
    { x:  1, y:  0, time: 2 },
    { x:  0, y:  1, time: 5 },
    { x:  1, y:  1, time: 1 },
    { x:  1, y:  0, time: 5 },
    { x:  0, y:  1, time: 2 },
    { x: -1, y:  0, time: 5 },
    { x: -1, y:  1, time: 1 },
    { x:  0, y:  1, time: 5 },
    { x: -1, y:  0, time: 1 },
    { x:  0, y: -1, time: 6 },
];

// data for player 2
const player2BoardData = [
    { x: 0,  y:  1, time: 4 },
    { x: 1,  y:  1, time: 1 },
    { x: 1,  y:  0, time: 5 },
    { x: 0,  y:  1, time: 2 },
    { x: -1, y:  0, time: 5 },
    { x: -1, y:  1, time: 1 },
    { x: 0,  y:  1, time: 5 },
    { x: -1, y:  0, time: 2 },
    { x:  0, y: -1, time: 5 },
    { x: -1, y: -1, time: 1 },
    { x: -1, y:  0, time: 5 },
    { x:  0, y: -1, time: 2 },
    { x:  1, y:  0, time: 5 },
    { x:  1, y: -1, time: 1 },
    { x:  0, y: -1, time: 5 },
    { x:  1, y:  0, time: 1 },
    { x:  0, y:  1, time: 6 },
];


const board1 = buildBoard(START_X1, START_Y1, player1BoardData)
const board2 = buildBoard(START_X2, START_Y2, player2BoardData)

// !!!!
const indexesP1 = [28, 55, 56, 57, 58, 59];
const indexesP2 = [0, 55, 56, 57, 58, 59];

// !!!!!
const colorP1 = '#0069c7';
const colorP2 = '#d91f18';


playBtn.addEventListener('click', () => {
    container.style.display = 'flex';
    playBtn.style.display = 'none';

    // store
    for (let i = 1; i <= 2; i++) {
        let startDiv = document.createElement('div')
        startDiv.classList.add('startDiv', `store${i}`)
        startDiv.style.width = `${STEP_SIZE * 6}px`
        startDiv.style.height = `${STEP_SIZE * 6}px`
        let storeDiv = document.createElement('div')
        storeDiv.classList.add('storeDiv')
        startDiv.append(storeDiv)
        for (let j = 1; j <= 4; j++){
            let p = document.createElement('img')
            p.src = 'https://cdn-icons-png.flaticon.com/512/106/106175.png'
            p.classList.add('eachElement', `p${j}`)
            p.id = j
            storeDiv.append(p);
        }
        if (i === 1){
          player1.prepend(startDiv)
          storeDiv.style.color = colorP1
        } 
        else {
          storeDiv.style.color = colorP2
          player2.append(startDiv)
        }
      }

    // cube
    for (let i = 1; i <= 2; i++){
        let cube = document.createElement('div')
        cube.classList.add('cube', `cube-${i}`)
        cube.innerHTML = 1
        if(i === 1) player1Action.append(cube)
        else player2Action.append(cube)
    }

    // throw btn
    let clickBtn = document.createElement('button')
    clickBtn.innerHTML = 'throw'
    clickBtn.classList.add('throwBtn','firstPlayerMove');
    player1Action.append(clickBtn)

    // move board
    let moveSection = document.createElement('div');
    moveSection.classList.add('moveSection')
    moveSection.style.left = `${STEP_SIZE*2}px`

    // Helper to fill squares
    function FillSquare(div, index, arr, color) {
        if (arr.includes(index)) {
            div.style.background = color;
        }
        // specific case
        if(index  === 28){
            div.style.background = colorP1
            div.innerHTML = "<span class='starSymbol'>&#9734;</span>"
        }
        if(index === 26){
          div.innerHTML = "<span class='arrowSymbol arrowUp'>&#708;</span>"
        }
        if(index === 54){
          div.innerHTML = "<span class='arrowSymbol arrowDown'>&#709;</span>"
        }
    }

    for (let j = 0; j < board2.length; j++){
        let moveDiv = document.createElement('div');
        moveDiv.style.transform = board2[j];
        moveDiv.classList.add(`${j}`, 'board2');
        FillSquare(moveDiv, j, indexesP2, colorP2);
        if(j === 5 || j === 19 || j === 33 || j === 47){
          moveDiv.style.border = 'none'
        }
        if(j === 0) {
          moveDiv.style.border = 'none'
        }
        if (j === board2.length - 1) {
            moveDiv.style.borderBottom = 'none'
            moveDiv.style.borderLeft = `${STEP_SIZE*1.5}px solid transparent`
            moveDiv.style.borderRight = `${STEP_SIZE*1.5}px solid transparent`
            moveDiv.style.borderTop = `${STEP_SIZE*1.5}px solid ${colorP2}`
            moveDiv.style.marginTop = `${STEP_SIZE/2}px`
        }
        moveSection.append(moveDiv);
    }
    for (let j = 0; j < board1.length; j++){
        let moveDiv = document.createElement('div');
        moveDiv.style.transform = board1[j]
        moveDiv.classList.add(`${j}`, 'board1')
        FillSquare(moveDiv, j, indexesP1, colorP1);
        if (j === board1.length - 1) {
          moveDiv.style.borderTop = 'none'
          moveDiv.style.borderLeft = `${STEP_SIZE*1.5}px solid transparent`
          moveDiv.style.borderRight = `${STEP_SIZE*1.5}px solid transparent`
          moveDiv.style.borderBottom = `${STEP_SIZE*1.5}px solid ${colorP1}`
          moveDiv.style.marginBottom = `${STEP_SIZE/2+1}px`
        }
        moveSection.append(moveDiv)
    }
    container.prepend(player2)
    container.append(moveSection)
    container.append(player1)

    player2.before(blankDiv1)
    player1.after(blankDiv2)

    let turn = 'first'
    let score1 = 0
    let score2 = 0
    let active1 = []
    let active2 = []
    let positions1 = []
    let positions2 = []
    let turnOf1 = false
    let turnOf2 = false

    // checking winner
    function checkWinner() {
        if(score1 === 4) {
            finalScore.innerHTML = 'Player 1 Wins!'
            container.style.display = 'none'
        } else if(score2 === 4) {
            finalScore.innerHTML = 'Player 2 Wins!'
            container.style.display = 'none'
        }
    }

    // move functionality
    async function movePiece(i, steps, activeArr, positionsArr, currentTurn) {
        // Decide which board
        const board = (currentTurn === 'first') ? board1 : board2
        const maxIndex = board.length - 1

        let currentIndex = positionsArr[i]
        let targetIndex = currentIndex + steps

        if (targetIndex > maxIndex) {
            return false
        }
        // need to testing
        if(currentIndex <= 5 && targetIndex >= 5 || currentIndex <= 19 && targetIndex >= 19 || currentIndex <= 33 && targetIndex >= 33 || currentIndex <= 47 && targetIndex >= 47){
          steps++
        }

        for (let stepIndex = 1; stepIndex <= steps; stepIndex++) {
            currentIndex++
            positionsArr[i] = currentIndex

            activeArr[i].style.transform = board[currentIndex]

            await new Promise(resolve => setTimeout(resolve, 300))
        }

        if (positionsArr[i] === maxIndex) {
            activeArr[i].remove();
            activeArr.splice(i, 1);
            positionsArr.splice(i, 1);

            if (currentTurn === 'first') {
                score1++;
            } else {
                score2++;
            }
        }
        return true;
    }

    // remove duplicate squares
    let arr = [];
    const divs = [...document.querySelectorAll('.moveSection div')];
    for (let i = 0; i < divs.length; i++){
        if(!arr.includes(divs[i].style.transform)){
            arr.push(divs[i].style.transform);
        } else {
            divs[i].remove();
        }
    }

    clickBtn.addEventListener('click', () => {
        let cube1 = document.querySelector('.cube-1');
        let cube2 = document.querySelector('.cube-2');

        let num = Math.floor(Math.random() * 6) + 1;
        checkWinner();

        /////// player 1 //////////

        if (turn === 'first') {
            cube1.innerHTML = num;
            cube2.innerHTML = 1;
            turnOf1 = true;

            // If no active element and num < 6, pass
            if(active1.length === 0 && num < 6) {
                turn = 'second';
                clickBtn.remove()
                clickBtn.classList.remove('firstPlayerMove')
                clickBtn.classList.add('secondPlayerMove')
                player2Action.append(clickBtn)
                turnOf1 = false;
                return;
            }

            if (num === 6) {
                clickBtn.style.display = 'none';
                const actionDiv = document.createElement('div');
                actionDiv.classList.add('actionDiv','action-1');

                let store1 = document.querySelector('.store1 .storeDiv');
                let storePieces = document.querySelectorAll('.store1 img');
                let total1 = active1.length + score1;

                if (total1 < 4) {
                    // create new element btn
                    const newElemBtn = document.createElement('button');
                    newElemBtn.innerHTML = 'Add next element';
                    newElemBtn.addEventListener('click', () => {
                        actionDiv.remove();
                        turnOf1 = false;
                        let nextNum = active1.length + score1 + 1;
                        for (let item of storePieces) {
                            if (item.id == nextNum) {
                                store1.removeChild(item)
                                break
                            }
                        }
                        let newElement = document.createElement('img')
                        newElement.src = 'https://cdn-icons-png.flaticon.com/512/106/106175.png' 
                        newElement.classList.add('element-first', 'eachElement')
                        newElement.id = nextNum
                        newElement.style.top = `${(nextNum - 1)*10 - 18}px`

                        let firstSquare = document.querySelector('.moveSection div:nth-child(1)');
                        firstSquare.classList.add('firstDiv');
                        firstSquare.append(newElement);

                        active1.push(newElement)
                        positions1.push(0)
                        newElement.style.transform = board1[0]

                        newElement.addEventListener('click', async (ev) => {
                          let index = active1.findIndex((item)=>item.innerHTML === ev.target.id)
                          if(turnOf1){
                            document.querySelector('.actionDiv')?.remove();
                                let success = await movePiece(
                                    index,
                                    parseInt(cube1.innerHTML),
                                    active1,
                                    positions1,
                                    'first'
                                );
                                clickBtn.style.display = 'block';
                                if(success) {
                                    checkWinner();
                                } else {
                                  turnOf1 = false;
                                } 
                                if(parseInt(cube1.innerHTML) < 6){
                                    turn = 'second';
                                    clickBtn.remove()
                                    clickBtn.classList.remove('firstPlayerMove')
                                    clickBtn.classList.add('secondPlayerMove')
                                    player2Action.append(clickBtn)
                                    turnOf1 = false;
                                }
                            }
                        turnOf1 = false;
                        actionDiv.remove();
                        });
                        actionDiv.remove();
                        clickBtn.style.display = 'block';
                    });
                    actionDiv.appendChild(newElemBtn);
                }
                // move if active element exists
                if (active1.length > 0) {
                    let helperText = document.createElement('p');
                    helperText.innerHTML = 'Move an element:';
                    actionDiv.appendChild(helperText);

                    for (let i = 0; i < active1.length; i++) {
                        let pieceBtn = document.createElement('button');
                        pieceBtn.innerHTML = active1[i].innerHTML;
                        pieceBtn.addEventListener('click', async() => {
                            actionDiv.remove();
                            let success = await movePiece(
                                i,
                                num,
                                active1,
                                positions1,
                                'first'
                            );
                            clickBtn.style.display = 'block';
                            if(success) {
                                checkWinner()
                            } else {
                                turnOf1 = false
                            }
                        });
                        actionDiv.appendChild(pieceBtn)
                    }
                }
                player1Action.prepend(actionDiv)
            }
            // if num < 6
            else {
                // if only 1 active piece
                if (active1.length === 1) {
                    movePiece(0, num, active1, positions1, 'first');
                    checkWinner();
                    turn = 'second';
                    clickBtn.remove()
                    clickBtn.classList.remove('firstPlayerMove')
                    clickBtn.classList.add('secondPlayerMove')
                    player2Action.append(clickBtn)
                    turnOf1 = false;
                }
                else if (active1.length > 1) {
                    clickBtn.style.display = 'none';
                    const actionDiv = document.createElement('div');
                    actionDiv.classList.add('actionDiv','action-1');

                    let store1 = document.querySelector('.store1');
                    let helperText = document.createElement('p');
                    helperText.innerHTML = 'Which element to move?';
                    actionDiv.appendChild(helperText);

                    for(let i = 0; i < active1.length; i++) {
                        let pieceBtn = document.createElement('button');
                        pieceBtn.innerHTML = active1[i].innerHTML;
                        pieceBtn.addEventListener('click', async () => {
                            actionDiv.remove();
                            let success = await movePiece(
                                i,
                                num,
                                active1,
                                positions1,
                                'first'
                            );
                            clickBtn.style.display = 'block';
                            if(success) {
                                checkWinner();
                            } 
                            turn = 'second';
                            clickBtn.remove()
                            clickBtn.classList.remove('firstPlayerMove')
                            clickBtn.classList.add('secondPlayerMove')
                            player2Action.append(clickBtn)
                            turnOf1 = false;
                        });
                        actionDiv.appendChild(pieceBtn);
                    }
                    player1Action.append(actionDiv);
                }
            }
        }
        /////// player 2 ////////
        else {
            cube2.innerHTML = num;
            cube1.innerHTML = 1;
            turnOf2 = true;

            // If no active element and num < 6, pass
            if(active2.length === 0 && num < 6) {
                turn = 'first';
                clickBtn.remove()
                clickBtn.classList.add('firstPlayerMove')
                clickBtn.classList.remove('secondPlayerMove')
                player1Action.append(clickBtn)
                turnOf2 = false;
                return;
            }

            if (num === 6) {
                clickBtn.style.display = 'none';
                const actionDiv = document.createElement('div');
                actionDiv.classList.add('actionDiv','action-2');

                let store2 = document.querySelector('.store2 .storeDiv');
                let storePieces = document.querySelectorAll('.store2 img');
                let total2 = active2.length + score2;

                if(total2 < 4) {
                    // create new element btn
                    const newElemBtn = document.createElement('button');
                    newElemBtn.innerHTML = 'Add next element';
                    newElemBtn.addEventListener('click', () => {
                        actionDiv.remove()
                        turnOf2 = false;
                        let nextNum = active2.length + score2 + 1;
                        for (let item of storePieces) {
                            if (item.id == nextNum) {
                                store2.removeChild(item);
                                break;
                            }
                        }
                        let newElement = document.createElement('p');
                        newElement.classList.add('element-second');
                        newElement.style.top = `${(nextNum-1)*10 - 18}px`;
                        newElement.innerHTML = nextNum;

                        let firstSquare = document.querySelector('.moveSection div:nth-child(1)');
                        firstSquare.classList.add('firstDiv');
                        firstSquare.append(newElement);

                        active2.push(newElement);
                        positions2.push(0);
                        newElement.style.transform = board2[0];

                        newElement.addEventListener('click', async (ev) => {
                          let index = active2.findIndex((item)=>item.innerHTML === ev.target.innerHTML)
                          if(turnOf2){
                                document.querySelector('.actionDiv')?.remove();
                                let success = await movePiece(
                                    index,
                                    parseInt(cube2.innerHTML),
                                    active2,
                                    positions2,
                                    'second'
                                );
                                    clickBtn.style.display = 'block'
                                if(success) {
                                    checkWinner();
                                } else {
                                  turnOf2 = false;
                                } 
                                if(parseInt(cube2.innerHTML) < 6){
                                    turn = 'first';
                                    clickBtn.remove()
                                    clickBtn.classList.add('firstPlayerMove')
                                    clickBtn.classList.remove('secondPlayerMove')
                                    player1Action.append(clickBtn)
                                    turnOf2 = false;
                                }
                            }
                            turnOf2 = false;
                            actionDiv.remove();
                        });
                        clickBtn.style.display = 'block';
                    });
                    actionDiv.appendChild(newElemBtn);
                }
                // move if active element exists
                if (active2.length > 0) {
                    let helperText = document.createElement('p');
                    helperText.innerHTML = 'Move an element:';
                    actionDiv.appendChild(helperText)

                    for (let i = 0; i < active2.length; i++) {
                        let pieceBtn = document.createElement('button')
                        pieceBtn.innerHTML = active2[i].innerHTML;
                        pieceBtn.addEventListener('click', async () => {
                            actionDiv.remove()
                            let success = await movePiece(
                                i,
                                num,
                                active2,
                                positions2,
                                'second'
                            );
                            clickBtn.style.display = 'block'
                            if(success) {
                                checkWinner();
                            } 
                            turnOf2 = false
                        });
                        actionDiv.appendChild(pieceBtn)
                    }
                }
                player2Action.append(actionDiv)
            }
            // if num < 6
            else {
                // if only 1 active piece
                if (active2.length === 1) {
                    movePiece(0, num, active2, positions2, 'second');
                    checkWinner();
                    turn = 'first'
                    clickBtn.remove()
                    clickBtn.classList.add('firstPlayerMove')
                    clickBtn.classList.remove('secondPlayerMove')
                    player1Action.append(clickBtn)   
                    turnOf2 = false
                }
                else if (active2.length > 1) {
                    clickBtn.style.display = 'none'
                    const actionDiv = document.createElement('div')
                    actionDiv.classList.add('actionDiv','action-2')

                    let store2 = document.querySelector('.store2')
                    let helperText = document.createElement('p')
                    helperText.innerHTML = 'Which element to move?';
                    actionDiv.appendChild(helperText);

                    for(let i = 0; i < active2.length; i++) {
                        let pieceBtn = document.createElement('button');
                        pieceBtn.innerHTML = active2[i].innerHTML;
                        pieceBtn.addEventListener('click', async () => {
                            actionDiv.remove();
                            let success = await movePiece(i, num, active2, positions2, 'second');
                            clickBtn.style.display = 'block';
                            if(success) {
                                checkWinner()
                            }
                            turn = 'first'
                            clickBtn.remove()
                            clickBtn.classList.add('firstPlayerMove')
                            clickBtn.classList.remove('secondPlayerMove')
                            player1Action.append(clickBtn)
                            turnOf2 = false
                        });
                        actionDiv.appendChild(pieceBtn)
                    }
                    player2Action.append(actionDiv)
                }
            }
        }
    })
})