const path = {
  home: "/",
  user: "/user",
  articleDetail: "/article/:slug",
  profile: "/profile/:id",
  setting: "/setting",
  editor: "/editor",
  login: "/login",
  register: "/register",
  logout: "/logout",
  confirmEmail: "/confirm-email/",
} as const;

export default path;
