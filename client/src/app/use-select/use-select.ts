import { useState, useCallback } from 'react';


export function useSelect(selectState:any) {
  const [selectedName, set] = useState(selectState);
  
  const setSelectedName = useCallback(
    (name: string, value: string) => {
      set({
        ...selectedName,
        [name]: value,
      });
    },
    [selectedName],
  );

  return [selectedName, setSelectedName] as const;
}

export default useSelect;
