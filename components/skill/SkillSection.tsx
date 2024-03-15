import React from "react";
import { Skill } from "../../types/hero"; 
import { Img } from "../layout/Img"; 

export function SkillSection({ skill }: { skill: Skill }) {
  return (
    <div className="grid grid-cols-12 items-center mt-2 mb-2">
      <div className="col-span-12 text-center sm:col-span-1 flex items-center justify-center mr-3">
        <Img
          src={"/skills/" + skill.name + ".png"} 
          className="inline"
          // onError={addDefaultSrc} // If you have a default image handler
        /> 
      </div>

      {/* Skill details */}
      <div className="col-span-12 sm:col-span-11 sm:text-left text-center">
        <p className="text-2xl mb-2">{skill.name}</p>
        <div className="mb-2 flex flex-wrap font-semibold">
          {skill.cost && (
            <div className="inline mr-1">
              <span className="font-semibold">Cost:</span> {skill.cost}
            </div>
          )}
          {skill.cd && (
            <div className="inline mr-1 ml-2">
              <span className="font-semibold">Cooldown:</span> {skill.cd}
            </div>
          )}
          {skill.range && (
            <div className="inline mr-1 ml-2">
              <span className="font-semibold">Range:</span> {skill.range}
            </div>
          )}
          {skill.span && (
            <div className="inline mr-1 ml-2">
              <span className="font-semibold">Span:</span> {skill.span}
            </div>
          )}
      </div>
          <p className="whitespace-pre-line text-lg mb-2">{skill.description || skill.descriptionMarkdown}</p>
      </div>
    </div>
  );
}
