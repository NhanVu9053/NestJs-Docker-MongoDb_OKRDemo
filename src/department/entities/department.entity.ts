import * as mongoose from 'mongoose';

export const DepartmentSchema = new mongoose.Schema({
  name: {
      type: String,   
  },
 
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],  
  },
    { timestamps: true }
)
