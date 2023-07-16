# NextJS 13 Router Events

Provides NextJS 13 router events compatible with the App Router

## Usage

Replace regular NextJS `Link` components with this one:
```tsx
import { Link } from 'nextjs13-router-events';
```

That Link component should be compatible with your setup.

Your layout.tsx:
```tsx
import { RouteChangeProvider } from 'nextjs13-router-events';
...
return (
  <RouteChangeProvider>
    {children}
  </RouteChangeProvider>
)
```

Your component, where you want to monitor the onRouteChangeStart and onRouteChangeComplete events:
```tsx
import { useRouteChange } from 'nextjs13-router-events';
...
export default function Component(props: any) {
  ...
  useRouteChange({
    onRouteChangeStart: () => {
      console.log('onStart 3');
    },
    onRouteChangeComplete: () => {
      console.log('onComplete 3');
    }
  });
  ...
}
```