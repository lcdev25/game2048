import { connect, ConnectedProps } from 'react-redux';
import React, { Fragment, useEffect } from 'react';

import {
    moveBottom,
    moveLeft,
    moveRight,
    moveTop,
} from '../../store/board/actions';
import { RootState } from '../../store/types';

const mapState = (state: RootState) => ({
    boardState: state.boardState,
});

const mapDispatch = {
    moveLeft,
    moveRight,
    moveTop,
    moveBottom,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const getCellClass = (cell: number | null) => {
    let cellClass;
    if (cell) {
        cellClass = `board-cell-${cell}`;
        if (cell === 2048) {
            cellClass = `${cellClass} board-cell-winner`;
        }
    } else {
        cellClass = `board-cell-null`;
    }
    return cellClass;
};

const Board = (props: Props) => {
    const cells = props.boardState.present.cells;
    let touchStartX: number;
    let touchStartY: number;
    let touchEndX: number;
    let touchEndY: number;

    useEffect(() => {
        document.onkeydown = checkKey;
        return () => {
            document.onkeydown = null;
        };
    }, []);

    function touchStart(e: any) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }

    function touchMove(e: any) {
        touchEndX = e.touches[0].clientX;
        touchEndY = e.touches[0].clientY;
    }

    function touchEnd(e: any) {
        const horDis = Math.abs(touchEndX - touchStartX);
        const verDis = Math.abs(touchEndY - touchStartY);
        if (horDis > 50 || verDis > 50) {
            if (horDis > verDis) {
                //Right or left move
                if (touchEndX - touchStartX > 0) {
                    //right swipe
                    onMoveRight(e);
                } else {
                    //left swipe
                    onMoveLeft(e);
                }
            } else {
                //Up or down move
                if (touchEndY - touchStartY > 0) {
                    //Down swipe
                    onMoveBottom(e);
                } else {
                    //Up swipe
                    onMoveTop(e);
                }
            }
        }
    }

    function checkKey(e: any) {
        e = e || window.event;

        if (e.keyCode == '38') {
            onMoveTop(e);
        } else if (e.keyCode == '40') {
            onMoveBottom(e);
        } else if (e.keyCode == '37') {
            onMoveLeft(e);
        } else if (e.keyCode == '39') {
            onMoveRight(e);
        }
    }

    const onMoveLeft = (e: any) => {
        e.preventDefault();
        if (gameOver()) return;
        props.moveLeft();
    };

    const onMoveRight = (e: any) => {
        e.preventDefault();
        if (gameOver()) return;
        props.moveRight();
    };

    const onMoveTop = (e: any) => {
        e.preventDefault();
        if (gameOver()) return;
        props.moveTop();
    };

    const onMoveBottom = (e: any) => {
        e.preventDefault();
        if (gameOver()) return;
        props.moveBottom();
    };

    const gameOver = () => {
        return props.boardState.present.gameOver;
    };

    return (
        <Fragment>
            <div
                className="board-container"
                onTouchStart={(e) => touchStart(e)}
                onTouchMove={(e) => touchMove(e)}
                onTouchEnd={(e) => touchEnd(e)}
            >
                <div
                    className={`board-cell ${getCellClass(cells[0][0].value)}`}
                >
                    {cells[0][0].value || ''}
                </div>
                <div
                    className={`board-cell ${getCellClass(cells[0][1].value)}`}
                >
                    {cells[0][1].value || ''}
                </div>
                <div
                    className={`board-cell ${getCellClass(cells[0][2].value)}`}
                >
                    {cells[0][2].value || ''}
                </div>
                <div
                    className={`board-cell ${getCellClass(cells[0][3].value)}`}
                >
                    {cells[0][3].value || ''}
                </div>
                <div
                    className={`board-cell ${getCellClass(cells[1][0].value)}`}
                >
                    {cells[1][0].value || ''}
                </div>
                <div
                    className={`board-cell ${getCellClass(cells[1][1].value)}`}
                >
                    {cells[1][1].value || ''}
                </div>
                <div
                    className={`board-cell ${getCellClass(cells[1][2].value)}`}
                >
                    {cells[1][2].value || ''}
                </div>
                <div
                    className={`board-cell ${getCellClass(cells[1][3].value)}`}
                >
                    {cells[1][3].value || ''}
                </div>
                <div
                    className={`board-cell ${getCellClass(cells[2][0].value)}`}
                >
                    {cells[2][0].value || ''}
                </div>
                <div
                    className={`board-cell ${getCellClass(cells[2][1].value)}`}
                >
                    {cells[2][1].value || ''}
                </div>
                <div
                    className={`board-cell ${getCellClass(cells[2][2].value)}`}
                >
                    {cells[2][2].value || ''}
                </div>
                <div
                    className={`board-cell ${getCellClass(cells[2][3].value)}`}
                >
                    {cells[2][3].value || ''}
                </div>
                <div
                    className={`board-cell ${getCellClass(cells[3][0].value)}`}
                >
                    {cells[3][0].value || ''}
                </div>
                <div
                    className={`board-cell ${getCellClass(cells[3][1].value)}`}
                >
                    {cells[3][1].value || ''}
                </div>
                <div
                    className={`board-cell ${getCellClass(cells[3][2].value)}`}
                >
                    {cells[3][2].value || ''}
                </div>
                <div
                    className={`board-cell ${getCellClass(cells[3][3].value)}`}
                >
                    {cells[3][3].value || ''}
                </div>
            </div>
        </Fragment>
    );
};

export default connector(Board);
