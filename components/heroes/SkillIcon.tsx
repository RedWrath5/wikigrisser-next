import { Popover } from "@material-ui/core";
import React from "react";
import { Skill } from "../../types/hero";
import { addDefaultSrc } from "../../util/addDefaultSrc.fn";
import skillToHeroContext from "../../util/skillToHeroContext";
import { Img } from "../layout/Img";

export function SkillIcon({ skill }: { skill: Skill }) {
  const db = React.useContext(skillToHeroContext);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <div className="mb-3">
        <Img
          src={"/skills/" + skill.name + ".png"}
          className="inline"
          width={70}
          height={70}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          onError={(err) => addDefaultSrc(err, "/404/skills.png")}
        ></Img>
      </div>
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        className="pointer-events-none"
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div className="flex flex-row items-center p-2">
          <Img
            src={"/skills/" + skill.name + ".png"}
            className="inline"
            width={70}
            height={70}
            onError={addDefaultSrc}
          ></Img>
          {db?.[skill.name]?.map((heroName) => (
            <Img
              key={heroName}
              src={"/hero cards/" + heroName + ".png"}
              width={70}
              height={70}
              onError={addDefaultSrc}
            ></Img>
          ))}
        </div>
      </Popover>
    </>
  );
}
