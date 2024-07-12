import "../../app/globals.css";

export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <div className="all-center lg:h-screen lg:pb-96">{children}</div>;
}
