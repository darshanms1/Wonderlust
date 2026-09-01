const express =require("express");
const router = express.Router({mergeParams: true});//mergeparams is use to mergs some paramerets from parents to child
//  {in this case in app.js (app.use("/listings/:id/reviews",reviews);) we want access id to review.js }
const wrapAsync =require("../utils/wrapAsync.js");
const ExpressError =require("../utils/ExpressError.js");

const Review =require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//  add review
router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.addReview));

// delete review rout
router.delete("/:reviewId", isLoggedIn,wrapAsync(isReviewAuthor),wrapAsync(reviewController.deleteReview));

module.exports=router;