import { useLocation } from 'react-router-dom';

const withLocation = (Component) => {
  return (props) => {
    const location = useLocation();
    return <Component {...props} location={location} />;
  };
};

export default withLocation;