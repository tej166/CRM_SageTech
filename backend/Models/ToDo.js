// Models/ToDo.js
const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  cityName: { type: String, required: true },
  vertical: { type: String, required: true },
  priority: { type: String, required: true },
  contractExpiry: { type: String, required: true },
  supportPartner: { type: String, required: true },
  turnOver: { type: String, required: true },
  leadType: { type: String, required: true },
  state: { type: String, required: true },
  team: { type: String, required: true },
  leads: { type: String, required: true },
  leadNumber: { type: Number, required: true },
  generationDate: { type: String, required: true },
  totalCost: { type: String, required: true },
  lastCommentDate: { type: String, required: true },
  createdBy: { type: String, required: true },
  assignTo: { type: String, required: true },
  phone: { type: String, required: true },
  actionDate: { type: String, required: true },
  nextAction: { type: String, required: true }
});

module.exports = mongoose.model('ToDo', ToDoSchema);
