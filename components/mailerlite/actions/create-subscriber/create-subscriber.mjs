import utils from "../../common/utils.mjs";
import mailerlite from "../../mailerlite.app.mjs";

export default {
  key: "mailerlite-create-subscriber",
  name: "Create Subscriber",
  description: "Create a new subscriber. [See docs](https://developers.mailerlite.com/docs/subscribers.html#create-update-subscriber)",
  version: "0.0.3",
  type: "action",
  props: {
    mailerlite,
    email: {
      propDefinition: [
        mailerlite,
        "email",
      ],
    },
    name: {
      propDefinition: [
        mailerlite,
        "name",
      ],
    },
    type: {
      propDefinition: [
        mailerlite,
        "type",
        () => ({
          type: "create",
        }),
      ],
    },
  },
  async run({ $ }) {
    const data = {
      email: this.email,
      name: this.name,
      type: this.type,
    };

    const resp = await this.mailerlite.createSubscriber(utils.removeUndefined(data));
    $.export("$summary", "Successfully created subscriber");
    return resp;
  },
};
