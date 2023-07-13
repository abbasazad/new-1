import { DEFAULT_POLLING_SOURCE_TIMER_INTERVAL } from "@pipedream/platform";
import github from "../../github.app.mjs";
import commonWebhook from "../common/common-webhook.mjs";

export default {
  key: "github-new-or-updated-pull-request",
  name: "New or Updated Pull Request",
  description: "Emit new events when a pull request is opened or updated",
  version: "1.0.3",
  type: "source",
  dedupe: "unique",
  props: {
    github,
    db: "$.service.db",
    http: "$.interface.http",
    timer: {
      type: "$.interface.timer",
      default: {
        intervalSeconds: DEFAULT_POLLING_SOURCE_TIMER_INTERVAL,
      },
    },
    repoFullname: {
      propDefinition: [
        github,
        "repoFullname",
      ],
    },
  },
  methods: {
    ...commonWebhook.methods,
    getAdmin() {
      return this.db.get("isAdmin");
    },
    setAdmin(value) {
      this.db.set("isAdmin", value);
    },
    getRepoName() {
      return this.db.get("repoName");
    },
    setRepoName(value) {
      this.db.set("repoName", value);
    },
    getWebhookEvents() {
      return [
        "pull_request",
      ];
    },
    async checkAdminPermission() {
      const { repoFullname } = this;
      if (repoFullname !== this.getRepoName()) {
        const { login: username } = await this.github.getAuthenticatedUser();
        const { user: { permissions: { admin } } } = await this.github.getUserRepoPermissions({
          repoFullname,
          username,
        });

        this.setRepoName(repoFullname);
        this.setAdmin(Boolean(admin));
      }
    },
  },
  hooks: {
    async deploy() {
      console.log("deploy, admin: " + this.getAdmin());
    },
    async activate() {
      await this.checkAdminPermission();
      const webhookId = this._getWebhookId();
      if (this.getAdmin()) {
        if (!webhookId) {
          await this.createWebhook();
        }
      } else if (webhookId) {
        await this.removeWebhook(webhookId);
      }
    },
    async deactivate() {
      await this.removeWebhook();
    },
  },
  async run(event) {
    const meta = {
      id: Date.now(),
      summary: "Test " + Date.now(),
      ts: Date.now(),
    };

    if (this.getAdmin()) {
      this.$emit(
        {
          useWebhook: true,
          data: event,
        },
        meta,
      );
    } else {
      this.$emit(
        {
          shouldPoll: true,
        },
        meta,
      );
    }
  },
};
