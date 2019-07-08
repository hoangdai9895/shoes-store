let admin = (req, res, next) => {
    if (req.user.role === 0) {
        return res.json({ err: "Your are not allowed !!!" });
    }
    next();
};

module.exports = admin;