import http from "@/lib/http";

export const URL_LOGIN = "/auth/login";
export const URL_REGISTER = "/auth/register";
export const URL_GETUSERBYID = "/users";
export const URL_LOGOUT = "logout";
export const URL_ME = "/auth/me";

const authApi = {
  registerAccount(body: { email: string; password: string; username: string }) {
    return http.post(URL_REGISTER, body);
  },
  me() {
    return http.get(URL_ME);
  },
  getUserById(id: number) {
    return http.get(`${URL_GETUSERBYID}/${id}`);
  },
  login(body: { email: string; password: string }) {
    return http.post(URL_LOGIN, body);
  },
  logout() {
    return http.post(URL_LOGOUT);
  },
};

export default authApi;
