let state = initState()
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// helper functions
const color = val => {
    switch (val) {
        case 1:
            return 'lime';
        case 2:
            return 'red'
        case 3:
            return 'magenta'
        case 4:
            return 'orange'
        case 5:
            return 'blue'
        case 6:
            return 'cyan'
        case 7:
            return 'yellow'
        // default:
        //     return 'rgb(55, 62, 58)'
    }
}
const x = val => val * canvas.width / state.cols
const y = val => val * canvas.height / state.rows

const drawShape = () =>{
    state.shape.forEach((row, j) =>{
        row.forEach((val, i) =>{
            if (val !== 0){
                ctx.fillStyle = color(val)
                ctx.fillRect(x(state.pos.x) + x(i), y(state.pos.y) + y(j), x(1), y(1))
            }
        })
    })
}

const drawBase = () =>{
    state.base.forEach((row, j) =>{
        row.forEach((val, i) =>{
            if (val !== 0){
                ctx.fillStyle = color(val)
                ctx.fillRect(x(i), y(j), x(1), y(1))
            }
        })
    })
}

const draw = () => {
    //draw canvas
    ctx.fillStyle = 'rgb(30, 30, 30)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // draw shape  
    drawShape()

    // draw base
    drawBase()
}


const step = t1 => t2 => {      
    if (t2 - t1 > 1000) {        
        state = nextState(state)
        draw()        
        window.requestAnimationFrame(step(t2))
    } else {
        window.requestAnimationFrame(step(t1))
    }    
}

const move = () => {
    state = nextState(state)
    draw()
}



const eventListeners = () => {
    document.addEventListener('keydown', (e) =>{
        switch(e.key){
            case 'a' : case 'ArrowLeft': case 'j':
                state = enqueue(state)(LEFT)
                move()
                break;
            case 'd' : case 'ArrowRight': case 'l':
                state = enqueue(state)(RIGHT)
                move()
                break;
            case 's' : case 'ArrowDown': case 'k':
                state = enqueue(state)(DOWN)
                move()
                break;
            case 'w' : case 'ArrowUp': case 'i':
                state = enqueue(state)(ROTATE)
                move()
                break;
        }
        
    })
}

document.addEventListener('DOMContentLoaded', (e) =>{
    draw()
    eventListeners()
    window.requestAnimationFrame(step(0))
})