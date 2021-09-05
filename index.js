var rect =  require('./rectangle');

function solveRectangle(l,b){
    console.log("Solving for rectanfgle for l = " + l + "for b " + b);
    if(l <= 0 || b <=0){
        console.log("negative dimensions are not allowed");
    } else {
        console.log("area of  rectanglr" + rect.area(l,b));
        console.log("perimeter ofrectangle  is " + rect.perimeter(l,b))
    }
}

solveRectangle(2,4)