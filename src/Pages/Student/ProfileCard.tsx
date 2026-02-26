import home from "../../Data/house.svg";
import heart from "../../Data//heart-handshake.svg";
import currencu from "../../Data/badge-dollar-sign (1).svg";
import book from "../../Data/my_course_icon.svg";
import plus from "../../Data/copy-plus.svg";
import Logout from "../../Data/Logout.png";
import { useEffect, useState, type ChangeEvent } from "react";
import { UseProfile } from "../../ZustandStore/ProfileStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../ZustandStore/AuthStore";
  
function ProfileCard() {
  const user = useAuth((s) => s.user);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Biagrapghy, setBiagrapghy] = useState("");

  const [Email, setEmail] = useState("");
  const [Linkedin, setLinkedin] = useState("");

  const [isProfile, setisProfile] = useState(true);
  const [isPrivacy, setisPrivacy] = useState(false);
  const [isPicture, setisPicture] = useState(false);
  const [avatarFile, setavatarFile] = useState<File | null>(null);
  const [preview, setpreview] = useState<null | string>(null);
  const [OldPassword, setOldPassword] = useState("");
  const [errrormsg, seterrrormsg] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const isEducator = UseProfile((s) => s.isEducator);
  const logout = useAuth((s) => s.Logout);
  const location = useLocation();
  const navigate = useNavigate();

  const updateProfile = UseProfile((s) => s.UpdateProfile);
  const updatepssword = UseProfile((s) => s.changedpassword);

  useEffect(() => {
    const timer = setTimeout(() => {
      const value = isValidatePassword();
    }, 500);

    return () => clearTimeout(timer);
  }, [ConfirmPassword, NewPassword]);
 
  function isValidatePassword() {
    if (NewPassword === ConfirmPassword) {
      seterrrormsg("");
      return true;
    } 
    seterrrormsg("Confirm password not matched.");
    return false;
  } 

  const handleupdatepassword = () => {
    const data = {
      oldPassword: OldPassword,
      newPassword: NewPassword,
    };
    updatepssword(data);
  };

  const handlechanges = () => {
    const FormedData = new FormData();

    FormedData.append("firstname", FirstName);
    FormedData.append("lastname", LastName);
    FormedData.append("email", Email);
    if (avatarFile) FormedData.append("avatar", avatarFile);
    if (user?._id) updateProfile(FormedData);
  };

  useEffect(() => {
    if (user) {
      console.log("user is ", user.name);

      const [First, Last] = user?.name.split(" ");
      console.log(First, " ", Last);

      setFirstName(First);
      setLastName(Last);
      setEmail(user?.email);
      setpreview(user?.avatar);
    }
  }, [user]);

  const HandleLogout = () => {
    logout();
    navigate("/");
  };

  if (location.pathname.includes("Educator")) {
    UseProfile.setState({
      isEducator: true,
    });
  } else {
    UseProfile.setState({
      isEducator: false,
    });
  }

  const handlepreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setpreview(URL.createObjectURL(file));
      setavatarFile(file);
    }
  };
  return (
    <div className="min-h-screen bg-sky-50 p-4 md:p-8">
      {/* Main Container */}t
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div
          className="
          w-full lg:w-1/4
          bg-white
          rounded-2xl
          shadow-md
          p-5
          space-y-6
          opacity-60
          "
        >
          {/* Menu */}
          <div className="space-y-3">
            {[
              { icon: home, label: "Dashboard" },
              { icon: book, label: "My Courses" },
              isEducator
                ? { icon: plus, label: "Add Course" }
                : { icon: heart, label: "Wishlist" },
              isEducator
                ? { icon: currencu, label: "Earnings" }
                : { icon: currencu, label: "My Earnings" },
            ].map((item, i) => (
              <div
                key={i}
                className="
                flex items-center gap-3
                p-3
                rounded-xl
                cursor-pointer
                text-gray-800
                hover:bg-blue-50 hover:text-blue-700
                transition
                "
              >
                <img src={item.icon} alt="" className="h-5" />
                <h2 className="font-medium">{item.label}</h2>
              </div>
            ))}

            {/* Theme */}
            <div
              className="
              flex items-center gap-3
              p-3
              rounded-xl
              cursor-pointer
              text-gray-800
              hover:bg-blue-50 hover:text-blue-700
              transition
              "
            >
              🌙
              <h2 className="font-medium">Theme</h2>
            </div>
            <div
              className="
              flex items-center gap-3
              p-3
              rounded-xl
              cursor-pointer
              text-gray-800
              hover:bg-blue-50 hover:text-blue-700
              transition
              "
              onClick={HandleLogout}
            >
              <img src={Logout} alt="logout" className="h-5" />
              <h2 className="font-medium">Logout</h2>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="
          w-full lg:w-3/4
          bg-white
          rounded-2xl
          shadow-md
          p-6 md:p-8
          space-y-8
          "
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="space-y-2">
              <h4 className="text-sm text-gray-500">Profile & Settings</h4>

              <h2 className="text-2xl font-semibold text-gray-800">
                Profile Settings
              </h2>

              <div className="flex gap-4 text-sm text-blue-600">
                <p
                  className="cursor-pointer hover:underline"
                  onClick={() => {
                    setisProfile(true);
                    setisPrivacy(false);
                    setisPicture(false);
                  }}
                >
                  Profile Info
                </p>
                <p
                  className="cursor-pointer hover:underline"
                  onClick={() => {
                    setisProfile(false);
                    setisPrivacy(false);
                    setisPicture(true);
                  }}
                >
                  Picture
                </p>
                <p
                  className="cursor-pointer hover:underline"
                  onClick={() => {
                    setisProfile(false);
                    setisPrivacy(true);
                    setisPicture(false);
                  }}
                >
                  Privacy
                </p>
              </div>
            </div>

            {/* <img
              src={cloudbear}
              alt=""
              className="h-24 sm:h-28 opacity-40 shadow-md"
            /> */}
          </div>

          {/* Form */}
          {isProfile && (
            <div
              className="
            grid
            grid-cols-1 md:grid-cols-2
            gap-6
            "
            >
              {/* Input Field */}
              {[
                {
                  label: "First Name",
                  type: "text",
                  value: FirstName,
                  setter: setFirstName,
                },
                {
                  label: "Last Name",
                  type: "text",
                  value: LastName,
                  setter: setLastName,
                },
                {
                  label: "Email",
                  type: "email",
                  value: Email,
                  setter: setEmail,
                },
                {
                  label: "LinkedIn",
                  type: "text",
                  value: Linkedin,
                  setter: setLinkedin,
                },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-600">
                    {item.label}
                  </h3>

                  <input
                    type={item.type}
                    value={item.value}
                    onChange={(e) => item.setter(e.target.value)}
                    placeholder={item.value == "" ? "Linkedin id..." : ""}
                    className="
                  w-full
                  px-4 py-2.5
                  border border-gray-300
                  rounded-lg
                  text-sm
                  focus:outline-none
                  focus:ring-2 focus:ring-blue-500
                  "
                  />
                </div>
              ))}

              {/* Biography (Full Width) */}
              <div className="md:col-span-2 space-y-1">
                <h3 className="text-sm font-medium text-gray-600">Biography</h3>

                <textarea
                  rows={4}
                  className="
                w-full
                px-4 py-2.5
                border border-gray-300
                rounded-lg
                text-sm
                resize-none
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
                "
                  value={Biagrapghy}
                  placeholder="Biography texts ....."
                  onChange={(e) => setBiagrapghy(e.target.value)}
                ></textarea>
              </div>
            </div>
          )}

          {isPrivacy && (
            <div className="space-y-6 max-w-md">
              <h2 className="text-lg font-semibold text-gray-800">
                Change Password
              </h2>

              {/* Old Password */}
              <div className="space-y-1">
                <label className="text-sm text-gray-600">
                  Current Password
                </label>

                <input
                  type="password"
                  placeholder="Enter current password"
                  className="
        w-full
        px-4 py-2.5
        border border-gray-300
        rounded-lg
        text-sm
        focus:outline-none
        focus:ring-2 focus:ring-blue-500
        "
                  value={OldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              {/* New Password */}
              <div className="space-y-1">
                <label className="text-sm text-gray-600">New Password</label>

                <input
                  type="password"
                  placeholder="Enter new password"
                  className="
        w-full
        px-4 py-2.5
        border border-gray-300
        rounded-lg
        text-sm
        focus:outline-none
        focus:ring-2 focus:ring-blue-500
        "
                  value={NewPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-sm text-gray-600">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="
        w-full
        px-4 py-2.5
        border border-gray-300
        rounded-lg
        text-sm
        focus:outline-none
        focus:ring-2 focus:ring-blue-500
        "
                  value={ConfirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {errrormsg && <div>
                <p className="text-red-600" >{errrormsg}</p>
              </div> }

              {/* Update Button */}
              <button
                className="
      bg-blue-700 hover:bg-blue-800
      text-white
      px-6 py-2.5
      rounded-lg
      font-medium
      transition
      "
                onClick={handleupdatepassword}
              >
                Update Password
              </button>
            </div>
          )}

          {isPicture && (
            <div className="space-y-6 max-w-md">
              <h2 className="text-lg font-semibold text-gray-800">
                Update Profile Picture
              </h2>

              <div
                className="
  h-24 w-24
  rounded-full
  border-2 border-dashed border-blue-300
  flex items-center justify-center
  overflow-hidden
  bg-blue-50
  "
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-gray-400">No Image</span>
                )}
              </div>

              {/* Upload Input */}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  className="
        block w-full
        text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-medium
        file:bg-blue-50 file:text-blue-700
        hover:file:bg-blue-100
        cursor-pointer
        "
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handlepreview(e)
                  }
                />
              </div>

              {/* Save Button */}
              <button
                className="
      bg-blue-700 hover:bg-blue-800
      text-white
      px-6 py-2.5
      rounded-lg
      font-medium
      transition
      "
                onClick={handlechanges}
              >
                Upload Picture
              </button>
            </div>
          )}

          {/* Save Button */}
          {isProfile && (
            <div className="flex justify-end">
              <button
                className="
              bg-blue-700 hover:bg-blue-800
              text-white
              px-8 py-2.5
              rounded-xl
              font-medium
              transition
              "
                onClick={handlechanges}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
