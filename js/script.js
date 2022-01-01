ViewportWidth = window.innerWidth;
ViewportHeight = window.innerHeight;

if(ViewportHeight<ViewportWidth){
    CanvasLength = ViewportHeight;
}
else{
    CanvasLength = ViewportWidth;
}

CanvasLength = (Math.floor(CanvasLength/96))*96;

document.getElementById('canvasDiv').innerHTML='<canvas id="snake" class="canvas" width="'+ CanvasLength +'" height="'+ CanvasLength +'"></canvas>';