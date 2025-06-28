import { AutoGrid } from '@vaadin/hilla-react-crud';
import { GridActiveItemChangedEvent, MasterDetailLayout } from '@vaadin/react-components';
import Task from 'Frontend/generated/de/rwi/hillamasterdetailpatternexample/Task';
import TaskModel from 'Frontend/generated/de/rwi/hillamasterdetailpatternexample/TaskModel';
import { TaskService } from 'Frontend/generated/endpoints';
import { useNavigate, useOutlet } from 'react-router';

export default function MDLRouterIntegrationLayout() {
  const navigate = useNavigate();
  const childView = useOutlet();

  return (
    <MasterDetailLayout stackOverlay forceOverlay>
      <MasterDetailLayout.Master>
        <AutoGrid
          className="h-full"
          model={TaskModel}
          service={TaskService}
          onActiveItemChanged={(event: GridActiveItemChangedEvent<Task>) => {
            const item = event.detail.value;
            if (item?.id) {
              navigate(`${item.id}`, { relative: 'route' });
            }
          }}
        />
      </MasterDetailLayout.Master>
      <MasterDetailLayout.Detail>{childView}</MasterDetailLayout.Detail>
    </MasterDetailLayout>
  );
}
