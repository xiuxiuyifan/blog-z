
function createElement(type, config, children) {
  return {
    $$typeof: Symbol('react.element'),
    type: 'h1',
    key: null,
    ref: null, 
    props: {
      className: 'box',
      style: {
        color: 'red'
      },
      children: 'hello'
    }
  }
}

const React = {
  createElement
}
export default React