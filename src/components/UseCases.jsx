import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useCases } from '../data/mock';

export const UseCases = () => {
  return (
    <section id="use-cases" className="section-padding">
      <div className="dark-content-container">
        <div className="section-header">
          <h2 className="display-large">Real-World Impact</h2>
          <p className="body-large section-subtitle">
            Transforming industries with intelligent physical AI systems
          </p>
        </div>

        <div className="use-cases-grid">
          {useCases.map((useCase) => (
            <div key={useCase.id} className="use-case-card">
              <div className="use-case-industry">{useCase.industry}</div>
              <h3 className="heading-2">{useCase.title}</h3>
              <p className="body-medium">{useCase.description}</p>
              
              <div className="use-case-impact">
                <TrendingUp size={20} className="impact-icon" />
                <span className="body-large impact-text">{useCase.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
