import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";

const TaskSchema = new mongoose.Schema({
    id: Number,
    taskname: {
        type: String,
        required: true,
    },
    fromDate: {
        type: Date,
        required: true,
    },
    toDate: {
        type: Date,
        required: true,
    },
    fromTime: {
        type: String,
        required: true,
    },
    toTime: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Apply auto-increment plugin
TaskSchema.plugin(AutoIncrement(mongoose), { inc_field: "id" });

const Task = mongoose.model("Tasks", TaskSchema);

export default Task;
