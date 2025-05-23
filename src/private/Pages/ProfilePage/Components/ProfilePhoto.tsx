type ProfilePhotoProps = {
  profilePicture: string;
};

export const ProfilePhoto = ({ profilePicture }: ProfilePhotoProps) => {
  return (
    <div className="relative -mt-20 z-30 hidden md:block">
      <img
        src={profilePicture}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover"
      />
    </div>
  );
};
