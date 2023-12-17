document.addEventListener('DOMContentLoaded', () => {
    let el_start_btn = document.querySelector('.launch');
    let els_cards = document.querySelectorAll('.card');
    let activeCards = 0;
    let launchGame = true;
    let firstCard, secondCard;
    const time = 2000;

    function turnoverAllCards(){
        if(els_cards.length > 0){
            els_cards.forEach(el => {
                el.classList.toggle('game-start')
            })
        }
    }
    function generateCards(){
        let arr = [];
        let model = [];
    
        for (let i = 0; i < Math.ceil(els_cards.length / 2); i++) {
            arr.push(i)
            arr.unshift(i)
        }
    
        for(let i = 0; i < els_cards.length; i++){
            let a = Math.floor(Math.random() * arr.length)
            model.push(+arr.splice(a, 1))
        }
    
        let index_of_arr = 0
        els_cards.forEach(el => {
            if(model[index_of_arr] == 0) el.lastElementChild.firstElementChild.classList.add('circle'), el.setAttribute('data-id', 0)
            if(model[index_of_arr] == 1) el.lastElementChild.firstElementChild.classList.add('triangle'), el.setAttribute('data-id', 1)
            if(model[index_of_arr] == 2) el.lastElementChild.firstElementChild.classList.add('heart'), el.setAttribute('data-id', 2)
            if(model[index_of_arr] == 3) el.lastElementChild.firstElementChild.classList.add('pacman'), el.setAttribute('data-id', 3)
            if(model[index_of_arr] == 4) el.lastElementChild.firstElementChild.classList.add('ribbon'), el.setAttribute('data-id', 4)
            index_of_arr++
        })
    }

    function disabledCards() {
        firstCard.classList.add('disabled')
        secondCard.classList.add('disabled')
    }
    function unflipTwoCards() {
        setTimeout(() => {
            firstCard.classList.remove('game-start');
            secondCard.classList.remove('game-start');
            
            activeCards = 0;
            firstCard = secondCard = false;
        }, 400)
    }
    const cardPoleActive = (e) => {
            if(e.target.parentNode.classList.contains('card')){
                const target = e.target.parentNode;
                
                if(target == firstCard) return;
                target.classList.add('game-start');

                if(activeCards >= 1){
                    activeCards = 0;
                    secondCard = target
                    if(firstCard.dataset.id == secondCard.dataset.id) {
                        disabledCards()
                    } else {
                        unflipTwoCards()
                    }
                } else {
                    activeCards++;
                    firstCard = target;
                }
            }

            // if(document.querySelectorAll('.disabled').length == els_cards.length) {
            //     el_popup_win.classList.add('active')
            // }
            
    }
    function deleteCards() {
        els_cards.forEach(el => {
            el.lastElementChild.firstElementChild.classList.remove('circle', 'triangle', 'heart', 'pacman','ribbon')
            el.classList.remove('disabled')
        })
    }
    document.addEventListener('click', cardPoleActive)
    turnoverAllCards()


    el_start_btn.addEventListener('click', () => {
        if(launchGame){
            deleteCards()
            generateCards()
            setTimeout(turnoverAllCards, time);
            launchGame = false
            el_start_btn.textContent = 'Finish'

        } 
        else {
                // el_popup_win.classList.remove('active')
                el_start_btn.textContent = 'Start';
                for (let i = 0; i < els_cards.length; i++) {
                    if(els_cards[i].classList.contains('game-start')) continue;
                    els_cards[i].classList.add('game-start')
                }
                launchGame = true
            }
        })
  
})