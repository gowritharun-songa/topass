
const errorHandler = (error, req, res, next) => {
    console.log(error);

    const statusCode = error.statusCode || 500;
    const status = error.status || "error";

    res.status(statusCode).json({
        success: false,
        status,
        message: error.message
    });

}

export default errorHandler;