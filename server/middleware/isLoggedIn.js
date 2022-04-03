const isLoggedIn = asyncHandler(async (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            return next(new ErrorResponse('Not authenticated', 401));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) {
            return next(new ErrorResponse('Not authenticated', 401));
        }
        req.user = user;
        next();
    }
);

export default isLoggedIn;
