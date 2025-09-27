import { SignUp } from "@clerk/nextjs";
import { RoutePage } from "@/components/layout/route-page";

export default function Page() {
  return (
    <RoutePage.Auto uri="/sign-up">
      {route => (
        <>
          <RoutePage.Header route={route} />
          <RoutePage.AuthFormWithImage>
            <RoutePage.AuthForm>
              <SignUp
                appearance={{
                  elements: {
                    card: "shadow-none border-0",
                    header: "hidden",
                  },
                }}
              />
            </RoutePage.AuthForm>
            <RoutePage.AuthImage
              src="/undraw_hello_ccwj.svg"
              alt="Welcome illustration"
            />
          </RoutePage.AuthFormWithImage>
        </>
      )}
    </RoutePage.Auto>
  );
}
