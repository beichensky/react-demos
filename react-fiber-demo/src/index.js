// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

import React, { Component } from './z-react/react';
import ReactDOM, { useState } from './z-react/react-dom';

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

const StateApp = () => {
    const [count, setCount] = useState(0);

    console.log('render');

    return (
        <div className="box border">
            <p>count: {count}</p>
            <span>{count % 2 === 0 ? '偶数' : '奇数'}</span>
            <div>
                {count % 2 === 0 ? (
                    <span className="blue">even</span>
                ) : (
                    <strong className="gray">odd</strong>
                )}
            </div>
            <button onClick={() => setCount(count + 1)}>increment</button>
        </div>
    );
};

ReactDOM.render(<StateApp />, document.getElementById('root'));
