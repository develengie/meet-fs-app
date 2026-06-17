const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: String,
    password: String,
    profession: {
      type: Schema.Types.ObjectId,
      ref: 'Profession'
    },
    qualities: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Quality'
      }
    ],
    sex: {
      type: String,
      enum: ['male', 'female']
    },
    completedMeetings: Number,
    rate: Number,
    image: String
  },
  {
    timestamps: true
  }
)

module.exports = model('User', schema)
