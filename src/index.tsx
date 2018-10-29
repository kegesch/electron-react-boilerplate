import { render } from 'react-dom'
import App from './components/App'
import * as React from 'react';
import Notification from 'node-mac-notifier';

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div')

root.id = 'root'
document.body.appendChild(root)

// Now we can render our application into it
render(<App />, document.getElementById('root'))

const noti = new Notification("Hello World", {body: "it works"});
noti.addEventListener('click', () => console.log('Got a click'));
