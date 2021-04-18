import Image from "next/image";
import { Class } from "../../types/hero";

export function SoldiersSubSection({
  heroClass,
  isStarting = false,
}: {
  heroClass: Class;
  isStarting?: boolean;
}) {
  return (
    <>
      <div className="grid grid-cols-12 items-center mt-2 mb-2">
        <div className="col-span-12 text-center sm:col-span-1">
          <div className="mb-3">
            <Image
              src={"/unitTypeFlag/" + heroClass.heroType + ".png"}
              width={67}
              height={72}
            ></Image>
          </div>
        </div>
        <div className="col-span-12 text-center sm:col-span-11 sm:text-left">
          <p className="text-2xl">
            {isStarting && "Starting Class: "}
            {heroClass.name}
          </p>
          <p>
            Soldiers:{" "}
            {heroClass.soldiers.map((soldier) => (
              <span key={soldier}>{soldier}</span>
            ))}
            {!isStarting &&
              heroClass.children[0].soldiers.map((soldier) => (
                <span key={soldier}>{soldier}</span>
              ))}
          </p>
        </div>
      </div>
    </>
  );
}
