const adminGuard = (req, res, next) => {
  const { roleId } = req.app.locals.user;
  if (roleId === 1) {
    return next();
  }
  return res.status(401).json({
    message: 'Unauthorized',
  });
};

export default adminGuard;
