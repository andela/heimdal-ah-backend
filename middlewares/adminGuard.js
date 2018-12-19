const adminGuard = (req, res, next) => {
  const { roleId } = req.app.locals.user;
  if (roleId === 1) {
    return next();
  }
  return res.status(403).json({
    message: 'Only available to admin',
  });
};

export default adminGuard;
