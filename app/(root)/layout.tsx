export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="flex h-screen flex-col">
        ROOT
        <main className="flex-l wrapper">
            { children }
        </main>
      </div>
    );
  }