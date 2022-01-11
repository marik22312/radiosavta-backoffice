import { createElement } from "react";
import ReactDOM from "react-dom";
import {
  EditRecordedShowModalProps,
  EditRecordedShow,
} from "./EditRecordedShow";

export const useEditRecordedShowModal = () => {
  const open = (recordedShowId: string | number) => {
    const portal = document.createElement("div");

    const props: EditRecordedShowModalProps = {
      recordedShowId,
      isOpen: true,
      onClose: unmountEditRecordedShowModal,
    };
    portal.setAttribute("id", "edit-recorded-show-modal-wrapper");
    document.body.appendChild(portal);
    ReactDOM.render(createElement(EditRecordedShow, props), portal);
  };

  const unmountEditRecordedShowModal = () => {
    const portal = document.getElementById("edit-recorded-show-modal-wrapper");
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
