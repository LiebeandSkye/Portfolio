export const getProjectTechSummary = (project) => {
  if (!project) return '';

  const tech = Array.isArray(project.tech) && project.tech.length > 0
    ? project.tech
    : project.tags;

  return Array.isArray(tech) ? tech.join(', ') : '';
};
