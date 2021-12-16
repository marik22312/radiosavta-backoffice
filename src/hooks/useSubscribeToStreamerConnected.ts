import { useEffect } from "react";
import { useSignalContext } from "../providers/SignalProvider";

export const useSubscribeToStreamerConnected = (
  handleEvent: (streamerName: string) => void
) => {
  const { socket } = useSignalContext();

  useEffect(() => {
    socket.on("streamer:connected", ({ message }) => {
      handleEvent(message.streamerName);
    });
    return () => {
      socket.off("streamer:connected");
    };
  }, [handleEvent, socket]);
};
