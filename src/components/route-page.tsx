import { findRouteByUri, getChildRoutes } from "@/lib/routes";
import { RouteGrid } from "@/components/route-grid";
import { ReactNode } from "react";
import Image from "next/image";

interface RoutePageProps {
  uri: string;
  children?: ReactNode;
}

interface RouteHeaderProps {
  route: NonNullable<ReturnType<typeof findRouteByUri>>;
}

interface RouteContentProps {
  children?: ReactNode;
}

export function RoutePage({ uri, children }: RoutePageProps) {
  const route = findRouteByUri(uri);

  if (!route) {
    throw new Error(`No route found with URI: ${uri}`);
  }

  return <div className="container mx-auto py-8">{children}</div>;
}

RoutePage.Header = function RouteHeader({ route }: RouteHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        {route.icon && <route.icon className="h-8 w-8" />}
        <span>{route.name || "Untitled"}</span>
      </h1>
      <p className="text-muted-foreground">
        {route.description || "No description available"}
      </p>
    </div>
  );
};

RoutePage.Content = function RouteContent({ children }: RouteContentProps) {
  return <div>{children}</div>;
};

RoutePage.WithChildRoutes = function RouteWithChildRoutes({
  routes,
}: {
  routes: ReturnType<typeof getChildRoutes>;
}) {
  return routes?.length ? <RouteGrid routes={routes} /> : null;
};

RoutePage.Auto = function RouteAuto({
  uri,
  children,
}: {
  uri: string;
  children?: (
    route: NonNullable<ReturnType<typeof findRouteByUri>>
  ) => ReactNode;
}) {
  const route = findRouteByUri(uri);

  if (!route) {
    throw new Error(`No route found with URI: ${uri}`);
  }

  return (
    <RoutePage uri={uri}>
      {children ? (
        children(route)
      ) : (
        <>
          <RoutePage.Header route={route} />
          <RoutePage.Content>
            <RoutePage.WithChildRoutes routes={getChildRoutes(route)} />
          </RoutePage.Content>
        </>
      )}
    </RoutePage>
  );
};

RoutePage.AuthFormWithImage = function RouteAuthFormWithImage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoutePage.Content>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {children}
      </div>
    </RoutePage.Content>
  );
};

RoutePage.AuthForm = function RouteAuthForm({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full md:w-1/2">
      <div className="max-w-md mx-auto">{children}</div>
    </div>
  );
};

RoutePage.AuthImage = function RouteAuthImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="w-full md:w-1/2 flex justify-center">
      <div className="max-w-md">
        <Image
          src={src}
          alt={alt}
          width={400}
          height={400}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};
