import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md" />
            <span className="font-semibold text-xl">Website Builder</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {session.user?.email}
            </span>
            <form action="/api/auth/signout" method="POST">
              <Button variant="outline" type="submit">Sign Out</Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {session.user?.name || "there"}!
          </h1>
          <p className="text-muted-foreground">
            Start building your next amazing website
          </p>
        </div>

        {/* Empty State */}
        <Card className="max-w-2xl mx-auto text-center py-12">
          <CardHeader>
            <CardTitle className="text-2xl">No projects yet</CardTitle>
            <CardDescription>
              Create your first project to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" className="mt-4">
              Create Your First Project
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              You'll be able to create pages, add elements, and publish your website
            </p>
          </CardContent>
        </Card>

        {/* Coming Soon Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Visual Editor</CardTitle>
              <CardDescription>Coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Drag-and-drop interface for building pages
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Element Library</CardTitle>
              <CardDescription>Coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                50+ pre-built elements ready to use
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Publish & Export</CardTitle>
              <CardDescription>Coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Deploy or export clean production code
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
