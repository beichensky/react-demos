import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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

const todoList = ['吃饭', '睡觉', '敲代码'];

const App = () => (
    <div className="box border">
        {todoList.map(i => (
            <li key={i}>{i}</li>
        ))}
        <ClassComp name="Jack" />
        <FunComponent name="Lily" />
        <button onClick={() => alert(123)}>弹出提示</button>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
