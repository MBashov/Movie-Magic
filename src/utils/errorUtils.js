export const getErrorMessage = (err) => {
    switch (err.message) {
        case 'ValidationError':
           return (Object.values(err.errors).at(0));
        default:
            return err.message;
    }
}