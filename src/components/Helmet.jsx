const Helmet = (props) => {
  document.title = "BKshoe - " + props.title;

  return <div>{props.children}</div>;
};

export default Helmet;
