import React from "react";
import { Map, Workflow, Activity } from "lucide-react";
import {
  BrainCircuit,
  Cpu,
  Layers,
  Target,
  Database,
  GitBranch,
  Network,
  Globe,
  RefreshCcw,
  Bot,
  Radio,
  Search,
  Puzzle,
  HardDrive,
  Repeat,
  Flag,
  ListTree,
  Sparkles,
  RotateCcw,
  Share2,
  GitMerge,
  Camera,
  Radar,
  ArrowRightLeft,
  Send,
  Server,
  Box,
  Zap,
  Lock
} from "lucide-react";

import { technologyLayers, stats } from "../data/mock";

const iconMap = {
  BrainCircuit,
  Cpu,
  Layers,
  Target,
  Database,
  GitBranch,
  Network,
  Globe,
  RefreshCcw,
  Bot,
  Radio,
  Search,
  Puzzle,
  HardDrive,
  Repeat,
  Flag,
  ListTree,
  Sparkles,
  RotateCcw,
  Share2,
  GitMerge,
  Camera,
  Radar,
  ArrowRightLeft,
  Send,
  Server,
  Box,
  Zap,
  Lock,
  Map,
  Workflow,     
  Activity  
};

export const Technology = () => {
  return (
    <section id="technology" className="section-padding tech-section">
      <div className="dark-content-container">
        <div className="section-header">
          <h2 className="display-large">Technology Architecture</h2>
          <p className="body-large section-subtitle">
            Cognitive infrastructure powering autonomous intelligence at scale
          </p>
        </div>

        {/* Layered Technology Rendering */}
        {technologyLayers.map((layer, layerIndex) => (
          <div key={layerIndex} className="tech-layer">
            <h3 className="heading-2" style={{ marginBottom: "24px", opacity: 0.85 }}>
              {layer.title}
            </h3>

            <div className="tech-grid">
              {layer.items.map((tech, index) => {
                const Icon = iconMap[tech.icon];
                return (
                  <div key={index} className="tech-card">
                    <div className="tech-icon-wrapper">
                      {Icon && <Icon size={28} className="tech-icon" />}
                    </div>
                    <h4 className="heading-3">{tech.name}</h4>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Stats Section */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};