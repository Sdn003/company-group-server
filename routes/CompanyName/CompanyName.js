const express = require('express');
const router = express.Router();
const {CompanyNameSchema} = require('../../Middleware/CompanyNameSchema');


//Getting All Company
router.get('/AllCompany', async(req, res) => {
    try {
        let companyData = await CompanyNameSchema.find();
        if (companyData){
            res.json({
              message: "Data Fetched Successfully",
              companyData,
              statusCode: 200,
            });
        }
        else{
            res.json({
              message: "No Records Found",
              statusCode: 404,
            });
        }
          
    } catch (error) {
        console.log(error, "Error in getting All Company");
        res.json({
            message : "Internal Server Error",
            statusCode : 500,
            error
        })
    }
})

//Add one Company
router.post('/AddCompany', async(req, res) => {
    try {
        let {id, companyName, country} = req.body;
        console.log(req.body);
        let idExist = await CompanyNameSchema.findOne({id});
        if(!idExist){
            let companyNameExist = await CompanyNameSchema.findOne({companyName})
            if(!companyNameExist){
                let newCompany = {
                    id, companyName, country
                }
                let company = await CompanyNameSchema.insertMany(req.body);
                res.json({
                    message : "Company Created Successfully",
                    statusCode : 200,
                    company
                })
            }
            else{
            res.json({
              message: "Company Name already Exists",
              statusbar: 403,
            });  
            }
        }
        else{
            res.json({
                message : "Entered ID already Exists",
                statusbar:403
            })
        }

    } catch (error) {
      console.log(error, "Error in adding a Company");
      res.json({
        message: "Internal Server Error",
        statusCode: 500,
        error,
      });
    }
})

module.exports = router;