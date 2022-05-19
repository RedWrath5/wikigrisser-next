import React, {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

// Created to handle some special cases that some up with serer side rendering and images
// https://github.com/facebook/react/issues/15446
// Describes the main issue, when this is closed or merged with a soltution this component should reflect the result
export function Img({
  src,
  ...props
}: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  const [hasRendered, setHasRendered] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && hasRendered) {
      imgRef.current.src = src || "";
    }
  }, [src, hasRendered]);

  useEffect(() => {
    setHasRendered(true);
  }, []);

  return <img {...props} ref={imgRef} src={src} />;
}
