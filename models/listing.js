const mongoose = require("mongoose");
const reviews = require("./reviews");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const listingSchema = new Schema({
    title: {
        type : String,
        required: true,
    },

    description: String,
image: {
  filename: {
    type: String,
    default: 'listingimage'
  },
  url: {
    type: String,
    default: 'https://image.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfH8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    set: (v) =>
      v === ""
        ? 'https://image.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfH8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
        : v
  }
},

    // image : {
    //     type:  String,
    //     default :  "https://image.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfH8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    //     set: (v) => {
    //       return   v === ""  ? "https://image.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfH8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    //     : v;
    //    }
    //   },

    price : Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing){
     await Review.deleteMany({_id: {$in: listing.reviews}});
  }
})
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing; 