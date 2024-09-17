import { Avatar, List, ListItemButton, ListItemContent, ListItemDecorator, Typography } from "@mui/joy";
import { useIssueParticipants, useHiddenParticipants, useSetHiddenParticipants } from "./store/currentIssue.store";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ParticipantsList() {
  const participants = useIssueParticipants();
  const hiddenParticipants = useHiddenParticipants();
  const setHiddenParticipants = useSetHiddenParticipants();

  const onClickParticipant = (participantId: number) => {
    if (hiddenParticipants.includes(participantId)) {
      setHiddenParticipants(hiddenParticipants.filter((id) => id !== participantId));
    } else {
      setHiddenParticipants([...hiddenParticipants, participantId]);
    }
  };

  return (
    <List>
      {participants.map((participant) => (
        <ListItemButton
          sx={{
            justifyContent: "center",
            gap: 3,
          }}
          key={participant.id}
          onClick={() => onClickParticipant(participant.id)}
        >
          <ListItemDecorator>
            <Avatar src={participant.avatar_url} alt={participant.login} />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">{participant.login}</Typography>
            <Typography level="body-sm" noWrap>
              {participant.comments.length} comments
            </Typography>
          </ListItemContent>
          {hiddenParticipants.includes(participant.id) ? (
            <VisibilityOff
              sx={{
                color: "red",
              }}
            />
          ) : (
            <Visibility
              sx={{
                color: "green",
              }}
            />
          )}
        </ListItemButton>
      ))}
    </List>
  );
}
