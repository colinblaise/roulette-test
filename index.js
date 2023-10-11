const wheel = [-1,...Array.from(Array(37).keys())];

// how much money we have
let bankroll = 250;

// the highest amount of money we have
let maxBankroll = 250;

// the current bet
let currentBet = 1;

// the previous bet
let previousBet = 0;

// the bankroll that we walk away at
const targetBankroll = 300;

// highest win streak
let highestWinStreak = 0;
let highestLostStreak = 0;

const data = [];

// returns a number on the roulette wheel
function spinWheel() {
    return Math.floor(Math.random() * 38 + 1);
}


function didWin(number) {
    // we win if a 13-24 come up
    return number >= 13 && number <= 24;
}

function payout(number) {
    const bet = currentBet;
    // if we won, then increase our bankroll by the payout, and reset our bet
    // otherwise, subtract the bet from our bankroll
    if (didWin(number)) {
        //console.log("win!")
        // log our new highest bankroll
        if (bankroll > maxBankroll) maxBankroll = bankroll;
        // payout
        bankroll += bet * 2;
        // reset bet counters
        previousBet = 0;
        currentBet = 1;
    } else {
        //console.log("loss!")
        // subtract our loss
        bankroll -= bet;
        // increase our bet by the next number in the fibonacci sequence
        const newBet = previousBet + currentBet;
        previousBet = currentBet;
        currentBet = newBet;
    }
}

function play(spins) {
    const number = spinWheel();
    //console.log("\n");
    //console.log("spin #", spins, "current bet:", currentBet, "bankroll:", bankroll, "landed on #", number)
    payout(number);
    //console.log("ending bankroll", bankroll);
}

function simulateLots() {
    let wins = 0;
    let losses = 0;
    for (var i = 0; i <= 10000; i++) {
        let spins = 0;
        while (bankroll <= targetBankroll && bankroll >= currentBet) {
            play(spins);
           spins++;
        }
    
        const didWin = bankroll > targetBankroll;

        if (didWin) {
            wins++;
        }
        else  {
            losses++;
        }

        data.push({
            spins: spins,
            win: bankroll > targetBankroll
        });
    
        bankroll = 250;
        currentBet = 1;
        previousBet = 0;
    }
    return {
        wins,
        losses
    }
}



// console.log(`Bankroll after ${spins} spins`, bankroll)
// console.log(`max bankroll was $${maxBankroll}`);

const { wins, losses } = simulateLots();
console.log("total attempts", data.length);
console.log("total wins", data.filter(a => a.win).length);
console.log("total losses", data.filter(a => !a.win).length);
console.log("expected win rate", wins/(wins+losses) * 100 + "%");
console.log(wheel.length);