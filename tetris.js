// variables 
const LEFT = {x: -1, y: 0}
const RIGHT = {x: 1, y: 0}
const SSHAPE = [{x: 0, y: 1},{x: 0, y: 2},{x: 1, y: 1},{x: 1, y: 0}]
const ZSHAPE = [{x: 0, y: 0},{x: 0, y: 1},{x: 1, y: 2},{x: 1, y: 1}]
const TSHAPE = [{x: 0, y: 0},{x: 1, y: 0},{x: 2, y: 0},{x: 1, y: 1}]
const LSHAPE = [{x: 0, y: 0},{x: 0, y: 1},{x: 0, y: 2},{x: 1, y: 2}]
const MIRRORLSHAPE = [{x: 0, y: 2},{x: 1, y: 2},{x: 1, y: 1},{x: 1, y: 0}]
const LINESHAPE = [{x: 0, y: 0},{x: 1, y: 0},{x: 2, y: 0},{x: 3, y: 0}]
const SQUARESHAPE = [{x: 0, y: 0},{x: 0, y: 1},{x: 1, y: 0},{x: 1, y: 1}]
const SHAPES = [SSHAPE, ZSHAPE, TSHAPE, LSHAPE, MIRRORLSHAPE, LINESHAPE, SQUARESHAPE]

// functions
const joined = state => ({})
const rand = max => Math.floor(Math.random() * max) // returns random number from 0 to max - 1

// next values for state properties
const nextBase = state => ({})

const nextfall = state => ({})

const nextMove = () => ([])

const nextPos = state => state.move.length == 0 ? {x: state.pos.x, y: state.pos.y + 1} : {x: state.pos.x + state.move[0].x, y: state.pos.y + 1}

const nextScore = state => joined(state) ? ({}) : state.score // ** COMPLETE LATER**

const nextShape = state => joined(state) ? [SHAPES[rand(SHAPES.length)]] : state.shape


// initial game state
const initState = () => ({
    rows: 30,
    cols: 20,
    base: [],
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
