import { memo } from 'react';
import styles from './select.module.css';

export interface Option {
  id: string | number,
  name: string,
}

export interface SelectProps {
  name: string;
  value: string;
  updateValue: (id: string) => void;
  options: Option[];
}

function Select({
  name,
  value,
  updateValue,
  options
}: SelectProps) {
  return (
    <div>
      <label htmlFor={name}>
        {name}:
        <OptionSelect
          id={name}
          value={value}
          onChange={(e:any) => {
            updateValue(e.target.value);
          }}
        >
          {options.map((item: Option) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </OptionSelect>
      </label>
    </div>
  );
}

const OptionSelect = memo(({ id, ...props }: any) => (
  <select className={styles['select']} {...props} id={id} />
));

export default Select;
