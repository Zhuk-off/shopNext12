import { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => (
  <div className="container mx-auto box-border max-w-7xl p-4">{children}</div>
);

export default Container;
