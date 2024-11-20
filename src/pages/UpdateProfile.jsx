import { Link, useNavigate } from 'react-router-dom'; // Correct import for useNavigate
import React, { useState, useEffect } from 'react';
import useUserStore from '../store/user';
import { userApi } from '../api/userApi';



const UpdateProfile = () => {
  const navigate = useNavigate(); // Correct usage of useNavigate hook

  const { user, fetchProfile, updateProfile } = useUserStore();
  const [form, setForm] = useState({
    photo_url: "",
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user profile on mount and populate form
  useEffect(() => {
    const loadProfile = async () => {
      await fetchProfile();
    };
    loadProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (user) {
      setForm({
        photo_url: user.photo_url || "",
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  // Update local form state on change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const data = await userApi.putEditProfile(form);

      toast({
        title: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      navigate('/task');
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const profileUrl = '../../public/profile.jpg';

  return (
    <div className="bg-white w-full sm:max-w-sm md:max-w-md px-6 py-8 sm:px-6 sm:py-8 rounded-[30px] shadow-0 sm:shadow-md space-y-5 hover:border hover:border-purple-500 transition duration-300">
      <Link to="/task" className="flex font-medium cursor-pointer hover:scale-102 transition duration-500">
        <svg className="w-6 h-6 text-purple-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 19-7-7 7-7" />
        </svg>
        <p>Edit Profile</p>
      </Link>
      <div className="flex flex-col justify-center items-center px-2 sm:px-2">
        <img className="w-24 h-24 sm:w-28 sm:h-28 rounded-full hover:scale-105 transition duration-100" src={profileUrl} />
        <form className="w-full space-y-6 sm:p-2 md:p-4 mt-5 sm:mt-2" action="#" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="profile" className="block mb-2 text-sm font-medium text-purple-900">
              Profile URL
            </label>
            <input type="text" name="photo_url" id="profile" className="bg-purple-50 border border-purple-300 text-purple-900 text-sm rounded-lg block w-full p-2.5" value={form.photo_url} onChange={handleChange} placeholder="<Image URL>" />
          </div>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-purple-900">
              Full Name
            </label>
            <input type="text" name="name" id="name" className="bg-purple-50 border border-purple-300 text-purple-900 text-sm rounded-lg  block w-full p-2.5" value={form.name} onChange={handleChange} placeholder="Anisa Ayu Yandani" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-purple-900">
              Input Email
            </label>
            <input type="email" name="email" id="email" className="bg-purple-50 border border-purple-300 text-purple-900 text-sm rounded-lg block w-full p-2.5" value={form.email} onChange={handleChange} placeholder="anisayu@gmail.com" />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-purple-900">
              Input Password
            </label>
            <div className="flex">
              <input type="password" name="password" id="password" className="bg-purple-50 border border-purple-300 text-purple-900 text-sm rounded-lg block w-full p-2.5" value={form.password} onChange={handleChange} placeholder="*******" />
            </div>
          </div>
          <button type="submit" className="w-full flex justify-center items-center text-purple-400 hover:text-purple-100 bg-purple-200 hover:bg-purple-600 font-medium rounded-xl text-sm px-5 py-2.5 space-x-1 mt-5 hover:scale-102 transition duration-500">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11.917 9.724 16.5 19 7.5" />
            </svg>
            <p className="font-semibold">Submit</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
