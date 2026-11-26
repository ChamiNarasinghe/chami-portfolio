
export default function PortraitAnnotations() {
  return (
    <div
      className="portrait-annotations"
      aria-hidden="true"
    >
      {/* Intelligent Systems */}

      <div className="portrait-annotation annotation-ai">
        <div className="annotation-copy">
          <span className="annotation-index">
            01 /
          </span>

          <span className="annotation-title">
            Intelligent Systems
          </span>
        </div>

        <svg
          viewBox="0 0 180 60"
          className="annotation-connector"
        >
          <path
            d="M0 10 H95 L135 45 H170"
            pathLength="1"
            className="annotation-path"
          />

          <circle
            cx="170"
            cy="45"
            r="6"
            className="annotation-ring"
          />

          <circle
            cx="170"
            cy="45"
            r="2.5"
            className="annotation-node"
          />
        </svg>
      </div>

      {/* Computer Vision */}

      <div className="portrait-annotation annotation-vision">
        <div className="annotation-copy">
          <span className="annotation-index">
            02 /
          </span>

          <span className="annotation-title">
            Computer Vision
          </span>
        </div>

        <svg
          viewBox="0 0 180 60"
          className="annotation-connector"
        >
          <path
            d="M180 10 H95 L45 45 H10"
            pathLength="1"
            className="annotation-path"
          />

          <circle
            cx="10"
            cy="45"
            r="6"
            className="annotation-ring"
          />

          <circle
            cx="10"
            cy="45"
            r="2.5"
            className="annotation-node"
          />
        </svg>
      </div>

      {/* Software Engineering */}

      <div className="portrait-annotation annotation-engineering">
        <div className="annotation-copy">
          <span className="annotation-index">
            03 /
          </span>

          <span className="annotation-title">
            Software Engineering
          </span>
        </div>

        <svg
          viewBox="0 0 180 60"
          className="annotation-connector"
        >
          <path
            d="M0 10 H90 L135 45 H170"
            pathLength="1"
            className="annotation-path"
          />

          <circle
            cx="170"
            cy="45"
            r="6"
            className="annotation-ring"
          />

          <circle
            cx="170"
            cy="45"
            r="2.5"
            className="annotation-node"
          />
        </svg>
      </div>
    </div>
  );
}
