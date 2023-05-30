const MainNavbar = (props: { name: string }) => {
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Instagram</a>
      </div>
      <p>{props.name}</p>

      <button className="btn btn-ghost btn-circle avatar">
        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </button>
    </div>
  );
};
export default MainNavbar;
