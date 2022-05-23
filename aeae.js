arrayy=[];
statuss="";
inp="";
function setup(){
    canvas = createCanvas(640,420);
    canvas.center();
    videoo=createCapture(VIDEO);
    videoo.size(640,420);
    videoo.hide();
    det=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("statu").innerHTML="Status: Object Detecting";
}
function start(){
    inp=document.getElementById("inpp").value;
    console.log(inp);
}
function modelLoaded(){
    console.log("ML5 Is Loaded");
    statuss=true;
}
function startDetec(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        arrayy=results;
    }
}
function draw(){
    image(videoo,0,0,640,420);
    if(statuss!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        det.detect(videoo,startDetec);
        for(var i=0;i<arrayy.length;i++){   
            fill(r,g,b);
            noFill();
            stroke(r,g,b);
            conf=floor(arrayy[i].confidence*100);
            text(arrayy[i].label+" "+conf+"%",arrayy[i].x+15,arrayy[i].y+15);
            rect(arrayy[i].x,arrayy[i].y,arrayy[i].width,arrayy[i].height);
            
            document.getElementById("statu").innerHTML="Object Detected."
            if(arrayy[0].label==inp){
                document.getElementById("obj").innerHTML=inp+" detected."
            }
            else{
                document.getElementById("obj").innerHTML=inp+" not detected."
            }
    }
}
}