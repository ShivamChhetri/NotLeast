let box=document.getElementById("grid-box");  // grid boxes
let grid=3;
let grid2=grid*grid;
let lastRandom;  // stores the position of last picture
let n=-1;  // no. of iterartion starting from 0
let A=[];  // stores random pic values
let ran=[]; // stores random postion in  matrix

window.addEventListener("load",()=>{
    // let root=document.querySelector(":root");
    // root.style.setProperty('--grid-temp',"repeat("+grid+"/fr)");
    for(let i=1;i<=grid2;i++){
          document.getElementById(i).classList.remove("hide");      
    }  
});




// game start function
function start(){
    time=60;
    ranPic();
    display();
    n++;  // n becomes zero first time
}

// gives an array of random pictures
function ranPic(){
    while(A.length < grid2){
        var randomnumber = Math.floor(Math.random()*grid2) + 1;
        if(A.indexOf(randomnumber) > -1) continue;
        A[A.length] = randomnumber;
    }
}


// displays pictures in the matrix
function display(){
    ranPos();
    for(let i=1;i<=2*grid2;i+=2){
        box.childNodes[i].firstChild.data=null;
        box.childNodes[i].style.backgroundImage=null;
    }
    for(let i=0;i<=n+2;i++){
        box.childNodes[ran[i]].style.backgroundImage="url('./images1/animal"+A[i]+".png')";
    }
}

// give random position to pictures
function ranPos(){
    ran=[];
    while(ran.length < n+3){
        var randomnumber = (Math.floor(Math.random()*grid2)*2)+1;
        if(ran.indexOf(randomnumber) > -1) continue;
        ran[ran.length] = randomnumber;
    }
    lastRandom=ran[ran.length-1];
}




// after click check the answer
box.addEventListener("click",(event)=>{
    if(n==0){
        // condition for first click
        display();
    }
    if(n){
        if(event.srcElement.attributes.id==box.childNodes[lastRandom].firstChild.parentElement.attributes.id){
            count+=10;
            if((count/10)==(grid2-2)){
                sweetAlert("You Win");;
                startFresh();
            }else{
                score.innerHTML=count;
                display(); 
            }
        }
        else{  
            sweetAlert("Game Over!");
            startFresh();
            n--;
        }
    }
    n++;   
});





// css javascript
let board= document.getElementById("board");
let startBtn= document.getElementById("start");
let inst= document.getElementById("inst");
let score_board= document.getElementById("score-board");
let score=document.getElementById("score");
let count=0;
let attempt=[];
let attemptCount=0;

// starting point of interaction
startBtn.addEventListener("click",()=>{
    if(startBtn.innerHTML=="Start"){
        startBtn.innerHTML="Restart";
        board.classList.remove('hide');
        inst.classList.add('hide');
        score.innerHTML=count;
        countdown();
        start();
    }else{
        startFresh();
    }

})

let timer=document.getElementById("timer");
let time=60;
let interval;

function countdown(){
    interval=setInterval(()=>{
        if(time>0){
            timer.innerHTML=time--;
        }
        else{
            sweetAlert("Times Up!");
            startFresh();
        }
        
    },1000);
}

// logic for re-attempt
let attemp=document.getElementById("attempt");
function startFresh(){ 
    startBtn.innerHTML="Start";
    board.classList.add('hide');
    inst.classList.remove('hide');
    score.innerHTML=count;
    checkAttempt();
    reinitialise();
}

function checkAttempt(){
    attempt[attemptCount]=count;
    for(let i=attemptCount;i<attempt.length;i++){
        let li=document.createElement('li');
        li.innerHTML="<strong>"+attempt[i]+" in "+(60-time)+" seconds</strong>";
        attemp.appendChild(li);
    }
    attemptCount++;  
}
function reinitialise(){
    clearInterval(interval);
    n=-1;
    A=[]; 
    count=0;
}

function sweetAlert(msg){
    swal(msg, "Your Score:"+count);
}















    


