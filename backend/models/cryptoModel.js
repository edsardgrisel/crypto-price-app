import mongoose from "mongoose";

const CryptoSchema = mongoose.Schema(
    {

        name: {
            type: String,
            required: true,
        },
        ticker: {
            type: String,
            required: true,
            unique: true,
        },
        price: {
            type: Number,
            required: false,
            unique: false,
            default: -1,
        }

    },
    {
        timestamps: true,
    }
)

export const Crypto = mongoose.model('Crypto', CryptoSchema);