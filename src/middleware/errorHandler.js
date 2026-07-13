const errorHandler = (err, req, res, next) => {
    console.log(err.stack);

    const message = err.message || 'Internal Server Error';
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        error: {
            message,
            statusCode
        }
    });
};

export default errorHandler;