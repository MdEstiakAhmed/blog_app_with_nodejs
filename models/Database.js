const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_PATH, {
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
	useFindAndModify: false 
})
.then(() => {
	console.log("connected");
})
.catch(e => {
	console.log(e);
})

module.exports = {
    insert: async (data) => {
        try {
            let result = await data.save();
            return result;
        } 
        catch (error) {
            return error;
        }
    },

    find: async(model, obj) => {
        try {
            let result = await model.findOne(obj)
            return result;
        } 
        catch (error) {
            return error;
        }
    },
}