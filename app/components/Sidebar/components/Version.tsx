import { version as currentVersion } from "../../../../package.json";
import SidebarLink from "./SidebarLink";

export default function Version() {
  return <SidebarLink disabled label={<>v{currentVersion}</>} />;
}
