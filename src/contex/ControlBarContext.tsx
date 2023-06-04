import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  PerPage,
  SortName,
  SortPrice,
  ViewType,
} from '../interfaces/productsView.interface';

export interface IControlBar {
  productsPerPage: PerPage;
  viewProducts: ViewType;
  sortPrice: SortPrice;
  sortName: SortName;
  minPrice?: number | null;
  maxPrice?: number | null;
  currentPage: number;
  currentCat: string;
}

interface IControlBarContex {
  controlBar: IControlBar;
  setControlBars: Dispatch<SetStateAction<IControlBar>>;
}

export const ControlBarContext = createContext<IControlBarContex>({
  controlBar: {
    productsPerPage: 12,
    viewProducts: 'card',
    sortPrice: '',
    sortName: '',
    minPrice: null,
    maxPrice: null,
    currentPage: 1,
    currentCat: '',
  },
  setControlBars: () => {},
});

export const ControlBarContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [controlBar, setControlBars] = useState<IControlBar>({
    productsPerPage: 12,
    viewProducts: 'card',
    sortPrice: '',
    sortName: '',
    minPrice: null,
    maxPrice: null,
    currentPage: 1,
    currentCat: '',
  });

  return (
    <ControlBarContext.Provider value={{ controlBar, setControlBars }}>
      {children}
    </ControlBarContext.Provider>
  );
};
