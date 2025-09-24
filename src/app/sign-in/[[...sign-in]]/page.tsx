import { SignIn } from "@clerk/nextjs";
import { RoutePage } from "@/components/route-page";

export default function Page() {
  return (
    <RoutePage.Auto uri="/sign-in">
      {route => (
        <>
          <RoutePage.Header route={route} />
          <RoutePage.AuthFormWithImage>
            <RoutePage.AuthForm>
              <SignIn
                appearance={{
                  elements: {
                    card: "shadow-none border-0",
                    header: "hidden",
                  },
                }}
              />
            </RoutePage.AuthForm>
            <RoutePage.AuthImage
              src="/undraw_login_weas.svg"
              alt="Login illustration"
            />
          </RoutePage.AuthFormWithImage>
        </>
      )}
    </RoutePage.Auto>
  );
}
