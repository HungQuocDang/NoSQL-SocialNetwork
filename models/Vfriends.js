const { Schema, model } = require('mongoose');
const Response = require('./Response');

// Schema to create Post model
const vfriendsSchema = new Schema(
  {
    published: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    advertiserFriendly: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      minLength: 15,
      maxLength: 500,
    },
    responses: [Response],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `responses` that gets the amount of response per vfriends
vfriendsSchema
  .virtual('getResponses')
  // Getter
  .get(function () {
    return this.responses.length;
  });

// Initialize our Vfriends model
const Vfriends = model('vfriends', vfriendsSchema);

module.exports = Vfriends;