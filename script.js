const playBtn = document.querySelector('.playBtn')
const container = document.querySelector('.container')
const finalScore = document.querySelector('.finalScore')

let blankDiv1 = document.createElement('div')
let blankDiv2 = document.createElement('div')
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
container.style.maxWidth = `${STEP_SIZE * 15 + 1 }px`

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

// specific indexes for fill them with colors
const indexesP1 = [28, 55, 56, 57, 58, 59];
const indexesP2 = [0, 55, 56, 57, 58, 59];

// colors for two parts
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
            let img = document.createElement('div')
            if(i === 2){
                img.innerHTML = `<svg id=${j} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 15 15" version="1.1">
                                <g id=${j}>
                                <path id=${j} style=" stroke:none;fill-rule:nonzero;fill:#d91f18;fill-opacity:1;" d="M 6.78125 4.0625 C 7.011719 4.148438 7.242188 4.171875 7.488281 4.171875 C 7.515625 4.171875 7.542969 4.171875 7.574219 4.171875 C 7.867188 4.167969 8.140625 4.109375 8.410156 3.992188 C 8.738281 3.863281 9.148438 3.96875 9.460938 4.09375 C 9.753906 4.222656 9.976562 4.402344 10.195312 4.628906 C 10.21875 4.648438 10.238281 4.671875 10.261719 4.695312 C 10.742188 5.195312 10.828125 5.851562 10.921875 6.507812 C 10.929688 6.574219 10.941406 6.644531 10.949219 6.710938 C 10.96875 6.851562 10.988281 6.988281 11.007812 7.128906 C 11.035156 7.308594 11.058594 7.484375 11.085938 7.664062 C 11.105469 7.804688 11.125 7.941406 11.144531 8.078125 C 11.152344 8.144531 11.164062 8.210938 11.171875 8.277344 C 11.1875 8.367188 11.199219 8.460938 11.210938 8.550781 C 11.21875 8.59375 11.21875 8.59375 11.222656 8.632812 C 11.273438 8.988281 11.273438 8.988281 11.222656 9.128906 C 11.0625 9.316406 10.804688 9.433594 10.597656 9.5625 C 10.570312 9.578125 10.542969 9.59375 10.515625 9.613281 C 10.398438 9.683594 10.28125 9.757812 10.160156 9.824219 C 10.144531 9.832031 10.125 9.84375 10.105469 9.851562 C 10.0625 9.878906 10.015625 9.902344 9.96875 9.925781 C 9.808594 10.078125 9.816406 10.421875 9.789062 10.632812 C 9.777344 10.691406 9.769531 10.75 9.761719 10.804688 C 9.753906 10.867188 9.746094 10.929688 9.738281 10.988281 C 9.71875 11.117188 9.699219 11.246094 9.683594 11.371094 C 9.632812 11.734375 9.578125 12.097656 9.527344 12.460938 C 9.5 12.664062 9.472656 12.863281 9.441406 13.0625 C 9.425781 13.191406 9.40625 13.316406 9.390625 13.445312 C 9.375 13.542969 9.359375 13.640625 9.347656 13.738281 C 9.34375 13.773438 9.335938 13.804688 9.332031 13.84375 C 9.273438 14.238281 9.179688 14.578125 8.855469 14.835938 C 8.605469 15.011719 8.339844 15.015625 8.042969 15.015625 C 8 15.015625 7.953125 15.015625 7.910156 15.015625 C 7.820312 15.015625 7.730469 15.015625 7.640625 15.015625 C 7.523438 15.015625 7.40625 15.015625 7.292969 15.015625 C 7.203125 15.015625 7.113281 15.015625 7.023438 15.015625 C 6.980469 15.015625 6.9375 15.015625 6.894531 15.015625 C 6.578125 15.015625 6.300781 14.984375 6.058594 14.765625 C 6.035156 14.746094 6.011719 14.726562 5.988281 14.707031 C 5.761719 14.425781 5.703125 14.121094 5.65625 13.773438 C 5.648438 13.726562 5.644531 13.675781 5.636719 13.625 C 5.617188 13.488281 5.597656 13.351562 5.578125 13.214844 C 5.558594 13.058594 5.535156 12.902344 5.511719 12.746094 C 5.476562 12.476562 5.4375 12.207031 5.402344 11.9375 C 5.394531 11.886719 5.394531 11.886719 5.386719 11.835938 C 5.363281 11.660156 5.335938 11.484375 5.3125 11.308594 C 5.289062 11.136719 5.265625 10.964844 5.242188 10.792969 C 5.234375 10.726562 5.222656 10.660156 5.214844 10.597656 C 5.203125 10.507812 5.191406 10.417969 5.179688 10.328125 C 5.175781 10.300781 5.171875 10.273438 5.167969 10.246094 C 5.152344 10.132812 5.140625 10.066406 5.070312 9.976562 C 5.011719 9.933594 4.953125 9.890625 4.890625 9.855469 C 4.867188 9.84375 4.84375 9.828125 4.820312 9.8125 C 4.792969 9.800781 4.769531 9.785156 4.746094 9.769531 C 4.691406 9.738281 4.640625 9.707031 4.585938 9.675781 C 4.558594 9.660156 4.53125 9.644531 4.503906 9.628906 C 4.375 9.550781 4.242188 9.46875 4.113281 9.386719 C 4.089844 9.375 4.066406 9.359375 4.042969 9.34375 C 4.019531 9.328125 4 9.316406 3.976562 9.300781 C 3.949219 9.285156 3.949219 9.285156 3.917969 9.265625 C 3.828125 9.203125 3.785156 9.160156 3.75 9.054688 C 3.753906 8.699219 3.816406 8.347656 3.867188 8 C 3.875 7.9375 3.882812 7.875 3.894531 7.8125 C 3.910156 7.683594 3.929688 7.554688 3.949219 7.425781 C 3.972656 7.261719 3.996094 7.097656 4.019531 6.933594 C 4.035156 6.804688 4.054688 6.675781 4.074219 6.546875 C 4.082031 6.488281 4.089844 6.425781 4.097656 6.367188 C 4.199219 5.644531 4.363281 5.066406 4.890625 4.539062 C 4.914062 4.519531 4.933594 4.496094 4.957031 4.476562 C 5.429688 4.015625 6.164062 3.804688 6.78125 4.0625 Z M 6.78125 4.0625 "/>
                                <path id=${j} style=" stroke:none;fill-rule:nonzero;fill:#d91f18;fill-opacity:1;" d="M 8.203125 0.117188 C 8.230469 0.128906 8.257812 0.140625 8.285156 0.152344 C 8.6875 0.351562 9 0.6875 9.148438 1.109375 C 9.3125 1.601562 9.296875 2.078125 9.082031 2.550781 C 8.847656 2.992188 8.472656 3.296875 8 3.457031 C 7.558594 3.589844 7.066406 3.527344 6.65625 3.324219 C 6.21875 3.0625 5.925781 2.667969 5.777344 2.183594 C 5.675781 1.742188 5.746094 1.253906 5.960938 0.859375 C 6.160156 0.550781 6.382812 0.332031 6.710938 0.167969 C 6.726562 0.15625 6.746094 0.148438 6.769531 0.136719 C 7.199219 -0.0742188 7.765625 -0.078125 8.203125 0.117188 Z M 8.203125 0.117188 "/>
                                </g>
                                </svg>`
            }
            else {
                img.innerHTML = `<svg id=${j} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 15 15" version="1.1">
                <g id=${j}>
                <path id=${j} style=" stroke:none;fill-rule:nonzero;fill:#0069c7;fill-opacity:1;" d="M 6.78125 4.0625 C 7.011719 4.148438 7.242188 4.171875 7.488281 4.171875 C 7.515625 4.171875 7.542969 4.171875 7.574219 4.171875 C 7.867188 4.167969 8.140625 4.109375 8.410156 3.992188 C 8.738281 3.863281 9.148438 3.96875 9.460938 4.09375 C 9.753906 4.222656 9.976562 4.402344 10.195312 4.628906 C 10.21875 4.648438 10.238281 4.671875 10.261719 4.695312 C 10.742188 5.195312 10.828125 5.851562 10.921875 6.507812 C 10.929688 6.574219 10.941406 6.644531 10.949219 6.710938 C 10.96875 6.851562 10.988281 6.988281 11.007812 7.128906 C 11.035156 7.308594 11.058594 7.484375 11.085938 7.664062 C 11.105469 7.804688 11.125 7.941406 11.144531 8.078125 C 11.152344 8.144531 11.164062 8.210938 11.171875 8.277344 C 11.1875 8.367188 11.199219 8.460938 11.210938 8.550781 C 11.21875 8.59375 11.21875 8.59375 11.222656 8.632812 C 11.273438 8.988281 11.273438 8.988281 11.222656 9.128906 C 11.0625 9.316406 10.804688 9.433594 10.597656 9.5625 C 10.570312 9.578125 10.542969 9.59375 10.515625 9.613281 C 10.398438 9.683594 10.28125 9.757812 10.160156 9.824219 C 10.144531 9.832031 10.125 9.84375 10.105469 9.851562 C 10.0625 9.878906 10.015625 9.902344 9.96875 9.925781 C 9.808594 10.078125 9.816406 10.421875 9.789062 10.632812 C 9.777344 10.691406 9.769531 10.75 9.761719 10.804688 C 9.753906 10.867188 9.746094 10.929688 9.738281 10.988281 C 9.71875 11.117188 9.699219 11.246094 9.683594 11.371094 C 9.632812 11.734375 9.578125 12.097656 9.527344 12.460938 C 9.5 12.664062 9.472656 12.863281 9.441406 13.0625 C 9.425781 13.191406 9.40625 13.316406 9.390625 13.445312 C 9.375 13.542969 9.359375 13.640625 9.347656 13.738281 C 9.34375 13.773438 9.335938 13.804688 9.332031 13.84375 C 9.273438 14.238281 9.179688 14.578125 8.855469 14.835938 C 8.605469 15.011719 8.339844 15.015625 8.042969 15.015625 C 8 15.015625 7.953125 15.015625 7.910156 15.015625 C 7.820312 15.015625 7.730469 15.015625 7.640625 15.015625 C 7.523438 15.015625 7.40625 15.015625 7.292969 15.015625 C 7.203125 15.015625 7.113281 15.015625 7.023438 15.015625 C 6.980469 15.015625 6.9375 15.015625 6.894531 15.015625 C 6.578125 15.015625 6.300781 14.984375 6.058594 14.765625 C 6.035156 14.746094 6.011719 14.726562 5.988281 14.707031 C 5.761719 14.425781 5.703125 14.121094 5.65625 13.773438 C 5.648438 13.726562 5.644531 13.675781 5.636719 13.625 C 5.617188 13.488281 5.597656 13.351562 5.578125 13.214844 C 5.558594 13.058594 5.535156 12.902344 5.511719 12.746094 C 5.476562 12.476562 5.4375 12.207031 5.402344 11.9375 C 5.394531 11.886719 5.394531 11.886719 5.386719 11.835938 C 5.363281 11.660156 5.335938 11.484375 5.3125 11.308594 C 5.289062 11.136719 5.265625 10.964844 5.242188 10.792969 C 5.234375 10.726562 5.222656 10.660156 5.214844 10.597656 C 5.203125 10.507812 5.191406 10.417969 5.179688 10.328125 C 5.175781 10.300781 5.171875 10.273438 5.167969 10.246094 C 5.152344 10.132812 5.140625 10.066406 5.070312 9.976562 C 5.011719 9.933594 4.953125 9.890625 4.890625 9.855469 C 4.867188 9.84375 4.84375 9.828125 4.820312 9.8125 C 4.792969 9.800781 4.769531 9.785156 4.746094 9.769531 C 4.691406 9.738281 4.640625 9.707031 4.585938 9.675781 C 4.558594 9.660156 4.53125 9.644531 4.503906 9.628906 C 4.375 9.550781 4.242188 9.46875 4.113281 9.386719 C 4.089844 9.375 4.066406 9.359375 4.042969 9.34375 C 4.019531 9.328125 4 9.316406 3.976562 9.300781 C 3.949219 9.285156 3.949219 9.285156 3.917969 9.265625 C 3.828125 9.203125 3.785156 9.160156 3.75 9.054688 C 3.753906 8.699219 3.816406 8.347656 3.867188 8 C 3.875 7.9375 3.882812 7.875 3.894531 7.8125 C 3.910156 7.683594 3.929688 7.554688 3.949219 7.425781 C 3.972656 7.261719 3.996094 7.097656 4.019531 6.933594 C 4.035156 6.804688 4.054688 6.675781 4.074219 6.546875 C 4.082031 6.488281 4.089844 6.425781 4.097656 6.367188 C 4.199219 5.644531 4.363281 5.066406 4.890625 4.539062 C 4.914062 4.519531 4.933594 4.496094 4.957031 4.476562 C 5.429688 4.015625 6.164062 3.804688 6.78125 4.0625 Z M 6.78125 4.0625 "/>
                <path id=${j} style=" stroke:none;fill-rule:nonzero;fill:#0069c7;fill-opacity:1;" d="M 8.203125 0.117188 C 8.230469 0.128906 8.257812 0.140625 8.285156 0.152344 C 8.6875 0.351562 9 0.6875 9.148438 1.109375 C 9.3125 1.601562 9.296875 2.078125 9.082031 2.550781 C 8.847656 2.992188 8.472656 3.296875 8 3.457031 C 7.558594 3.589844 7.066406 3.527344 6.65625 3.324219 C 6.21875 3.0625 5.925781 2.667969 5.777344 2.183594 C 5.675781 1.742188 5.746094 1.253906 5.960938 0.859375 C 6.160156 0.550781 6.382812 0.332031 6.710938 0.167969 C 6.726562 0.15625 6.746094 0.148438 6.769531 0.136719 C 7.199219 -0.0742188 7.765625 -0.078125 8.203125 0.117188 Z M 8.203125 0.117188 "/>
                </g>
                </svg>`
            }
            img.classList.add('eachElement', `${j}`)
            img.id = j
            img.style.padding = '3px'
            img.style.borderRadius = '15px'
            storeDiv.append(img);
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
    function fillSquare(div, index, arr, color) {
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

    // drawing a board (for first and second player)

    for (let j = 0; j < board2.length; j++){
        let moveDiv = document.createElement('div');
        moveDiv.style.transform = board2[j];
        moveDiv.classList.add(`${j}`, 'board2');
        fillSquare(moveDiv, j, indexesP2, colorP2);
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
        fillSquare(moveDiv, j, indexesP1, colorP1);
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

    // global variables

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
            player1Action.style.display = 'none'
            player2Action.style.display = 'none'
        } else if(score2 === 4) {
            finalScore.innerHTML = 'Player 2 Wins!'
            container.style.display = 'none'
            player1Action.style.display = 'none'
            player2Action.style.display = 'none'
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

        if(currentIndex <= 5 && targetIndex >= 5 || currentIndex <= 19 && targetIndex >= 19 || currentIndex <= 33 && targetIndex >= 33 || currentIndex <= 47 && targetIndex >= 47){
          steps++
        }

        for (let stepIndex = 1; stepIndex <= steps; stepIndex++) {
            currentIndex++
            positionsArr[i] = currentIndex

            activeArr[i].style.transform = board[currentIndex]

            await new Promise(resolve => setTimeout(resolve, 500))
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
                let storePieces = document.querySelectorAll('.store1 div');
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
                        let newElement = document.createElement('div')
                        // newElement.src = 'https://cdn-icons-png.flaticon.com/512/106/106175.png'
                        newElement.innerHTML = `<svg id=${nextNum} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 15 15" version="1.1">
                            <g id=${nextNum}>
                            <path id=${nextNum} style=" stroke:none;fill-rule:nonzero;fill:#051a2b;fill-opacity:1;" d="M 6.78125 4.0625 C 7.011719 4.148438 7.242188 4.171875 7.488281 4.171875 C 7.515625 4.171875 7.542969 4.171875 7.574219 4.171875 C 7.867188 4.167969 8.140625 4.109375 8.410156 3.992188 C 8.738281 3.863281 9.148438 3.96875 9.460938 4.09375 C 9.753906 4.222656 9.976562 4.402344 10.195312 4.628906 C 10.21875 4.648438 10.238281 4.671875 10.261719 4.695312 C 10.742188 5.195312 10.828125 5.851562 10.921875 6.507812 C 10.929688 6.574219 10.941406 6.644531 10.949219 6.710938 C 10.96875 6.851562 10.988281 6.988281 11.007812 7.128906 C 11.035156 7.308594 11.058594 7.484375 11.085938 7.664062 C 11.105469 7.804688 11.125 7.941406 11.144531 8.078125 C 11.152344 8.144531 11.164062 8.210938 11.171875 8.277344 C 11.1875 8.367188 11.199219 8.460938 11.210938 8.550781 C 11.21875 8.59375 11.21875 8.59375 11.222656 8.632812 C 11.273438 8.988281 11.273438 8.988281 11.222656 9.128906 C 11.0625 9.316406 10.804688 9.433594 10.597656 9.5625 C 10.570312 9.578125 10.542969 9.59375 10.515625 9.613281 C 10.398438 9.683594 10.28125 9.757812 10.160156 9.824219 C 10.144531 9.832031 10.125 9.84375 10.105469 9.851562 C 10.0625 9.878906 10.015625 9.902344 9.96875 9.925781 C 9.808594 10.078125 9.816406 10.421875 9.789062 10.632812 C 9.777344 10.691406 9.769531 10.75 9.761719 10.804688 C 9.753906 10.867188 9.746094 10.929688 9.738281 10.988281 C 9.71875 11.117188 9.699219 11.246094 9.683594 11.371094 C 9.632812 11.734375 9.578125 12.097656 9.527344 12.460938 C 9.5 12.664062 9.472656 12.863281 9.441406 13.0625 C 9.425781 13.191406 9.40625 13.316406 9.390625 13.445312 C 9.375 13.542969 9.359375 13.640625 9.347656 13.738281 C 9.34375 13.773438 9.335938 13.804688 9.332031 13.84375 C 9.273438 14.238281 9.179688 14.578125 8.855469 14.835938 C 8.605469 15.011719 8.339844 15.015625 8.042969 15.015625 C 8 15.015625 7.953125 15.015625 7.910156 15.015625 C 7.820312 15.015625 7.730469 15.015625 7.640625 15.015625 C 7.523438 15.015625 7.40625 15.015625 7.292969 15.015625 C 7.203125 15.015625 7.113281 15.015625 7.023438 15.015625 C 6.980469 15.015625 6.9375 15.015625 6.894531 15.015625 C 6.578125 15.015625 6.300781 14.984375 6.058594 14.765625 C 6.035156 14.746094 6.011719 14.726562 5.988281 14.707031 C 5.761719 14.425781 5.703125 14.121094 5.65625 13.773438 C 5.648438 13.726562 5.644531 13.675781 5.636719 13.625 C 5.617188 13.488281 5.597656 13.351562 5.578125 13.214844 C 5.558594 13.058594 5.535156 12.902344 5.511719 12.746094 C 5.476562 12.476562 5.4375 12.207031 5.402344 11.9375 C 5.394531 11.886719 5.394531 11.886719 5.386719 11.835938 C 5.363281 11.660156 5.335938 11.484375 5.3125 11.308594 C 5.289062 11.136719 5.265625 10.964844 5.242188 10.792969 C 5.234375 10.726562 5.222656 10.660156 5.214844 10.597656 C 5.203125 10.507812 5.191406 10.417969 5.179688 10.328125 C 5.175781 10.300781 5.171875 10.273438 5.167969 10.246094 C 5.152344 10.132812 5.140625 10.066406 5.070312 9.976562 C 5.011719 9.933594 4.953125 9.890625 4.890625 9.855469 C 4.867188 9.84375 4.84375 9.828125 4.820312 9.8125 C 4.792969 9.800781 4.769531 9.785156 4.746094 9.769531 C 4.691406 9.738281 4.640625 9.707031 4.585938 9.675781 C 4.558594 9.660156 4.53125 9.644531 4.503906 9.628906 C 4.375 9.550781 4.242188 9.46875 4.113281 9.386719 C 4.089844 9.375 4.066406 9.359375 4.042969 9.34375 C 4.019531 9.328125 4 9.316406 3.976562 9.300781 C 3.949219 9.285156 3.949219 9.285156 3.917969 9.265625 C 3.828125 9.203125 3.785156 9.160156 3.75 9.054688 C 3.753906 8.699219 3.816406 8.347656 3.867188 8 C 3.875 7.9375 3.882812 7.875 3.894531 7.8125 C 3.910156 7.683594 3.929688 7.554688 3.949219 7.425781 C 3.972656 7.261719 3.996094 7.097656 4.019531 6.933594 C 4.035156 6.804688 4.054688 6.675781 4.074219 6.546875 C 4.082031 6.488281 4.089844 6.425781 4.097656 6.367188 C 4.199219 5.644531 4.363281 5.066406 4.890625 4.539062 C 4.914062 4.519531 4.933594 4.496094 4.957031 4.476562 C 5.429688 4.015625 6.164062 3.804688 6.78125 4.0625 Z M 6.78125 4.0625 "/>
                            <path id=${nextNum} style=" stroke:none;fill-rule:nonzero;fill:#051a2b;fill-opacity:1;" d="M 8.203125 0.117188 C 8.230469 0.128906 8.257812 0.140625 8.285156 0.152344 C 8.6875 0.351562 9 0.6875 9.148438 1.109375 C 9.3125 1.601562 9.296875 2.078125 9.082031 2.550781 C 8.847656 2.992188 8.472656 3.296875 8 3.457031 C 7.558594 3.589844 7.066406 3.527344 6.65625 3.324219 C 6.21875 3.0625 5.925781 2.667969 5.777344 2.183594 C 5.675781 1.742188 5.746094 1.253906 5.960938 0.859375 C 6.160156 0.550781 6.382812 0.332031 6.710938 0.167969 C 6.726562 0.15625 6.746094 0.148438 6.769531 0.136719 C 7.199219 -0.0742188 7.765625 -0.078125 8.203125 0.117188 Z M 8.203125 0.117188 "/>
                            </g>
                            </svg>`
                        newElement.classList.add('element-first','eachElement')
                        newElement.id = nextNum
                        newElement.style.top = `${(nextNum - 1)*10 - 2}px`
                        // newElement.style.backgroundColor = colorP1

                        let firstSquare = document.querySelector('.moveSection div:nth-child(1)');
                        firstSquare.classList.add('firstDiv');
                        firstSquare.append(newElement);

                        active1.push(newElement)
                        positions1.push(0)
                        newElement.style.transform = board1[0]
                        
                        // clickable elements
                        
                        newElement.addEventListener('click', async (ev) => {
                          let index = active1.findIndex((item)=>parseInt(item.id) === parseInt(ev.target.id))
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

                    // choose which element to move
                    for (let i = 0; i < active1.length; i++) {
                        let pieceBtn = document.createElement('button');
                        pieceBtn.innerHTML = active1[i].id;
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
                    // choose which element to move
                    for(let i = 0; i < active1.length; i++) {
                        let pieceBtn = document.createElement('button');
                        pieceBtn.innerHTML = active1[i].id;
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
                let storePieces = document.querySelectorAll('.store2 div');
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
                        let newElement = document.createElement('div');
                        // newElement.src = 'https://cdn-icons-png.flaticon.com/512/106/106175.png';
                        newElement.innerHTML = `<svg id=${nextNum} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 15 15" version="1.1">
                                <g id=${nextNum}>
                                <path id=${nextNum} style=" stroke:none;fill-rule:nonzero;fill:#591714;fill-opacity:1;" d="M 6.78125 4.0625 C 7.011719 4.148438 7.242188 4.171875 7.488281 4.171875 C 7.515625 4.171875 7.542969 4.171875 7.574219 4.171875 C 7.867188 4.167969 8.140625 4.109375 8.410156 3.992188 C 8.738281 3.863281 9.148438 3.96875 9.460938 4.09375 C 9.753906 4.222656 9.976562 4.402344 10.195312 4.628906 C 10.21875 4.648438 10.238281 4.671875 10.261719 4.695312 C 10.742188 5.195312 10.828125 5.851562 10.921875 6.507812 C 10.929688 6.574219 10.941406 6.644531 10.949219 6.710938 C 10.96875 6.851562 10.988281 6.988281 11.007812 7.128906 C 11.035156 7.308594 11.058594 7.484375 11.085938 7.664062 C 11.105469 7.804688 11.125 7.941406 11.144531 8.078125 C 11.152344 8.144531 11.164062 8.210938 11.171875 8.277344 C 11.1875 8.367188 11.199219 8.460938 11.210938 8.550781 C 11.21875 8.59375 11.21875 8.59375 11.222656 8.632812 C 11.273438 8.988281 11.273438 8.988281 11.222656 9.128906 C 11.0625 9.316406 10.804688 9.433594 10.597656 9.5625 C 10.570312 9.578125 10.542969 9.59375 10.515625 9.613281 C 10.398438 9.683594 10.28125 9.757812 10.160156 9.824219 C 10.144531 9.832031 10.125 9.84375 10.105469 9.851562 C 10.0625 9.878906 10.015625 9.902344 9.96875 9.925781 C 9.808594 10.078125 9.816406 10.421875 9.789062 10.632812 C 9.777344 10.691406 9.769531 10.75 9.761719 10.804688 C 9.753906 10.867188 9.746094 10.929688 9.738281 10.988281 C 9.71875 11.117188 9.699219 11.246094 9.683594 11.371094 C 9.632812 11.734375 9.578125 12.097656 9.527344 12.460938 C 9.5 12.664062 9.472656 12.863281 9.441406 13.0625 C 9.425781 13.191406 9.40625 13.316406 9.390625 13.445312 C 9.375 13.542969 9.359375 13.640625 9.347656 13.738281 C 9.34375 13.773438 9.335938 13.804688 9.332031 13.84375 C 9.273438 14.238281 9.179688 14.578125 8.855469 14.835938 C 8.605469 15.011719 8.339844 15.015625 8.042969 15.015625 C 8 15.015625 7.953125 15.015625 7.910156 15.015625 C 7.820312 15.015625 7.730469 15.015625 7.640625 15.015625 C 7.523438 15.015625 7.40625 15.015625 7.292969 15.015625 C 7.203125 15.015625 7.113281 15.015625 7.023438 15.015625 C 6.980469 15.015625 6.9375 15.015625 6.894531 15.015625 C 6.578125 15.015625 6.300781 14.984375 6.058594 14.765625 C 6.035156 14.746094 6.011719 14.726562 5.988281 14.707031 C 5.761719 14.425781 5.703125 14.121094 5.65625 13.773438 C 5.648438 13.726562 5.644531 13.675781 5.636719 13.625 C 5.617188 13.488281 5.597656 13.351562 5.578125 13.214844 C 5.558594 13.058594 5.535156 12.902344 5.511719 12.746094 C 5.476562 12.476562 5.4375 12.207031 5.402344 11.9375 C 5.394531 11.886719 5.394531 11.886719 5.386719 11.835938 C 5.363281 11.660156 5.335938 11.484375 5.3125 11.308594 C 5.289062 11.136719 5.265625 10.964844 5.242188 10.792969 C 5.234375 10.726562 5.222656 10.660156 5.214844 10.597656 C 5.203125 10.507812 5.191406 10.417969 5.179688 10.328125 C 5.175781 10.300781 5.171875 10.273438 5.167969 10.246094 C 5.152344 10.132812 5.140625 10.066406 5.070312 9.976562 C 5.011719 9.933594 4.953125 9.890625 4.890625 9.855469 C 4.867188 9.84375 4.84375 9.828125 4.820312 9.8125 C 4.792969 9.800781 4.769531 9.785156 4.746094 9.769531 C 4.691406 9.738281 4.640625 9.707031 4.585938 9.675781 C 4.558594 9.660156 4.53125 9.644531 4.503906 9.628906 C 4.375 9.550781 4.242188 9.46875 4.113281 9.386719 C 4.089844 9.375 4.066406 9.359375 4.042969 9.34375 C 4.019531 9.328125 4 9.316406 3.976562 9.300781 C 3.949219 9.285156 3.949219 9.285156 3.917969 9.265625 C 3.828125 9.203125 3.785156 9.160156 3.75 9.054688 C 3.753906 8.699219 3.816406 8.347656 3.867188 8 C 3.875 7.9375 3.882812 7.875 3.894531 7.8125 C 3.910156 7.683594 3.929688 7.554688 3.949219 7.425781 C 3.972656 7.261719 3.996094 7.097656 4.019531 6.933594 C 4.035156 6.804688 4.054688 6.675781 4.074219 6.546875 C 4.082031 6.488281 4.089844 6.425781 4.097656 6.367188 C 4.199219 5.644531 4.363281 5.066406 4.890625 4.539062 C 4.914062 4.519531 4.933594 4.496094 4.957031 4.476562 C 5.429688 4.015625 6.164062 3.804688 6.78125 4.0625 Z M 6.78125 4.0625 "/>
                                <path id=${nextNum} style=" stroke:none;fill-rule:nonzero;fill:#591714;fill-opacity:1;" d="M 8.203125 0.117188 C 8.230469 0.128906 8.257812 0.140625 8.285156 0.152344 C 8.6875 0.351562 9 0.6875 9.148438 1.109375 C 9.3125 1.601562 9.296875 2.078125 9.082031 2.550781 C 8.847656 2.992188 8.472656 3.296875 8 3.457031 C 7.558594 3.589844 7.066406 3.527344 6.65625 3.324219 C 6.21875 3.0625 5.925781 2.667969 5.777344 2.183594 C 5.675781 1.742188 5.746094 1.253906 5.960938 0.859375 C 6.160156 0.550781 6.382812 0.332031 6.710938 0.167969 C 6.726562 0.15625 6.746094 0.148438 6.769531 0.136719 C 7.199219 -0.0742188 7.765625 -0.078125 8.203125 0.117188 Z M 8.203125 0.117188 "/>
                                </g>
                                </svg>`
                        newElement.classList.add('element-second','eachElement');
                        newElement.id = nextNum;
                        newElement.style.top = `${(nextNum-1)*10 - 2}px`;
                        // newElement.style.backgroundColor = colorP2

                        let firstSquare = document.querySelector('.moveSection div:nth-child(1)');
                        firstSquare.classList.add('firstDiv');
                        firstSquare.append(newElement);

                        active2.push(newElement);
                        positions2.push(0);
                        newElement.style.transform = board2[0];

                        newElement.addEventListener('click', async (ev) => {
                          let index = active2.findIndex((item)=>parseInt(item.id) === parseInt(ev.target.id))
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
                        pieceBtn.innerHTML = active2[i].id;
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
                        pieceBtn.innerHTML = active2[i].id;
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
        checkWinner();
    })
})