class Report{
    constructor(title, description, address, locationDetails="", category, postedBy, latitude, longitude){
        this.title = title;
        this.address = address;
        this.description = description;
        this.locationDetails = locationDetails;
        this.images = [];
        this.category = category;
        this.postedBy = postedBy;
        this.status = "in review";
        this.createdAt = new Date(Date.now());
        this.updatedAt = new Date(Date.now());
        this.upvotes = 0;
        this.latitude = latitude;
        this.longitude = longitude;
    }

}

export default Report;