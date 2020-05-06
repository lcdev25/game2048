import React, { useEffect, Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { undo, redo, reset } from '../../store/undoable/undoable.actions';
import { initialise } from '../../store/board/actions';
import Board from '../board/board.component';
import { AppState } from '../../store/app.types';

const mapState = (state: AppState) => ({
    boardState: state.boardState,
});

const mapDispatch = {
    undo,
    redo,
    reset,
    initialise,
};

const connector = connect(mapState, mapDispatch);

type propsFromRedux = ConnectedProps<typeof connector>;

type Props = propsFromRedux;

const Game = (props: Props) => {
    useEffect(() => {
        props.initialise();
    }, []);

    const gameOver = props.boardState.present.gameOver;
    const gameWon = props.boardState.present.gameWon;

    const newGame = () => {
        props.reset();
        props.initialise();
    };

    return (
        <Fragment>
            <div className="game-header">
                <div className="rules">Join tiles to get to tile</div>
                <div className="title">2048</div>
            </div>
            <div className="game-sub-header">
                Use arrow keys or swipe to move the tiles. When two tiles with
                the same face touch, they collapse into one.
            </div>
            <div className="game-container">
                <div className="game-actions-container">
                    <button
                        type="button"
                        className="game-action-button"
                        onClick={newGame}
                    >
                        NEW GAME
                    </button>
                </div>
                <Board />
                <div className="game-actions-container">
                    <button
                        type="button"
                        className="game-action-button"
                        onClick={props.undo}
                    >
                        UNDO
                    </button>
                    <button
                        type="button"
                        className="game-action-button"
                        onClick={props.redo}
                    >
                        REDO
                    </button>
                </div>
                <div className="game-status-container">
                    <div
                        className={
                            gameOver ? 'game-over' : gameWon ? 'game-won' : ''
                        }
                    >
                        {gameOver ? 'GAME OVER' : gameWon ? 'WINNER' : ''}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default connector(Game);
