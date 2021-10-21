import { Patch } from "../../util/databaseSingleton";

export function PatchSectionSmall({ patch }: { patch: Patch }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-bold">{patch.formattedDate}</div>
      <img
        src={"/banners/" + patch.id + ".png"}
        className="inline col-span-2 md:col-span-1 justify-self-center md:justify-self-end pb-2 md:pb-0"
        width={400}
        height={200}
      ></img>
      <div className="whitespace-pre-line text-sm font- pl-4 col-span-2 md:col-span-1">
        {patch.info}
      </div>
    </div>
  );
}
