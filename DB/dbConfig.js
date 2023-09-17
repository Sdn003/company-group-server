const mongoose = require('mongoose');
const dbURL = 'mongodb+srv://sudharsancode:sudharsan@sdncluster.a0pwnzf.mongodb.net/company_groups'
mongoose.connect(dbURL).then(() => console.log("DB Connection Successful")).catch((err) => {
    console.log(`DB Connection interrupted due to the Error - ${err}`) 
})

module.exports = { mongoose }