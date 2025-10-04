const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        }).populate("owner");
    if (!listing) {
        req.flash("error", "Cannot find that listing!");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
    // let url = req.file.path;
    // let filename = req.file.filename;
    // console.log(url, "..", filename);
    // if(!req.body.listing) throw new ExpressError("Invalid Listing Data", 400);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "Successfully made a new listing!");
    res.redirect("/listings");
};


module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
};


module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Successfully updated a listing!");
    res.redirect(`/listings/${id}`);
};


module.exports.deleteListing = async (req, res) => {
        //  let{ id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(req.params.id);
        console.log(deletedListing);
        req.flash("success", "Successfully deleted a listing!");
        res.redirect("/listings");
    };