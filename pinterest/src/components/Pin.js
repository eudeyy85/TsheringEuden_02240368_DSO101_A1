export default function Pin({ pin }) {
  return (
    <div className="masonry-item">
      <div className="pin-card">
        <div className="relative group">
          <img
            src={pin.image}
            alt={pin.title}
            className="pin-image"
            style={{ height: `${pin.height}px` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-t-2xl flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button className="bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition-colors">
              Save
            </button>
          </div>
        </div>
        <div className="pin-info">
          <h3 className="pin-title">{pin.title}</h3>
          <div className="pin-user">
            <div className="user-avatar">
              <img
                src={pin.user.avatar}
                alt={pin.user.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="user-name">{pin.user.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
