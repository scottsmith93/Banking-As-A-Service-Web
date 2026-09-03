import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";
import Button from "carbon-react/lib/components/button/__next__";
import EnableManufacturingDialog from "../products-and-services/item-details/EnableManufacturingDialog";
import { GETTING_STARTED_TASKS, type GettingStartedTask } from "../../data/dashboardGettingStarted";
import { subscriptionPlans } from "../../data/subscriptionPlans";
import { ROUTES } from "../../routes";

type DashboardGettingStartedProps = {
  activePlanId: string;
};

export default function DashboardGettingStarted({ activePlanId }: DashboardGettingStartedProps) {
  const navigate = useNavigate();
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(new Set());
  const [manufacturingDialogOpen, setManufacturingDialogOpen] = useState(false);

  const plan = subscriptionPlans.find((candidate) => candidate.id === activePlanId);
  const tasks = GETTING_STARTED_TASKS[activePlanId] ?? [];

  const completeTask = (taskId: string) => {
    setCompletedTaskIds((current) => new Set(current).add(taskId));
  };

  const handleTaskAction = (task: GettingStartedTask) => {
    if (task.id === "review-items") {
      completeTask(task.id);
      navigate(ROUTES.productsAndServices.catalog);
      return;
    }

    if (task.id === "set-up-manufacturing") {
      setManufacturingDialogOpen(true);
      return;
    }

    // PROTOTYPE: locations and stock-tracking setup flows don't exist yet —
    // clicking simply marks the step as done.
    completeTask(task.id);
  };

  return (
    <Box className="dashboardGettingStarted" display="flex" flexDirection="column">
      <Box
        className="dashboardGettingStarted__banner"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h2" as="h2" className="dashboardGettingStarted__bannerTitle">
          Let&apos;s get started with Sage Active {plan?.name ?? ""}
        </Typography>
        <Typography variant="p" as="p" className="dashboardGettingStarted__bannerProgress">
          {completedTaskIds.size}/{tasks.length} steps completed
        </Typography>
      </Box>

      <Box className="dashboardGettingStarted__taskList" display="flex" flexDirection="column">
        {tasks.map((task) => {
          const done = completedTaskIds.has(task.id);

          return (
            <Box
              key={task.id}
              className="dashboardGettingStarted__task"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <img src={task.icon} alt="" className="dashboardGettingStarted__taskIcon" />
                <Box display="flex" flexDirection="column">
                  <Typography variant="strong" as="p" className="dashboardGettingStarted__taskTitle">
                    {task.title}
                  </Typography>
                  <Typography variant="p" as="p" className="dashboardGettingStarted__taskDescription">
                    {task.description}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="default"
                variantType="primary"
                size="medium"
                disabled={done}
                onClick={() => handleTaskAction(task)}
              >
                {done ? "Done" : task.actionLabel}
              </Button>
            </Box>
          );
        })}
      </Box>

      <EnableManufacturingDialog
        open={manufacturingDialogOpen}
        onCancel={() => setManufacturingDialogOpen(false)}
        onConfirm={() => {
          completeTask("set-up-manufacturing");
          setManufacturingDialogOpen(false);
        }}
      />
    </Box>
  );
}
