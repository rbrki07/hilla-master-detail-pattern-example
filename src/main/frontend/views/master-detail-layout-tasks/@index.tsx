import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { AutoForm, AutoGrid } from '@vaadin/hilla-react-crud';
import { useSignal } from '@vaadin/hilla-react-signals';
import {
  Button,
  GridActiveItemChangedEvent,
  HorizontalLayout,
  Icon,
  MasterDetailLayout,
  VerticalLayout,
} from '@vaadin/react-components';
import Task from 'Frontend/generated/de/rwi/hillamasterdetailpatternexample/Task';
import TaskModel from 'Frontend/generated/de/rwi/hillamasterdetailpatternexample/TaskModel';
import { TaskService } from 'Frontend/generated/endpoints';
import { useCallback } from 'react';

export const config: ViewConfig = {
  title: 'Master-Detail Layout Tasks',
  menu: {
    order: 4,
    title: 'Master-Detail Layout',
  },
};

export default function MasterDetailLayoutTasksView() {
  const activeItem = useSignal<Task | null>();

  const closeDetailArea = useCallback(() => {
    activeItem.value = null;
  }, [activeItem]);

  return (
    <MasterDetailLayout masterMinSize="600px" detailSize="300px" stackOverlay>
      <MasterDetailLayout.Master>
        <AutoGrid
          className="h-full"
          model={TaskModel}
          service={TaskService}
          onActiveItemChanged={(event: GridActiveItemChangedEvent<Task>) => {
            const item = event.detail.value;
            if (item) {
              activeItem.value = item;
            }
          }}
        />
      </MasterDetailLayout.Master>
      <MasterDetailLayout.Detail>
        {activeItem.value ? (
          <VerticalLayout theme="margin">
            <HorizontalLayout>
              <Button theme="icon" onClick={closeDetailArea}>
                <Icon icon="lumo:cross" />
              </Button>
            </HorizontalLayout>
            <AutoForm
              model={TaskModel}
              service={TaskService}
              item={activeItem.value}
              deleteButtonVisible
              onDeleteSuccess={closeDetailArea}
              onSubmitSuccess={closeDetailArea}
            />
          </VerticalLayout>
        ) : null}
      </MasterDetailLayout.Detail>
    </MasterDetailLayout>
  );
}
