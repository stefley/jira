import React, { ProfilerOnRenderCallback, ProfilerProps } from "react";
import { callbackify } from "util";

type Props = {
  metaData: any;
  phases?: ("mount" | "update")[];
} & Omit<ProfilerProps, "onRender">;

let queue: unknown[] = [];

const sendProfilerQueue = () => {
  if (!queue.length) {
    return;
  }
  const queueToSend = [...queue];
  queue = [];
  console.log(queue);
};
setInterval(sendProfilerQueue, 5000);

export const Profiler = ({ metaData, phases, ...props }: Props) => {
  const reportProfiler: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) => {
    if (!phases || phases.includes(phase)) {
      queue.push({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
        metaData,
      });
    }
  };

  return <React.Profiler onRender={reportProfiler} {...props} />;
};
