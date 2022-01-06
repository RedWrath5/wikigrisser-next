import { BoundedColumn } from "../layout/BoundedColumn";
import React from "react";
import { addDefaultSrc } from "../../util/addDefaultSrc.fn";

export function HeroIcon({ name }: { name: string }) {
  return (
    <div className="flex flex-row bg-gray-200 justify-center">
      <BoundedColumn>
        <div className="flex- flex-row w-full ml-2 mr-2">
          <div className="flex mt-2 mb-2 items-center justify-center sm:justify-start">
            <img
              src={"/classes/" + name + ".png"}
              className="inline"
              width={70}
              height={75}
              onError={addDefaultSrc}
            ></img>
            <div>
              <div className="ml-2 text-2xl">{name}</div>
            </div>
          </div>
        </div>
      </BoundedColumn>
    </div>
  );
}
