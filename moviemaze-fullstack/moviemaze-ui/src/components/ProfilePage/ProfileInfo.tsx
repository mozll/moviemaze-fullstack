import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchUserProfile,
  postProfilePicture,
  postResetProfilePicture,
} from "../../../apiService";
import ProfileMovieGrid from "./ProfileMovieGrid";

interface UserProfile {
  user_id: number;
  user_full_name: string;
  user_username: string;
  user_email: string;
  user_profile_picture: string;
  logged_in: boolean;
}

const ProfileInfo = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profilePictureError, setProfilePictureError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Here we're defining the expected shape of the URL params
  const { userId } = useParams<{ userId: string }>();

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (userProfile && userProfile.logged_in) {
      const file = event.target.files?.[0] || null;
      // If a file is selected, send it to api with axios
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        postProfilePicture(userProfile.user_id, formData)
          .then((response) => {
            // Update local state with the new profile picture URL
            setUserProfile((prevProfile) => {
              if (!prevProfile) {
                return prevProfile;
              }

              return {
                ...prevProfile,
                user_profile_picture: response.updatedProfilePicturePath,
              };
            });
          })
          .catch((err) => {
            setProfilePictureError(
              err.response.data.error ||
                err.response.data.message ||
                err.message
            );
          });
      }
    }
  };

  const handleChangeClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleResetClick = () => {
    if (userProfile && userProfile.logged_in) {
      postResetProfilePicture(userProfile.user_id)
        .then((response) => {
          // Update local state with the new profile picture URL
          setUserProfile((prevProfile) => {
            if (!prevProfile) {
              return prevProfile;
            }

            return {
              ...prevProfile,
              user_profile_picture: response.resetProfilePicturePath,
            };
          });
        })
        .catch((err) => {
          setProfilePictureError(
            err.response.data.error || err.response.data.message || err.message
          );
        });
    }
  };

  const removeError = () => {
    setProfilePictureError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (userId) {
      // Convert the userId to a number before making the API call
      const numericUserId = Number(userId);
      if (!isNaN(numericUserId)) {
        fetchUserProfile(numericUserId)
          .then((profile) => {
            setUserProfile(profile);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      } else {
        setError("Invalid user ID");
        setLoading(false);
      }
    }
  }, [userId]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error loading profile: {error}</div>;
  }

  if (!userProfile) {
    return <div>No profile data found.</div>;
  }

  // Check if the MODE environment variable is set to 'development'
  const isDevelopment = import.meta.env.MODE === "development";

  const getProfilePictureSrc = () => {
    const profilePictureUrl = userProfile.user_profile_picture;

    // Use shorthand conditional to determine the appropriate URL
    return profilePictureUrl.startsWith("http") || !isDevelopment
      ? profilePictureUrl
      : `http://localhost:3000${profilePictureUrl}`;
  };

  return (
    <>
      <input
        id="profilePictureFile"
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
        ref={fileInputRef}
      />
      <div className="relative">
        <section className="items-center justify-center hidden h-24 px-8 text-white gap-x-16 xl:gap-x-32 lg:flex bg-movieMediumDark">
          <div className="basis-1/3"></div>
          <div className="flex flex-row items-center justify-start gap-x-16 basis-2/3">
            <div>
              <p>Followers: 315</p>
            </div>
            <div>
              <p>Following: 123</p>
            </div>
            <div>
              <p>Watched: 29</p>
            </div>
            <div>
              <button className="px-3 py-1 bg-movieLightGreen left-1/2">
                Unfollow
              </button>
            </div>
          </div>
        </section>
        <div className="absolute top-0 flex justify-center -translate-y-[90%] left-0 right-0 lg:hidden">
          <div className="relative overflow-hidden rounded-xl">
            <div>
              <img src={getProfilePictureSrc()} className="w-[250px]"></img>
              {userProfile && userProfile.logged_in ? (
                <div className="absolute flex flex-col gap-2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <button
                    className="px-3 py-1 bg-movieLightGreen"
                    onClick={handleChangeClick}
                  >
                    Change picture
                  </button>
                  <button
                    className="px-3 py-1 bg-red-800"
                    onClick={handleResetClick}
                  >
                    Reset picture
                  </button>
                </div>
              ) : null}
            </div>
            <div className="absolute z-10 bottom-0 left-0 right-0 bg-gradient-to-t from-black from-50% p-3 pt-8">
              <p className="text-lg font-semibold text-center text-white">
                {userProfile.user_username}
              </p>
              <p className="text-center text-gray-400 ">
                {userProfile.user_full_name}, 29
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-16 pb-8 bg-movieLightDark lg:hidden">
          <div className="relative p-6 pt-10 bg-movieMediumDark w-[250px] rounded-xl text-white leading-7">
            <button className="absolute top-0 px-3 py-1 -translate-x-1/2 -translate-y-1/2 bg-movieLightGreen left-1/2">
              Unfollow
            </button>
            <p>Reviews: 12</p>
            <p>Followers: 315</p>
            <p>Following: 123</p>
            <p>Watched: 29</p>
            <p>Watchlist: 35</p>
            <p>Joined: Jan. 2022</p>
          </div>
        </div>
        <div className="justify-center hidden px-8 text-white lg:flex h-80 gap-x-16 xl:gap-x-32 bg-movieLightDark">
          <div className="flex justify-end -translate-y-1/2 basis-1/3">
            <div className="relative h-fit">
              <img
                src={getProfilePictureSrc()}
                className="relative top-0 object-contain h-auto max-w-full"
              ></img>
              {userProfile && userProfile.logged_in ? (
                <div className="absolute flex flex-col gap-2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <button
                    className="px-3 py-1 bg-movieLightGreen"
                    onClick={handleChangeClick}
                  >
                    Change picture
                  </button>
                  <button
                    className="px-3 py-1 bg-red-800"
                    onClick={handleResetClick}
                  >
                    Reset picture
                  </button>
                </div>
              ) : null}
              {profilePictureError !== "" ? (
                <div className="absolute w-full p-6 transform -translate-x-1/2 -translate-y-1/2 bg-red-700 top-1/2 left-1/2">
                  {profilePictureError}
                  <button
                    className="absolute top-0 right-0 px-2 text-2xl cursor-pointer"
                    onClick={removeError}
                  >
                    &times;
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <section className="flex flex-row justify-start pt-8 gap-x-16 xl:gap-x-32 basis-2/3">
            <div>
              <p className="pb-4 text-2xl font-semibold">
                {userProfile.user_full_name}
              </p>
              <p>Age: 29</p>
              <p>Followers: 315</p>
              <p>Following: 123</p>
              <p>Joined: January 2022</p>
            </div>
            <div>
              <p className="pb-4 text-2xl font-semibold">
                {userProfile.user_username}
              </p>
              <p>Reviews: 12</p>
              <p>Watched: 29</p>
              <p>Watchlist: 35</p>
              <p>{userProfile.user_email}</p>
            </div>
          </section>
        </div>
      </div>
      <section className="bg-movieDarkestDark ">
        <ProfileMovieGrid />
      </section>
    </>
  );
};

export default ProfileInfo;
