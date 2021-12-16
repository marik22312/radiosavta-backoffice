import React from "react";
import { useSubscribeToStreamerConnected } from "../../hooks/useSubscribeToStreamerConnected";
import { showStreamerConnectedToast } from "../../utils/toast.util";

export const SignalReciever: React.FC = () => {
  useSubscribeToStreamerConnected(showStreamerConnectedToast);
  return null;
};
