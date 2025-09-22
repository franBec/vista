import { RouteNode } from "@/lib/routes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface RouteGridProps {
  routes: RouteNode[];
}

export function RouteGrid({ routes }: RouteGridProps) {
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
}
