exports.setAuthCookies = (res, token,isMobile) => {
  // Set token in cookies only for desktop users
  if (!isMobile) {
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
  });
   }
};
