import React from "react";
import { queryCache } from "react-query";
import { useDeleteRecordedShow } from "../../hooks/useDeleteRecordedShow";
import { useRecordedShowById } from "../../hooks/useRecordedShowById";
import { showErrorToast } from "../../utils/toast.util";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";

export interface ConfirmDeleteRecordedShowProps {
  recordedShowId: string | number;
  onCancel: () => void;
  onSuccess: () => void;
}
export const ConfirmDeleteRecordedShow: React.FC<ConfirmDeleteRecordedShowProps> =
  (props) => {
    const { recordedShow } = useRecordedShowById(props.recordedShowId);

    const onSuccess = () => {
      queryCache.invalidateQueries("recorded_shows");
      props.onSuccess();
    };

    const onError = (err: Error) => {
      showErrorToast(err.message);
      props.onCancel();
    };
    const { deleteRecordedShow, isLoading: isDeleting } = useDeleteRecordedShow(
      {
        onSuccess,
        onError,
      }
    );

    return (
      <ConfirmationModal
        title={`Delete ${recordedShow?.name}?`}
        message={`Are you sure you want to delete ${recordedShow?.name}? The recording will be deleted permanently and the operation canno't be undone!`}
        onCancel={props.onCancel}
        onConfirm={() => deleteRecordedShow(props.recordedShowId)}
        isLoading={isDeleting}
      />
    );
  };
