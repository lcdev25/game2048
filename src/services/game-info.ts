import GameInfoModel, { GameInfo } from '../models/GameInfo';

export async function startGame(gameId, ipInfo) {
    let gameInfo: GameInfo;
    if (gameId) {
        gameInfo = await GameInfoModel.findById(gameId);
    }
    if (!gameInfo) {
        gameInfo = new GameInfoModel();
    } else {
        gameInfo.timesNewGame += 1;
    }
    gameInfo.ipInfo = ipInfo || {};
    return gameInfo.save();
}

export async function getGlobalStats() {
    const globalGamesPlayed = (
        await GameInfoModel.aggregate([
            { $group: { _id: null, sum: { $sum: '$timesNewGame' } } },
        ])
    )[0]['sum'];
    const fourHrAgo = new Date();
    fourHrAgo.setMinutes(fourHrAgo.getMinutes() - 240);
    const globalPlayersPlaying = await GameInfoModel.count({
        updatedAt: { $gt: fourHrAgo },
    });
    return {
        globalGamesPlayed,
        globalPlayersPlaying,
    };
}

export async function updateGameInfo(gameId: string, data: GameInfo) {
    const gameInfo: GameInfo = await GameInfoModel.findById(gameId);
    if (gameInfo) {
        for (let prop of Object.keys(data)) {
            switch (prop) {
                case 'timesUndo':
                    gameInfo.timesUndo += data.timesUndo;
                    break;
                case 'timesRedo':
                    gameInfo.timesRedo += data.timesRedo;
                    break;
                case 'timesNewGame':
                    gameInfo.timesNewGame += 1;
                    break;
                case 'hasVisitedProfile':
                    if (!gameInfo.hasVisitedProfile) {
                        gameInfo.hasVisitedProfile = data.hasVisitedProfile;
                    }
                    break;
                case 'hasVisitedContribute':
                    if (!gameInfo.hasVisitedContribute) {
                        gameInfo.hasVisitedContribute =
                            data.hasVisitedContribute;
                    }
                    break;
                case 'hasVisitedOriginal':
                    if (!gameInfo.hasVisitedOriginal) {
                        gameInfo.hasVisitedOriginal = data.hasVisitedOriginal;
                    }
                    break;
                default:
                    console.log(`Invalid property found for update: ${prop}`);
                    break;
            }
            await gameInfo.save();
        }
    }
}
