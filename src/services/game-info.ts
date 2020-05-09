import GameModel, { GameInfo } from '../models/GameInfo';

export async function startGame(gameId, ipInfo) {
    let gameInfo: GameInfo;
    if (gameId) {
        gameInfo = await GameModel.findById(gameId);
    }
    if (!gameInfo) {
        gameInfo = new GameModel();
    } else {
        gameInfo.timesNewGame = gameInfo.timesNewGame + 1;
    }
    gameInfo.ipInfo = ipInfo || {};
    return gameInfo.save();
}

export async function getGlobalStats() {
    const globalGamesPlayed = (
        await GameModel.aggregate([
            { $group: { _id: null, sum: { $sum: '$timesNewGame' } } },
        ])
    )[0]['sum'];
    const fourHrAgo = new Date();
    fourHrAgo.setMinutes(fourHrAgo.getMinutes() - 240);
    const globalPlayersPlaying = await GameModel.count({
        updatedAt: { $gt: fourHrAgo },
    });
    return {
        globalGamesPlayed,
        globalPlayersPlaying,
    };
}

export async function updateGameInfo(gameId: string, data: GameInfo) {
    await GameModel.findByIdAndUpdate(gameId, { $set: data });
}
