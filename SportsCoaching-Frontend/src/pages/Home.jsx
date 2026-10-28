import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="home-page">
      <p className="eyebrow">Account center</p>
      <h1>Welcome to User Portal</h1>
      <p className="intro">Create an account or sign in to continue.</p>
      <div className="home-actions">
        <Link className="button button-primary" to="/registation">Create account</Link>
        <Link className="button button-secondary" to="/login">Sign in</Link>
      </div>
    </section>
  )
}

export default Home