import { Patch } from "../../util/databaseSingleton";

export function PatchSection({
  patch,
  header,
}: {
  patch: Patch;
  header: string;
}) {
  return (
    <div className="justify-center text-white grid grid-cols-2 items-center pl-5 pr-5 pb-5">
      <img
        src={"/patchBanners/" + patch.id + ".png"}
        className="inline col-span-2 md:col-span-1 justify-self-center md:justify-self-end pb-2 md:pb-0"
        width={500}
        height={300}
      ></img>
      <div className="whitespace-pre-line text-left pl-4 col-span-2 md:col-span-1">
        <span className="mb-4 text-2xl">{header}</span>
        <h2 className="mb-4 text-3xl">{patch.name}</h2>
        {patch.info}
      </div>
    </div>
  );
}
