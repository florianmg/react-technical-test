import { create } from "zustand";
import { Participant, Comment } from "../../types/issues.types";

type CurrentIssueStore = {
  issueId: string;
  setIssueId: (issue: string) => void;
  issueParticipants: Participant[];
  setIssueParticipants: (comments: Comment[]) => void;
};

const useCurrentIssueStore = create<CurrentIssueStore>((set) => ({
  issueId: "7901",
  setIssueId: (issueId) => set({ issueId }),
  issueParticipants: [],
  setIssueParticipants: (comments) => {
    const participants: Participant[] = [];
    // tranform comments into participants
    comments.forEach((comment) => {
      const participant = participants.find((p) => p.id === comment.user.id);
      if (participant) {
        participant.comments.push(comment);
      } else {
        participants.push({
          id: comment.user.id,
          login: comment.user.login,
          avatar_url: comment.user.avatar_url,
          comments: [comment],
        });
      }
    });

    set({ issueParticipants: participants });
  },
}));

export const useCurrentIssueId = () => useCurrentIssueStore((state) => state.issueId);
export const useSetCurrentIssueId = () => useCurrentIssueStore((state) => state.setIssueId);
export const useIssueParticipants = () => useCurrentIssueStore((state) => state.issueParticipants);
export const useSetIssueParticipants = () => useCurrentIssueStore((state) => state.setIssueParticipants);
