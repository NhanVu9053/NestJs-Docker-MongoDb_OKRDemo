import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,    
    },
    phoneNumber: {
        type: String,
        required: true
    },

    roles: {
        type: [String],
        enum: ['user', 'admin'],
        default: ['user'],
    },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    },  

    },{ timestamps: true }

    );
   