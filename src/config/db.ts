import * as mongoose from 'mongoose';

const db: string = process.env.mongoURI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('Mongo DB connected');
    } catch (e) {
        console.error(e.message);
    }
};

export default connectDB;
