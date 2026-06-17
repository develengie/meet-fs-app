const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    pageId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = model('Comment', schema)
