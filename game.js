
var colorarray=['green','red','yellow','blue'];
var sysGenArray=[];
var userSelectedArray=[];
var i=0;
var sysPlay=0;
var target=0;
var highScore=0;
var level=1;
$('#level').fadeToggle();
$('#Start').click(function(){ 
    if(sysPlay===0){sysPlay=1;
    sysGenArray=[];
    userSelectedArray=[]
    setTimeout(sysgen(),5000);}
    $('#Start').fadeOut();
    $('h1').text('Playing');
    highScore = 0;
    level=1;
    $('#high-score').text(highScore);
    $('#Level').text(level);
})

$('.btn').click(function(event){
    
        if(sysPlay===0){
            User(i,event);
            
    }
});
function sysgen(){
    var randomcolour = colorarray[Math.floor(Math.random() * 4)];
    sysGenArray.push(randomcolour);
    trigger();
    
     
    
}
function trigger(){
    sysGenArray.forEach((key,index) => {
        setTimeout(()=>{
        var color = key;
        var audio = new Audio('./sounds/'+color+'.mp3');
        audio.play();
        $('#'+color).fadeOut('fast').delay(10).fadeIn('fast'); 
    }, (index+2)*600); target=index;});
    setTimeout(()=>{sysPlay=0;},(sysGenArray.length+2)*600);
}
function User(k,event){
        userSelectedArray.push(event.target.classList[1])
        if(sysGenArray[k]==event.target.classList[1]){
            if(sysGenArray.length>userSelectedArray.length){
                $('#'+event.target.classList[1]).addClass('pressed');
                var audio = new Audio('./sounds/'+event.target.classList[1]+'.mp3');
                audio.play();
                setTimeout(function(){$('#'+event.target.classList[1]).removeClass('pressed');},300);
                i++;
            }
            else{
                $('#'+event.target.classList[1]).addClass('pressed');
                var audio = new Audio('./sounds/'+event.target.classList[1]+'.mp3');
                audio.play();
                setTimeout(function(){$('#'+event.target.classList[1]).removeClass('pressed');},300);
                i=0;
                userSelectedArray=[];
                sysPlay=1;
                setTimeout(sysgen(),2000);
                highScore  =highScore+ target;
                level=target+1;
                $('#high-score').text(highScore);
                $('#Level').text(level);
            }
        }
        else if(sysGenArray[k]!==event.target.classList[1]){
            $('#'+event.target.classList[1]).addClass('pressed');
                var audio = new Audio('./sounds/wrong.mp3');
                audio.play();
                setTimeout(function(){$('#'+event.target.classList[1]).removeClass('pressed');},300);
                userSelectedArray=[];
                sysGenArray=[];
                i=0;
                sysPlay=0;
                $('h1').text('Wrong! Press to Retry');
                $('#Start').fadeIn();



        }
    
}
