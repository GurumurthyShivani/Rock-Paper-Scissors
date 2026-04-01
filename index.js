let score = JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    losses:0,
    Ties:0
    };

    updateScoreElement();

    // if(!score){
    //     score = {
    //     wins:0,
    //     losses:0,
    //     Ties:0
    //     }
    // }
    
let isautoplaying = false;
let intervalId;

function autoplay(){
    if(!isautoplaying){
        intervalId = setInterval(() => {
        const player = pickComputerMove();
        playerMove(player);
        },1000);
        isautoplaying = true;
        document.querySelector('.js-autoplay').innerHTML = 'Stop';
    }else{
        clearInterval(intervalId);
        isautoplaying = false;
        document.querySelector('.js-autoplay').innerHTML = 'Auto play';
    } 
}

document.querySelector('.rock').addEventListener('click', () => {
    playerMove('✊');
})
document.querySelector('.paper').addEventListener('click', () => {
    playerMove('🖐️');
})
document.querySelector('.scissors').addEventListener('click', () => {
    playerMove('✌️');
})

document.body.addEventListener('keydown',(event) => {
    if(event.key === 'r'){playerMove('✊');}
    else if(event.key === 'p'){playerMove('🖐️');}
    else if(event.key === 's'){playerMove('✌️');}
})





function playerMove(player){
    let result = '';
    const computermove = pickComputerMove();

    if(player === '✊'){
        if(computermove === '✊'){
        result = 'Tie';
        }else if(computermove === '🖐️'){
            result = 'You Lose'
        }
        else if(computermove === '✌️'){
            result = 'You Win'
        }

    }else if(player === '🖐️'){
        if(computermove === '✊'){
        result = 'You Win';
        }else if(computermove === '🖐️'){
            result = 'Tie'
        }
        else if(computermove === '✌️'){
            result = 'You Lose'
        }

    }else if(player === '✌️'){
        if(computermove === '✊'){
        result = 'You Lose';
        }else if(computermove === '🖐️'){
            result = 'You Win'
        }
        else if(computermove === '✌️'){
            result = 'Tie'
        }
    }

    if(result === 'You Win'){
        score.wins+=1;
    }else if(result === 'You Lose'){
        score.losses+=1;
    }else if(result === 'Tie'){
        score.Ties+=1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You pick ${player}. Computer pick ${computermove}`
    
}


function updateScoreElement(){
    document.querySelector('.js-score').innerHTML= 
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.Ties}`;

}

let computermove = '';
function pickComputerMove(){
    const randomNum= Math.random();
    
    if(randomNum>=0 && randomNum<1/3){
        computermove = '✊';
    }else if(randomNum>=1/3 && randomNum<2/3){
    computermove ='🖐️';
    }else if(randomNum>=2/3 && randomNum<1){
        computermove ='✌️';
    }
    return computermove;
}

    
        