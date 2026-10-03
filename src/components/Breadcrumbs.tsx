import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const routeMap: Record<string, string> = {
    'servers': 'Серверы',
    'wiki': 'Вики',
    'skill-tree': 'Таланты',
    'community': 'Сообщество',
    'shop': 'Магазин',
    'profile': 'Профиль',
  };

  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link to="/" className="flex items-center gap-1 text-norse-muted hover:text-amber-400 transition-colors">
            <Home size={16} />
            <span>Главная</span>
          </Link>
        </li>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={name} className="flex items-center gap-2">
              <ChevronRight size={16} className="text-norse-muted" />
              {isLast ? (
                <span className="text-amber-400 font-medium" aria-current="page">
                  {routeMap[name] || name}
                </span>
              ) : (
                <Link to={routeTo} className="text-norse-muted hover:text-amber-400 transition-colors">
                  {routeMap[name] || name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
