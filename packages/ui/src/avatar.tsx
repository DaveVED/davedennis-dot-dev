import Image from "next/image";

interface AvatarProps {
    name: string;
    picture: string;
  };
  
  const Avatar = ({ name, picture }: AvatarProps) => (
    <div className="flex items-center mt-4">
      <Image src={picture} className="w-10 h-10 rounded-full mr-3" alt={name} width={40} height={40} />
      <div className="text-lg font-medium text-gray-700">{name}</div>
    </div>
  );
  