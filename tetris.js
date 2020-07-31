// variables 
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
const SHAPES = [SSHAPE, ZSHAPE, TSHAPE, LSHAPE, MIRRORLSHAPE, LINESHAPE, SQUARESHAPE]

// functions
// remove complete level
const removeComplete = state => {
    state.base.keys().forEach((key) => {
        if (state.base.key.length == state.cols){
            delete state.base.key
        }
    })
    return state
}
const joinTop = state => {
    state = removeComplete(state)
    // get min level
    // check if next shape coordinates in base.minLevel
        // add to that level if not present
        // create new levels min - 1 for shape coordinates
}
const rand = max => Math.floor(Math.random() * max) // returns random number from 0 to max - 1
const rotateShape = state => ({})
const willJoin = state => ({})

// next values for state properties
const nextBase = state => willJoin(state) ? joinTop(state) : state.base

const nextfall = state => ({})

const nextMove = () => ([])

const nextPos = state => state.move.length == 0 ? {x: state.pos.x, y: state.pos.y + 1} : {x: state.pos.x + state.move[0].x, y: state.pos.y + 1}

const nextScore = state => willJoin(state) ? ({}) : state.score // ** COMPLETE LATER**

const nextShape = state => willJoin(state) ? [SHAPES[rand(SHAPES.length)]] : state.move.length != 0 ? rotateShape(state) : state.shape


// initial game state
const initState = () => ({
    rows: 30,
    cols: 20,
    base: {}, // obj with levels from 0 to rows - 1 as keys storing points (blocks) in arrays
    shape: [LINESHAPE],    
    fall: true,
    score: 0,
    pos: {x: cols / 2, y: 0},
    move: []
})

// next game state
const nextState = state => ({
    rows: state.rows,
    cols: state.cols,
    base: nextBase(state),
    shape: nextShape(state),    
    fall: nextfall(state),
    score: nextScore(state),
    pos: nextPos(state),
    move: nextMove()
})
