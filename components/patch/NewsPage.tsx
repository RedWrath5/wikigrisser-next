import { Patch, PatchMap } from "../../util/databaseSingleton";
import { PatchSectionSmall } from "./PatchSectionSmall";

export function NewsPage({ patches }: { patches: PatchMap }) {
  const groupedPatches: GroupedPatches = Object.values(patches).reduce(
    reducePatchesToMajorPatches,
    {}
  );
  return (
    <div>
      {Object.values(groupedPatches).map((majorPatchSection: Patch[]) => (
        <div className="flex flex-col mb-5" key={majorPatchSection[0].id}>
          <div className="flex flex-row bg-gray-200 justify-center">
            <div className="flex flex-col text-center mt-2 mb-2 ">
              <img
                src={"/patchBanners/" + majorPatchSection[0].id + ".png"}
                className="inline md:col-span-1 justify-self-center pb-2"
                width={400}
                height={200}
              ></img>
              <div className="ml-2 text-2xl">{majorPatchSection[0].name}</div>
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
      ))}
    </div>
  );
}

function reducePatchesToMajorPatches(
  accumulator: GroupedPatches,
  patch: Patch
) {
  if (patch.type === "major") {
    const now = new Date();
    const releaseDate = new Date(patch.releaseDate);
    const diffDays = Math.ceil(
      (now.valueOf() - releaseDate.valueOf()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays < 28) accumulator[patch.id] = [patch];
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
