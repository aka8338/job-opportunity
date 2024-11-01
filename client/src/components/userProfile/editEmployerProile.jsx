import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthStore from "../../store/AuthStore";

export default function EditEmployerProile() {
  const [subProfile, setSubProfile] = useState({
    companyName: "",
    companyDescription: "",
    contactNumber: "",
    oldPassword: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  const { editProfile, user } = AuthStore();

  useEffect(() => {
    const { companyName, companyDescription, contactNumber } = user;
    setSubProfile({
      companyName,
      companyDescription,
      contactNumber,
      oldPassword: "",
      newPassword: "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubProfile({
      ...subProfile,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editProfile(subProfile);
    navigate("/profile");
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label
            htmlFor="companyName"
            className="mb-2 text-sm font-medium text-gray-200"
          >
            Company Name:
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            className="p-2 rounded bg-gray-700 text-gray-200"
            value={subProfile.companyName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="companyDescription"
            className="mb-2 text-sm font-medium text-gray-200"
          >
            Company Description:
          </label>
          <input
            type="text"
            id="companyDescription"
            name="companyDescription"
            className="p-2 rounded bg-gray-700 text-gray-200"
            value={subProfile.companyDescription}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="contactNumber"
            className="mb-2 text-sm font-medium text-gray-200"
          >
            Contact Number:
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            className="p-2 rounded bg-gray-700 text-gray-200"
            value={subProfile.contactNumber}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="oldPassword"
            className="mb-2 text-sm font-medium text-gray-200"
          >
            Old Password:
          </label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            className="p-2 rounded bg-gray-700 text-gray-200"
            value={subProfile.oldPassword}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="newPassword"
            className="mb-2 text-sm font-medium text-gray-200"
          >
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="p-2 rounded bg-gray-700 text-gray-200"
            value={subProfile.newPassword}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}
