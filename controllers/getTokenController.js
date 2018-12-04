import jwt from 'jsonwebtoken';

const getTokenController = (req, res) => {
  const { user } = req;
  jwt.sign(
    { user: user.id },
    process.env.JWT_KEY,
    (error, token) => res.status(200).json({
      message: 'Successfully logged in',
      token,
      data: user
    })
  );
};

export default getTokenController;
