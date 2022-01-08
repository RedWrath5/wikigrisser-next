export function addDefaultSrc(
  ev: React.SyntheticEvent<HTMLImageElement, Event>,
  alternateImage?: string
) {
  let src = "/404/Card.png";
  if (alternateImage) src = alternateImage;
  ev.currentTarget.src = src;
}
