import { useEffect } from 'react';
import { useRouteChangeContext } from '../context/RouteChangeProvider';

type CallbackOptions = {
  onRouteChangeStart?: Function;
  onRouteChangeComplete?: Function;
}

const useRouteChange = (options: CallbackOptions) => {
  const { routeChangeStartCallbacks, routeChangeCompleteCallbacks } = useRouteChangeContext();
  
  useEffect(() => {
    // add callback to the list of callbacks and persist it
    if (options.onRouteChangeStart) {
      routeChangeStartCallbacks.push(options.onRouteChangeStart);
    }
    if (options.onRouteChangeComplete) {
      routeChangeCompleteCallbacks.push(options.onRouteChangeComplete);
    }

    return () => {
      // Find the callback in the array and remove it.
      if (options.onRouteChangeStart) {
        const index = routeChangeStartCallbacks.indexOf(options.onRouteChangeStart);
        if (index > -1) {
          routeChangeStartCallbacks.splice(index, 1);
        }
      }
      if (options.onRouteChangeComplete) {
        const index = routeChangeCompleteCallbacks.indexOf(options.onRouteChangeComplete);
        if (index > -1) {
          routeChangeCompleteCallbacks.splice(index, 1);
        }
      }
    };
  }, [options, routeChangeStartCallbacks, routeChangeCompleteCallbacks]);
};

export default useRouteChange;