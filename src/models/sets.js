import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let set = new Schema({
    festival: {
        type: String
    },
    year: {
        type: String
    },
    title: {
        type: String
    },
    url: {
        type: String
    },
    time: {
        type: String
    },
    setname: {
        type: String
    }
});

export default mongoose.model('Set', set); // exports schema defined above as an "Set"