const expertise = [
  "Full-Stack Development",
  "Artificial Intelligence",
  "Computer Vision",
  "Backend Engineering",
];

export default function ExpertiseStrip() {
  return (
    <section
      className="integrated-expertise"
      aria-labelledby="expertise-heading"
    >
      <div className="site-container">
        <div className="integrated-expertise-inner">
          <h2
            id="expertise-heading"
            className="integrated-expertise-label"
          >
            Specialising in
          </h2>

          <ul className="integrated-expertise-list">
            {expertise.map((item) => (
              <li
                key={item}
                className="integrated-expertise-item"
              >
                <span className="integrated-expertise-text">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}