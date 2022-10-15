import React from 'react';
import { render } from 'react-dom';

import { App } from "./components/app";

test('render app', () => {
    const container = document.createElement('div')
    render(<App />, container)
})