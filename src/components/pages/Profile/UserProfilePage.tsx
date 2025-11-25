import React from "react";
import { useParams } from "react-router-dom";
import { ProfileProvider } from "./ProfileContext";
import ProfilePage from "./ProfilePage";

// Wrapper component that handles dynamic user profile routing
export const UserProfilePage: React.FC = () => {
  const params = useParams<{ userId: string }>();
  const { userId } = params;

  return (
    <ProfileProvider userId={userId}>
      <ProfilePage />
    </ProfileProvider>
  );
};

export default UserProfilePage;
