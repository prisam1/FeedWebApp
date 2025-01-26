exports.setAuthCookies = (res, token) => {

  // if (!req.headers["user-agent"].includes("Mobi")) {
  //   // Use Secure Cookies for Desktop
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
    });
 // }
};
