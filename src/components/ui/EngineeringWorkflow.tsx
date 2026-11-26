
"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import {
  ScanSearch,
  Network,
  CodeXml,
  GitBranch,
  ChevronRight,
  Workflow,
} from "lucide-react";

const stages = [
  {
    title: "Discover",
    icon: ScanSearch,
    description:
      "Understanding problems, requirements and user needs.",
  },
  {
    title: "Design",
    icon: Network,
    description:
      "Designing thoughtful architectures and practical solutions.",
  },
  {
    title: "Develop",
    icon: CodeXml,
    description:
      "Transforming ideas into functional, maintainable software.",
  },
  {
    title: "Refine",
    icon: GitBranch,
    description:
      "Testing, evaluating and continuously improving solutions.",
  },
];

export default function EngineeringWorkflow() {
  const [activeStage, setActiveStage] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="engineering-workflow">
      <div className="workflow-header">
        <span>Engineering approach</span>

        <Workflow
          size={17}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      <div
        className="workflow-stages"
        role="group"
        aria-label="Engineering stages"
      >
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = activeStage === index;

          return (
            <div
              className="workflow-stage-group"
              key={stage.title}
            >
              <button
                type="button"
                className={`workflow-stage ${
                  isActive ? "workflow-stage-active" : ""
                }`}
                onClick={() => setActiveStage(index)}
                aria-pressed={isActive}
              >
                <span className="workflow-stage-icon">
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>

                <span>{stage.title}</span>
              </button>

              {index < stages.length - 1 && (
                <ChevronRight
                  className="workflow-connector"
                  size={13}
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>

      <div
        className="workflow-description"
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeStage}
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: reduceMotion ? 0 : -5,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.2,
            }}
          >
            <span className="workflow-active-label">
              {stages[activeStage].title}
            </span>

            <p>{stages[activeStage].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
