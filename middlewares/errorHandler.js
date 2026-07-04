export const errorHandler = (error, req, res, next) => {
    console.log(error);

    return res.status(500 || error.status).json({
        success: false,
        message: "Internal Server Error" || error.message
    });
}
