import Image from "next/image";

export default function AnimalFilterBar() {
  return (
    <div className="flex justify-between items-center my-4">
      <div className="border-1 border-gray-400 p-2 rounded-2xl">
        <Image
          src="/images/icons/dog.svg"
          width={40}
          height={40}
          alt="Animal"
        />
      </div>
      <div className="border-1 border-gray-400 p-2 rounded-2xl">
        <Image
          src="/images/icons/cat.svg"
          width={40}
          height={40}
          alt="Animal"
        />
      </div>
      <div className="border-1 border-gray-400 p-2 rounded-2xl">
        <Image
          src="/images/icons/rabbit.svg"
          width={40}
          height={40}
          alt="Animal"
        />
      </div>
      <div className="border-1 border-gray-400 p-2 rounded-2xl">
        <Image
          src="/images/icons/snake.svg"
          width={40}
          height={40}
          alt="Animal"
        />
      </div>
    </div>
  );
}
