const {mongoose} = require('../DB/dbConfig');
const Schema = mongoose.Schema;
 
const companyGroupSchema = new Schema({
  companyGroupId: {
    type: Number,
    unique: true,
    required: true
  },
  companyGroupName: {
    type: String,
    unique: true,
    required: true,
  },
  businessType: {
    type: "String",
  },
  isDataSharing: {
    type: String,
  },
  companyCount: {
    type: Number,
  },
  selectedCompanyName :{
    type:Array
  }
});

const CompanyGroupSchema = mongoose.model(
  "CompanyGroupSchema",
  companyGroupSchema,
  "CompanyGroupSchema"
);

module.exports = {CompanyGroupSchema}