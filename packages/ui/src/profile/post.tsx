interface PostProps {
    index: number;
    title: string;
    date: string;
    content: string;
    path: string;
}
export const Post = ({index, title, date, content, path}: PostProps) => {

  return (
    <div key={index} className="ui--my-6">
    <div className="ui-relative ui-pl-8 sm:ui-pl-32 ui-py-6 ui-group">
      <div className="ui-font-caveat ui-font-medium ui-text-2xl ui-text-indigo-500 ui-mb-1 sm:ui-mb-0">
        {title}
      </div>
      <div className={`ui-flex ui-flex-col sm:ui-flex-row ui-items-start ui-mb-1 before:ui-absolute before:ui-left-2 sm:before:ui-left-0 before:ui-h-full before:ui-w-px before:ui-bg-slate-300 sm:before:ui-ml-[6.5rem] before:ui-self-start before:ui--translate-x-1/2 before:ui-translate-y-3 after:ui-absolute after:ui-left-2 sm:after:ui-left-0 after:ui-w-2 after:ui-h-2 after:ui-bg-indigo-600 after:ui-border-4 after:ui-box-content after:ui-border-slate-50 after:ui-rounded-full sm:after:ui-ml-[6.5rem] after:ui--translate-x-1/2 after:ui-translate-y-1.5" : ""}`}>
        <time className="sm:ui-absolute ui-left-0 ui-translate-y-0.5 ui-inline-flex ui-items-center ui-justify-center ui-text-xs ui-font-semibold ui-uppercase ui-w-20 ui-h-6 ui-mb-3 sm:ui-mb-0 ui-text-emerald-600 ui-bg-emerald-100 ui-rounded-full">
          {date}
        </time>
        <div className="ui-text-xl ui-font-bold ui-text-slate-900">
          {content}
        </div>
      </div>
      <div className="ui-text-slate-500">{path}</div>
    </div>
  </div>
  );
};
