const rect =  require('./rectangle');

function solveRectangle(l,b){
    console.log("Solving for rectanfgle for l = " + l + "for b " + b);
    rect(l,b, (err,rectangle) => {
        if(err){
            console.log(err)
        } else {
            console.log("area of  rectangle for l " + l + "for b " + b +" = " + rectangle.area());
            console.log("perimeter ofrectangle  is " + rectangle.perimeter())
        }
    });
}


solveRectangle(2,4)