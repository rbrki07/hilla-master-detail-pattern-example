import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { AutoCrud } from '@vaadin/hilla-react-crud';
import { VerticalLayout } from '@vaadin/react-components';
import TaskModel from 'Frontend/generated/de/rwi/hillamasterdetailpatternexample/TaskModel';
import { TaskService } from 'Frontend/generated/endpoints';

export const config: ViewConfig = {
  title: 'Auto CRUD Tasks',
  menu: {
    order: 1,
    title: 'Auto CRUD',
  },
};

export default function AutoCRUDTasksView() {
  return (
    <VerticalLayout className="h-full">
      <AutoCrud className="h-full" model={TaskModel} service={TaskService} />
    </VerticalLayout>
  );
}
