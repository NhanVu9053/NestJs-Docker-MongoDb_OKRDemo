
import mongoose from 'mongoose';

export const KrSchema = new mongoose.Schema({
    name: {
        type: String,
      
    },
    startDate: {
        type: Date,
      
    },
    endDate: {
        type: Date,
        validate: [dateValidator, 'Start Date must be less than End Date']   
    },
    
    okr: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Okr',
    },  
  },
  { timestamps: true }
)
// function that validate the startDate and endDate
function dateValidator(value) {
  // `this` is the mongoose document
  return this.startDate <= value;
}