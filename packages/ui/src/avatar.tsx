import Image from "next/image";

interface AvatarProps {
  name: string;
  picture: string;
}

export const Avatar = ({ name, picture }: AvatarProps) => (
  <div className="ui-flex ui-items-center ui-mt-4">
    <Image
      src={picture}
      className="ui-w-10 ui-h-10 ui-rounded-full ui-mr-3"
      alt={name}
      width={40}
      height={40}
    />
    <div className="ui-text-lg ui-font-medium ui-text-gray-700">{name}</div>
  </div>
);
