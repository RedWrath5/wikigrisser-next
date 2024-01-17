import React, { useState } from "react";
import { Skin } from "../../types/hero";
import { addDefaultSrc } from "../../util/addDefaultSrc.fn";
import { Img } from "../layout/Img";
import { Collapse } from "@mui/material";
import { TransitionGroup } from "react-transition-group";

export function SkinsSection({ hero, skins }: { hero: string; skins: Skin[] }) {
  const [selected, setSelected] = useState(0);

  const heroName = hero.includes("Matthew") ? "Matthew" : hero;

  return (
    <div className="flex flex-col justify-center">
      <div className="bg-gray-200">
        <div className={"flex flex-row flex-wrap gap-2 justify-center m-2"}>
          {skins.map((skin, index) => (
            <div className="flex flex-col gap-1">
              <Img
                src={`/hero cards - skin/${heroName} ${skin.index}.png`}
                width={102}
                height={170}
                onError={addDefaultSrc}
                onClick={() => setSelected(index)}
                className={
                  "cursor-pointer " + (selected !== index ? "opacity-60" : "")
                }
                key={skin.index}
              />
            </div>
          ))}
        </div>
      </div>

      <TransitionGroup>
        <Collapse timeout={750} key={skins[selected].index}>
          <SkinCard skin={skins[selected]} hero={hero} />
        </Collapse>
      </TransitionGroup>
    </div>
  );
}

function SkinCard({ hero, skin }: { hero: string; skin: Skin }) {
  const { index } = skin;

  const heroName = hero.includes("Matthew") ? "Matthew" : hero;

  const ListItem = ({ label, value }: { label: string; value: string }) => (
    <li>
      <span className={"font-bold"}>{label}: </span> {value}
    </li>
  );

  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <ul className={"list-none"}>
        {skin.name && <ListItem label={"Name"} value={skin.name} />}
        {skin.source && <ListItem label={"Source"} value={skin.source} />}
        {skin.cost && <ListItem label={"Cost"} value={skin.cost} />}
        {skin.notes && <ListItem label={"Notes"} value={skin.notes} />}
      </ul>
      <Img
        src={`/heroes/${hero}/${heroName} ${index}.png`}
        width={400}
        height={400}
        onError={addDefaultSrc}
      />
    </div>
  );
}
