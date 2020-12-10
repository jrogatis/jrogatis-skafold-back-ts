
import mongoose from "mongoose";

export const findById = (model: mongoose.Model<any>, id: string | number, projection?: any) => model.findById(id, projection)