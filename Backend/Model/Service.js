import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    shortDescription: {
      type: String,
      default: "",
    },

    longDescription: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    icon: {
      type: String,
      default: "",
    },

    features: {
      type: [String],
      default: [],
    },

    ctaText: {
      type: String,
      default: "Learn More",
    },

    ctaLink: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    metaTitle: {
      type: String,
      default: "",
    },

    metaDescription: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

serviceSchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  next();
});

export default mongoose.model("Service", serviceSchema);
