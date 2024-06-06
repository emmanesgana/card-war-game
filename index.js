let deckId
let computerScore = 0
let playerScore = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const computerScoreEl = document.getElementById("computer-score")
const playerScoreEl = document.getElementById("player-score")
const remainingCardsEl = document.getElementById("remaining")
const headerTextEl = document.getElementById("header-text")

async function handleClick() {
   const res = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
   const data = await res.json()
        deckId = data.deck_id
        remainingCardsEl.textContent = `Remaining Card: ${data.remaining}`
        console.log(deckId)
        drawCardBtn.disabled = false
}

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", async () => {
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
        cardsContainer.children[0].innerHTML = `
            <img src=${data.cards[0].image} class="card" />
        `
        cardsContainer.children[1].innerHTML = `
            <img src=${data.cards[1].image} class="card" />
        `
        const winnerText = determineCardWinner(data.cards[0], data.cards[1])
        remainingCardsEl.textContent = `Remaining Card: ${data.remaining}`
        headerTextEl.textContent = winnerText
        
        if (data.remaining === 0){
            drawCardBtn.disabled = true
            if (computerScore > playerScore){
                headerTextEl.textContent = 'Computer Wins!'
            } else if (computerScore < playerScore){
                headerTextEl.textContent = 'Player Wins!'
            } else {
                headerTextEl.textContent = 'Tie Game!'
            }
        }
})
/**
 * Challenge:
 * 
 * Try to determine which of the 2 cards is the "winner" (has higher value)
 * Aces are the card with the highest "score"
 * 
 * In parts:
 * 
 * 1. Create a function that takes 2 card objects as parameters, 
 * `card1` and `card2`. These card objects have a property called
 * `value`, which can be any one of the following strings, in
 * order of rising "score":
 * 
 * "2", "3", "4", "5", "6", "7", "8", "9", 
 * "10", "JACK", "QUEEN", "KING", "ACE"
 * 
 * I.e. "2" is the lowest score and "ACE" is the highest.
 * 
 * The function should determine which of the 2 cards (`card1`
 * or `card2`) has the higher score, or if they have the same score.
 * 
 * Log which card wins (or "It's a tie!" 
 * if they're the same) to the console
 */

function determineCardWinner(card1, card2){
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2valueIndex = valueOptions.indexOf(card2.value)
    
    if(card1ValueIndex > card2valueIndex){
        computerScore++
        computerScoreEl.textContent = `Computer Score: ${computerScore}`
        return 'Computer wins!'
    }else if(card1ValueIndex < card2valueIndex){
        playerScore++
        playerScoreEl.textContent = `Player Score: ${playerScore}`
        return 'You win!'
    }else {
        return 'War!'
    }
    
}