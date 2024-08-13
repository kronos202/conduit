import http from "@/lib/http";
import {
  EditProfileBodyType,
  LoginGoogleBodyType,
} from "@/schemaValidations/auth.schema";

export const URL_LOGIN = "/auth/login";
export const URL_LOGINGOOGLE = "/auth-google/login";
export const URL_CONFIRMEMAIL = "/auth/email/confirm";
export const URL_REGISTER = "/auth/register";
export const URL_GETUSERBYID = "/users";
export const URL_LOGOUT = "/auth/logout";
export const URL_ME = "/auth/me";
export const URL_EDITME = "/users";

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
  confirmEmail(body: { hash: string }) {
    return http.post(URL_CONFIRMEMAIL, body);
  },
  loginGoogle(body: LoginGoogleBodyType) {
    return http.post(URL_LOGINGOOGLE, body);
  },
  logout() {
    return http.post(URL_LOGOUT);
  },
  editMe(body: EditProfileBodyType) {
    return http.patch(URL_EDITME, body);
  },
};

export default authApi;
