import Image from "next/image";
import { Hero } from "../../types/hero";

export function TalentSection({
  hero: { factions, talent, name },
}: {
  hero: Hero;
}) {
  return (
    <div className="mb-2 p-4 grid grid-cols-12 gap-2">
      <div className="col-span-6 sm:col-span-1 text-center align-middle">
        {factions.map((faction) => (
          <div key={faction}>
            <Image
              src={"/factions/" + faction + ".png"}
              width={50}
              height={50}
            ></Image>
          </div>
        ))}
      </div>
      <div className="col-span-6 sm:col-span-1 text-center align-middle">
        <Image
          src={"/talents/" + name + ".png"}
          width={150}
          height={150}
        ></Image>
      </div>
      <div className="col-span-12 sm:col-span-9 pt-2">
        <p className="text-2xl">Talent: {talent?.name}</p>
        <p className="whitespace-pre-line">{talent?.description}</p>
      </div>
    </div>
  );
}
