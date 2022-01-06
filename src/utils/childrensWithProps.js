const propsHaveClass = (props) => Boolean(props?.className);

/**
 * cp = children props
 * p = props
 * pwc = props without classname
 * cwnp = children with new props
 * cotcp = children of the children props
 * cwp = children with props
 */
export function childrensWithProps(cp, p) {
  let cwnp = { ...cp, ...p };
  if (propsHaveClass(p) && propsHaveClass(cp)) {
    let className = p.className.toLowerCase();
    if (p.className !== cp.className) {
      className = `${p.className}_${cp.className}`.toLowerCase();
    }
    p = { ...p, className };
    cwnp = { ...cp, ...p };
  } else {
    const pwc = { ...p };
    delete pwc.className;
    cwnp = { ...cp, ...pwc };
  }
  if (cwnp.children) {
    const cotcp = cwnp.children;
    if (typeof cotcp === 'string') {
      return cwnp;
    } else {
      if (Array.isArray(cotcp)) { 
        const cwp = cotcp.map(child => ({ ...child, props: childrensWithProps(child.props, p) }));
        cwnp.children = cwp;
      } else {
        cwnp.children = { ...cotcp, props: childrensWithProps(cotcp.props, p) };
      }
    }
  }
  return cwnp;
}
