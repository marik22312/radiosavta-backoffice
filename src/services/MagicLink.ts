import { Magic } from "magic-sdk";
const magic = new Magic(process.env.REACT_APP_MAGIC_LINK_API_KEY!);

export { magic };

export const getMagicAuthToken = async () => {
  try {
    const token = await magic.user.generateIdToken();
    return token;
  } catch (error) {
    return null;
  }
};

export const loginWithEmailOTP = (email: string) => {
  return magic.auth.loginWithEmailOTP({ email });
};
