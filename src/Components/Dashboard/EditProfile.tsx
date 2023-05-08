import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import EditProfileValidation from "../AdditionalComponents/Validation/EditProfileValidation";
import FormInput from "../Common/Input/FormInput";
import TextArea from "../Common/Input/Textarea";
import SocialSection from "./SocialLinks";

export default function EditProfile() {
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [facebookLink, setFacebookLink] = useState<string>("");
  const [twitterLink, setTwitterLink] = useState<string>("");
  const [instagramLink, setInstagramLink] = useState<string>("");
  const [githubLink, setGithubLink] = useState<string>("");
  const [telegramLink, setTelegramLink] = useState<string>("");
  const [linkedinLink, setLinkedinLink] = useState<string>("");
  const [websiteLink, setWebsiteLink] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/profile/${id}`).then((response) => {
      response.json().then((profileInfo) => {
        setName(profileInfo.Name);
        setBio(profileInfo.Bio);
        setFacebookLink(profileInfo.socialLinks.facebook);
        setTwitterLink(profileInfo.socialLinks.twitter);
        setInstagramLink(profileInfo.socialLinks.instagram);
        setGithubLink(profileInfo.socialLinks.github);
        setTelegramLink(profileInfo.socialLinks.telegram);
        setLinkedinLink(profileInfo.socialLinks.linkedin);
        setWebsiteLink(profileInfo.socialLinks.website);
      });
    });
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFacebookLink(name === "facebook" ? value : facebookLink);
    setTwitterLink(name === "twitter" ? value : twitterLink);
    setInstagramLink(name === "instagram" ? value : instagramLink);
    setGithubLink(name === "github" ? value : githubLink);
    setTelegramLink(name === "telegram" ? value : telegramLink);
    setLinkedinLink(name === "linkedin" ? value : linkedinLink);
    setWebsiteLink(name === "website" ? value : websiteLink);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = EditProfileValidation({ name });
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Bio", bio);
    formData.append(
      "Social",
      JSON.stringify({
        facebook: facebookLink,
        twitter: twitterLink,
        instagram: instagramLink,
        github: githubLink,
        telegram: telegramLink,
        linkedin: linkedinLink,
        website: websiteLink,
      })
    );
    formData.append("Image", files![0]);
    const updateProfile = () => {
      toast.loading("Please wait while we update your profile");
      return new Promise((resolve, reject) => {
        if (id) {
          fetch(`${process.env.REACT_APP_API}/updateprofile/${id}`, {
            method: "PUT",
            body: formData,
            credentials: "include",
          })
            .then((response) => response.json())
            .then((data) => {
              toast.dismiss();
              toast.success("Profile Successfully updated");
              setName(data.Name);
              setBio(data.Bio);
              setFacebookLink(data.socialLinks.facebook);
              setTwitterLink(data.socialLinks.twitter);
              setInstagramLink(data.socialLinks.instagram);
              setGithubLink(data.socialLinks.github);
              setTelegramLink(data.socialLinks.telegram);
              setLinkedinLink(data.socialLinks.linkedin);
              setWebsiteLink(data.socialLinks.website);
              resolve(data);
            })
            .catch((error) => {
              toast.error(
                "Couldn't update your profile. Please try again letter."
              );
              reject(error);
            });
        }
      });
    };

    updateProfile()
      .then((data) => {})
      .catch((error) => {});
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-5 shadow-md dark:bg-black">
      <h1 className="mb-5 text-2xl font-bold">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          htmlFor="name"
          id="name"
          type="text"
          placeholder="Name"
          maxLength={20}
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          error={errors.name}
        />

        <TextArea
          label="Bio"
          htmlFor="bio"
          id="bio"
          type="text"
          placeholder="Describe who you are"
          maxLength={800}
          value={bio}
          onChange={(ev) => setBio(ev.target.value)}
        />
        <SocialSection
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          facebookLink={facebookLink}
          twitterLink={twitterLink}
          instagramLink={instagramLink}
          githubLink={githubLink}
          telegramLink={telegramLink}
          linkedinLink={linkedinLink}
          websiteLink={websiteLink}
          handleInputChange={handleInputChange}
        />
        <FormInput
          label="Profile Image"
          htmlFor="image"
          id="image"
          type="file"
          onChange={(ev) => setFiles(ev.target.files)}
          value={""}
          placeholder={""}
        />

        <div className="mt-10 flex items-center">
          <button className="flex items-center justify-center rounded bg-black py-2 px-4 font-bold text-white dark:bg-gray-700">
            Update Profile
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
}
