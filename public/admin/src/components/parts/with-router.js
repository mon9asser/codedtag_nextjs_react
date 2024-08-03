// withRouter.js
import { useParams } from 'react-router-dom';

const withRouter = (Component) => {
  return (props) => {
    const params = useParams();
    return <Component {...props} params={params} />;
  };
};

export default withRouter;