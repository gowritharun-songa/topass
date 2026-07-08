
const errorHandler = (error, req, res, next) => {
    console.log(error);

    const statusCode = error.statusCode;
    const status = error.status;

    res.status(statusCode).json({
        success: false,
        status,
        message: error.message
    });

}

export default errorHandler;