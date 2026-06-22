function Header({ toggle }) {
  return (
    <header className="cv-header">
      <h1 className="cv-header-title">CalcVoyager</h1>
      {toggle}
    </header>
  );
}

export default Header;