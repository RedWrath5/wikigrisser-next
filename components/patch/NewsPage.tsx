import { Patch, PatchMap } from "../../util/databaseSingleton";
import { PatchSectionSmall } from "./PatchSectionSmall";
import {
  Collapse,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@material-ui/core";
import { useState } from "react";
import { TransitionGroup } from "react-transition-group";
import { Img } from "../layout/Img";
import { addDefaultSrc } from "../../util/addDefaultSrc.fn";

export function NewsPage({ patches }: { patches: PatchMap }) {
  const [viewPast, setViewPast] = useState(false); // show/hide past updates
  //current date - 28 days is max possible current major patch date.
  const maxMajorPatchDate = new Date().valueOf() - 1000 * 60 * 60 * 24 * 28;

  const groupedPatches: GroupedPatches = Object.values(patches)
    .filter(
      (patch) =>
        /* show / hide past major patches and dont filter minor at all*/
        viewPast ||
        (patch.type === "major" &&
          new Date(patch.releaseDate).valueOf() > maxMajorPatchDate) ||
        patch.type === "minor"
    )
    .reduce(reducePatchesToMajorPatches, {});
  return (
    <div>
      <FormGroup className="flex content-center pt-2 pb-1">
        <FormControlLabel
          control={
            <Switch
              checked={viewPast}
              onChange={() => setViewPast(!viewPast)}
              name="show-past"
            />
          }
          label="View past updates"
        />
      </FormGroup>
      <TransitionGroup>
        {Object.values(groupedPatches).map((majorPatchSection: Patch[]) => (
          <Collapse timeout={750} key={majorPatchSection[0].id}>
            <div className="flex flex-col mb-5" key={majorPatchSection[0].id}>
              <div className="flex flex-row bg-gray-200 justify-center">
                <div className="flex flex-col text-center mt-2 mb-2 ">
                  <Img
                    src={"/patchBanners/" + majorPatchSection[0].id + ".png"}
                    className="inline md:col-span-1 justify-self-center pb-2"
                    width={400}
                    height={200}
                    onError={(err) =>
                      addDefaultSrc(err, "/404/patchRateUp.png")
                    }
                  ></Img>
                  <div className="ml-2 text-2xl">
                    {majorPatchSection[0].name}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 pr-5 pl-5">
                {Object.values(majorPatchSection).map((patch) => (
                  <PatchSectionSmall
                    patch={patch}
                    key={patch.id}
                  ></PatchSectionSmall>
                ))}
              </div>
            </div>
          </Collapse>
        ))}
      </TransitionGroup>
    </div>
  );
}

function reducePatchesToMajorPatches(
  accumulator: GroupedPatches,
  patch: Patch
) {
  if (patch.type === "major") {
    accumulator[patch.id] = [patch];
  } else {
    const lastMajorPatchId = Object.keys(accumulator).pop()!;
    if (accumulator[lastMajorPatchId])
      accumulator[lastMajorPatchId].push(patch);
  }
  return accumulator;
}

interface GroupedPatches {
  [key: string]: Patch[];
}
