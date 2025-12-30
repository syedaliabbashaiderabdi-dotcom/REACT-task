function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="header">
      <h1>To-Do List App</h1>
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
}

export default Header;
