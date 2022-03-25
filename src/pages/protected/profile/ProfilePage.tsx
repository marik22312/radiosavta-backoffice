import React from "react";
import { useLoggedInUser } from "../../../hooks/auth/useLoggedInUser";
import { UserPage } from "../../../components/UserPage/UserPage";
import { useState } from "react";
import EditUserModal from "../../../components/EditUserModal/EditUserModal";
import { EditImageModal } from "../../../components/EditImageImageModal/EditImageImageModal";
import { useEditUserImage } from "../../../components/UserSidePanel/hooks/useEditUserImage";

export const ProfilePage: React.FC = () => {
  const { user, isLoading, refetch } = useLoggedInUser();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isEditImageModalOpen, setIsEditImageModalOpen] = useState(false);

  const { isLoading: isImageLoading, updateImage } = useEditUserImage(
    user?.id ?? "",
    {
      onError: (err) =>
        setErrorMessage("Something went wrong, please refresh and try again"),
      onSuccess: () => {
        setIsEditImageModalOpen(false);
        refetch();
      },
    }
  );

  const onEditImage = (image: File) => {
    updateImage(image);
  };

  const onCancelEditImage = () => {
    setIsEditImageModalOpen(false);
  };
  const onUserUpdated = () => {
    refetch();
  };
  const onClickEditUser = () => {
    setIsEditModalOpen(true);
  };

  if (!user || isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <UserPage
        title="My Profile"
        user={user}
        onClickEditUser={onClickEditUser}
        onClickEditUserImage={() => setIsEditImageModalOpen(true)}
      />
      {!!user && (
        <EditUserModal
          isOpen={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
          user={user}
          onUserUpdated={onUserUpdated}
        />
      )}
      {!!user && (
        <EditImageModal
          isOpen={isEditImageModalOpen}
          onOk={onEditImage}
          onCancel={onCancelEditImage}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
};
