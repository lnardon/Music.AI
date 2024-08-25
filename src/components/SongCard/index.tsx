const SongCard = ({
  name,
  artist,
  cover,
  isFavorite,
}: {
  name: string;
  artist: string;
  cover: string;
  isFavorite: boolean;
}) => {
  return (
    <div>
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <img src={cover} alt={name} className="w-16 h-16 rounded-lg" />
          <div className="ml-4">
            <h3 className="font-bold">{name}</h3>
            <p className="text-gray-500">{artist}</p>
          </div>
          <input type="checkbox" name="" id="" checked={isFavorite} />
        </div>
      </div>
    </div>
  );
};

export default SongCard;
