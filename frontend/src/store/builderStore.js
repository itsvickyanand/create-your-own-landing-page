import { create } from "zustand";

export const useBuilderStore = create((set) => ({
  // selections
  organization: null,
  project: null,
  page: null,
  component: null,
  element: null,

  // collections
  organizations: [],
  projects: [],
  pages: [],
  components: [],
  elements: [],

  // setters
  setOrganizations: (data) => set({ organizations: data }),
  setProjects: (data) => set({ projects: data }),
  setPages: (data) => set({ pages: data }),
  setComponents: (data) => set({ components: data }),
  setElements: (data) => set({ elements: data }),

  setOrganization: (org) =>
    set({
      organization: org,
      project: null,
      page: null,
      component: null,
      element: null,
    }),

  setProject: (project) =>
    set({
      project,
      page: null,
      component: null,
      element: null,
    }),

  setPage: (page) =>
    set({
      page,
      component: null,
      element: null,
    }),

  setComponent: (component) =>
    set({
      component,
      element: null,
    }),

  setElement: (element) => set({ element }),
}));
