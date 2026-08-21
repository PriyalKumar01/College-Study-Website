export const PageLoader = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 w-full animate-in fade-in duration-300">
      <div className="relative flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-indigo-500/20 border-t-indigo-600 animate-spin" />
      </div>
      <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Loading...</p>
    </div>
  );
};

export default PageLoader;
