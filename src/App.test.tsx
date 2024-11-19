// import React from "react";
// import { ReactDOM } from "react-dom";
// import MainApp from "./App";

// it('render without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<MainApp />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

import { createRoot } from 'react-dom/client';
import MainApp from './App';

test('renders without crashing', () => {
    const container = document.createElement('div');
    const root = createRoot(container); 
    root.render(<MainApp tab="home" />);
    root.unmount();
});