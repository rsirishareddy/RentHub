const ownerOnly = (req, res, next) => {
  const { role } = req.body;

  if (role !== "owner") {
    return res.status(403).json({
      message: "Access denied. Only owners can perform this action.",
    });
  }

  next();
};

module.exports = { ownerOnly };