import { Card } from './card';
import { Color } from './color';
import { Count } from './count';
import { Material } from './material';
import { Shape } from './shape';
import { iCard } from './iGame';

interface getMatchCount {
    gameCards: HTMLCollectionOf<Element>;
    match: number;
}

function createDeck(): iCard[] {
    let deck: iCard[] = [];
    let color: Color = new Color();
    let count: Count = new Count();
    let material: Material = new Material();
    let shape: Shape = new Shape();
    
    color.color.forEach(
        (color) => {
    
            count.count.forEach(
                (count) => {
    
                    material.material.forEach(
                        (material) => {
    
                            shape.shape.forEach(
                                (shape) => {
    
                                    deck.push({
                                        color: color.name,
                                        count: count.name,
                                        material: material.name,
                                        shape: shape.name
                                    });
                                }
                            );
                        }
                    );
                }
            );
        }
    );

    return deck;
}

function shuffleDeck(): iCard[] {
    let deck: iCard[] = createDeck();
    let currentIndex: number = deck.length;
    let temporary: iCard;
    let randomIndex: number;

    while( currentIndex !== 0 ) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporary = deck[currentIndex];
        deck[currentIndex] = deck[randomIndex];
        deck[randomIndex] = temporary;
    }

    return deck;
}

let shuffled: iCard[] = shuffleDeck();

function selectionMatchCheck(selection: iCard[]): boolean {
    let colorMatch: boolean = false;
    let countMatch: boolean = false;
    let materialMatch: boolean = false;
    let shapeMatch: boolean = false;
    
    colorMatch    = (selection[0].color     === selection[1].color)    ? (selection[0].color    === selection[2].color)    ? true : false : (selection[0].color    !== selection[1].color)    ? (selection[0].color    !== selection[2].color)    ? (selection[1].color    !== selection[2].color)    ? true : false : false : false;
    countMatch    = (selection[0].count     === selection[1].count)    ? (selection[0].count    === selection[2].count)    ? true : false : (selection[0].count    !== selection[1].count)    ? (selection[0].count    !== selection[2].count)    ? (selection[1].count    !== selection[2].count)    ? true : false : false : false;
    materialMatch = (selection[0].material  === selection[1].material) ? (selection[0].material === selection[2].material) ? true : false : (selection[0].material !== selection[1].material) ? (selection[0].material !== selection[2].material) ? (selection[1].material !== selection[2].material) ? true : false : false : false;
    shapeMatch    = (selection[0].shape     === selection[1].shape)    ? (selection[0].shape    === selection[2].shape)    ? true : false : (selection[0].shape    !== selection[1].shape)    ? (selection[0].shape    !== selection[2].shape)    ? (selection[1].shape    !== selection[2].shape)    ? true : false : false : false;

    return colorMatch && countMatch && materialMatch && shapeMatch;
}

function gameBoard(cards: number): iCard[] {
    let gameBoard: iCard[] = [];
    let gamei: number = 0;
    let gamec: number = cards;

    for( ; gamei < gamec; gamei++ ) {
        gameBoard.push(shuffled[gamei]);
        shuffled.splice(0, 1);
    }

    return gameBoard;
}

function gameBoardMatches(board: iCard[]): number {
    let match: number = 0;
    let mc: number = board.length;
    
    for ( let mi0: number = 0; mi0 < mc; mi0++ ) {
    
        for ( let mi1: number = mi0 + 1; mi1 < mc; mi1++ ) {
    
            for ( let mi2: number = mi1 + 1; mi2 < mc; mi2++ ) {
    
                if ( selectionMatchCheck([board[mi0], board[mi1], board[mi2]]) ) {
                    match++
                }
    
            }
        }
    }

    return match;
}

function getMatchCount(): getMatchCount {
    let gameCards: HTMLCollectionOf<Element> = document.getElementsByClassName('card');
    let gameCollection = cardCollection(gameCards);
    let match: number = gameBoardMatches(gameCollection);
    return {
        gameCards: gameCards,
        match: match
    };
}

function cardHTML(color: string, count: string, material: string, shape: string): HTMLDivElement {
    let div: HTMLDivElement = document.createElement('div');
    div.classList.add('card');
    div.setAttribute('data-color', color);
    div.setAttribute('data-count', count);
    div.setAttribute('data-material', material);
    div.setAttribute('data-shape', shape);

    div.innerHTML = `
        <p>${color}</p>
        <p>${count}</p>
        <p>${material}</p>
        <p>${shape}</p>
    `;

    return div;
}

function gameMatchText(): void {
    let matchFunction: any = getMatchCount();

    if (matchFunction.match) {
        let h2: HTMLElement = document.getElementById('set-matches');
        h2.innerHTML = `
            Match Count: <span>${matchFunction.match}</span>
        `;

        listen(matchFunction.gameCards);
    } else {
        addToGame();
    }
}

function generateBoard(cardData: iCard[]): void {
    let div: HTMLElement = document.getElementById('set-app');
    let i: number = 0;
    for ( ; i < cardData.length; i++ ) {
        div.appendChild(cardHTML(cardData[i].color, cardData[i].count, cardData[i].material, cardData[i].shape));
    }

    gameMatchText();
};

function deselect(): void {
    let cardSelection: HTMLCollectionOf<Element> = document.getElementsByClassName('card selected');
    let i: number = cardSelection.length - 1;
    for ( ; i > -1; i-- ) {
        cardSelection[i].classList.remove('selected');
    }
}

function cardCollection(cardSelection: HTMLCollectionOf<Element>): iCard[] {
    let collection: iCard[] = [];
    let i: number = 0;
    for ( ; i < cardSelection.length; i++ ) {
        collection.push({
            color: cardSelection[i].getAttribute('data-color'),
            count: cardSelection[i].getAttribute('data-count'),
            material: cardSelection[i].getAttribute('data-material'),
            shape: cardSelection[i].getAttribute('data-shape')
        });
    }
    return collection;
}

function removeFromGame(cardSelection: HTMLCollectionOf<Element>): void {
    let i: number = cardSelection.length - 1;
    for ( ; i > -1; i-- ) {
        cardSelection[i].parentNode.removeChild(cardSelection[i]);
    }
}

function addToGame(): void {
    let matchFunction: any = getMatchCount();
    if ((matchFunction.gameCards.length < 12) || (matchFunction.gameCards.length >= 12 && !matchFunction.match)) {
        generateBoard(gameBoard(3));
    }
}

function selection(): void {
    let cardSelection: HTMLCollectionOf<Element> = document.getElementsByClassName('card selected');
    if (cardSelection.length > 2) {
        let isSet: boolean = selectionMatchCheck(cardCollection(cardSelection));

        if (isSet) {
            removeFromGame(cardSelection);
            addToGame();
        } else {
            deselect();
        }
    }
}

function select(that: HTMLElement): void {
    that.classList.toggle('selected');
}

function listener(): void {
    select(this);
    selection();
}

function listen(cards: HTMLCollectionOf<Element>): void {
    let i: number = 0;
    for ( ; i < cards.length; i++ ) {
        cards[i].removeEventListener('click', listener, false);
        cards[i].addEventListener('click', listener, false);
    }
}

function init(): void {
    generateBoard(gameBoard(12));
};

init();
