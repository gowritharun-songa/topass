
export const ownerOrAdmin = async (req, res, next) => {
    if(req.user.role === "admin") {
        return next();
    } else if(req.user._id.toString() === req.params.id) {
        return next();
    } else {
        return res.status(403).json({
            message: "Access Denied"
        });
    }
}