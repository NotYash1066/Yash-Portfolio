import { ReactNode } from "react";

export function OsWindow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="os-window">
      <div className="os-window-titlebar">
        <span className="os-window-dot" />
        <span className="os-window-dot" />
        <span className="os-window-dot" />
        <span style={{ marginLeft: "0.5rem" }}>{title}</span>
      </div>
      <div className="os-window-body">{children}</div>
    </div>
  );
}
