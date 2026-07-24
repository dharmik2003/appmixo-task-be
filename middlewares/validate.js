const validateRequest = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Validation failed",
            errors: error.errors
        });
    }
};

module.exports = validateRequest;
