import Link from "next/link";

const NAV_LIST = [
  {
    name: "获取b23.tv短链接",
    path: "/",
  },
  {
    name: "获取封面图",
    path: "/get-cover",
  },
];

const NavList: React.FC = () => {
  return (
    <div>
      <div className="flex justify-evenly opacity-30 transition-opacity hover:opacity-100">
        {NAV_LIST.map((item) => (
          <Link
            key={item.path}
            className="flex-1 border border-l-0 text-center"
            href={item.path}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavList;
