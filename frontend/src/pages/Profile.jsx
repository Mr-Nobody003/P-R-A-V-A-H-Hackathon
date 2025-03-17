import { useAuth } from "../AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Profile</h2>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>
    </div>
  );
};

export default Profile;
