import React, { useContext, useRef } from "react";

import { Socket, io } from "socket.io-client";

interface SignalContext {
  socket: Socket;
}

export const SignalContextImpl = React.createContext<SignalContext | null>(
  null
);

export const useSignalContext = () => {
  const signalContext = useContext(SignalContextImpl);

  if (!signalContext) {
    throw new Error(
      "Unable to find signal context, did you forget to wrap with `<SignalProvider>` ?"
    );
  }

  return signalContext;
};

export const SignalContextProvider: React.FC = ({ children }) => {
  const socketRef = useRef(
    io("http://localhost:4000", {
      path: "/signal/",
    })
  );
  return (
    <SignalContextImpl.Provider value={{ socket: socketRef.current }}>
      {children}
    </SignalContextImpl.Provider>
  );
};
