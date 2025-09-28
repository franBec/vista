import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { findRouteByUri, getChildRoutes, RouteNode } from "@/lib/routes";

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

RoutePage.Grid = function RouteGrid({ routes }: { routes: RouteNode[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {routes.map(route => {
        const Icon = route.icon;
        return (
          <Link key={route.uri} href={route.uri} className="block h-full">
            <Card className="flex flex-col h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-accent/50">
              <CardHeader className="flex flex-row items-center gap-4">
                {Icon && (
                  <div className="bg-primary/10 p-3 rounded-full transition-transform duration-300 hover:scale-110">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                )}
                <CardTitle className="text-xl">{route.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{route.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

RoutePage.WithChildRoutes = function RouteWithChildRoutes({
  routes,
}: {
  routes: ReturnType<typeof getChildRoutes>;
}) {
  return routes?.length ? <RoutePage.Grid routes={routes} /> : null;
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
