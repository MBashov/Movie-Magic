import Cast from "../models/Cast.js";

export default {

    create(castData) {
        
        const newCast = Cast.create(castData);

        return newCast;
    }
}