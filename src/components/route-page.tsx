import { findRouteByUri, getChildRoutes } from "@/lib/routes";
import { RouteGrid } from "@/components/route-grid";

interface RoutePageProps {
  uri: string;
}

export function RoutePage({ uri }: RoutePageProps) {
  const route = findRouteByUri(uri);

  if (!route) {
    throw new Error(`No route found with URI: ${uri}`);
  }

  const childRoutes = getChildRoutes(route);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{route.name || "Untitled"}</h1>
        <p className="text-muted-foreground">
          {route.description || "No description available"}
        </p>
      </div>
      <>{!!childRoutes?.length && <RouteGrid routes={childRoutes} />}</>
    </div>
  );
}
