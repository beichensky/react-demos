// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

import React, { Component } from './z-react/react';
import ReactDOM from './z-react/react-dom';

import './index.css';

class ClassComp extends Component {
    static defaultProps = {
        title: '类组件默认标题',
        name: 'class',
    };

    render() {
        const { title, name } = this.props;
        return (
            <h2>
                title：{title}，name： {name}
            </h2>
        );
    }
}

function FunComponent({ title, name }) {
    return (
        <h2>
            title：{title}，name： {name}
        </h2>
    );
}
FunComponent.defaultProps = {
    title: '函数组件默认标题',
    name: 'function',
};

const App = () => (
    <div className="box border">
        <ClassComp name="Jack" />
        <FunComponent name="Lily" />
        <button onClick={() => alert('Hello Fiber')}>弹出提示</button>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
