import { create } from "zustand";
import axios from "../api/axios";

const AuthStore = create((set) => ({
  user: null,
  isAuthenticated: true,
  error: null,
  isLoading: false,
  isChackingAuth: false,
  isEmployer: true,
  jobs: [],

  signup: async (data, path) => {
    set({ isLoading: true, error: null });
    const { confirmPassword, ...signupData } = data;
    try {
      if (data.password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const response = await axios.post(path, signupData);
      set({
        user: response.data.data,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error on signing up",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  verifyEmail: async (verificationToken, path) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(path, { token: verificationToken });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error on verifying email",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post("/expert/login", { email, password });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error on logging in",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  postJob: async (jobData) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post("/employer/postJob", jobData);
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error on posting job",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  getJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/expert/getJobs");
      set({ jobs: response.data.jobs, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error on getting jobs",
        isLoading: false,
      });
      throw new Error(error);
    }
  },
}));

export default AuthStore;
