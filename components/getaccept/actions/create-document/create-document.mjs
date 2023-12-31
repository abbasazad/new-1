import { parseArray } from "../../common/utils.mjs";
import getaccept from "../../getaccept.app.mjs";

export default {
  key: "getaccept-create-document",
  name: "Create Document",
  version: "0.0.1",
  description: "Create a document to be able to send it to a recipient. [See the documentation](https://app.getaccept.com/api/#createdocument)",
  type: "action",
  props: {
    getaccept,
    name: {
      type: "string",
      label: "Name",
      description: "The name of the document.",
    },
    type: {
      type: "string",
      label: "Type",
      description: "Document type is used to set default values and look of a document.",
      options: [
        "sales",
        "hr",
        "introduction",
        "other",
      ],
      optional: true,
    },
    value: {
      type: "string",
      label: "Value",
      description: "Monetary value of document in entity currency.",
      optional: true,
    },
    fileIds: {
      type: "string[]",
      label: "File Ids",
      description: "File Ids to previusly uploaded files, see section [\"Upload document(s)\" here](https://app.getaccept.com/api/#uploadfile).",
      optional: true,
    },
    fileName: {
      type: "string",
      label: "File Name",
      description: "Sending a file, you must to type the filename of the document, with the extension. This will be helpful for converting different file-types.",
      optional: true,
    },
    fileURL: {
      type: "string",
      label: "File URL",
      description: "Url to document file. Documents must be public available for download.",
      optional: true,
    },
    recipients: {
      type: "string[]",
      label: "Recipients",
      description: "A list of valid JSON of recipients you're sending the document to. Every object must contain first_name, last_name (or fullname) and email fields. The 'role' field is optional. If not set, a person will be assigned the role signer. [See the object here](https://app.getaccept.com/api/#createdocument).",
      optional: true,
    },
    isSigning: {
      type: "boolean",
      label: "Is Signing",
      description: "Should the document be enabled for e-signing.",
      optional: true,
    },
    isSigningOrder: {
      type: "boolean",
      label: "Is Signing Order",
      description: "Use specific order for signers.",
      optional: true,
    },
    isSigningBiometric: {
      type: "boolean",
      label: "Is Signing Biometric",
      description: "Drawn signature when signing.",
      optional: true,
    },
    isSigningInitials: {
      type: "boolean",
      label: "Is Signing Initials",
      description: "Initials are set as default sign method.",
      optional: true,
    },
    isSelfsign: {
      type: "boolean",
      label: "Is Self-sign",
      description: "Should the sender also sign the document.",
      optional: true,
    },
    expirationDate: {
      type: "string",
      label: "Expiration Date",
      description: "Default value from entity settings but can be overrided by setting a date. Accepted formats: `yyyy-MM-dd`, `dd-MM-yyyy`, `MM/dd/yyyy`, `yyyy-MM-ddTHH:mm:ss.SSSZ`, `Unix timestamp in seconds`",
      optional: true,
    },
    isReminderSending: {
      type: "boolean",
      label: "Is Reminder Sending",
      description: "Should the system automatically send reminders based on the entity sending settings?",
      optional: true,
    },
    isSigningForward: {
      type: "boolean",
      label: "Is Signing Forward",
      description: "Should a recipient be able to forward the signing rights to someone else?",
      optional: true,
    },
    isIdentifyRecipient: {
      type: "boolean",
      label: "Is Identify Recipient",
      description: "Enable identification of new recipients by cookie.",
      optional: true,
    },
    isSMSSending: {
      type: "boolean",
      label: "Is SMS Sending",
      description: "Should the sending automatically include an SMS message to recipients with valid mobile numbers?",
      optional: true,
    },
    isAutomaticSending: {
      type: "boolean",
      label: "Is Automatic Sending",
      description: "Used to send documents immediately. Requires a file-parameter to import and send. **true: Send immediately** and **false: Status draft**.",
      optional: true,
    },
    isScheduledSending: {
      type: "boolean",
      label: "Is Scheduled Sending",
      description: "If the automatic sending should be scheduled.",
      optional: true,
    },
    scheduledSendingTime: {
      type: "string",
      label: "Scheduled Sending Time",
      description: "Date and time when document will be sent if scheduled.",
      optional: true,
    },
    videoId: {
      type: "string",
      label: "Video Id",
      description: "Specify a video to be presented before the document is opened.",
      optional: true,
    },
    templateId: {
      type: "string",
      label: "Template Id",
      description: "Use this to specify a template to be used for the document.",
      optional: true,
    },
    replacePages: {
      type: "boolean",
      label: "Replace Pages",
      description: "True to replace pages in template.",
      optional: true,
    },
    keepFields: {
      type: "boolean",
      label: "Keep Fields",
      description: "True to keep form fields in template.",
      optional: true,
    },
    senderEmail: {
      propDefinition: [
        getaccept,
        "senderEmail",
      ],
      optional: true,
    },
    communicationTemplateId: {
      type: "string",
      label: "Communication Template Id",
      description: "Use this to specify the communication template to be used for the document.",
      optional: true,
    },
    emailSendSubject: {
      type: "string",
      label: "Email Send Subject",
      description: "Use this to specify the subject line used to send out the document.",
      optional: true,
    },
    emailSendMessage: {
      type: "string",
      label: "Email Send Message",
      description: "Use this to specify a message to the recipient(s) when sending out the document.",
      optional: true,
    },
    customFields: {
      type: "object",
      label: "Custom Fields",
      description: "Enter custom data to be used identifying the field either by **name** or **id**.",
      optional: true,
    },
    attachments: {
      type: "string[]",
      label: "Attachments",
      description: "A list of attachments to include with the document. Every attachment must contain a type and a title. If the type is file, it must have the **Id** field, if the type is external, it must have **url** field. [See the object here](https://app.getaccept.com/api/#createdocument).",
      optional: true,
    },
    customPricingTables: {
      type: "string[]",
      label: "Custom Pricing Tables",
      description: "A list of pricing-table objects. [See the object here](https://app.getaccept.com/api/#createdocument).",
      optional: true,
    },
  },
  async run({ $ }) {
    const {
      getaccept,
      fileIds,
      fileName,
      fileURL,
      recipients,
      isSigning,
      isSigningOrder,
      isSigningBiometric,
      isSigningInitials,
      isSelfsign,
      expirationDate,
      isReminderSending,
      isSigningForward,
      isIdentifyRecipient,
      isSMSSending,
      isAutomaticSending,
      isScheduledSending,
      scheduledSendingTime,
      videoId,
      templateId,
      replacePages,
      keepFields,
      senderEmail,
      communicationTemplateId,
      emailSendSubject,
      emailSendMessage,
      customFields,
      attachments,
      customPricingTables,
      ...data
    } = this;

    const response = await getaccept.createDocument({
      $,
      data: {
        file_ids: fileIds,
        file_name: fileName,
        file_url: fileURL,
        recipients: recipients && parseArray(recipients),
        is_signing: isSigning,
        is_signing_order: isSigningOrder,
        is_signing_biometric: isSigningBiometric,
        is_signing_initials: isSigningInitials,
        is_selfsign: isSelfsign,
        expiration_date: expirationDate,
        is_reminder_sending: isReminderSending,
        is_signing_forward: isSigningForward,
        is_identify_recipient: isIdentifyRecipient,
        is_sms_sending: isSMSSending,
        is_automatic_sending: isAutomaticSending,
        is_scheduled_sending: isScheduledSending,
        scheduled_sending_time: scheduledSendingTime,
        video_id: videoId,
        template_id: templateId,
        replace_pages: replacePages,
        keep_fields: keepFields,
        sender_email: senderEmail,
        communication_template_id: communicationTemplateId,
        email_send_subject: emailSendSubject,
        email_send_message: emailSendMessage,
        custom_fields: customFields?.length && Object.entries(customFields).map(([
          key,
          value,
        ]) => ({
          id: key,
          value,
        })),
        attachments: attachments && parseArray(attachments),
        custom_pricing_tables: customPricingTables && parseArray(customPricingTables),
        ...data,
      },
    });

    $.export("$summary", `A new document with Id: ${response.id} was successfully created!`);
    return response;
  },
};
