import './loader2.css'
function GlobalLoader({ show }) {
  if (!show) return null;

  return (
    <div className="fullpage-loader">
      <div className="global-loader"></div>
    </div>
  );
}

export default GlobalLoader;
