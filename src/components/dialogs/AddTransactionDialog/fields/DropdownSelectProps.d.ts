export default interface DropdownSelectProps {
  label?: string;

  value?: any;

  onChange: (value: T) => void;

  options: { value: any; label: any }[];
}
