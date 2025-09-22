import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Building, User } from "lucide-react";

export default function AreasPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Areas</h1>
        <p className="text-muted-foreground">
          Select an area to view its details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Government Areas Card */}
        <Card className="hover:shadow-md transition-shadow">
          <Link href="/areas/gov" className="block h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-6 w-6" />
                Government Areas
              </CardTitle>
              <CardDescription>
                View and manage government-related areas and their information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Access government data, regulations, and official information
              </div>
            </CardContent>
          </Link>
        </Card>

        {/* Personal Areas Card */}
        <Card className="hover:shadow-md transition-shadow">
          <Link href="/areas/personal" className="block h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6" />
                Personal Info
              </CardTitle>
              <CardDescription>
                Manage your personal information and private data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                View and update your personal details and preferences
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}
