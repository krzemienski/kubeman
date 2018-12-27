import {ActionGroupSpec, ActionContextType, ActionOutputStyle, ActionOutput} from '../actions/actionSpec'
import K8sPluginHelper from '../k8s/k8sPluginHelper'
import { PodDetails } from '../k8s/k8sObjectTypes';

const plugin : ActionGroupSpec = {
  context: ActionContextType.Namespace,
  title: "Pod Actions",
  actions: [
    {
      name: "View Pod(s) Details",
      order: 3,
      
      choose: K8sPluginHelper.choosePod.bind(null, 1, 10, false, true),

      async act(actionContext) {
        const selections = await K8sPluginHelper.getPodSelections(actionContext, true, false)
        if(selections.length < 1) {
          actionContext.onOutput && actionContext.onOutput([["No pod selected"]], ActionOutputStyle.Text)
          return
        }
        actionContext.onOutput && actionContext.onOutput([["Keys", "Data"]], ActionOutputStyle.Table)

        selections.forEach(selection => {
          const pod = selection.pod
          const namespace = selection.namespace
          const cluster = selection.cluster
          const podDetails = selection.podContainerDetails as PodDetails
          const output: ActionOutput = []
          output.push([">" + pod, ""])
          output.push(["Cluster", cluster])
          output.push(["Namespace", namespace])
          if(podDetails) {
            Object.keys(podDetails).forEach((key, index) => output.push([key, podDetails[key] ||'']))
          }
          actionContext.onStreamOutput && actionContext.onStreamOutput(output)
        })
      },
    }
  ]
}

export default plugin
