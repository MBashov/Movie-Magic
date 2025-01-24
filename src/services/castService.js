import Cast from "../models/Cast.js";

export default {
    getAll(){
        return Cast.find({});
    },

    create(castData) {
        
        const newCast = Cast.create(castData);

        return newCast;
    }
}