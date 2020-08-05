// variables 
const DOWN = {x: 0, y: 1}
const LEFT = {x: -1, y: 0}
const RIGHT = {x: 1, y: 0}
const ROTATE = {x: 0, y: 0} // might change
const S = [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
]
const Z = [
    [2, 2, 0],
    [0, 2, 2],
    [0, 0, 0],
]
const T = [
    [0, 3, 0],
    [3, 3, 3],
    [0, 0, 0],
]
const L = [
    [0, 4, 0],
    [0, 4, 0],
    [0, 4, 4],
]
const J = [
    [0, 5, 0],
    [0, 5, 0],
    [5, 5, 0],
]
const I = [
    [0, 6, 0, 0],
    [0, 6, 0, 0],
    [0, 6, 0, 0],
    [0, 6, 0, 0],
]
const O = [
    [7, 7],
    [7, 7]
]
const SHAPES = [S, Z, T, L, J, I, O]


// functions

const collide = state =>{
    const pos = nextPos(state)    
    for (let y = 0; y < state.shape.length; y++){
        for (let x = 0; x < state.shape[0].length; x++) {
            if ((state.shape[y][x] !== 0 && state.base[y + pos.y][x + pos.x] !== 0) ||
                (state.shape[y][x] !== 0 && pos.y + y == state.base.length - 1)){
                    return true
                }
        }
    }
    
    return false
}

const computeShape = state => equal(ROTATE)(state.move[0]) ? rotateShape(state) : state.shape

const createMatrix = rows => cols => {
    const matrix = []
    for (let i = 0; i < rows; i++){
        matrix.push(new Array(cols).fill(0))
    }
    return matrix
}

const enqueue = state => move => validMove(state)(move) ? Object.assign(
    {}, state, {move: state.move.concat([move])}
) : state

const equal = o1 => o2 => o1.x === o2.x && o1.y === o2.y

const joinTop = state => {
    state.shape.forEach((row, y) =>{
        row.forEach((val, x) =>{
            if (val !== 0){
                state.base[y + state.pos.y][x + state.pos.x] = val
            }
            
        })
    })
    
    return state.base
}
const rand = max => Math.floor(Math.random() * max) // returns random number from 0 to max - 1

// remove complete level
const removeComplete = state => {
    state.base.keys().forEach((key) => {
        if (state.base.key.length == state.cols){
            delete state.base.key
        }
    })
    return state
}
const rotateShape = state => {    
    let shape = [...state.shape]    
    for(let y = 0; y < shape.length; y++){
        for (let x = 0; x < y; x++){
            [shape[x][y], shape[y][x]] = [shape[y][x], shape[x][y]]
        }
    }
    shape.forEach(row => row.reverse())
    return shape

}
const shapePadX = state => {
    let padL = state.shape.length
    let padR = 0
    state.shape.forEach(arr => {
        arr.forEach((val, index) => {
            if (val !== 0) {
                padL = Math.min(padL, index)
                padR = Math.max(padR, index)
            }
        })
    })
    return [padL, padR]
}
const validMove = state => move => {
    if (move === ROTATE){
        return true
    }
    const [padL, padR] = shapePadX(state)
    return state.pos.x + move.x + padL >= 0 && state.pos.x + move.x + padR < state.cols
}
const validPos = state =>{
    let padB = 0
    state.shape.forEach((arr, index) => {
        if (arr.some(val => val !== 0)){
            padB = Math.max(padB, index)
        }
    })
    return state.pos.y + padB + 1< state.rows
}
const willJoin = state => ({})

// next values for state properties
const nextBase = state => state.base

const nextfall = state => ({})

const nextMove = () => state.move.length > 0 ? state.move.slice(1) : state.move

const nextPos = state => validPos(state) ? 
(state.move.length == 0 ? {x: state.pos.x, y: state.pos.y + 1} 
    : {x: state.pos.x + state.move[0].x, y: state.pos.y + state.move[0].y}) 
    : state.pos 

const nextScore = state => willJoin(state) ? ({}) : state.score // ** COMPLETE LATER**

const nextShape = state => state.move.length != 0 ? computeShape(state) : state.shape


// initial game state
const initState = () => ({
    rows: 50,
    cols: 30,
    get base(){
        return createMatrix(this.rows)(this.cols) // 2d array with width cols and height rows
    }, 
    shape: T,    
    fall: true,
    score: 0,
    get pos(){
        return {x: (this.cols/2) - 1 , y: 0}
    },
    move: []
})


// next game state
const nextState = state => {
    if (collide(state)){
        return {
            rows: state.rows,
            cols: state.cols,
            base: joinTop(state) ,
            shape: SHAPES[rand(SHAPES.length)],    
            fall: state.fall,
            score: state.score,
            pos: {x: (state.cols/2) - 1, y: 0},
            move: nextMove()
        }
    }
    return {
    rows: state.rows,
    cols: state.cols,
    base: nextBase(state),
    shape: nextShape(state),    
    fall: state.fall,
    score: state.score,
    pos: nextPos(state),
    move: nextMove()
    }
}


module.exports = {initState, nextState, enqueue, LEFT, RIGHT, DOWN, ROTATE}