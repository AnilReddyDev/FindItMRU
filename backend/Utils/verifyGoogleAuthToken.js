import admin from "../firebase.js";

const verifyToken = async (req, res, next) => {
  console.log("entered into the verify token function");
  // Get the ID token from the request headers
  const idToken = req.headers.authorization?.includes(" ")
    ? req.headers.authorization.split(" ")[1]
    : req.headers.authorization;

  if (!idToken) {
    return res.status(401).send("Unauthorized");
  }

  // Verify the token
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};

export { verifyToken };
