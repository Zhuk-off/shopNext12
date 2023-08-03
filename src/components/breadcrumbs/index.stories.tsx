import Breadcrumbs from "@/src/components/breadcrumbs/index";
import { breadcrumbsFixture } from "@/src/components/breadcrumbs/fixtures";

export default {
  title: "Breadcrumbs",
  component: Breadcrumbs,
  args: {
    breadcrumbs: breadcrumbsFixture,
  },
};
export const Overview = {
  args: {
    clickable: false,
  },
};
