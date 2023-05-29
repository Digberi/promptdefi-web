import { Navigate, Routes as ReactRoutes, Route } from 'react-router-dom';

import { RouterConfig } from './router.config';

export const Router = () => {
  return (
    <ReactRoutes>
      {RouterConfig.list.map((route, index) => (
        <Route key={index} {...route} />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </ReactRoutes>
  );
};
