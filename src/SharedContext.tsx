import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

export type IP = {
  ip: string;
  connection: {
    isp: string;
  };
  city: string;
  region_code: string;
};

export type SelectedItemData = {ipInfo: IP; selectedImageIndex: number};

export type SharedContextData = {
  selectedItem: SelectedItemData;
  setSelectedItem: Dispatch<SetStateAction<SelectedItemData>>;
};

const initialState = {
  ip: '',
  connection: {
    isp: '',
  },
  city: '',
  region_code: '',
};

export const SharedContext = createContext<SharedContextData>({
  selectedItem: {ipInfo: initialState, selectedImageIndex: 0},
  setSelectedItem: newItem =>
    newItem as Dispatch<SetStateAction<SelectedItemData>>,
});

type SharedProviderProps = {
  children: React.ReactNode;
};

export const SharedProvider = ({children}: SharedProviderProps) => {
  const [selectedItem, setSelectedItem] = useState<SelectedItemData>({
    ipInfo: initialState,
    selectedImageIndex: 0,
  });

  const value = useMemo(
    () => ({selectedItem, setSelectedItem}),
    [selectedItem],
  );

  return (
    <SharedContext.Provider value={value}>{children}</SharedContext.Provider>
  );
};
