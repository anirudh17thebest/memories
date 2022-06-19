import { loginStart, loginSuccess, loginFail } from "../redux/userSlice";
import { publicRequest } from "../requestMethods";

export const loginUser = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFail());
  }
};
