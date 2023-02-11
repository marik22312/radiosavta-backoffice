import { getMagicSDK } from "../singletons/MagicLink";

export const getMagicAuthToken = async () => {
  try {
    const token = await getMagicSDK().user.generateIdToken();
    return token;
  } catch (error) {
    return null;
  }
};

export const loginWithEmailOTP = (email: string) => {
  return getMagicSDK().auth.loginWithEmailOTP({ email });
};
