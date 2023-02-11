import { Magic } from "magic-sdk";

let magic: Magic;

export const getMagicSDK = () => {
  if (!magic) {
    magic = new Magic(process.env.REACT_APP_MAGIC_LINK_API_KEY!);
  }

  return magic;
};
