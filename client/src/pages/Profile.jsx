import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [profilePhoto, setProfilePhoto] = useState('https://via.placeholder.com/150'); // Default photo
  const [fullName, setFullName] = useState('John Doe');
  const [phoneNumber, setPhoneNumber] = useState('+1 234 567 890');
  const [email, setEmail] = useState('john.doe@example.com');
  const [skills, setSkills] = useState('JavaScript, React, Node.js');
  const [certification, setCertification] = useState('AWS Certified Developer');
  const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result); // Set the uploaded photo as the new profile picture
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Profile Page</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src={profilePhoto}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800">{fullName}</h2>
          <p className="text-gray-600">{phoneNumber}</p>
        </div>
        
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="full-name">
              Full Name
            </label>
            <input
              type="text"
              id="full-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)} // Enable editing
              className={`border rounded w-full py-2 px-3 text-gray-700 ${isEditing ? '' : 'bg-gray-100 cursor-not-allowed'}`}
              readOnly={!isEditing}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone-number">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone-number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)} // Enable editing
              className={`border rounded w-full py-2 px-3 text-gray-700 ${isEditing ? '' : 'bg-gray-100 cursor-not-allowed'}`}
              readOnly={!isEditing}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Enable editing
              className={`border rounded w-full py-2 px-3 text-gray-700 ${isEditing ? '' : 'bg-gray-100 cursor-not-allowed'}`}
              readOnly={!isEditing}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skills">
              Skills
            </label>
            <input
              type="text"
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)} // Enable editing
              className={`border rounded w-full py-2 px-3 text-gray-700 ${isEditing ? '' : 'bg-gray-100 cursor-not-allowed'}`}
              readOnly={!isEditing}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="certification">
              Certification
            </label>
            <input
              type="text"
              id="certification"
              value={certification}
              onChange={(e) => setCertification(e.target.value)} // Enable editing
              className={`border rounded w-full py-2 px-3 text-gray-700 ${isEditing ? '' : 'bg-gray-100 cursor-not-allowed'}`}
              readOnly={!isEditing}
            />
          </div>

          <div className="flex justify-between mt-6">
            {isEditing ? (
              <button type="button" onClick={toggleEditMode} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Save Changes
              </button>
            ) : (
              <button type="button" onClick={toggleEditMode} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit Profile
              </button>
            )}
            <Link to="#" className="text-red-600 hover:underline">
              Logout
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
