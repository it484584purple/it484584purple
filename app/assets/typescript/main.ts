import { Card } from './card';
import { Color } from './color';
import { Count } from './count';
import { Material } from './material';
import { Shape } from './shape';
import { iCard } from './iGame';

let color: Color = new Color();
let count: Count = new Count();
let material: Material = new Material();
let shape: Shape = new Shape();

function createDeck(): iCard[] {
    let deck: iCard[] = [];
    
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

let deck: iCard[] = createDeck();

function shuffleDeck(deck: iCard[]): iCard[] {
    let currentIndex: number = deck.length;
    let temporary: iCard;
    let randomIndex: number;

    while(currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporary = deck[currentIndex];
        deck[currentIndex] = deck[randomIndex];
        deck[randomIndex] = temporary;
    }

    return deck;
}

let shuffled: iCard[] = shuffleDeck(deck);

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

function setGameBoard(): iCard[] {
    let gameBoard: iCard[] = [];
    let gamei: number = 0;
    let gamec: number = 12;

    for( ; gamei < gamec; gamei++ ) {
        gameBoard.push(shuffled[gamei]);
    }

    return gameBoard;
}

let gameBoard: iCard[] = setGameBoard();

function gameBoardMatches(board: iCard[]): number {
    let match: number = 0;
    let mc: number = board.length;
    
    for (let mi0: number = 0; mi0 < mc; mi0++ ) {
    
        for (let mi1: number = mi0 + 1; mi1 < mc; mi1++) {
    
            for (let mi2: number = mi1 + 1; mi2 < mc; mi2++) {
    
                if (selectionMatchCheck([gameBoard[mi0], gameBoard[mi1], gameBoard[mi2]])) {
                    match++
                }
    
            }
        }
    }

    return match;
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

function generateBoard(): void {
    let div: HTMLElement = document.getElementById('set-card-app');
    let i: number = 0;
    for (i = 0; i < gameBoard.length; i++) {
        div.appendChild(cardHTML(gameBoard[i].color, gameBoard[i].count, gameBoard[i].material, gameBoard[i].shape));
    }

    let match: number = gameBoardMatches(gameBoard);
    div.innerHTML += `
        <h2>Match Count: <span>${match}</span></h2>
    `;
};

generateBoard();

function deselect(): void {
    let cardSelection: HTMLCollectionOf<Element> = document.getElementsByClassName('card selected');
    let i: number = cardSelection.length - 1;
    for (; i > -1; i--) {
        cardSelection[i].classList.remove('selected');
    }
}

function cardCollection(cardSelection: HTMLCollectionOf<Element>): boolean {
    let collection: iCard[] = [];
    let i: number = 0;
    for (; i < cardSelection.length; i++) {
        collection.push({
            color: cardSelection[i].getAttribute('data-color'),
            count: cardSelection[i].getAttribute('data-count'),
            material: cardSelection[i].getAttribute('data-material'),
            shape: cardSelection[i].getAttribute('data-shape')
        });
    }
    return selectionMatchCheck(collection);
}

function removeFromGame(cardSelection: HTMLCollectionOf<Element>): void {
    let i: number = cardSelection.length - 1;
    for (; i > -1; i--) {
        cardSelection[i].parentNode.removeChild(cardSelection[i]);
    }
}

function addToGame(): void {
    
}

function selection(): void {
    let cardSelection: HTMLCollectionOf<Element> = document.getElementsByClassName('card selected');
    if (cardSelection.length > 2) {
        let isSet: boolean = cardCollection(cardSelection);

        if (isSet) {
            removeFromGame(cardSelection);
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

function listen(): void {
    let cards: HTMLCollectionOf<Element> = document.getElementsByClassName('card');
    let i: number = 0;
    for (; i < cards.length; i++) {
        cards[i].removeEventListener('click', listener, false);
        cards[i].addEventListener('click', listener, false);
    }
}

listen();
