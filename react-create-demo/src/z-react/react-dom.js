/**
 * 渲染函数
 * @param {*} vNode 虚拟 DOM
 * @param {*} container DOM 容器
 */
const render = (vNode, container) => {
    const node = createNode(vNode);
    container.appendChild(node);

    // 
    console.log('vNode', vNode, container, node);
};

/**
 * 将虚拟 DOM转化成真实 DOM 节点
 * @param {*} vNode 虚拟 DOM
 */
function createNode(vNode) {
    let node = null;
    const { type, props } = vNode;

    /**
     * 根据 type 值创建真实节点
     */
    if (type === 'TEXT') {
        node = document.createTextNode('');
    } else if (typeof type === 'string') {
        node = document.createElement(type);
    } else if (typeof type === 'function') {
        node =
            type.prototype && type.prototype.isReactComponent
                ? updateClassComponent(vNode)
                : updateFunctionComponent(vNode);
    } else {
        node = document.createDocumentFragment();
    }

    if (props.children) {
        reconcileChildren(props.children, node);
    }

    updateNode(node, props);

    return node;
}

/**
 * 协调子元素
 * @param {*} children 子元素数组
 * @param {*} node 真实 DOM
 */
function reconcileChildren(children, node) {
    // 循环子元素，如果子元素也是数组，则进行递归调用
    children.forEach(child => {
        if (Array.isArray(child)) {
            reconcileChildren(child, node);
        } else {
            render(child, node);
        }
    });
}

/**
 * 更新 DOM 属性
 * @param {*} node 真实 DOM
 * @param {*} nextProps 节点属性
 */
function updateNode(node, nextProps) {
    Object.keys(nextProps)
        .filter(propName => propName !== 'children')
        .forEach(propName => {
            // 设置事件监听
            if (propName.startsWith('on')) {
                const eventName = propName.slice(2).toLowerCase();
                node.addEventListener(eventName, nextProps[propName]);
            } else {
                // 设置节点属性
                node[propName] = nextProps[propName];
            }
        });
}

/**
 * 将类组件转化成真实 DOM
 * @param {*} vNode 虚拟 DOM
 */
function updateClassComponent(vNode) {
    const { type: Type, props } = vNode;
    vNode = new Type(props).render();
    return createNode(vNode);
}

/**
 * 将函数组件转化成真实 DOM
 * @param {*} vNode 虚拟 DOM
 */
function updateFunctionComponent(vNode) {
    const { type, props } = vNode;
    vNode = type(props);
    return createNode(vNode);
}

export default {
    render,
};
