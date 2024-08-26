import Link from "next/link";
import SearchField from "../SearchField";

const Header = ({ showSearch }: { showSearch: boolean }) => {
  return (
    <div className="fixed top-0 left-0 w-full px-8 xl:px-44 flex items-center justify-start bg-[#1d1d1d] py-6">
      <Link href="/">
        <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-b from-[#00F2D5] to-[#AD00FF] mr-4">
          Muse.ai
        </h1>
      </Link>
      {showSearch && <SearchField />}
    </div>
  );
};

export default Header;
