let state = initState()
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const x = val => val * canvas.width / state.cols
const y = val => val * canvas.height / state.rows

ctx.fillStyle = 'rgb(55, 62, 58)'
ctx.fillRect(0, 0, canvas.width, canvas.height)

const draw = () => {
    //draw canvas
    ctx.fillStyle = 'rgb(55, 62, 58)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // draw shape  
    state.shape.forEach((row, j) =>{
        row.forEach((val, i) =>{
            if (val !== 0){
                ctx.fillStyle = 'red'
                ctx.fillRect(x(i), y(j), x(1), y(1))
            }
        })
    })
}


document.addEventListener('DOMContentLoaded', (e) =>{
    draw()
})