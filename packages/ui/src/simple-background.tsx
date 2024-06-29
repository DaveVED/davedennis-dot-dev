interface SimpleBackgroundProps {
  videoPath: string;
}

export const SimpleBackground = ({ videoPath }: SimpleBackgroundProps) => {
  return (
    <div className="ui-absolute ui-inset-0 ui-overflow-hidden">
      <video
        className="ui-absolute ui-inset-0 ui-object-cover ui-w-full ui-h-full"
        autoPlay
        playsInline
        muted
        loop
      >
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
