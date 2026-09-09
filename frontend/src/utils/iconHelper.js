export const getDeviconClass = (tagName) => {
  const name = tagName.toLowerCase().trim();
  
  if (name.includes('html')) return 'devicon-html5-plain';
  if (name.includes('css')) return 'devicon-css3-plain';
  if (name.includes('javascript') || name === 'js') return 'devicon-javascript-plain';
  if (name.includes('react')) return 'devicon-react-original';
  if (name.includes('jquery')) return 'devicon-jquery-plain';
  if (name.includes('php')) return 'devicon-php-plain';
  if (name.includes('laravel')) return 'devicon-laravel-plain';
  if (name.includes('mysql')) return 'devicon-mysql-plain';
  if (name.includes('tailwind')) return 'devicon-tailwindcss-plain';
  if (name.includes('bootstrap')) return 'devicon-bootstrap-plain';
  if (name.includes('node')) return 'devicon-nodejs-plain';
  if (name.includes('git')) return 'devicon-git-plain';
  if (name.includes('python')) return 'devicon-python-plain';
  if (name.includes('java') && !name.includes('javascript')) return 'devicon-java-plain';
  if (name.includes('c++') || name.includes('cpp')) return 'devicon-cplusplus-plain';
  if (name.includes('c#') || name.includes('csharp')) return 'devicon-csharp-plain';
  if (name.includes('vue')) return 'devicon-vuejs-plain';
  if (name.includes('angular')) return 'devicon-angularjs-plain';
  if (name.includes('figma')) return 'devicon-figma-plain';
  
  // Default to a generic code icon if not found
  return null;
};
