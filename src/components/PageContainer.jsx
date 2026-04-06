export default function PageContainer({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-[#f7f4ef] px-4 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
