import React, { useState } from "react";
import {
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";
import { Skill } from "../../types/hero";
import { SkillSection } from "./SkillSection";
import { BoundedColumn } from "../layout/BoundedColumn";

export function SkillPage({ skills }: { skills: Skill[] }) {
  const [searchText, setSearchText] = useState("");


  // Filter skills based on the search text in both name and description
  const filteredSkills = skills.filter(skill =>
     skill.name.toLowerCase().includes(searchText.toLowerCase()) ||
     (skill.description && skill.description.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <div className="bg-white flex flex-grow justify-center flex-col cursor-auto">
      <h1 className="text-6xl text-center mt-5 mb-10 font-thin text-gray-600">
        Skills
      </h1>
      <div className="flex flex-wrap justify-center text-center mb-5">
        <div className="mr-4">
          <FormControl>
          <InputLabel>Search (Name or Description)</InputLabel>
            <Input
              value={searchText}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchText(event.target.value);
              }}
            />
          </FormControl>
        </div>
      </div>

          {/* Skills list */}
      <div className="flex justify-center w-full">
      <BoundedColumn>
        <div className="flex flex-col">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => (
              <SkillSection key={skill.name} skill={skill} />
            ))
          ) : (
            <p>No skills found.</p>
          )}
        </div>
      </BoundedColumn>
          </div>
          </div>
  );
}
