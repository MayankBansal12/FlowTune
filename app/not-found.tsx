import { MainLayout } from "./components/MainLayout";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white/80 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white/60 mb-2">
            Page Not Found
          </h2>
          <p className="text-white/40 mb-6">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <a
            href="/home"
            className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300"
          >
            Go Home
          </a>
        </div>
      </div>
    </MainLayout>
  );
}
