import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { AutoGrid } from '@vaadin/hilla-react-crud';
import { Button, GridActiveItemChangedEvent, HorizontalLayout, VerticalLayout } from '@vaadin/react-components';
import Task from 'Frontend/generated/de/rwi/hillamasterdetailpatternexample/Task';
import TaskModel from 'Frontend/generated/de/rwi/hillamasterdetailpatternexample/TaskModel';
import { TaskService } from 'Frontend/generated/endpoints';
import { useNavigate } from 'react-router';

export const config: ViewConfig = {
  title: 'Router Tasks',
  menu: {
    order: 3,
    title: 'Router',
  },
};

export default function RouterTasksView() {
  const navigate = useNavigate();

  return (
    <VerticalLayout className="h-full">
      <AutoGrid
        model={TaskModel}
        service={TaskService}
        onActiveItemChanged={(event: GridActiveItemChangedEvent<Task>) => {
          const item = event.detail.value;
          if (item?.id) {
            navigate(`/router-tasks/${item.id}`);
          }
        }}
      />
      <HorizontalLayout className="self-end" theme="margin">
        <Button aria-label={`Add new task`} theme="primary" onClick={() => navigate(`/router-tasks/new`)}>
          New Task
        </Button>
      </HorizontalLayout>
    </VerticalLayout>
  );
}
