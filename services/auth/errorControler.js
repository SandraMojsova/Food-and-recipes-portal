module.exports = (err, req, res, next) => {
    try {
        if (err.code && err.code == 11000) return err;
    } catch (err) {
        res.status(500).send('An unknown error occurred.');
    }
}