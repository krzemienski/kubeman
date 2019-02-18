import k8sFunctions from '../k8s/k8sFunctions'
import {ActionGroupSpec, ActionContextType, ActionContextOrder} from '../actions/actionSpec'
import K8sPluginHelper from '../k8s/k8sPluginHelper'

const plugin : ActionGroupSpec = {
  context: ActionContextType.Namespace,
  title: "Resources",
  order: ActionContextOrder.Resources,
  actions: [
    {
      name: "Compare Two Secrets",
      order: 21,
      loadingMessage: "Loading Secrets...",
      async choose(actionContext) {
        await K8sPluginHelper.prepareCachedChoices(actionContext, k8sFunctions.getNamespaceSecrets, 
                                                  "Secrets", 2, 2, true, "name")
      },

      async act(actionContext) {
        K8sPluginHelper.generateComparisonOutput(actionContext, this.onOutput, "Secrets", "name")
      },
    },
    {
      name: "Compare Two Config Maps",
      order: 22,
      loadingMessage: "Loading Config Maps...",
      async choose(actionContext) {
        await K8sPluginHelper.prepareCachedChoices(actionContext, k8sFunctions.getNamespaceConfigMaps, 
                                            "Config Maps", 2, 2, true, "name")
      },

      async act(actionContext) {
        K8sPluginHelper.generateComparisonOutput(actionContext, this.onOutput, "Config Maps")
      },
    }
  ]
}

export default plugin
