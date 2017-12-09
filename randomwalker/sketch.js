var x;
var y;
// think of a way to avoid overstepping !!
function setup() 
{
    createCanvas(400, 600);
    background(100, 50, 255);
    x = width/2;
    y = height/2;

}

function draw() 
{
    stroke(255);
    strokeWeight(2);
    point(x,  y);
    var r = floor(random(4));
	console.log(r);
	switch(r)
	{
		case 0: x+=1; break;
        case 1: x-=1; break;
        case 2: y+=1; break;
        case 3: y-=1; break;
	}
    if (x>(width-20))   x=width-21;
    if (x<20)           x=21;
    if (y>(height-20))  y=height-21;
    if (y<20)           y=21;
}