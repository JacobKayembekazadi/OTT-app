import React from 'react';

const AppShell = ({ children }) => (
  <div style={{
    background:'var(--color-bg-primary)',
    color:'var(--color-text-primary)',
    minHeight:'100vh'
  }} className="font-sans">
    {children}
  </div>
);

export default AppShell;
