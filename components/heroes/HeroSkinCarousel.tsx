import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Hero } from "../../types/hero";
import { addDefaultSrc } from "../../util/addDefaultSrc.fn";

export function HeroSkinCarousel({ hero }: { hero: Hero }) {
  const imagesArray = [
    <div key={hero.name}>
      <img
        src={`/heroes/${hero.prettyName}/${hero.prettyName}.png`}
        width={400}
        height={400}
        onError={addDefaultSrc}
      />
    </div>,
  ];

  if (hero.spClass) {
    imagesArray.push(
      <div key="sp">
        <img
          src={`/heroes/${hero.prettyName}/${hero.prettyName} SP.png`}
          width={400}
          height={400}
          onError={addDefaultSrc}
        ></img>
      </div>
    );
  }

  Array.apply(null, Array(hero.skinCount)).forEach((element, index) => {
    imagesArray.push(
      <div key={index}>
        <img
          src={`/heroes/${hero.prettyName}/${hero.prettyName} Skin ${
            index + 1
          }.png`}
          width={400}
          height={400}
          onError={addDefaultSrc}
        />
      </div>
    );
  });

  return (
    <Carousel
      width={400}
      showArrows={true}
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      stopOnHover={true}
      dynamicHeight={true}
    >
      {imagesArray}
    </Carousel>
  );
}
