import { toast } from "react-toastify";

export const showPasswordChangedToast = () => {
  toast.success("Password changed successfully!", {
    position: "bottom-right",
    autoClose: 3000,
  });
};

export const showGeneralErrorToast = (e: any) => {
  console.error(e);
  toast.error("Something went wrong...", {
    position: "bottom-right",
    autoClose: 3000,
  });
};
