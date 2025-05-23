import { useTheme } from "@/context/ThemeContext";
import { Avatar, useMediaQuery } from "@mui/material";

type UserInfoType = {
  user: {
    userName: string;
    bio: string;
    profilePicture: string;
    interests: string[];
    followers: {
      totalFollowers: number;
      lastFollowers: { profilePicture: string }[];
    };
    following: {
      totalFollowing: number;
      lastFollowing: { profilePicture: string }[];
    };
  };
};

export const UserInfo = ({ user }: UserInfoType) => {
  const { themeMode } = useTheme();
  const isMdUp = useMediaQuery("(min-width:768px)");

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "k";
    }
    return num.toString();
  };

  return (
    <>
      <div className="-mt-15 z-30 px-4 md:mt-0 gap-8 flex md:flex-col items-center md:text-center">
        <div className="flex flex-col items-start md:items-center w-full gap-2">
          <p className="font-semibold text-[1.2em]">@{user?.userName}</p>
          <p className="opacity-50 md:w-[40%] text-start md:text-center">
            {user?.bio}
          </p>
        </div>
        <div className="md:hidden w-25 h-25 aspect-square">
          <img
            src={user?.profilePicture}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>

      {/* Interests */}
      <div className="flex flex-wrap gap-2 justify-center px-4">
        {user?.interests.map((interest, index) => (
          <div
            key={index}
            className={`${
              themeMode === "light"
                ? "bg-white text-black"
                : "bg-[#323332] text-white"
            } px-4 py-2 rounded-full text-sm font-semibold`}
          >
            {interest}
          </div>
        ))}
      </div>

      {/* Followers & Following */}
      <div className="flex items-center gap-4">
        {/* Seguidores */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center mt-2">
            {user.followers?.lastFollowers.map((follower, index) => (
              <div
                key={index}
                className="overflow-hidden"
                style={{
                  marginLeft: index === 0 ? 0 : -15,
                  zIndex: index,
                }}
              >
                <Avatar
                  src={follower?.profilePicture}
                  sx={{
                    border: `${
                      themeMode === "light" ? "#F7F7F7" : "#121212"
                    } 2px solid`,
                    width: isMdUp ? 35 : 50,
                    height: isMdUp ? 35 : 50,
                  }}
                />
              </div>
            ))}
            <div
              className={`${
                themeMode === "light"
                  ? "border-[#F7F7F7] bg-[#121212] text-white"
                  : "bg-[#F7F7F7] border-[#121212] text-black"
              } w-[50px] h-[50px] md:w-[35px] md:h-[35px] text-sm md:text-xs font-semibold border-2 flex items-center justify-center rounded-full -ml-4 z-20`}
            >
              {formatNumber(user.followers.totalFollowers)}
            </div>
          </div>
          <p className="font-semibold">Followers</p>
        </div>

        {/* Siguiendo */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center mt-2">
            {user.following?.lastFollowing.map((following, index) => (
              <div
                key={index}
                className="overflow-hidden"
                style={{
                  marginLeft: index === 0 ? 0 : -15,
                  zIndex: index,
                }}
              >
                <Avatar
                  src={following?.profilePicture}
                  sx={{
                    border: `${
                      themeMode === "light" ? "#F7F7F7" : "#121212"
                    } 2px solid`,
                    width: isMdUp ? 35 : 50,
                    height: isMdUp ? 35 : 50,
                  }}
                />
              </div>
            ))}
            <div
              className={`${
                themeMode === "light"
                  ? "border-[#F7F7F7] bg-[#121212] text-white"
                  : "bg-[#F7F7F7] border-[#121212] text-black"
              } w-[50px] h-[50px] md:w-[35px] md:h-[35px] text-sm md:text-xs font-semibold border-2 flex items-center justify-center rounded-full -ml-4 z-20`}
            >
              {formatNumber(user.following.totalFollowing)}
            </div>
          </div>
          <p className="font-semibold">Following</p>
        </div>
      </div>
    </>
  );
};
