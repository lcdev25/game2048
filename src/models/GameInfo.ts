import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface GameInfo extends mongoose.Document {
    ipInfo: any;
    timesUndo: number;
    timesRedo: number;
    timesNewGame: number;
    hasVisitedProfile: boolean;
    hasVisitedContribute: boolean;
    hasVisitedOriginal: boolean;
}

const GameInfoSchema = new Schema(
    {
        ipInfo: Object,
        timesUndo: { type: Number, default: 0 },
        timesRedo: { type: Number, default: 0 },
        timesNewGame: { type: Number, default: 1 },
        hasVisitedProfile: { type: Boolean, default: false },
        hasVisitedContribute: { type: Boolean, default: false },
        hasVisitedOriginal: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<GameInfo>(
    'g2048Info',
    GameInfoSchema,
    'g2048Info'
);
