exports.setAuthCookies = (res, token, isMobile) => {
  const cookieOptions = {
    httpOnly: true,
    sameSite: "none",
    maxAge: 2 * 24 * 60 * 60 * 1000,  
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true; // Only secure cookies in production
  }
  else {
    cookieOptions.secure = false; // Allow insecure cookies in local development
  }

  if (!isMobile) {
    res.cookie("access_token", token, cookieOptions);
  }
};
