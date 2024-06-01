class HelperData {

    defaultSchema = {
        updated_date: { type: Date, default: ""},
        created_date: { type: Date, default: ""},
        updated_by: {
            id: { type: String, default: ""},
            name: { type: String, default: ""},
            email: { type: String, default: ""},
            thumbnail: { type: String, default: ""}, 
        },
        created_by: {
            id: { type: String, default: ""},
            name: { type: String, default: ""},
            email: { type: String, default: ""},
            thumbnail: { type: String, default: ""}, 
        }    
    }
    
    validateEmail(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    removeLastExtension(imageName) {
        // Find the last occurrence of a dot followed by an extension
        const lastDotIndex = imageName.lastIndexOf('.');
        if (lastDotIndex === -1) return imageName; // No dot found
        return imageName.substring(0, lastDotIndex);
    }

    getLastExtension(imageName) {
        // Find the last occurrence of a dot
        const lastDotIndex = imageName.lastIndexOf('.');
        if (lastDotIndex === -1) return ''; // No dot found
        return imageName.substring(lastDotIndex);
    }
    

}

var Helper = new HelperData(); 

module.exports = { 
    Helper
}