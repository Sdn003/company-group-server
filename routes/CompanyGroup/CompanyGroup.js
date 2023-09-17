const express = require('express');
const router = express.Router();
const {CompanyGroupSchema} = require('../../Middleware/CompanyGroupSchema');

//Getting All Company Groups
router.get('/AllCompanyGroup', async(req, res) => {
    try {
      let { companyGroupId, companyGroupName, businessType } = req.query; 
      let partialCGName = new RegExp(companyGroupName, 'i');
      
      if (companyGroupName) {
        let companyGroup = await CompanyGroupSchema.find({
          companyGroupName: partialCGName,
        });
        if (companyGroup) {
          res.json({
            message: "Data Fetched Successfully",
            statusCode: 200,
            length: companyGroup.length,
            companyGroup,
          });
        } else {
          res.json({
            message: "No Records Found",
            statusCode: 404,
          });
        }
      } else if (companyGroupId || businessType) {
        let companyGroup = await CompanyGroupSchema.find(req.query);
        if (companyGroup) {
          res.json({
            message: "Data Fetched Successfully",
            statusCode: 200,
            length: companyGroup.length,
            companyGroup,
          });
        } else {
          res.json({
            message: "No Records Found",
            statusCode: 404,
          });
        }
      } else if (partialCGName && companyGroupId && businessType) {
        let companyGroup = await CompanyGroupSchema.findOne({
          companyGroupName: partialCGName,
          companyGroupId,
          businessType,
        });
        if (companyGroup) {
          res.json({
            message: "Data Fetched Successfully",
            statusCode: 200,
            length: companyGroup.length,
            companyGroup,
          });
        } else {
          res.json({
            message: "No Records Found",
            statusCode: 404,
          });
        }
      } else {
        let companyGroup = await CompanyGroupSchema.find();
        if (companyGroup) {
          res.json({
            message: "Data Fetched Successfully",
            statusCode: 200,
            length: companyGroup.length,
            companyGroup,
          });
        } else {
          res.json({
            message: "No Records Found",
            statusCode: 404,
          });
        }
      }
     
    } catch (error) {
      console.log(error, "Error in getting all CompanyGroup");
      res.json({
        message: "Internal Server Error",
        statusCode: 500,
        error,
      });
    }
})


//Getting Company Group Name

//Adding One Company Group
router.post("/AddCompanyGroup", async (req, res) => {
  try {
    console.log(req.query)
    let {
      companyGroupId,
      companyGroupName,
      businessType,
      isDataSharing,
      companyCount,
      selectedCompanyName,
    } = req.body;
     let companyGroupNameExist = await CompanyGroupSchema.findOne({
        companyGroupName,
   
    });
    if (!companyGroupNameExist) {
      let companyGroupIdExist = await CompanyGroupSchema.findOne({
        companyGroupId,
      });
      if (!companyGroupIdExist) {
        let newCompanyGroup = {
          companyGroupId,
          companyGroupName,
          businessType,
          isDataSharing,
          companyCount,
          selectedCompanyName,
        };
        let companyGroup = await CompanyGroupSchema.create(newCompanyGroup);
        res.json({
          cgCreateSuccess : true,
          message: "Company Group Created Successfully",
          statusCode: 200,
          companyGroup,
        });
      } else {
        res.json({
          cgIdExist : true,
          message: "Company Group ID already Exists for another group",
          statusbar: 403,
        });
      }
    } else {
      res.json({
        cgNameExist : true, 
        message:
          "Company Group Name already Exists for another group",
        statusbar: 403,
      });
    }
    
  } catch (error) {
     console.log(error, "Error in adding a CompanyGroup");
     res.json({
       message: "Internal Server Error",
       statusCode: 500,
       error,
     });
  }
  
});

//Editing a Company Group
router.put('/EditCompanyGroup/:id', async(req, res) => {
  try {
    let id = req.params.id
    let editCompanyGroup = await CompanyGroupSchema.findByIdAndUpdate({_id : id}, req.body)
    if(editCompanyGroup){
      res.json({
        cgEditSuccess : true, 
        message: "Company Group Edited Successfully",
        statusCode: 200,
      });
    }else{
       res.json({
         cgEditSuccess: false,
         message: "Error in deleting the Company Group",
         statusCode: 403,
       });
    }
  } catch (error) {
    console.log(error, "Error in Editing a CompanyGroup");
     if (error.keyPattern.companyGroupName === 1) {
       res.json({
         cgNameExist : true,
         message: "Validation Error",
         statusCode: 403,
         error: `${error.keyValue.companyGroupName} - Company Group Name already exists for another Group`,
       });
     } else if (error.keyPattern.companyGroupId === 1) {
       res.json({
        cgIdExist : true,
         message: "Validation Error",
         statusCode: 403,
         error: `${error.keyValue.companyGroupId} - Company Group Id already exists for another Group`,
       });
     } else {
       res.json({
         message: "Error Occurred",
         statusCode: 500,
         error,
       });
     }
  }
})

//Deleting a Company Group
router.delete('/DeleteCompanyGroup/:id', async(req, res) => {
  try {
    let deleteCompanyGroup = await CompanyGroupSchema.findOneAndDelete({companyGroupId : req.params.id})
    if(deleteCompanyGroup) {
        res.json({
          cgDeleteSuccess : true,
          message: "Company Group Deleted Successfully",
          statusCode: 200,
        });
      }else{
        res.json({
          cgDeleteSuccess: false,
          message: "Error in deleting the Company Group",
          statusCode: 403,
        });
      }
  } catch (error) {
     console.log(error, "Error in deleting a CompanyGroup");
     res.json({
       message: "Internal Server Error",
       statusCode: 500,
       error,
     });
  }
})

module.exports = router;