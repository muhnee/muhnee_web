import { SvgIconProps } from "@material-ui/core";

export interface SidebarLinkProps {
  // target link
  to: string;

  // icon
  icon: React.ReactElement<SvgIconProps>;

  // label
  label: string;
}
