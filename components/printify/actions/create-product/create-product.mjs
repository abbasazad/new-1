import printify from "../../printify.app.mjs";

export default {
  key: "printify-create-product",
  name: "Create a Product",
  description: "Creates a new product on Printify. [See the documentation](https://developers.printify.com/#create-a-new-product)",
  version: "0.0.1",
  type: "action",
  props: {
    printify,
    shopId: {
      propDefinition: [
        printify,
        "shopId",
      ],
    },
    title: {
      propDefinition: [
        printify,
        "title",
      ],
    },
    description: {
      propDefinition: [
        printify,
        "description",
      ],
    },
    tags: {
      propDefinition: [
        printify,
        "tags",
      ],
      optional: true,
    },
    blueprintId: {
      propDefinition: [
        printify,
        "blueprintId",
      ],
    },
    printProviderId: {
      propDefinition: [
        printify,
        "printProviderId",
        ({ blueprintId }) => ({
          blueprintId,
        }),
      ],
      reloadProps: true,
    },
  },
  async additionalProps() {
    const props = {};
    if (this.printProviderId) {
      props.variantCount = {
        type: "integer",
        label: "Print Provide Variant Quantity",
        description: "The quantity of variants.",
        min: 1,
        reloadProps: true,
      };
      props.imageCount = {
        type: "integer",
        label: "Image Quantity",
        description: "The quantity of images.",
        min: 1,
        reloadProps: true,
      };
    }
    if (this.variantCount) {
      for (let i = 1; i <= this.variantCount; i++) {
        props[`variant_${i}`] = {
          type: "string",
          label: `Variant ${i}`,
          description: `Print Provide Variant ${i}.`,
          options: async () => {
            const { variants } = await this.printify.listPrintProviderVariants({
              blueprintId: this.blueprintId,
              printProviderId: this.printProviderId,
            });

            return variants.map(({
              id: value, title: label,
            }) => ({
              label,
              value,
            }));
          },
        };
        props[`variantPrice_${i}`] = {
          type: "integer",
          label: `Variant Price ${i}`,
          description: `The price of the variant ${i}.`,
        };
        props[`variantEnabled_${i}`] = {
          type: "boolean",
          label: `Variant Enabled ${i}`,
          description: `Whether the variant ${i} is enable or not.`,
        };
      }
    }
    if (this.imageCount) {
      for (let i = 1; i <= this.imageCount; i++) {
        props[`position_${i}`] = {
          type: "string",
          label: `Position ${i}`,
          description: `The placeholder position ${i}`,
        };
        props[`imageId_${i}`] = {
          type: "string",
          label: `Image Id ${i}`,
          description: `The Id of the image ${i}`,
        };
        props[`imageX_${i}`] = {
          type: "string",
          label: `X Coordinates ${i}`,
          description: `The X coordinates of image ${i}`,
        };
        props[`imageY_${i}`] = {
          type: "string",
          label: `Y Coordinates ${i}`,
          description: `The Y coordinates of image ${i}`,
        };
        props[`imageScale_${i}`] = {
          type: "string",
          label: `Scale ${i}`,
          description: `The scale of image ${i}`,
        };
        props[`imageAngle_${i}`] = {
          type: "integer",
          label: `Angle ${i}`,
          description: `The angle of image ${i}`,
        };
      }
    }
    return props;
  },
  async run({ $ }) {
    const variants = [];
    const placeholders = [];
    for (let i = 1; i <= this.variantCount; i++) {
      variants.push({
        id: this[`variant_${i}`],
        price: this[`variantPrice_${i}`],
        is_enabled: this[`variantEnabled_${i}`],
      });
    }
    for (let i = 1; i <= this.imageCount; i++) {
      placeholders.push({
        position: this[`position_${i}`],
        images: [
          {
            id: this[`imageId_${i}`],
            x: this[`imageX_${i}`],
            y: this[`imageY_${i}`],
            scale: this[`imageScale_${i}`],
            angle: this[`imageAngle_${i}`],
          },
        ],
      });
    }
    const response = await this.printify.createProduct({
      shopId: this.shopId,
      data: {
        title: this.title,
        description: this.description,
        tags: this.tags,
        blueprint_id: this.blueprintId,
        print_provider_id: this.printProviderId,
        print_areas: [
          {
            variant_ids: variants.map((variant) => variant.id),
            placeholders: placeholders,
          },
        ],
        variants,
      },
    });

    $.export("$summary", `Successfully created a new product with ID: ${response.id}`);
    return response;
  },
};
