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
            default: null,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        }

    },
    {
        timestamps: true,
    }
)

export const Crypto = mongoose.model('Crypto', CryptoSchema);