import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { VerticalLayout } from '@vaadin/react-components';

export const config: ViewConfig = {
  menu: { exclude: true },
  title: 'Home',
};

export default function HomeView() {
  return (
    <VerticalLayout theme="margin">
      <h2>Welcome to Hilla Master-Detail-Pattern Example Application</h2>
      <p>Select an item from the menu</p>
    </VerticalLayout>
  );
}
