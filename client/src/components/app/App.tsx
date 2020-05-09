import React, { Fragment, useEffect } from 'react';
import './App.css';
import Game from '../game/Game';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store/types';
import {
    appLoaded,
    visitOriginal,
    visitContribute,
    visitProfile,
} from '../../store/app/actions';

const mapState = (state: RootState) => state;

const mapDispatch = {
    appLoaded,
    visitOriginal,
    visitProfile,
    visitContribute,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const App = (props: Props) => {
    useEffect(() => {
        props.appLoaded();
    }, []);

    return (
        <Fragment>
            <div className="global-stats-container">
                <span className="global-stats-label">Global Games Played</span>
                <span className="global-stats-value">
                    {props.gameInfoState.globalGamesPlayed}
                </span>
                <span className="global-stats-label">
                    Global Players Playing
                </span>
                <span className="global-stats-value">
                    {props.gameInfoState.globalPlayersPlaying}
                </span>
                <span className="global-stats-label">Your Top Score</span>
                <span className="global-stats-value">
                    {props.appState.localTopScore}
                </span>
            </div>
            <Game />
            <div className="signature">
                <span>
                    Developer:
                    <a
                        target="_BLANK"
                        href="https://github.com/lcdev25"
                        onClick={props.visitProfile}
                    >
                        Lavneesh - lcdev25
                    </a>
                    {'    '}
                    <a
                        target="_BLANK"
                        href="https://github.com/lcdev25/game2048"
                        onClick={props.visitContribute}
                    >
                        Contribute
                    </a>
                </span>
            </div>
            <div className="inspiration">
                <a
                    target="_BLANK"
                    href="https://play2048.co/"
                    onClick={props.visitOriginal}
                >
                    Inspired by the original
                </a>
            </div>
        </Fragment>
    );
};

export default connector(App);
