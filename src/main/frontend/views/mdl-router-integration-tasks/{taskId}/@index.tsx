import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { AutoForm } from '@vaadin/hilla-react-crud';
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button, Icon, VerticalLayout } from '@vaadin/react-components';
import Task from 'Frontend/generated/de/rwi/hillamasterdetailpatternexample/Task';
import TaskModel from 'Frontend/generated/de/rwi/hillamasterdetailpatternexample/TaskModel';
import { TaskService } from 'Frontend/generated/endpoints';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

export const config: ViewConfig = {
  title: 'MDL Router Integration Tasks',
  menu: { exclude: true },
};

export default function MDLRouterIntegrationTaskView() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const task = useSignal<Task>();

  useEffect(() => {
    const getTask = async (id: number) => {
      task.value = await TaskService.get(id);
    };
    if (taskId && !Number.isNaN(taskId)) {
      getTask(Number.parseInt(taskId));
    }
  }, [task, taskId]);

  const navigateToMasterView = useCallback(() => {
    navigate('/mdl-router-integration-tasks');
  }, [navigate]);

  return (
    <VerticalLayout theme="margin">
      <Button aria-label="Navigate to master view" theme="icon" onClick={navigateToMasterView}>
        <Icon icon="lumo:arrow-left" />
      </Button>
      <AutoForm
        className="w-full"
        model={TaskModel}
        service={TaskService}
        item={task.value}
        deleteButtonVisible
        onDeleteSuccess={navigateToMasterView}
        onSubmitSuccess={navigateToMasterView}
      />
    </VerticalLayout>
  );
}
