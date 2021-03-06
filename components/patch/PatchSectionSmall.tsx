import { addDefaultSrc } from "../../util/addDefaultSrc.fn";
import { Patch } from "../../util/databaseSingleton";
import formatDate from "../../util/formatDate.fn";
import { Img } from "../layout/Img";

export function PatchSectionSmall({ patch }: { patch: Patch }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-bold">
        {`${formatDate(patch.releaseDate)} (CN ${formatDate(
          patch.cnReleaseDate
        )})`}
      </div>
      <Img
        src={"/patchRateup/" + patch.id + ".png"}
        className="inline col-span-2 md:col-span-1 justify-self-center md:justify-self-end pb-2 md:pb-0"
        width={400}
        height={200}
        onError={(err) => addDefaultSrc(err, "/404/patchRateUp.png")}
      ></Img>
      <div className="whitespace-pre-line text-sm font- pl-4 col-span-2 md:col-span-1">
        {patch.info}
      </div>
    </div>
  );
}
