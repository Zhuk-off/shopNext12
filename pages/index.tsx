import { Inter } from "next/font/google";
import { Slider } from "@/src/components/slider";
import { Banners } from "@/src/components/banners";
import Offers from "@/src/components/offers";
import { HEADER_FOOTER_ENDPOINT } from "@/src/utils/constants/endpoints";
import axios from "axios";
import Layout from "@/src/components/layouts";
import { IData } from "@/src/interfaces/footerHeaderRestAPIDataResponse";
import { MenuItem } from "@/src/interfaces/apollo/buildMenu.interface";
import buildMenu from "@/src/utils/buildMenu";
import { GetStaticProps } from "next";
import { getAllCategories } from "@/src/utils/apollo/queries";
import Search from "@/src/components/search";
import Container from "@/src/components/container";
import { NextSeo } from "next-seo";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  headerFooter,
  menu,
}: {
  headerFooter: IData | undefined;
  menu: MenuItem[];
}) {
  return (
    <main className="">
      <NextSeo
        title="Электроинструмент, официальный импортер Bosch, Master, Telwin, Endress, Sola, Startul, Toptul, Solaris, Fermer, ECO"
        description="Электроинструмент, официальный импортер Bosch, Master, Telwin, Endress, Sola, Startul, Toptul, Solaris, Fermer, ECO"
        nofollow
        noindex
      />

      <Layout headerFooter={headerFooter || {}} menu={menu}>
        <Container>
          <Search />
        </Container>
        <div className="mb-20 mt-12 rounded-xl ">
          <Slider />
        </div>
        <Banners />
        <Offers />
      </Layout>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
  const categories = await getAllCategories();
  const menuObject = buildMenu(categories);
  return {
    props: {
      headerFooter: headerFooterData?.data ?? {},
      menu: menuObject,
    },
    revalidate: 60000,
  };
};
