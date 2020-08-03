// variables 
const DOWN = {x: 0, y: 1}
const LEFT = {x: -1, y: 0}
const RIGHT = {x: 1, y: 0}
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

const enqueue = state => move => validMove(state)(move) ? Object.assign(
    {}, state, {move: state.move.concat([move])}
) : state
const joinTop = state => {
    state = removeComplete(state)
    // get min level
    // check if next shape coordinates in base.minLevel
        // add to that level if not present
        // create new levels min - 1 for shape coordinates
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
const rotateShape = state => ({})
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
const nextBase = state => willJoin(state) ? joinTop(state) : state.base

const nextfall = state => ({})

const nextMove = () => state.move.length > 0 ? state.move.slice(1) : state.move

const nextPos = state => validPos(state) ? 
(state.move.length == 0 ? {x: state.pos.x, y: state.pos.y + 1} 
    : {x: state.pos.x + state.move[0].x, y: state.pos.y + state.move[0].y}) 
    : state.pos 

const nextScore = state => willJoin(state) ? ({}) : state.score // ** COMPLETE LATER**

const nextShape = state => willJoin(state) ? [SHAPES[rand(SHAPES.length)]] : state.move.length != 0 ? rotateShape(state) : state.shape


// initial game state
const initState = () => ({
    rows: 50,
    cols: 30,
    base: {}, // obj with levels from 0 to rows - 1 as keys storing points (blocks) in arrays
    shape: T,    
    fall: true,
    score: 0,
    get pos(){
        return {x: (this.cols/2) - 1 , y: 0}
    },
    move: []
})


// next game state
const nextState = state => ({
    rows: state.rows,
    cols: state.cols,
    base: state.base,
    shape: state.shape,    
    fall: state.fall,
    score: state.score,
    // pos: {x: state.pos.x, y: state.pos.y + 1},
    // move: state.move,
    // base: nextBase(state),
    // shape: nextShape(state),    
    // fall: nextfall(state),
    // score: nextScore(state),
    pos: nextPos(state),
    move: nextMove()
})


module.exports = {initState, nextState, enqueue, LEFT, RIGHT, DOWN}