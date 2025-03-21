const playBtn = document.querySelector('.playBtn')
const container = document.querySelector('.container')
const finalScore = document.querySelector('.finalScore')

// creating a board

function buildBoard(x, y, moves){
  const step = 50

  const positions = []
  positions.push({x, y})

  for(const move of moves){
    for(let i = 0; i < move.time; i++){
      x += move.x * step
      y += move.y * step
      positions.push({x,y})
    }
  }

  return positions.map((position)=> `translate(${position.x}px, ${position.y}px)`)
}

// data for player 1
const player1Board = [
  {x: 0, y: -1, time: 4}, // 4 moves up
  {x: -1, y: -1, time: 1}, // 1 move up and left
  {x: -1, y: 0, time: 5}, // 5 moves left
  {x: 0, y: -1, time: 2}, // 2 moves up
  {x: 1, y: 0, time: 5}, // 5 moves right
  {x: 1, y: -1, time: 1}, // 1 move right and up
  {x: 0, y: -1, time: 5}, // 5 moves up
  {x: 1, y: 0, time: 2}, // 2 moves right
  {x: 0, y: 1, time: 5}, // 5 moves down
  {x: 1, y: 1, time: 1}, // 1 move down and right
  {x: 1, y: 0, time: 5}, // 5 moves right
  {x: 0, y: 1, time: 2}, // 2 moves down
  {x: -1, y: 0, time: 5}, // 5 moves left
  {x: -1, y: 1, time: 1}, // 1 move left and down
  {x: 0, y: 1, time: 5}, // 5 moves down
  {x: -1, y: 0, time: 1}, // 1 move left
  {x: 0, y: -1, time: 6}, // 6 moves up
]

// data for player 2
const player2Board = [
  {x: 0, y: 1, time: 4}, // 4 moves down
  {x: 1, y: 1, time: 1}, // 1 move down and right
  {x: 1, y: 0, time: 5}, // 5 moves right
  {x: 0, y: 1, time: 2}, // 2 moves down
  {x: -1, y: 0, time: 5}, // 5 moves left
  {x: -1, y: 1, time: 1}, // 1 move left and down
  {x: 0, y: 1, time: 5}, // 5 moves down
  {x: -1, y: 0, time: 2}, // 2 moves left
  {x: 0, y: -1, time: 5}, // 5 moves up
  {x: -1, y: -1, time: 1}, // 1 move up and left
  {x: -1, y: 0, time: 5}, // 5 moves left
  {x: 0, y: -1, time: 2}, // 2 moves up
  {x: 1, y: 0, time: 5}, // 5 moves right
  {x: 1, y: -1, time: 1}, // 1 move right and up
  {x: 0, y: -1, time: 5}, // 5 moves up
  {x: 1, y: 0, time: 1}, // 1 move right
  {x: 0, y: 1, time: 6}, // 6 moves down
]


const board1 = buildBoard(-100, 600, player1Board)

const board2 = buildBoard(0, 0, player2Board)


playBtn.addEventListener('click', () => {

  container.style.display='block'
  playBtn.style.display='none'

  // store
  for(let i = 1; i <= 2; i++) {
    let startDiv = document.createElement('div')
    startDiv.classList.add('storeDiv', `store${i}`)
    for(let j = 1; j <= 4; j++){
        let p = document.createElement('p')
        p.innerHTML = j
        p.classList.add('eachElement', `p${j}`)
        startDiv.append(p)
    }
    container.append(startDiv);
  }

  // cube
  for(let i = 1; i <= 2; i++){
    let cube = document.createElement('div')
    cube.classList.add('cube', `cube-${i}`)
    cube.innerHTML = 1
    container.append(cube)
  } 

  // throw btn
  let clickBtn = document.createElement('button')
  clickBtn.innerHTML = 'throw'
  clickBtn.classList.add('throwBtn','firstPlayerMove')
  container.append(clickBtn)

  // move board

  let moveSection = document.createElement('div')
  moveSection.classList.add('moveSection')
  for(let j = 0; j < board2.length; j++){
      let moveDiv = document.createElement('div')
      moveDiv.style.transform = board2[j]
      moveDiv.classList.add(j, 'board2')

    if(j === 0){
      moveDiv.style.background = 'rgb(173, 109, 109)'
      moveDiv.style.borderRight = 'none'
      moveDiv.style.borderBottom = 'none'
      moveDiv.style.borderLeft = 'none'
    } 
    if(j === 51){
      moveDiv.style.background = 'rgb(173, 109, 109)'
      moveDiv.style.borderLeft = 'none'
      moveDiv.style.borderBottom = 'none'
      moveDiv.style.borderRight = 'none'
    }
    if(j === 52){
      moveDiv.style.background = 'rgb(173, 109, 109)'
      moveDiv.style.borderLeft = 'none'
      moveDiv.style.borderBottom = 'none'
      moveDiv.style.borderRight = 'none'
    } 
    if(j === 53){
      moveDiv.style.background = 'rgb(173, 109, 109)'
      moveDiv.style.borderBottom = 'none'
      moveDiv.style.borderLeft = 'none'
      moveDiv.style.borderRight = 'none'
    } 
    if(j === 54){
      moveDiv.style.background = 'rgb(173, 109, 109)'
      moveDiv.style.borderLeft = 'none'
      moveDiv.style.borderBottom = 'none'
      moveDiv.style.borderRight = 'none'
    } 
    if(j === 55){
      moveDiv.style.background = 'rgb(173, 109, 109)'
      moveDiv.style.borderLeft = 'none'
      moveDiv.style.borderBottom = 'none'
      moveDiv.style.borderRight = 'none'
    } 
    if(j === 56){
      moveDiv.style.background = 'rgb(173, 109, 109)'
      moveDiv.style.borderLeft = 'none'
      moveDiv.style.borderBottom = 'none'
      moveDiv.style.borderRight = 'none'
    } 
    if(j === 26){
      moveDiv.style.background = 'rgb(115, 153, 184)'
      moveDiv.style.borderLeft = 'none'
      moveDiv.style.borderBottom = 'none'
      moveDiv.style.borderRight = 'none'
    } 

      if(j === board2.length - 1) {
          moveDiv.innerHTML = `<p>&#x1F3C1;</p>`
      }
      moveSection.append(moveDiv)
  }
  for(let j = 0; j < board1.length; j++){
    let moveDiv = document.createElement('div')
    moveDiv.style.transform = board1[j]
    moveDiv.classList.add(j, 'board1')


    if(j === 51){
      moveDiv.style.background = 'rgb(115, 153, 184)'
      moveDiv.style.borderLeft = 'none'
      moveDiv.style.borderBottom = 'none'
      moveDiv.style.borderRight = 'none'
    }
    if(j === 52){
      moveDiv.style.background = 'rgb(115, 153, 184)'
      moveDiv.style.borderLeft = 'none'
      moveDiv.style.borderBottom = 'none'
      moveDiv.style.borderRight = 'none'
    } 
    if(j === 53){
      moveDiv.style.background = 'rgb(115, 153, 184)'
      moveDiv.style.borderBottom = 'none'
      moveDiv.style.borderLeft = 'none'
      moveDiv.style.borderRight = 'none'
    } 
    if(j === 54){
      moveDiv.style.background = 'rgb(115, 153, 184)'
      moveDiv.style.borderLeft = 'none'
      moveDiv.style.borderBottom = 'none'
      moveDiv.style.borderRight = 'none'
    } 
    if(j === 55){
      moveDiv.style.background = 'rgb(115, 153, 184)'
      moveDiv.style.borderLeft = 'none'
      moveDiv.style.borderBottom = 'none'
      moveDiv.style.borderRight = 'none'
    } 
    if(j === 56){
      moveDiv.style.background = 'rgb(115, 153, 184)'
      moveDiv.style.borderLeft = 'none'
      moveDiv.style.borderBottom = 'none'
      moveDiv.style.borderRight = 'none'
    } 

    if(j === board1.length - 1) {
        moveDiv.innerHTML = `<p>&#x1F3C1;</p>`
    }
    moveSection.append(moveDiv)
  }
  container.append(moveSection)

  let turn = 'first'
  let score1 = 0
  let score2 = 0
  let active1 = []
  let active2 = []
  let positions1 = [] 
  let positions2 = []
  let turnOf1 = false
  let turnOf2= false

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

  function movePiece(i, steps, activeArr, positionsArr, currentTurn) {
    let oldIndex = positionsArr[i]
    let newIndex = oldIndex + steps
    if(newIndex >= board2.length) {
        return false
    }

    positionsArr[i] = newIndex
    if(currentTurn === 'first') activeArr[i].style.transform = board1[newIndex]
    else activeArr[i].style.transform = board2[newIndex]
    if(newIndex === board2.length - 1){
        activeArr[i].remove()
        activeArr.splice(i, 1)
        positionsArr.splice(i, 1)

        if(currentTurn === 'first') score1++
        else score2++
    }
    return true
  }

  let arr = []
  const divs = [...document.querySelectorAll('.moveSection div')]
  for(let i = 0; i<divs.length; i++){
    if(!arr.includes(divs[i].style.transform)){
      arr.push(divs[i].style.transform)
    } else {
      divs[i].remove()
    }
  }

  clickBtn.addEventListener('click', () => {
    let cube1 = document.querySelector('.cube-1')
    let cube2 = document.querySelector('.cube-2')

    let num = Math.floor(Math.random() * 6) + 1
    checkWinner()
  
    /////// player 1 //////////

    if(turn === 'first') {
      cube1.innerHTML = num
      cube2.innerHTML = 1
      turnOf1 = true

      // If no active element and num < 6, pass
    
      if(active1.length === 0 && num < 6) {
        turn = 'second'
        clickBtn.classList.remove('firstPlayerMove')
        clickBtn.classList.add('secondPlayerMove')
        turnOf1 = false
        return
      }
      if(num === 6) {
        clickBtn.style.display = 'none'
        const actionDiv = document.createElement('div')
        actionDiv.classList.add('actionDiv','action-1')
        let store1 = document.querySelector('.store1')
        let storePieces = document.querySelectorAll('.store1 p')
        let total1 = active1.length + score1;

        if(total1 < 4) {
          // create new element btn
          const newElemBtn = document.createElement('button')
            newElemBtn.innerHTML = 'Add next element'
            newElemBtn.addEventListener('click', () => {
              turnOf1 = false
                let nextNum = active1.length + score1 + 1
                for (let item of storePieces) {
                    if (item.innerHTML == nextNum) {
                        store1.removeChild(item)
                        break;
                    }
                }
                let newElement = document.createElement('p')
                newElement.classList.add('element-first')
                newElement.style.top = `${(nextNum-1)*10-18}px`
                newElement.innerHTML = nextNum
                let firstSquare = document.querySelector('.moveSection div:nth-child(1)')
                firstSquare.classList.add('firstDiv')
                firstSquare.append(newElement);
                active1.push(newElement);
                positions1.push(0);
                newElement.style.transform = board1[0];
                newElement.addEventListener('click', (item)=>{
                  if(turnOf1){
                  let success = movePiece(parseInt(item.target.innerHTML - 1), parseInt(cube1.innerHTML), active1, positions1, 'first')
                  document.querySelector('.actionDiv').remove()
                  if(success) {
                      checkWinner()
                      actionDiv.remove()
                      clickBtn.style.display = 'block'
                    } else {
                      console.log(turn)
                    actionDiv.remove()
                    clickBtn.style.display = 'block'
                    }
                    if(num < 6){
                      turn = 'second'
                      clickBtn.classList.remove('firstPlayerMove')
                      clickBtn.classList.add('secondPlayerMove')
                    }
                    turnOf1 = false
                  }
                })
                actionDiv.remove();
                clickBtn.style.display = 'block';
            });
            actionDiv.appendChild(newElemBtn);
        }
        // move if active element exists
        if(active1.length > 0) {
            let helperText = document.createElement('p')
            helperText.innerHTML = 'Move an element:'
            actionDiv.appendChild(helperText)

            for(let i = 0; i < active1.length; i++) {
                let pieceBtn = document.createElement('button')
                pieceBtn.innerHTML = active1[i].innerHTML
                pieceBtn.addEventListener('click', () => {
                    let success = movePiece(i, num, active1, positions1, 'first')
                    if(success) {
                        checkWinner()
                        actionDiv.remove()
                        clickBtn.style.display = 'block'
                    } else {
                      actionDiv.remove()
                      clickBtn.style.display = 'block'
                      turn = 'second'
                      clickBtn.classList.remove('firstPlayerMove')
                      clickBtn.classList.add('secondPlayerMove')
                      turnOf1 = false
                    }
                });
                actionDiv.appendChild(pieceBtn);
            }
        }
        store1.after(actionDiv);
      }
      // if num < 6
      else {
      // if only 1 active piece
        if(active1.length === 1) {
          movePiece(0, num, active1, positions1, 'first')
          checkWinner()
          turn = 'second'
          clickBtn.classList.remove('firstPlayerMove')
          clickBtn.classList.add('secondPlayerMove')
          turnOf1 = false
        }
        else if(active1.length > 1) {
            clickBtn.style.display = 'none'
            const actionDiv = document.createElement('div')
            actionDiv.classList.add('actionDiv','action-1')
            let store1 = document.querySelector('.store1')
            let helperText = document.createElement('p')
            helperText.innerHTML = 'Which element to move?'
            actionDiv.appendChild(helperText)
            for(let i = 0; i < active1.length; i++) {
                let pieceBtn = document.createElement('button')
                pieceBtn.innerHTML = active1[i].innerHTML
                pieceBtn.addEventListener('click', () => {
                    let success = movePiece(i, num, active1, positions1, 'first')
                    if(success) {
                        checkWinner()
                        actionDiv.remove()
                        turn = 'second'
                        clickBtn.classList.remove('firstPlayerMove')
                        clickBtn.classList.add('secondPlayerMove')
                        turnOf1 = false
                        clickBtn.style.display = 'block'
                    } else {
                      actionDiv.remove()
                      clickBtn.style.display = 'block'
                      turn = 'second'
                      clickBtn.classList.remove('firstPlayerMove')
                      clickBtn.classList.add('secondPlayerMove')
                      turnOf1 = false
                    }
                })
                actionDiv.appendChild(pieceBtn)
            }
            store1.after(actionDiv)
          }      
      }
    } 

    /////// player 2 ////////

    else {
      cube2.innerHTML = num
      cube1.innerHTML = 1
      turnOf2 = true
      console.log(num)
      // If no active element and num < 6, pass 
      if(active2.length === 0 && num < 6) {
        turn = 'first'
        clickBtn.classList.add('firstPlayerMove')
        clickBtn.classList.remove('secondPlayerMove')      
        turnOf2 = false
        return
      }
      if(num === 6) {
        clickBtn.style.display = 'none'
        const actionDiv = document.createElement('div')
        actionDiv.classList.add('actionDiv','action-2')
        let store2 = document.querySelector('.store2')
        let storePieces = document.querySelectorAll('.store2 p')
        let total2 = active2.length + score2;

        if(total2 < 4) {
          // create new element btn
          const newElemBtn = document.createElement('button')
            newElemBtn.innerHTML = 'Add next element'
            newElemBtn.addEventListener('click', () => {
              turnOf2 = false
                let nextNum = active2.length + score2 + 1
                for (let item of storePieces) {
                    if (item.innerHTML == nextNum) {
                        store2.removeChild(item)
                        break;
                    }
                }
                let newElement = document.createElement('p')
                newElement.classList.add('element-second')
                newElement.style.top = `${(nextNum-1)*10-18}px`
                newElement.innerHTML = nextNum
                let firstSquare = document.querySelector('.moveSection div:nth-child(1)')
                firstSquare.classList.add('firstDiv')
                firstSquare.append(newElement)
                active2.push(newElement);
                positions2.push(0);
                newElement.style.transform = board2[0];
                newElement.addEventListener('click', (item)=>{
                  if(turnOf2){
                    document.querySelector('.actionDiv').remove()
                    let success = movePiece(parseInt(item.target.innerHTML - 1), parseInt(cube2.innerHTML), active2, positions2, 'second')
                      if(success) {
                        checkWinner()
                        actionDiv.remove()
                        clickBtn.style.display = 'block'
                      } else {
                      actionDiv.remove()
                      clickBtn.style.display = 'block'
                      }
                      if(num < 6){
                        turn = 'first'
                        clickBtn.classList.add('firstPlayerMove')
                        clickBtn.classList.remove('secondPlayerMove')
                      }
                      turnOf2 = false
                  }
                })
                actionDiv.remove();
                clickBtn.style.display = 'block';
            });
            actionDiv.appendChild(newElemBtn);
        }
        // move if active element exists
        if(active2.length > 0) {
            let helperText = document.createElement('p')
            helperText.innerHTML = 'Move an element:'
            actionDiv.appendChild(helperText)

            for(let i = 0; i < active2.length; i++) {
                let pieceBtn = document.createElement('button')
                pieceBtn.innerHTML = active2[i].innerHTML
                pieceBtn.addEventListener('click', () => {
                    let success = movePiece(i, num, active2, positions2, 'second')
                    if(success) {
                        checkWinner()
                        actionDiv.remove()
                        clickBtn.style.display = 'block'
                    } else {
                      actionDiv.remove()
                      clickBtn.style.display = 'block'
                      turn = 'first'
                      clickBtn.classList.add('firstPlayerMove')
                      clickBtn.classList.remove('secondPlayerMove')
                      turnOf2 = false
                    }
                });
                actionDiv.appendChild(pieceBtn);
            }
        }
        store2.after(actionDiv);
      }
      // if num < 6
      else {
      // if only 1 active piece
        if(active2.length === 1) {
          movePiece(0, num, active2, positions2, 'second')
          checkWinner()
          turn = 'first'
          clickBtn.classList.add('firstPlayerMove')
          clickBtn.classList.remove('secondPlayerMove')
          turnOf2 = false
        }
        else if(active2.length > 1) {
            clickBtn.style.display = 'none'
            const actionDiv = document.createElement('div')
            actionDiv.classList.add('actionDiv','action-2')
            let store2 = document.querySelector('.store2')
            let helperText = document.createElement('p')
            helperText.innerHTML = 'Which element to move?'
            actionDiv.appendChild(helperText)
            for(let i = 0; i < active2.length; i++) {
                let pieceBtn = document.createElement('button')
                pieceBtn.innerHTML = active2[i].innerHTML
                pieceBtn.addEventListener('click', () => {
                    let success = movePiece(i, num, active2, positions2, 'second')
                    if(success) {
                        checkWinner()
                        actionDiv.remove()
                        turn = 'first'
                        clickBtn.classList.add('firstPlayerMove')
                        clickBtn.classList.remove('secondPlayerMove')
                        clickBtn.style.display = 'block'
                        turnOf2 = false
                    } else {
                      actionDiv.remove()
                      clickBtn.style.display = 'block'
                      turn = 'second'
                      clickBtn.classList.remove('firstPlayerMove')
                      clickBtn.classList.add('secondPlayerMove')
                      turnOf2 = false
                    }
                })
                actionDiv.appendChild(pieceBtn)
            }
            store2.after(actionDiv)
          }      
      }
    }
  })
})

