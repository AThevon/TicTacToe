import './index.css';
import Header from '../Header';
import Cell from '../Cell';
import Cross from '../Cross';
import Circle from '../Circle';
import Player from '../Player';

import { useState } from 'react';



const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


const Board = () => {
    // STATES
    const [cells, setCells] = useState(Array(9).fill({ value: null, component: null }));
    const [xIsNext, setXIsNext] = useState(false);
    const [emptyBoard, setEmptyBoard] = useState(true);
    const [winner, setWinner] = useState(false);
    const [draw, setDraw] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [scorePlayer1, setScorePlayer1] = useState(0);
    const [scorePlayer2, setScorePlayer2] = useState(0);
    const [playerName1, setPlayerName1] = useState('Player 1');
    const [playerName2, setPlayerName2] = useState('Player 2');

    // CODE
    const logo = xIsNext ? 'purple' : draw ? 'grey' : 'red';



    const handleClick = (index) => {
        if (winner || cells[index].value) {
            return;
        }

        const emptyBoardVerif = cells.some((cell) => cell.value === null) ? false : true;

        setEmptyBoard(emptyBoardVerif);

        const cellsCopy = [...cells];

        cellsCopy[index] = {
            value: xIsNext ? 'X' : 'O',
            component: xIsNext ? <Cross /> : <Circle />,
        };

        setCells(cellsCopy);


        const newWinner = winningPatterns.find(
            (combo) =>
                cellsCopy[combo[0]].value &&
                cellsCopy[combo[0]].value === cellsCopy[combo[1]].value &&
                cellsCopy[combo[1]].value === cellsCopy[combo[2]].value
        );

        if (newWinner) {
            setGameOver(true);
            setWinner(true);
            if (xIsNext) {
                setScorePlayer2((prevScore) => prevScore + 1);
            } else {
                setScorePlayer1((prevScore) => prevScore + 1);
            }
            console.log('winner');
        } else if (cellsCopy.every((cell) => cell.value)) {
            setGameOver(true);
            setDraw(true);
            console.log('draw');
        } else {
            console.log('next')
            setXIsNext((prev) => !prev);
        }
    }

    const launchNewGame = () => {
        setCells(Array(9).fill({ value: null, component: null }));
        setXIsNext(false);
        setWinner(false);
        setDraw(false);
        setGameOver(false);
    };

    const handlePlayerNameChange = (event, playerNumber) => {
        const newName = event.target.textContent;
        if (playerNumber === 1) {
            setPlayerName1(newName);
        } else if (playerNumber === 2) {
            setPlayerName2(newName);
        }
    }

    const resetBtn = () => {
        setCells(Array(9).fill({ value: null, component: null }));
        setXIsNext(false);
        setWinner(false);
        setDraw(false);
        setGameOver(false);
        setEmptyBoard(true);
        setScorePlayer1(0);
        setScorePlayer2(0);
    };

        return (
            <>
                <Header 
                logoColor={logo}
                emptyBoard={emptyBoard ? '' : 'active'} 
                onClickBtn={resetBtn} />

                <section className="main-phrase">
                    <p 
                    className={`phrase ${emptyBoard ? '' : 'playing'} ${xIsNext ? 'player-2' : 'player-1'} ${draw ? 'draw' : ''} ${gameOver ? 'game-over' : ''}`}>
                        {emptyBoard ? 'Start by clicking on a cell !' : draw ? 'Draw !' : winner ? 
                        `${xIsNext ? playerName2 : playerName1} WINS!` : 
                        `${xIsNext ? playerName2 : playerName1}'s turn`}
                    </p>
                </section>

                <section className={`main-new-game ${gameOver ? 'active' : ''}`}>
                    <p className='new-game' onClick={launchNewGame}>Again ?</p>
                </section>

                <section className="main-content">

                    <Player playerId='id1'
                        playerName={playerName1} playerScore={scorePlayer1} isDisabled={emptyBoard ? 'disabled' : ''} 
                        isActive={xIsNext ? '' : xIsNext && winner ? '' : 'active'} 
                        playerNameChange={(event) => { handlePlayerNameChange(event, 1) }} 
                        isScoreActive={scorePlayer1 || scorePlayer2 > 0 ? 'active' : ''}
                        
                        />

                    <div className={`board ${winner ? 'disabled' : ''}`}>
                        {
                            cells.map((cell, index) => (
                                <Cell
                                    key={index}
                                    content={cell.component}
                                    onClick={() => handleClick(index)}
                                    disabled={!!cell.value}
                                />
                            ))
                        }
                    </div>

                    <Player playerId='id2'
                        playerName={playerName2}
                        playerScore={scorePlayer2}
                        isDisabled={emptyBoard ? 'disabled' : ''}
                        isActive={xIsNext ? 'active' : xIsNext && winner ? 'active' : ''} playerNameChange={(event) => { handlePlayerNameChange(event, 2)}}
                        isScoreActive={scorePlayer1 || scorePlayer2 > 0 ? 'active' : ''}
                        />
                </section>
            </>
        );
    }

export default Board;