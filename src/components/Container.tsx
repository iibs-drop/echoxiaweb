import { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** Conteneur centré, largeur max ~1280px, marges latérales homogènes. */
export default function Container({
  as: Tag = "div",
  className = "",
  children,
}: ContainerProps) {
  return <Tag className={`container-x ${className}`}>{children}</Tag>;
}
