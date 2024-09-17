import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";

import { useCurrentIssueId, useSetCurrentIssueId } from "./store/currentIssue.store";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";

export default function Sidebar() {
  const setCurrentIssue = useSetCurrentIssueId();
  const currentIssueId = useCurrentIssueId();

  const onIputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const issueId = e.currentTarget.value.split("/").pop();
    if (!issueId) return;
    setCurrentIssue(issueId);
  };
  const onInputFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    e.currentTarget.select();
  };
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: "sticky",
        transition: "transform 0.4s, width 0.4s",
        height: "100dvh",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <FormControl>
        <Input value={`facebook/react/issues/${currentIssueId}`} onChange={onIputChange} onFocus={onInputFocus} />
        <FormHelperText id="component-helper-text">Paste a github issue link or id</FormHelperText>
      </FormControl>
    </Sheet>
  );
}
