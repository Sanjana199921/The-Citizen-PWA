class User {
    constructor ( fullName, userName, email, photoUrl, role ) {
        this.fullName = fullName;
        this.userName = userName;
        this.email = email;
        this.photoUrl = 'https://firebasestorage.googleapis.com/v0/b/the-citizen-d6e2b.appspot.com/o/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?alt=media&token=2778f1e0-70ab-44fa-9155-7628ad71cc6d';
        this.role = role || "customer";
    }
}

export default User;