import mongoose from "mongoose";
const schema=new mongoose.Schema({
    task:{type:String},
    date:{type:String},
    completed:{type:Boolean}
})

export default mongoose.model.tasks||mongoose.model("task",schema)