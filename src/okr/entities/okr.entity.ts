import * as mongoose from 'mongoose';

export const OkrSchema = new mongoose.Schema({
  name: {
      type: String,
     
  },
 
  krs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kr',
  }],  
  },
    { timestamps: true }
)




