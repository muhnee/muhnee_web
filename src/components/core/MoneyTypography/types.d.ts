import { ThemeStyle } from "@material-ui/core/styles/createTypography";

import { TransactionTypes } from "../../../types/Transaction";

export default interface MoneyTypographyProps {
  value?: number;

  variant?: ThemeStyle;

  type?: TransactionTypes;
}
