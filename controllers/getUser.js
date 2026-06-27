export const getUser = async (req, res) => {
    res.status(200).json({
        message: "Fetched profile",
        user: req.user
    });
}