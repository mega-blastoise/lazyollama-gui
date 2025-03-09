import { InputProps } from '../Input';

export interface SearchInputProps extends Omit<InputProps, 'leftIcon' | 'type'> {
  onSearch?: (value: string) => void;
  searchButtonLabel?: string;
  showSearchButton?: boolean;
}
