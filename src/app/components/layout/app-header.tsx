export function AppHeader() {
  return (
    <header className='main-header main-layout full' id='head'>
      <nav className='main-nav'>
        <a href='#head'>
          <div className='brand'>Moshe Nehemiah</div>
        </a>

        <ul className='clean-list d-flex gap-15'>
          <li>
            <a href='#projects'>Projects</a>
          </li>
          <li>
            <a href='#skills'>Skills</a>
          </li>
          <li>
            <a href='#contact'>Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
