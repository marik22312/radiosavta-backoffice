import mixpanel from "mixpanel-browser";
import moment from "moment";

export const log = (event: string, opts: any) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(
      `Mixpanel log: ${event}, params: ${JSON.stringify(
        opts
      )}, user: ${mixpanel.get_distinct_id()}`
    );
    return;
  }

  return mixpanel.track(event, {
    ...opts,
    current_time: moment.utc().toISOString(),
    distinct_id: mixpanel.get_distinct_id(),
  });
};

export const logPressLoginButton = () => {
  return log("bo.pressLoginButton", {});
};

export const logRouteChange = (route: string) => {
  return log("bo.routeChange", { route });
};

export const logPressOnProgram = (args: {
  origin: string;
  programId: string;
}) => {
  return log("bo.pressOnProgram", args);
};
