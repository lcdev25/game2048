import * as express from 'express';
import {
    getGlobalStats,
    startGame,
    updateGameInfo,
} from '../services/game-info';
import { GameInfo } from '../models/GameInfo';

const router = express.Router();

router.post('/', async (req, res) => {
    console.log('Starting new game');
    try {
        const gameId = req?.body?.data?.gameId;
        const gameInfo: GameInfo = await startGame(gameId, req['ipInfo']);
        const globalData = await getGlobalStats();
        res.status(200).json({
            ...globalData,
            gameId: gameInfo.id,
        });
    } catch (e) {
        console.log(`Error in starting game: ${e}`);
        res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
});

router.put('/:game_id', async (req, res) => {
    console.log(`Updating game info: ${JSON.stringify(req.body)}`);
    try {
        const data = req?.body?.data;
        const gameId = req?.params?.game_id;
        if (gameId && data) {
            await updateGameInfo(gameId, data);
            res.status(200).json({});
        } else {
            res.status(400).json({ errors: [{ msg: 'Missing update body' }] });
        }
    } catch (e) {
        console.log(`Error in updating game info: ${e}`);
        res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
});

export default router;
