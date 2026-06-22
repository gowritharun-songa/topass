
const logger = (req, res, next) => {
    req.time = new Date(Date.now()).toString();
    console.log(
        `${req.method}: ${req.originalUrl} -- ${req.time}`
    );
    next();
}

export default logger;