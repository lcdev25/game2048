import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store/app.types';
import React, { Fragment, useEffect } from 'react';
// @ts-ignore
import Swipe from 'react-easy-swipe';

import {
    moveBottom,
    moveLeft,
    moveRight,
    moveTop,
} from '../../store/board/actions';

const mapState = (state: AppState) => ({
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

const getCellLabel = (cell: number | null) => {
    return cell || '';
};

const Board = (props: Props) => {
    const cells = props.boardState.present.cells;

    useEffect(() => {
        document.onkeydown = checkKey;
        return () => {
            document.onkeydown = null;
        };
    }, []);

    function checkKey(e: any) {
        e = e || window.event;

        if (e.keyCode == '38') {
            if (gameOver()) return;
            props.moveTop();
        } else if (e.keyCode == '40') {
            if (gameOver()) return;
            props.moveBottom();
        } else if (e.keyCode == '37') {
            if (gameOver()) return;
            props.moveLeft();
        } else if (e.keyCode == '39') {
            if (gameOver()) return;
            props.moveRight();
        }
    }

    const onMoveLeft = () => {
        if (gameOver()) return;
        props.moveLeft();
    };

    const onMoveRight = () => {
        if (gameOver()) return;
        props.moveRight();
    };

    const onMoveTop = () => {
        if (gameOver()) return;
        props.moveTop();
    };

    const onMoveBottom = () => {
        if (gameOver()) return;
        props.moveBottom();
    };

    const gameOver = () => {
        return props.boardState.present.gameOver;
    };

    return (
        <Fragment>
            <Swipe
                onSwipeLeft={onMoveLeft}
                onSwipeRight={onMoveRight}
                onSwipeUp={onMoveTop}
                onSwipeDown={onMoveBottom}
            >
                <div className="board-container">
                    <div
                        className={`board-cell board-cell-${
                            getCellLabel(cells[0][0].value) || `null`
                        }`}
                    >
                        {getCellLabel(cells[0][0].value)}
                    </div>
                    <div
                        className={`board-cell board-cell-${
                            getCellLabel(cells[0][1].value) || `null`
                        }`}
                    >
                        {getCellLabel(cells[0][1].value)}
                    </div>
                    <div
                        className={`board-cell board-cell-${
                            getCellLabel(cells[0][2].value) || `null`
                        }`}
                    >
                        {getCellLabel(cells[0][2].value)}
                    </div>
                    <div
                        className={`board-cell board-cell-${
                            getCellLabel(cells[0][3].value) || `null`
                        }`}
                    >
                        {getCellLabel(cells[0][3].value)}
                    </div>
                    <div
                        className={`board-cell board-cell-${
                            getCellLabel(cells[1][0].value) || `null`
                        }`}
                    >
                        {getCellLabel(cells[1][0].value)}
                    </div>
                    <div
                        className={`board-cell board-cell-${
                            getCellLabel(cells[1][1].value) || `null`
                        }`}
                    >
                        {getCellLabel(cells[1][1].value)}
                    </div>
                    <div
                        className={`board-cell board-cell-${
                            getCellLabel(cells[1][2].value) || `null`
                        }`}
                    >
                        {getCellLabel(cells[1][2].value)}
                    </div>
                    <div
                        className={`board-cell board-cell-${
                            getCellLabel(cells[1][3].value) || `null`
                        }`}
                    >
                        {getCellLabel(cells[1][3].value)}
                    </div>
                    <div
                        className={`board-cell board-cell-${
                            getCellLabel(cells[2][0].value) || `null`
                        }`}
                    >
                        {getCellLabel(cells[2][0].value)}
                    </div>
                    <div
                        className={`board-cell board-cell-${
                            getCellLabel(cells[2][1].value) || `null`
                        }`}
                    >
                        {getCellLabel(cells[2][1].value)}
                    </div>
                    <div
                        className={`board-cell board-cell-${
                            getCellLabel(cells[2][2].value) || `null`
                        }`}
                    >
                        {getCellLabel(cells[2][2].value)}
                    </div>
                    <div
                        className={`board-cell board-cell-${
                            getCellLabel(cells[2][3].value) || `null`
                        }`}
                    >
                        {getCellLabel(cells[2][3].value)}
                    </div>
                    <div
                        className={`board-cell board-cell-${
                            getCellLabel(cells[3][0].value) || `null`
                        }`}
                    >
                        {getCellLabel(cells[3][0].value)}
                    </div>
                    <div
                        className={`board-cell board-cell-${
                            getCellLabel(cells[3][1].value) || `null`
                        }`}
                    >
                        {getCellLabel(cells[3][1].value)}
                    </div>
                    <div
                        className={`board-cell board-cell-${
                            getCellLabel(cells[3][2].value) || `null`
                        }`}
                    >
                        {getCellLabel(cells[3][2].value)}
                    </div>
                    <div
                        className={`board-cell board-cell-${
                            getCellLabel(cells[3][3].value) || `null`
                        }`}
                    >
                        {getCellLabel(cells[3][3].value)}
                    </div>
                </div>
            </Swipe>
        </Fragment>
    );
};

export default connector(Board);
