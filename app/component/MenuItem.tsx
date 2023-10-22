import Image from "next/image";
import Background from "./Background";
import Link from "next/link";
interface Item {
  name: string;
  image: string;
  link: string;
  itemsCount: number;
  color: string;
}
interface MenuItemProps {
  item: Item;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <>
      <div className=" relative">
        <Background className="w-full " fillColor={item.color} />

        <div className="z-[2] absolute h-full w-full top-0  flex flex-col justify-center items-center align-middle gap-4">
          <Image
            src={item.image}
            width={400}
            height={200}
            alt="burger"
            className="scale-x-125"
          />
          <h2
            className="text-3xl"
            dangerouslySetInnerHTML={{ __html: item.name }}
          ></h2>
          <p className="text-xs opacity-50">{item.itemsCount} items</p>
          <Link
            href="/burger"
            className=" font-bold text-lg px-4  bg-white rounded-3xl"
            style={{ color: item.color }}
          >
            View
          </Link>
        </div>
      </div>
    </>
  );
};
export default MenuItem;
