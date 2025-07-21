const mongo = require('mongoose')

const reviewSchema = new mongo.Schema(
    {
        Review : {
            type:String}
          
        
       
    },
     { timestamps: true }
)

module.exports = mongo.model('Review', reviewSchema);