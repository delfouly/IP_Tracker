import React, {createContext, Dispatch, SetStateAction, useState} from 'react';

type IP = {
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

export const SharedContext = createContext({
  selectedItem: {ipInfo: initialState, selectedImageIndex: 0},
  setSelectedItem: ({ipInfo, selectedImageIndex}: SelectedItemData) => ({
    ipInfo,
    selectedImageIndex,
  }),
});

type SharedProviderProps = {
  children: React.ReactNode;
};

export const SharedProvider = ({children}: SharedProviderProps) => {
  const [selectedItem, setSelectedItem] = useState<SelectedItemData>({
    ipInfo: initialState,
    selectedImageIndex: 0,
  });

  return (
    <SharedContext.Provider value={{selectedItem, setSelectedItem}}>
      {children}
    </SharedContext.Provider>
  );
};
