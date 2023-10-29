import Image from "next/image";
import Background from "./Background";
import Link from "next/link";
interface Item {
  name: string;
  image: string;
  link?: string;
  itemsCount?: number;
  color: string;
  paragraph?: string;
  grm?: number;
  price?: number;
}
interface MenuItemProps {
  item: Item;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <>
      <div className=" relative">
        <Background className="w-full z-[1]" fillColor={item.color} />

        <div className="z-[2] absolute h-full w-full top-0  flex flex-col justify-center items-center align-middle gap-4 text-center">
          <Image
            src={item.image}
            width={300}
            height={100}
            alt="burger"
            className="scale-x-125 pointer-events-none"
          />
          <h2
            className="text-3xl max-w-[250px]"
            dangerouslySetInnerHTML={{ __html: item.name }}
          ></h2>
          {item.paragraph && (
            <p className="text-xs opacity-50 max-w-[220px]">{item.paragraph}</p>
          )}
          {item.itemsCount && (
            <p className="text-xs opacity-50">{item.itemsCount} items</p>
          )}
          {item.link && (
            <Link
              href={item.link}
              className=" font-bold text-lg px-4  bg-white rounded-3xl"
              style={{ color: item.color }}
            >
              View
            </Link>
          )}
          {item.grm && (
            <p
              className=" font-bold text-lg px-4  bg-white rounded-3xl"
              style={{ color: item.color }}
            >
              {item.grm} GRM
            </p>
          )}
          {item.price && (
            <p
              className=" font-bold text-lg px-4  bg-white rounded-3xl"
              style={{ color: item.color }}
            >
              {item.price}$
            </p>
          )}
        </div>
      </div>
    </>
  );
};
export default MenuItem;
