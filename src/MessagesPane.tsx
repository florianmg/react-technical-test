import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import ChatBubble from "./ChatBubble";
import useFetch from "./useFetch";
import { Comment, Issue } from "../types/issues.types";

import { useHiddenParticipants, useIssuePath, useSetIssueParticipants } from "./store/currentIssue.store";

export default function MessagesPane() {
  const issuePath = useIssuePath();
  const setIssueParticipants = useSetIssueParticipants();
  const hiddenParticipants = useHiddenParticipants();

  const issue = useFetch<Issue>({ url: `https://api.github.com/repos/${issuePath}` });
  const comments = useFetch<Comment[]>({ url: issue.data?.comments_url }, { enabled: issue.isFetched });

  const areParticipantCommentsVisible = (comment: Comment): boolean => !hiddenParticipants.includes(comment.user.id);

  if (comments.data && comments.isFetched) {
    setIssueParticipants(comments.data);
  }

  if (issue.isLoading || comments.isLoading) {
    return (
      <Sheet
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          paddingTop: "120px",
          backgroundColor: "background.level1",
        }}
      >
        <Typography>Loading...</Typography>
      </Sheet>
    );
  }

  if (!issue.data || !comments.data) {
    return (
      <Sheet
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          paddingTop: "120px",
          backgroundColor: "background.level1",
        }}
      >
        <Typography>No issue found. Please check the validity of the URL you provided</Typography>
      </Sheet>
    );
  }

  return (
    <Sheet
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.level1",
      }}
    >
      {issue.data && (
        <Stack
          direction="column"
          justifyContent="space-between"
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.body",
          }}
          py={{ xs: 2, md: 2 }}
          px={{ xs: 1, md: 2 }}
        >
          <Typography
            fontWeight="lg"
            fontSize="lg"
            component="h2"
            noWrap
            endDecorator={
              <Chip
                variant="outlined"
                size="sm"
                color="neutral"
                sx={{
                  borderRadius: "sm",
                }}
              >
                #{issue.data?.number}
              </Chip>
            }
          >
            {issue.data.title}
          </Typography>
          <Typography level="body-sm">{issue.data.user.login}</Typography>
        </Stack>
      )}
      {comments.data && (
        <Stack spacing={2} justifyContent="flex-end" px={2} py={3}>
          <ChatBubble variant="solid" {...issue.data!} />
          {comments.data.map(
            (comment) =>
              areParticipantCommentsVisible(comment) && (
                <ChatBubble
                  key={comment.id}
                  variant={comment.user.login === issue.data!.user.login ? "solid" : "outlined"}
                  {...comment}
                />
              )
          )}
        </Stack>
      )}
    </Sheet>
  );
}
