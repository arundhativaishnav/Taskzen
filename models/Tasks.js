import mongoose from 'mongoose';


const TaskSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    importance:{
        type: Number,
        default:3,
        min: 1,
        max: 5
    },
    urgency:{
        type: Number,
        default:3,
        min: 1,
        max: 5
    },
    completed: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    },

})
export const Task = mongoose.model('Task', TaskSchema);