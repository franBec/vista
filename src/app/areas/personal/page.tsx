import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PersonalInfoPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            This page will display your personal information and settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Your personal information will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
