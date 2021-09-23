const mongoose = require("mongoose");
const db = require("../helpers/db");

const Schema = mongoose.Schema;

const entitySchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    address: { type: String },
    phone: { type: String },
    website: { type: String },
    createdAt: { type: Date },
    comments: { type: Array },
  },
  { minimize: false, toObject: { virtuals: true } }
);

const Entity = mongoose.model("Entity", entitySchema, "entities");

module.exports = Entity;
