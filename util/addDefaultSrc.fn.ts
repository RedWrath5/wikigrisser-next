export function addDefaultSrc(
  ev: React.SyntheticEvent<HTMLImageElement, Event>
) {
  ev.currentTarget.src = "/404/Card.png";
}
