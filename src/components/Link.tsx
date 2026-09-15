"use client";

import NextLink from "next/link";
import React, { forwardRef } from "react";
import { useRouteChangeContext } from "../context/RouteChangeProvider";

type LinkProps = React.ComponentProps<typeof NextLink>;

// https://github.com/vercel/next.js/blob/400ccf7b1c802c94127d8d8e0d5e9bdf9aab270c/packages/next/src/client/link.tsx#L169
function isModifiedEvent(event: React.MouseEvent): boolean {
  const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement;
  const target = eventTarget.getAttribute("target");
  return (
    (target && target !== "_self") ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey || // triggers resource download
    (event.nativeEvent && event.nativeEvent.button === 2)
  );
}

// Anything with a scheme (https:, mailto:, tel:) or protocol-relative (//host) leaves the app,
// so it gets a plain anchor. Everything else, including relative paths, goes through next/link.
function isExternal(href: LinkProps["href"]): href is string {
  return typeof href === "string" && /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href);
}

function hrefToString(href: LinkProps["href"]): string {
  if (typeof href === "string") return href;
  return `${href.pathname ?? ""}${href.search ?? ""}${href.hash ?? ""}`;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, onClick, as, replace, scroll, shallow, passHref, prefetch, locale, legacyBehavior, ...rest },
  ref,
) {
  const { onRouteChangeStart } = useRouteChangeContext();

  if (isExternal(href)) return <a href={href} onClick={onClick} ref={ref} {...rest} />;

  return (
    <NextLink
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
      locale={locale}
      legacyBehavior={legacyBehavior}
      onClick={(event) => {
        if (!isModifiedEvent(event)) {
          const { pathname, search, hash } = window.location;
          const hrefCurrent = `${pathname}${search}${hash}`;
          if (hrefToString(href) !== hrefCurrent) {
            onRouteChangeStart();
          }
        }
        if (onClick) onClick(event);
      }}
      {...rest}
      ref={ref}
    />
  );
});

export default Link;
