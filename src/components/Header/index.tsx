import SearchField from "../SearchField";

const Header = ({ showSearch }: { showSearch: boolean }) => {
  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-start bg-[#1d1d1d] p-6">
      <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-b from-[#00F2D5] to-[#AD00FF] mr-8">
        Muse.ai
      </h1>
      {showSearch && <SearchField />}
    </div>
  );
};

export default Header;
