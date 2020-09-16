const w : number = window.innerWidth 
const h : number = window.innerHeight
const parts : number = 3  
const scGap : number = 0.02 
const strokeFactor : number = 90 
const rFactor : number = 14.9 
const delay : number = 20 
const colors : Array<string> = [
    "#F44336",
    "#2196F3",
    "#009688",
    "#4CAF50",
    "#FF5722"
]
const backColor : string = "#bdbdbd"

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.divideScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {
    
    static drawCircle(context : CanvasRenderingContext2D, x : number, y : number, r : number) {
        context.beginPath()
        context.arc(x, y, r, 0, 2 * Math.PI)
        context.fill()
    } 

    static drawBallMover(context : CanvasRenderingContext2D, scale : number) {
        const sc1 : number = ScaleUtil.divideScale(scale, 0, parts)
        const sc2 : number = ScaleUtil.divideScale(scale, 1, parts)
        const sc3 : number = ScaleUtil.divideScale(scale, 2, parts)
        const r : number = Math.min(w, h) / rFactor 
        DrawingUtil.drawCircle(context, w / 2, r + (h - 2 * r) * sc2, r * (sc1 - sc3))
        for (var j = 0; j < 2; j++) {
            const sf2 : number = ScaleUtil.sinify(sc2)
            const x : number = -w / 2 + w * 0.5 * sf2
            const y : number = -h / 2 + h * sc2 
            context.save()
            context.translate(w / 2, h / 2)
            context.scale(1 - 2 * j, 1)
            DrawingUtil.drawCircle(context, x, y, r * (sc1 - sc3))
            context.restore()
        }
    } 

    static drawBMNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.fillStyle = colors[i]
        DrawingUtil.drawBallMover(context, scale)
    }
}
