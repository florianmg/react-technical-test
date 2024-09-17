import { create } from "zustand";
import { Participant, Comment } from "../../types/issues.types";

type CurrentIssueStore = {
  issuePath: string;
  setIssuePath: (path: string) => void;
  issueParticipants: Participant[];
  setIssueParticipants: (comments: Comment[]) => void;
  hiddenParticipantsIds: number[];
  setHiddenParticipantsIds: (ids: number[]) => void;
};

const useCurrentIssueStore = create<CurrentIssueStore>((set) => ({
  issuePath: "facebook/react/issues/7901",
  setIssuePath: (path) => {
    set({ issuePath: path, hiddenParticipantsIds: [], issueParticipants: [] });
  },

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
  hiddenParticipantsIds: [],
  setHiddenParticipantsIds: (ids) => set({ hiddenParticipantsIds: ids }),
}));

export const useIssuePath = () => useCurrentIssueStore((state) => state.issuePath);
export const useSetIssuePath = () => useCurrentIssueStore((state) => state.setIssuePath);

export const useIssueParticipants = () => useCurrentIssueStore((state) => state.issueParticipants);
export const useSetIssueParticipants = () => useCurrentIssueStore((state) => state.setIssueParticipants);

export const useHiddenParticipants = () => useCurrentIssueStore((state) => state.hiddenParticipantsIds);
export const useSetHiddenParticipants = () => useCurrentIssueStore((state) => state.setHiddenParticipantsIds);
