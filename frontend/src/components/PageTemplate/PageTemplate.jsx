const PageTemplate = ({ children }) => (
  <div className="container-fluid h-100 my-4">
    <div className="row justify-content-center align-content-center h-100">
      {children}
    </div>
  </div>
);

export default PageTemplate;
