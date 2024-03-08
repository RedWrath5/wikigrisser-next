import React from "react";
import { Skill } from "../../types/hero"; // Adjust this path according to your actual Skill type location
import { Img } from "../layout/Img"; // Assuming you have a similar component for images

export function SkillSection({ skill }: { skill: Skill }) {
  return (
    <div className="grid grid-cols-12 items-center mt-2 mb-2">
      <div className="col-span-12 text-center sm:col-span-1 flex items-center justify-center mr-3">
        <Img
          src={"/skills/" + skill.name + ".png"} // Adjust the path to where your skill images are stored
          className="inline"
          // onError={addDefaultSrc} // If you have a default image handler
        /> 
      </div>

      {/* Skill details */}
      <div className="col-span-12 sm:col-span-11 sm:text-left">
        <p className="text-2xl mb-2">{skill.name}</p>
        <p className="whitespace-pre-line text-lg mb-2">{skill.description || skill.descriptionMarkdown}</p>
        <div className="mb-2 flex flex-col sm:flex-row font-semibold">
          {skill.cost && (
            <div className="flex items-center mb-1 sm:mb-0 sm:mr-2">
              <span className="font-semibold">Cost:</span> {skill.cost}
            </div>
          )}
          {skill.cd && (
            <div className="flex items-center mb-1 sm:mb-0 sm:mr-2">
              <span className="font-semibold">Cooldown:</span> {skill.cd}
            </div>
          )}
          {skill.range && (
            <div className="flex items-center mb-1 sm:mb-0 sm:mr-2">
              <span className="font-semibold">Range:</span> {skill.range}
            </div>
          )}
          {skill.span && (
            <div className="flex items-center">
              <span className="font-semibold">Span:</span> {skill.span}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
