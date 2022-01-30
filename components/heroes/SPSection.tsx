import React from "react";
import { SPClass, SPStep } from "../../types/hero";
import { BoundedColumn } from "../layout/BoundedColumn";

export function SPSection({ spClass }: { spClass: SPClass }) {
  return (
    <div className="flex flex-col justify-center ">
      <StageHeader stageNumber={1}></StageHeader>
      <StageSection stage={spClass.unlockRequirments.stage1}></StageSection>
      <StageHeader stageNumber={2}></StageHeader>
      <StageSection stage={spClass.unlockRequirments.stage2}></StageSection>
    </div>
  );
}

function StageSection({ stage }: { stage: SPStep[] }) {
  return (
    <div className="flex flex-row justify-center">
      <BoundedColumn>
        {stage.map((step) => (
          <div className="grid grid-cols-12 items-center mt-2 mb-2">
            <div className="col-span-12 text-center sm:text-left">
              <p className="text-2xl">{step.name}</p>
              <p>{step.requirement}</p>
            </div>
          </div>
        ))}
      </BoundedColumn>
    </div>
  );
}

function StageHeader({ stageNumber }: { stageNumber: number }) {
  return (
    <div className="flex flex-row bg-gray-200 justify-center py-3">
      <BoundedColumn>
        <div className="flex flex-row w-full justify-center sm:justify-start">
          <div className="text-2xl">Stage {stageNumber}</div>
        </div>
      </BoundedColumn>
    </div>
  );
}
