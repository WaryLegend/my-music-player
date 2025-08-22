import { memo } from "react";
import SideButton from "./SideButton";
import { FaGithub } from "react-icons/fa6";

function GitHubBtn() {
  return (
    <SideButton
      titles="GitHub"
      size="32px"
      icon={<FaGithub />}
      onClick={() => {
        window.open(
          "https://github.com/WaryLegend",
          "_blank",
          "noopener,noreferrer"
        );
      }}
    />
  );
}

export default memo(GitHubBtn);
