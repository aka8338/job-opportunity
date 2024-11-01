import { create } from "zustand";
import axios from "../api/axios";

const AuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isChackingAuth: false,
  isEmployer: false,
  jobs: [],
  applicants: [],

  signup: async (data, path) => {
    set({ isLoading: true, error: null });
    const { confirmPassword, ...signupData } = data;
    try {
      if (data.password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const response = await axios.post(path, { ...signupData });
      set({
        user: response.data.data,
        isAuthenticated: false,
        isLoading: false,
        isEmployer: response.data.isEmployer,
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

  login: async (role, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`/${role}/login`, { email, password });
      set({
        user: response.data.data,
        isAuthenticated: true,
        isLoading: false,
        isEmployer: response.data.isEmployer,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error on logging in",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.get("/logout");
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        jobs: [],
        isEmployer: false,
      });
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      throw new Error(error);
    }
  },

  postJob: async (jobData) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post("/employer/postJob", { ...jobData });
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

  applyJob: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(
        "/expert/applyJob",
        { ...formData },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error on applying job",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  getApplicants: async (jobId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`/employer/applicants/${jobId}`);
      set({ applicants: response.data.applicants, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error on getting applicants",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  examineApplicant: async (applicantId, status, jobId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.patch(`/employer/applicant`, { applicantId, status, jobId });
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error on examining applicant",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  editJob: async (jobData, jobId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.patch(`/employer/editJob/${jobId}`, { ...jobData });
    } catch (error) {
      set({
        error: error.response.data.message || "Error on examining applicant",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  deleteJob: async (jobId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`/employer/removeJob/${jobId}`);
    } catch (error) {
      set({
        error: error.response.data.message || "Error on examining applicant",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  editProfile: async (profileData) => {
    set({ isLoading: true, error: null });
    const { isEmployer } = AuthStore.getState();

    try {
      if (isEmployer) {
        await axios.patch("/employer/editProfile", { ...profileData });
      } else {
        await axios.patch("/expert/editProfile", { ...profileData });
      }
    } catch (error) {
      set({
        error: error.response.data.message || "Error on editing profile",
        isLoading: false,
      });
      throw new Error(error);
    }
  },
}));

export default AuthStore;
