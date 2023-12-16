export class NewReport{
    constructor(address, createdAt, description, images, postedBy, status,
         title, updatedAt, upvotes,geohash, latitude, longitude,category){
        this.address = address;
        this.createdAt =createdAt;
        this.description = description;
        this.images = images;
        this.postedBy = postedBy;
        this.status = status;
        this.title = title;
        this.updatedAt = updatedAt;
        this.upvotes = upvotes;
        this.geohash=geohash;
        this.latitude=latitude;
        this.longitude=longitude;
        this.category=category;
    }

}


