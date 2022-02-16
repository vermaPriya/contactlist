import React, { Fragment } from 'react';

const NotFound = () => {
  return (
    <Fragment>
      <h1 className="mt-5">
        404 <span className="text-purple">Page Not Found</span>
      </h1>
      <p>Sorry :( The page you are looking for is not available!</p>
    </Fragment>
  );
};

export default NotFound;
