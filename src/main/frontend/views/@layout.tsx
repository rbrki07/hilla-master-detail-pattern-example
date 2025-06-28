import { createMenuItems, useViewConfig } from '@vaadin/hilla-file-router/runtime.js';
import { effect, signal } from '@vaadin/hilla-react-signals';
import { AppLayout, DrawerToggle, Icon, ProgressBar, Scroller, SideNav, SideNavItem } from '@vaadin/react-components';
import { Suspense, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';

const documentTitleSignal = signal('');
effect(() => {
  document.title = documentTitleSignal.value;
});

// Publish for Vaadin to use
(window as any).Vaadin.documentTitleSignal = documentTitleSignal;

const Header = () => {
  const currentTitle = useViewConfig()?.title;

  useEffect(() => {
    if (currentTitle) {
      documentTitleSignal.value = currentTitle;
    }
  }, [currentTitle]);

  return (
    <>
      <DrawerToggle slot="navbar" aria-label="Menu toggle" />
      <div className="flex p-m gap-m items-center" slot="drawer">
        <Link to="/">
          <Icon icon="vaadin:cubes" className="text-primary icon-l" />
        </Link>
        <span className="font-semibold text-l">Hilla Master-Detail-Pattern Example Application</span>
      </div>
      <h1 slot="navbar" className="text-l m-0">
        {documentTitleSignal}
      </h1>
    </>
  );
};

const MainMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SideNav className="mx-m" onNavigate={({ path }) => path != null && navigate(path)} location={location}>
      {createMenuItems().map(({ to, icon, title }) => (
        <SideNavItem path={to} key={to}>
          {icon && <Icon icon={icon} slot="prefix" />}
          {title}
        </SideNavItem>
      ))}
    </SideNav>
  );
};

export default function MainLayout() {
  return (
    <AppLayout primarySection="drawer" drawerOpened={false}>
      <Header />
      <Scroller slot="drawer">
        <MainMenu />
      </Scroller>
      <Suspense fallback={<ProgressBar indeterminate={true} className="m-0" />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
