import EditProfile from "./EditSetting";
import { useMe } from "@/hooks/auth/queries/useMe";

const Setting = () => {
  const { data } = useMe();

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-lg overflow-hidden bg-white shadow-xl rounded-xl">
        {/* Header with Avatar */}
        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-green-400 to-emerald-500">
          <img
            src="https://github.com/shadcn.png"
            alt="avatar"
            className="w-24 h-24 border-4 border-white rounded-full shadow-md"
          />
          <h2 className="mt-4 text-2xl font-semibold text-white">{data?.username}</h2>
          <p className="text-sm text-white opacity-80">{data?.email}</p>
        </div>
  
        {/* Body Info */}
        <div className="px-6 py-8 space-y-6">
          <div>
            <h4 className="mb-1 text-sm font-semibold text-gray-500">Password</h4>
            <p className="font-medium text-gray-800">**********</p>
          </div>
  
          <div>
            <h4 className="mb-1 text-sm font-semibold text-gray-500">Bio</h4>
            <p className="text-gray-800">
              {data?.bio || <span className="italic text-gray-400">No bio added.</span>}
            </p>
          </div>
        </div>
  
        {/* Footer */}
        <div className="flex justify-center px-6 pb-6">
          <EditProfile />
        </div>
      </div>
    </div>
  );
  
  
};

export default Setting;
