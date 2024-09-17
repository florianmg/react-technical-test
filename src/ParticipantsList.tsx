import { Avatar, List, ListItem, ListItemButton, ListItemContent, ListItemDecorator, Typography } from "@mui/joy";
import { useIssueParticipants } from "./store/currentIssue.store";
import { Visibility } from "@mui/icons-material";

export default function ParticipantsList() {
  const participants = useIssueParticipants();

  return (
    <List>
      {participants.map((participant) => (
        <ListItem key={participant.id}>
          <ListItemButton sx={{ gap: 3 }}>
            <ListItemDecorator>
              <Avatar src={participant.avatar_url} alt={participant.login} />
            </ListItemDecorator>
            <ListItemContent>
              <Typography level="title-sm">{participant.login}</Typography>
              <Typography level="body-sm" noWrap>
                {participant.comments.length} comments
              </Typography>
            </ListItemContent>
            <Visibility />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
