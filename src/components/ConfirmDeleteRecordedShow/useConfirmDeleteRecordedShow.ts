import { createElement } from "react";
import ReactDOM from "react-dom";
import {
  ConfirmDeleteRecordedShowProps,
  WrappedConfirmDeleteRecordedShow,
} from "./ConfirmDeleteRecordedShow";

export const useConfirmDeleteRecordedShow = () => {
  const open = (recordedShowId: string | number) => {
    const props: ConfirmDeleteRecordedShowProps = {
      recordedShowId,
      onCancel: () => {
        unmountEditRecordedShowModal();
      },
      onSuccess: () => {
        unmountEditRecordedShowModal();
      },
    };
    const portal = document.createElement("div");
    portal.setAttribute("id", "delete-recorded-show-modal");
    document.body.appendChild(portal);
    ReactDOM.render(
      createElement(WrappedConfirmDeleteRecordedShow, props),
      portal
    );
  };

  const unmountEditRecordedShowModal = () => {
    const portal = document.getElementById("delete-recorded-show-modal");
    if (portal) {
      ReactDOM.unmountComponentAtNode(portal);
      portal.parentNode!.removeChild(portal);
    }
  };

  return {
    open,
    unmountEditRecordedShowModal,
  };
};
