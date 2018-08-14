let canvas = document.getElementsByTagName(`canvas`)[0]
    , iconList = document.getElementsByClassName(`iconList`)[0].children
    , eraserButton = document.getElementsByClassName(`eraser`)[0]
    , penButton = document.getElementsByClassName(`pen`)[0]
    , brushButton = document.getElementsByClassName(`brush`)[0]
    , paletteButton = document.getElementsByClassName(`palette`)[0]
    , downloadButton = document.getElementsByClassName(`download`)[0]
    , paletteBox = document.getElementsByClassName(`paletteBox`)[0]
    , colorShow = document.getElementsByClassName(`colorShow`)[0]
    , context = canvas.getContext(`2d`)
    , [areYouPaint, areYouClear, lastX, lastY, lineWidth] = [false, false, 0, 0, 2]
for (let i = 0; i < iconList.length; i++) {
    iconList[i].addEventListener(`click`, ((k) => {
        return () => {
            for (let j = 0; j < iconList.length; j++) {
                iconList[j].classList.remove(`active`)
            }
            iconList[k].classList.add(`active`)
        }
    })(i))
}
eraserButton.addEventListener(`click`, () => {
    areYouClear = true
})
penButton.addEventListener(`click`, () => {
    areYouClear = false
    lineWidth = 2
})
brushButton.addEventListener(`click`, () => {
    areYouClear = false
    lineWidth = 6
})
paletteButton.addEventListener(`click`, () => {
    paletteBox.click()
    paletteBox.onchange = () => {
        context.strokeStyle = paletteBox.value
        colorShow.style.background = paletteBox.value
    }
})
downloadButton.addEventListener(`click`, () => {
    let pngData = canvas.toDataURL(`img/canvas`)
    let pngA = document.createElement(`a`)
    document.body.appendChild(pngA)
    pngA.href = pngData
    pngA.download = `新建图片`
    pngA.click()
})
if (document.body.ontouchstart !== undefined) {
    resizeCanvas(50)
    window.onresize = () => {
        resizeCanvas(50)
    }
    canvas.ontouchstart = (e) => {
        let [x, y] = [e.touches[0].clientX - 50, e.touches[0].clientY - 8]
            ;[lastX, lastY] = [x, y]
        areYouPaint = true
        if (areYouClear) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            paintDot(x, y)
        }
    }
    canvas.ontouchend = () => {
        areYouPaint = false
    }
    canvas.ontouchmove = (e) => {
        let [x, y] = [e.touches[0].clientX - 50, e.touches[0].clientY - 8]
        if (areYouPaint) {
            if (areYouClear) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                paintLine(x, y)
            }
        }
    }
} else {
    resizeCanvas(50)
    window.onresize = () => {
        resizeCanvas(50)
    }
    canvas.onmousedown = (e) => {
        let [x, y] = [e.offsetX, e.offsetY]
            ;[lastX, lastY] = [x, y]
        areYouPaint = true
        if (areYouClear) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            paintDot(x, y)
        }
    }
    canvas.onmouseup = () => {
        areYouPaint = false
    }
    canvas.onmousemove = (e) => {
        let [x, y] = [e.offsetX, e.offsetY]
        if (areYouPaint) {
            if (areYouClear) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                paintLine(x, y)
            }
        }
    }
}
function resizeCanvas(margin) {
    canvas.width = innerWidth - 2 * margin
    canvas.height = innerHeight - 2 * margin
}
function paintDot(x, y, size = 1) {
    context.beginPath()
    context.arc(x, y, size, 0, 2 * Math.PI)
    context.fill()
}
function paintLine(x, y) {
    context.beginPath()
    context.lineWidth = lineWidth
    context.moveTo(lastX, lastY)
    context.lineTo(x, y)
    context.stroke()
        ;[lastX, lastY] = [x, y]
}