const { mongoose } = require('../DB/dbConfig')
const Schema = mongoose.Schema;

const companyNameSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const CompanyNameSchema = mongoose.model(
  "CompanyNameSchema",
  companyNameSchema,
  "CompanyNameSchema"
);

module.exports = { CompanyNameSchema };