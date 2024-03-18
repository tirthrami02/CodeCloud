import mongoose from "mongoose";

const CodeSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
        },
        uploadTime: {
            type: Number,
            require: true,
        },
        description: {
            type: String,
            require: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Code = mongoose.model("Code", CodeSchema);