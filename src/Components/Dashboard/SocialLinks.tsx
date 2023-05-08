import { ChangeEvent } from "react";

interface Props {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
  githubLink: string;
  telegramLink: string;
  linkedinLink: string;
  websiteLink: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SocialSection({
  selectedOption,
  setSelectedOption,
  facebookLink,
  twitterLink,
  instagramLink,
  githubLink,
  telegramLink,
  linkedinLink,
  websiteLink,
  handleInputChange,
}: Props) {
  const renderInputField = () => {
    if (selectedOption === "facebook") {
      return (
        <div className="mt-4">
          <label className="mb-2 block font-medium">
            Facebook Profile Link
          </label>
          <input
            type="text"
            name="facebook"
            value={facebookLink}
            onChange={handleInputChange}
            className=" w-full border-2 border-black py-2 px-4 focus:outline-none"
          />
        </div>
      );
    } else if (selectedOption === "twitter") {
      return (
        <div className="mt-4">
          <label className="mb-2 block font-medium">Twitter Profile Link</label>
          <input
            type="text"
            name="twitter"
            value={twitterLink}
            onChange={handleInputChange}
            className=" w-full border-2 border-black py-2 px-4 focus:outline-none"
          />
        </div>
      );
    } else if (selectedOption === "instagram") {
      return (
        <div className="mt-4">
          <label className="mb-2 block font-medium">
            Instagram Profile Link
          </label>
          <input
            type="text"
            name="instagram"
            value={instagramLink}
            onChange={handleInputChange}
            className=" w-full border-2 border-black py-2 px-4 focus:outline-none"
          />
        </div>
      );
    } else if (selectedOption === "github") {
      return (
        <div className="mt-4">
          <label className="mb-2 block font-medium">Github Profile Link</label>
          <input
            type="text"
            name="github"
            value={githubLink}
            onChange={handleInputChange}
            className=" w-full border-2 border-black py-2 px-4 focus:outline-none"
          />
        </div>
      );
    } else if (selectedOption === "telegram") {
      return (
        <div className="mt-4">
          <label className="mb-2 block font-medium">
            Telegram Profile Link
          </label>
          <input
            type="text"
            name="telegram"
            value={telegramLink || ""}
            onChange={handleInputChange}
            className=" w-full border-2 border-black py-2 px-4 focus:outline-none"
          />
        </div>
      );
    } else if (selectedOption === "linkedin") {
      return (
        <div className="mt-4">
          <label className="mb-2 block font-medium">
            Linkedin Profile Link
          </label>
          <input
            type="text"
            name="linkedin"
            value={linkedinLink || ""}
            onChange={handleInputChange}
            className=" w-full border-2 border-black py-2 px-4 focus:outline-none"
          />
        </div>
      );
    } else if (selectedOption === "website") {
      return (
        <div className="mt-4">
          <label className="mb-2 block font-medium">Your Website Link</label>
          <input
            type="text"
            name="website"
            value={websiteLink || ""}
            onChange={handleInputChange}
            className=" w-full border-2 border-black py-2 px-4 focus:outline-none"
          />
        </div>
      );
    }
  };

  return (
    <div className="my-4 text-black">
      <label className="mb-2 block font-medium">Select a Social Media</label>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="w-full rounded px-4 py-3"
      >
        <option value="">Select a social media</option>
        <option value="facebook">Facebook</option>
        <option value="twitter">Twitter</option>
        <option value="instagram">Instagram</option>
        <option value="github">Github</option>
        <option value="linkedin">Linkedin</option>
        <option value="telegram">Telegram</option>
        <option value="website">Website</option>
      </select>
      {renderInputField()}
    </div>
  );
}
