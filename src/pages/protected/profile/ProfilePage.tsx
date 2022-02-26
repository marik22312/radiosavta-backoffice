import React from "react";
import { useLoggedInUser } from "../../../hooks/auth/useLoggedInUser";
import { UserPage } from "../../../components/UserPage/UserPage";
import { useState } from "react";
import EditUserModal from "../../../components/EditUserModal/EditUserModal";

export const ProfilePage: React.FC = () => {
  const { user, isLoading, refetch } = useLoggedInUser();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
      />
      {!!user && (
        <EditUserModal
          isOpen={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
          user={user}
          onUserUpdated={onUserUpdated}
        />
      )}
    </>
  );
};
