import { create } from "zustand";

type CurrentIssueStore = {
  issueId: string;
  setIssueId: (issue: string) => void;
};

const useCurrentIssueStore = create<CurrentIssueStore>((set) => ({
  issueId: "7901",
  setIssueId: (issueId) => set({ issueId }),
}));

export const useCurrentIssueId = () => useCurrentIssueStore((state) => state.issueId);
export const useSetCurrentIssueId = () => useCurrentIssueStore((state) => state.setIssueId);
