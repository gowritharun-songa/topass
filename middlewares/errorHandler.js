
const errorHandler = (error, req, res, next) => {
    console.log(error);

    return res.status(500 || error.status).json({
        success: false,
        message: "Interval Server Error" || error.message
    });
}

export default errorHandler;